/* VKRI prototype: the one API both interfaces use.
   Two user types only:
     planner : sees and edits everything (all six planners have identical rights)
     couple  : sees only their own wedding, only what is published to them, never internal fields
   Permissions live here, not in the UI. Usage:
     var api = VKRI.api.current();          // scoped to the signed-in user of this tab
     api.list('tasks', { wedding_id: 'como' });
     api.budget('como');
     api.updateTask(id, { status: 'done' });
   Every method is documented at its definition. Reads return copies. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI, db = VKRI.db;
  var hasWindow = typeof window !== 'undefined';

  /* Fields a couple never receives. */
  var INTERNAL_FIELDS = {
    weddings: ['sensitivities', 'internal_notes', 'comms', 'decision_makers', 'contacts', 'team_ids'], // the planners' briefing about the couple
    phases: ['summary'],
    subphases: ['summary', 'blocked_reason'],
    tasks: ['note'],
    guests: ['internal_notes'],
    budget_lines: ['internal_notes'],
    decisions: ['internal_notes'],
    vendors: ['avg_reply_hours', 'internal_notes', 'commission_pct'],
    messages: ['internal_notes'],
    users: ['email_private']
  };
  /* Row-level rules for a couple (wedding scoping is applied to every table on top of these). */
  var ROW_RULES = {
    activity_log: function () { return false; },
    tasks: function (r) { return r.client_visible === true; },
    risks: function (r) { return r.client_visible === true; },
    comments: function (r) { return r.internal === false; },
    weekly_recaps: function (r) { return r.status === 'sent'; },
    documents: function (r) { return r.client_visible !== false; },
    vendors: function (r) { return r.client_visible !== false; }
  };

  function nowIso() { return VKRI.now().toISOString(); }
  function today() { return nowIso().slice(0, 10); }
  function newId(prefix) { return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function lineForecast(l) { return l.contracted > 0 ? l.contracted : l.estimate; }

  function scoped(user, readOnly) {
    if (!user) throw new Error('Not signed in');
    var isPlanner = user.type === 'planner';
    /* "View as couple" opens the portal read-only: every mutation stops here. */
    function guard() { if (readOnly) { var e = new Error('Preview only. Nothing is saved.'); e.preview = true; throw e; } }
    /* The open decision that settles a change order, if there is one (decision.change_order_id). */
    function decisionFor(changeOrderId) {
      return db.table('decisions').filter(function (d) { return d.change_order_id === changeOrderId && d.status === 'open'; })[0] || null;
    }

    function canSee(table, row) {
      if (isPlanner) return true;
      if (table === 'users') return row.type === 'planner' || row.id === user.id;
      if (table === 'weddings') return row.id === user.wedding_id;
      if (row.wedding_id !== user.wedding_id) return false;
      return ROW_RULES[table] ? ROW_RULES[table](row) : true;
    }
    function out(table, row) {
      var copy = JSON.parse(JSON.stringify(row)); // deep copy: callers can never edit the database by accident
      if (!isPlanner) (INTERNAL_FIELDS[table] || []).forEach(function (f) { delete copy[f]; });
      if (table === 'change_orders' && copy.status === 'pending') { var d = decisionFor(copy.id); copy.open_decision_id = d ? d.id : null; }
      return copy;
    }
    function list(table, where) {
      var keys = where ? Object.keys(where) : [];
      function match(row) { for (var i = 0; i < keys.length; i++) if (row[keys[i]] !== where[keys[i]]) return false; return true; }
      if (isPlanner) return db.table(table).filter(match).map(function (row) { return out(table, row); });
      /* Couples: filter on the stripped copy, so a hidden field can never be probed through `where`. */
      return db.table(table).filter(function (row) { return canSee(table, row); }).map(function (row) { return out(table, row); }).filter(match);
    }
    function get(table, id) {
      var row = db.get(table, id);
      return row && canSee(table, row) ? out(table, row) : null;
    }
    function mustPlanner() { if (!isPlanner) throw new Error('Forbidden: planners only'); }
    function mustOwn(row) {
      if (!row) throw new Error('Not found');
      if (isPlanner) throw new Error('Forbidden: this action belongs to the couple');
      if ((row.wedding_id || row.id) !== user.wedding_id) throw new Error('Forbidden: not your wedding');
    }
    function assertWedding(wid) {
      if (!isPlanner && wid !== user.wedding_id) throw new Error('Forbidden: not your wedding');
    }
    function log(wid, text) {
      db.insert('activity_log', { id: newId('act'), wedding_id: wid, at: nowIso(), user_id: user.id, text: text });
    }

    var api = {
      me: out('users', user),
      isPlanner: isPlanner,
      /* list(table, where?) -> rows the user may see, internal fields removed for couples. */
      list: list,
      /* get(table, id) -> row or null. */
      get: get,
      user: function (id) { return get('users', id); },

      /* progress(subphaseId) -> { done, total, pct } computed from ALL tasks (couples get the numbers, not the tasks). */
      progress: function (subphaseId) {
        var sp = db.get('subphases', subphaseId);
        if (!sp) return { done: 0, total: 0, pct: 0 };
        assertWedding(sp.wedding_id);
        var tasks = db.table('tasks').filter(function (t) { return t.subphase_id === subphaseId; });
        var done = tasks.filter(function (t) { return t.status === 'done'; }).length;
        var pct = tasks.length ? Math.round(done / tasks.length * 100) : (sp.status === 'done' ? 100 : 0);
        return { done: done, total: tasks.length, pct: pct };
      },
      /* phaseProgress(phaseId) -> { done, total, pct, status } rolled up from its three sub-phases. */
      phaseProgress: function (phaseId) {
        var subs = db.table('subphases').filter(function (s) { return s.phase_id === phaseId; });
        var done = 0, total = 0;
        subs.forEach(function (s) { var p = api.progress(s.id); done += p.done; total += p.total; });
        var st = subs.every(function (s) { return s.status === 'done'; }) ? 'done'
          : subs.some(function (s) { return s.status === 'blocked'; }) ? 'blocked'
          : subs.some(function (s) { return s.status === 'awaiting_client'; }) ? 'awaiting_client'
          : subs.every(function (s) { return s.status === 'not_started'; }) ? 'not_started' : 'in_progress';
        return { done: done, total: total, pct: total ? Math.round(done / total * 100) : (st === 'done' ? 100 : 0), status: st };
      },

      /* budget(weddingId) -> the three honest numbers plus breakdowns. Same figures for both user types.
         { envelope, forecast, contracted, paid, invoiced, pending_changes, remaining, over,
           next_payment (invoice|null), still_to_book (count of lines not yet contracted),
           categories: [{ category, allocated, forecast, contracted, paid, over }] } */
      budget: function (wid) {
        assertWedding(wid);
        var w = db.get('weddings', wid);
        var lines = db.table('budget_lines').filter(function (l) { return l.wedding_id === wid; });
        var invoices = db.table('invoices').filter(function (i) { return i.wedding_id === wid; });
        var pending = db.table('change_orders').filter(function (c) { return c.wedding_id === wid && c.status === 'pending'; });
        var paidByLine = {}, invoiced = 0, paid = 0;
        invoices.forEach(function (i) {
          invoiced += i.amount_eur;
          if (i.status === 'paid') { paid += i.amount_eur; paidByLine[i.budget_line_id] = (paidByLine[i.budget_line_id] || 0) + i.amount_eur; }
        });
        var cats = {}, forecast = 0, contracted = 0, stillToBook = 0;
        lines.forEach(function (l) {
          var c = cats[l.category] || (cats[l.category] = { category: l.category, allocated: 0, forecast: 0, contracted: 0, paid: 0 });
          c.allocated += l.allocated || 0; c.forecast += lineForecast(l); c.contracted += l.contracted || 0; c.paid += paidByLine[l.id] || 0;
          forecast += lineForecast(l); contracted += l.contracted || 0;
          if (!(l.contracted > 0) && l.category !== 'Contingency') stillToBook++;
        });
        var pendingSum = 0;
        pending.forEach(function (c) {
          pendingSum += c.delta_eur;
          var l = db.get('budget_lines', c.budget_line_id);
          if (l && cats[l.category]) cats[l.category].forecast += c.delta_eur;
        });
        forecast += pendingSum;
        var upcoming = invoices.filter(function (i) { return i.status !== 'paid'; })
          .sort(function (a, b) { return a.due < b.due ? -1 : 1; });
        var order = VKRI.enums.budgetCategories;
        return {
          envelope: w.envelope_eur, forecast: forecast, contracted: contracted, paid: paid, invoiced: invoiced,
          pending_changes: pendingSum, remaining: w.envelope_eur - forecast, over: forecast > w.envelope_eur,
          next_payment: upcoming[0] ? out('invoices', upcoming[0]) : null, still_to_book: stillToBook,
          categories: Object.keys(cats).map(function (k) { var c = cats[k]; c.over = c.allocated > 0 && c.forecast > c.allocated; return c; })
            .sort(function (a, b) { return order.indexOf(a.category) - order.indexOf(b.category); })
        };
      },
      /* fx(weddingId) -> currency exposure on what is still unpaid.
         { locked, today, unpaid_eur, usd_at_locked, usd_today, delta_usd } */
      fx: function (wid) {
        var b = api.budget(wid), w = db.get('weddings', wid);
        var unpaid = Math.max(b.forecast - b.paid, 0);
        return { locked: w.fx_locked, today: w.fx_today, unpaid_eur: unpaid,
          usd_at_locked: Math.round(unpaid * w.fx_locked), usd_today: Math.round(unpaid * w.fx_today),
          delta_usd: Math.round(unpaid * (w.fx_today - w.fx_locked)) };
      },
      /* holds(weddingId) -> { ours, yours }: open work on the planners' side vs. items waiting on the couple. */
      holds: function (wid) {
        assertWedding(wid);
        var ours = db.table('tasks').filter(function (t) { return t.wedding_id === wid && t.status !== 'done' && t.status !== 'client'; }).length;
        var yours = db.table('decisions').filter(function (d) { return d.wedding_id === wid && d.status === 'open'; }).length +
          db.table('change_orders').filter(function (c) { return c.wedding_id === wid && c.status === 'pending' && !decisionFor(c.id); }).length;
        return { ours: ours, yours: yours };
      },
      /* headcount(weddingId) -> { invited, yes, no, pending, forecast } */
      headcount: function (wid) {
        assertWedding(wid);
        var g = db.table('guests').filter(function (x) { return x.wedding_id === wid; });
        var yes = g.filter(function (x) { return x.rsvp === 'yes'; }).length;
        var no = g.filter(function (x) { return x.rsvp === 'no'; }).length;
        var pending = g.length - yes - no;
        return { invited: g.length, yes: yes, no: no, pending: pending, forecast: yes + Math.round(pending * 0.7) };
      },

      /* ---------- planner mutations ---------- */
      /* updateTask(id, { status?, assignee_id?, client_visible? }) */
      updateTask: function (id, patch) {
        mustPlanner(); guard();
        var t = db.get('tasks', id); if (!t) throw new Error('Not found');
        var p = { updated_at: today() };
        ['status', 'assignee_id', 'client_visible'].forEach(function (k) { if (patch[k] !== undefined) p[k] = patch[k]; });
        db.update('tasks', id, p);
        if (patch.status && patch.status !== t.status) log(t.wedding_id, 'moved "' + t.title + '" to ' + patch.status);
        return get('tasks', id);
      },
      /* setSubphaseStatus(id, status) */
      setSubphaseStatus: function (id, status) {
        mustPlanner(); guard();
        var s = db.get('subphases', id); if (!s) throw new Error('Not found');
        db.update('subphases', id, { status: status });
        log(s.wedding_id, 'set ' + s.code + ' ' + s.name + ' to ' + status);
      },
      /* addComment(parentType: 'phase'|'subphase'|'task', parentId, body, internal: bool) */
      addComment: function (parentType, parentId, body, internal) {
        mustPlanner(); guard();
        var parent = db.get(parentType + 's', parentId); if (!parent) throw new Error('Not found');
        return db.insert('comments', { id: newId('cm'), wedding_id: parent.wedding_id, parent_type: parentType, parent_id: parentId,
          author_id: user.id, at: nowIso(), body: body, internal: !!internal });
      },
      /* setVisible(table, id, bool): publish a record to the couple or take it back ("prep mode"). */
      setVisible: function (table, id, visible) {
        mustPlanner(); guard();
        var row = db.get(table, id); if (!row) throw new Error('Not found');
        db.update(table, id, { client_visible: !!visible, published_at: visible ? nowIso() : null });
        log(row.wedding_id, (visible ? 'published ' : 'unpublished ') + table.replace(/_/g, ' ').replace(/s$/, '') + ' to the couple');
      },
      /* acknowledgeMessage(id) / answerMessage(id, text): stamps the reply-time trail. */
      acknowledgeMessage: function (id) {
        mustPlanner(); guard();
        var m = db.get('messages', id); if (!m) throw new Error('Not found');
        if (!m.acknowledged_at) db.update('messages', id, { acknowledged_at: nowIso(), owner_id: user.id });
      },
      answerMessage: function (id, text) {
        mustPlanner(); guard();
        var m = db.get('messages', id); if (!m) throw new Error('Not found');
        db.update('messages', id, { acknowledged_at: m.acknowledged_at || nowIso(), answered_at: nowIso(), answer: text, answered_by: user.id, owner_id: m.owner_id || user.id });
        log(m.wedding_id, 'answered "' + m.subject + '"');
      },
      /* sendRecap(id): sends a drafted Friday letter to the couple. */
      sendRecap: function (id) {
        mustPlanner(); guard();
        var r = db.get('weekly_recaps', id); if (!r) throw new Error('Not found');
        db.update('weekly_recaps', id, { status: 'sent', sent_at: nowIso(), week_of: r.week_of > today() ? today() : r.week_of }); // a letter sent early carries the day it was sent
        log(r.wedding_id, 'sent the Friday letter');
      },
      /* confirmVendor(id, key: 'time'|'headcount'|'dietary'|'payment', bool): final confirmations grid. */
      confirmVendor: function (id, key, value) {
        mustPlanner(); guard();
        var v = db.get('vendors', id); if (!v) throw new Error('Not found');
        var c = Object.assign({}, v.confirmations); c[key] = !!value;
        db.update('vendors', id, { confirmations: c, updated_at: today() });
      },

      /* ---------- couple mutations ---------- */
      /* decide(decisionId, optionId): pick an option; the linked budget line takes the option's price.
         decide(decisionId, 'delegate'): "Decide for us". */
      decide: function (id, optionId) {
        var d = db.get('decisions', id); mustOwn(d); guard();
        if (d.status !== 'open') throw new Error('This decision is not open');
        /* The planners' side follows the couple's answer: the waiting task moves on, the risk and a blocked step update. */
        function follow(riskText, unblock) {
          var t = d.task_id && db.get('tasks', d.task_id);
          if (t && t.status === 'client') db.update('tasks', t.id, { status: 'doing', updated_at: today() });
          if (d.risk_id && db.get('risks', d.risk_id)) db.update('risks', d.risk_id, { status: riskText });
          var sp = unblock && d.unblocks && db.get('subphases', d.unblocks);
          if (sp && sp.status === 'blocked') db.update('subphases', sp.id, { status: 'in_progress', blocked_reason: '' });
        }
        if (optionId === 'delegate') {
          if (!d.delegable) throw new Error('This one needs your choice');
          db.update('decisions', id, { status: 'delegated', decided_at: nowIso(), decided_by: user.id });
          follow('Left to VKRI to decide', false);
          log(d.wedding_id, 'asked VKRI to decide "' + d.title + '"');
        } else {
          var opt = (d.options || []).filter(function (o) { return o.id === optionId; })[0];
          if (!opt) throw new Error('Unknown option');
          db.update('decisions', id, { status: 'decided', chosen_option_id: optionId, decided_at: nowIso(), decided_by: user.id });
          var line = d.budget_line_id && db.get('budget_lines', d.budget_line_id);
          if (line && opt.price_eur != null) {
            /* A decision may carry a pending change order (decision.change_order_id): choosing an option settles it at that option's price. */
            var co = d.change_order_id && db.get('change_orders', d.change_order_id);
            if (co && co.status === 'pending') {
              var delta = opt.price_eur - lineForecast(line);
              db.update('change_orders', co.id, { status: delta ? 'approved' : 'declined', delta_eur: delta || co.delta_eur, decided_at: nowIso(), decided_by: user.id,
                reason: co.reason + ' Settled by the choice: ' + opt.name + '.' });
            }
            db.update('budget_lines', line.id, line.contracted > 0 ? { contracted: opt.price_eur, updated_at: today() } : { estimate: opt.price_eur, updated_at: today() });
          }
          if (d.kind === 'proof' && d.document_id && db.get('documents', d.document_id)) {
            db.update('documents', d.document_id, { status: optionId === 'approve' ? 'approved' : 'changes requested' });
          }
          follow('Decided: ' + opt.name, true);
          log(d.wedding_id, 'chose "' + opt.name + '" for "' + d.title + '"');
        }
        return get('decisions', id);
      },
      /* respondChangeOrder(id, approve: bool): approval moves the amount into the budget line. */
      respondChangeOrder: function (id, approve) {
        var c = db.get('change_orders', id); mustOwn(c); guard();
        if (c.status !== 'pending') throw new Error('Already answered');
        var viaDecision = decisionFor(c.id);
        if (viaDecision) throw new Error('This change is settled by your decision "' + viaDecision.title + '"');
        var waiting = c.task_id && db.get('tasks', c.task_id);
        if (waiting && waiting.status === 'client') db.update('tasks', waiting.id, { status: 'doing', updated_at: today() });
        db.update('change_orders', id, { status: approve ? 'approved' : 'declined', decided_at: nowIso(), decided_by: user.id });
        if (approve) {
          var l = db.get('budget_lines', c.budget_line_id);
          if (l) db.update('budget_lines', l.id, l.contracted > 0 ? { contracted: l.contracted + c.delta_eur, updated_at: today() } : { estimate: l.estimate + c.delta_eur, updated_at: today() });
        }
        log(c.wedding_id, (approve ? 'approved' : 'declined') + ' the change "' + c.title + '"');
        return get('change_orders', id);
      },
      /* ask(subject, body): a question to the team; lands in the planners' inbox with a reply promise. */
      ask: function (subject, body) {
        if (isPlanner) throw new Error('Forbidden: this action belongs to the couple');
        guard();
        var due = new Date(VKRI.now().getTime() + VKRI.AGENCY.reply_promise_hours * 3600e3).toISOString();
        return db.insert('messages', { id: newId('msg'), wedding_id: user.wedding_id, from_user_id: user.id, channel: 'portal',
          subject: subject, body: body, received_at: nowIso(), due_by: due, acknowledged_at: null, answered_at: null, answer: '', answered_by: null, owner_id: null });
      },
      /* updateGuest(id, { rsvp?, dietary?, allergies?, notes? }) */
      updateGuest: function (id, patch) {
        var g = db.get('guests', id);
        if (!g) throw new Error('Not found');
        if (!isPlanner && g.wedding_id !== user.wedding_id) throw new Error('Forbidden: not your wedding');
        guard();
        var p = { updated_at: today() };
        ['rsvp', 'dietary', 'allergies', 'notes'].forEach(function (k) { if (patch[k] !== undefined) p[k] = patch[k]; });
        /* The overall reply carries to the events: a decline declines them all; a yes confirms the ones still open. */
        if (patch.rsvp !== undefined && patch.rsvp !== g.rsvp) {
          db.table('guest_event_rsvps').filter(function (r) { return r.guest_id === id; }).forEach(function (r) {
            var next = patch.rsvp === 'no' ? 'no' : patch.rsvp === 'pending' ? 'pending' : (r.status === 'pending' ? 'yes' : r.status);
            if (next !== r.status) db.update('guest_event_rsvps', r.id, { status: next });
          });
        }
        db.update('guests', id, p);
        return get('guests', id);
      },
      /* setRsvp(guestId, eventId, status) */
      setRsvp: function (guestId, eventId, status) {
        var g = db.get('guests', guestId);
        if (!g) throw new Error('Not found');
        if (!isPlanner && g.wedding_id !== user.wedding_id) throw new Error('Forbidden: not your wedding');
        guard();
        var id = guestId + ':' + eventId;
        if (db.get('guest_event_rsvps', id)) db.update('guest_event_rsvps', id, { status: status });
        else db.insert('guest_event_rsvps', { id: id, wedding_id: g.wedding_id, guest_id: guestId, event_id: eventId, status: status });
      },
      /* addLink(title, url, category, weddingId?): planners pass weddingId; anyone on the wedding can drop a link into Documents & Links. */
      addLink: function (title, url, category, weddingId) {
        var wid = isPlanner ? weddingId : user.wedding_id;
        if (!wid) throw new Error('Wedding required');
        guard();
        if (!/^https?:\/\/\S+$/i.test(String(url || ''))) throw new Error('The address should start with https://');
        if (VKRI.enums.docCategories.indexOf(category) < 0 || category === 'Legal paperwork') category = 'Links';
        return db.insert('documents', { id: newId('doc'), wedding_id: wid, type: 'link', category: category || 'Links', title: title, url: url,
          version: 1, status: 'shared', added_by: user.id, added_at: today(), client_visible: true });
      },
      /* setPhotoConsent('private' | 'editorial' | 'portfolio') */
      setPhotoConsent: function (value) {
        if (isPlanner) throw new Error('Forbidden: this action belongs to the couple');
        guard();
        db.update('weddings', user.wedding_id, { photo_consent: value, photo_consent_at: nowIso() });
        log(user.wedding_id, 'set photo consent to ' + value);
      }
    };
    return api;
  }

  /* ---------- session: one per browser tab ---------- */
  function sessionUserId() {
    if (!hasWindow) return null;
    var as = new URLSearchParams(location.search).get('as');
    if (as) return as; // signed in through the link (previews, the tour, tests): never touches the tab's own session
    try { return sessionStorage.getItem('vkri.user'); } catch (e) { return null; }
  }
  VKRI.api = {
    /* for(userId) -> API scoped to that user (tests, previews). */
    for: function (userId) { return scoped(db.get('users', userId)); },
    /* current() -> API for this tab's signed-in user, or null. */
    current: function () { var id = sessionUserId(); var u = id && db.get('users', id); return u ? scoped(u, VKRI.api.isPreview()) : null; },
    login: function (userId) { try { sessionStorage.setItem('vkri.user', userId); } catch (e) {} },
    logout: function () { try { sessionStorage.removeItem('vkri.user'); } catch (e) {} },
    /* True when a planner opened the portal with "View as couple": read-only. */
    isPreview: function () { return hasWindow && new URLSearchParams(location.search).get('preview') === '1'; },
    /* onChange(fn): re-render when any device changes the data. */
    onChange: function (fn) { db.onChange(fn); },
    reset: function () { db.reset(); },
    mode: function () { return db.mode(); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
