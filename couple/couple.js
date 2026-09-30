/* Couple portal shell + Home. Screens register themselves like in the planner app:
     VKRI.couple.screens.<name> = function (parts) -> html     (#/<name>/...)
     VKRI.couple.actions.<name> = function (el, event)          ([data-act="<name>"] clicks)
     VKRI.couple.changes.<name> = function (el, event)          ([data-change="<name>"] change events)
     VKRI.couple.inputs.<name>  = function (el, event)          ([data-input="<name>"] input events, e.g. search)
     VKRI.couple.forms.<name>   = function (form, event)        (<form data-form="<name>"> submits)
   Screens live in decisions.js, budget.js, guests.js, documents.js, weekend.js (loaded after this file).
   Screen UI state (filters, toggles, expanded rows) lives in module variables so it survives C.render().
   Everything goes through VKRI.api.current(), which only returns what this couple may see. */
(function () {
  'use strict';
  var ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var C = VKRI.couple = { screens: {}, actions: {}, changes: {}, inputs: {}, forms: {}, api: null, w: null };

  var NAV = [['home', 'Home', 'home'], ['decisions', 'Decisions', 'decide'], ['budget', 'Budget', 'euro'], ['guests', 'Guests', 'users'],
    ['documents', 'Documents', 'doc'], ['weekend', 'Weekend', 'calendar'], ['updates', 'Updates', 'letter']];

  C.parts = function () { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent); };
  C.user = function (id) { return C.api.user(id); };
  C.lead = function () { return C.user(C.w.lead_id); };
  /* Everything that waits for the couple: open decisions first, then pending changes. */
  C.needs = function () {
    var decs = C.api.list('decisions').filter(function (d) { return d.status === 'open'; })
      .sort(function (a, b) { return a.deadline < b.deadline ? -1 : 1; })
      .map(function (d) { return { kind: 'decision', id: d.id, title: d.title, why: d.why_now, due: d.deadline }; });
    var cos = C.api.list('change_orders').filter(function (c) { return c.status === 'pending' && !c.open_decision_id; }) // a change settled by a decision shows once, as the decision
      .map(function (c) { return { kind: 'change', id: c.id, title: c.title, why: c.reason, due: null, delta: c.delta_eur }; });
    return decs.concat(cos);
  };
  C.dueLine = function (iso) { var d = fmt.due(iso); return '<span class="when tone-' + d.tone + '">By ' + fmt.dow(iso) + ' ' + fmt.date(iso) + ' · ' + d.text + '</span>'; };
  C.soon = function (name) { return '<div class="panel empty"><p class="display d-sm">' + esc(name) + '</p><p>This page is built in the next wave.</p></div>'; };
  /* One "Needs you" card (Home and Decisions). detail: optional extra line, already-escaped HTML. */
  C.needCard = function (n, detail) {
    return '<button class="need" data-act="' + (n.kind === 'decision' ? 'openDecision' : 'openChange') + '" data-id="' + esc(n.id) + '">' +
      (n.due ? C.dueLine(n.due) : '<span class="when tone-warn">A change to approve · ' + fmt.eur(n.delta, true) + '</span>') +
      '<span class="strong">' + esc(n.title) + '</span><span class="small soft">' + esc(n.why) + '</span>' + (detail || '') +
      '<span class="row gap-2 small strong" style="color:var(--wed)">Review ' + ui.icon('arrow') + '</span></button>';
  };
  /* Page title block shared by every screen. */
  C.head = function (eyebrow, title, lede, side) {
    return '<header class="phead"><div class="col gap-2"><span class="eyebrow">' + esc(eyebrow) + '</span><h1 class="display d-lg">' + esc(title) + '</h1>' +
      (lede ? '<p class="soft">' + lede + '</p>' : '') + '</div>' + (side || '') + '</header>';
  };
  /* Small lookups every screen needs; all tolerate missing data so new seeds never break a page. */
  C.userName = function (id) { if (!id) return ''; if (C.api && id === C.api.me.id) return 'you'; var u = C.user(id); return u ? u.name : 'VKRI'; };
  C.payer = function (id) { return (C.w.payers || []).filter(function (p) { return p.id === id; })[0] || null; };
  C.vendorName = function (id) { var v = id && C.api.get('vendors', id); return v ? v.name : ''; };
  C.safeUrl = ui.safeUrl;
  /* The couple's home city, for "your time" labels (the time zone's own city name can be a different one). */
  C.homeCity = function () { return String(C.w.home_city || '').split(',')[0] || fmt.tzCity(C.w.home_tz); };
  /* What the planners are working on, as far as it is published to the couple. */
  C.workHtml = function (limit) {
    var subs = {}; C.api.list('subphases').forEach(function (s) { subs[s.id] = s; });
    var tasks = C.api.list('tasks').filter(function (t) { return t.status !== 'done'; }).sort(function (a, b) { return a.due < b.due ? -1 : 1; });
    if (!tasks.length) return '';
    var shown = limit ? tasks.slice(0, limit) : tasks;
    return '<section class="panel" data-tour="work"><div class="panel-head"><h2 class="display d-sm">What we are working on</h2><span class="xs muted">' + tasks.length + ' open</span></div><ul class="list">' +
      shown.map(function (t) {
        var owner = C.user(t.assignee_id), sp = subs[t.subphase_id];
        return '<li class="work-row">' + ui.avatar(owner) + '<span class="col gap-1 grow"><span class="small strong">' + esc(t.title) + '</span><span class="xs muted">' + esc(owner ? owner.name.split(' ')[0] : 'VKRI') +
          (sp ? ' · ' + esc(sp.name) : '') + ' · by ' + fmt.date(t.due) + '</span></span>' + ui.pill('task', t.status, t.status === 'client' ? 'With you' : null) + '</li>';
      }).join('') + '</ul>' + (limit && tasks.length > limit ? '<div class="panel-pad"><a class="link small" href="#/updates">See all ' + tasks.length + '</a></div>' : '') + '</section>';
  };
  /* Notes the planners wrote for the couple (internal notes never reach this page). */
  C.notesHtml = function (limit) {
    var subs = {}; C.api.list('subphases').forEach(function (s) { subs[s.id] = s; });
    var phases = {}; C.api.list('phases').forEach(function (p) { phases[p.id] = p; });
    var notes = C.api.list('comments').sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    if (!notes.length) return '';
    var shown = limit ? notes.slice(0, limit) : notes;
    return '<section class="panel" data-tour="notes"><div class="panel-head"><h2 class="display d-sm">Notes from your planners</h2><span class="xs muted">' + notes.length + '</span></div><ul class="list">' +
      shown.map(function (c) {
        var who = C.user(c.author_id), about = c.parent_type === 'subphase' && subs[c.parent_id] ? subs[c.parent_id].name : c.parent_type === 'phase' && phases[c.parent_id] ? phases[c.parent_id].name : '';
        return '<li class="work-row">' + ui.avatar(who) + '<span class="col gap-1 grow"><span class="xs muted">' + esc(who ? who.name : 'VKRI') + (about ? ' · ' + esc(about) : '') + ' · ' + fmt.dateTimeIn(c.at, C.w.home_tz) + '</span>' +
          '<span class="small">' + esc(c.body) + '</span></span></li>';
      }).join('') + '</ul>' + (limit && notes.length > limit ? '<div class="panel-pad"><a class="link small" href="#/updates">Read all ' + notes.length + '</a></div>' : '') + '</section>';
  };
  C.empty = function (text) { return '<div class="panel empty">' + esc(text) + '</div>'; };

  function shell(parts) {
    var here = parts[0] || 'home', n = C.needs().length, w = C.w;
    function link(item, cls) {
      return '<a class="' + (here === item[0] ? 'on' : '') + ' ' + (cls || '') + '" href="#/' + item[0] + '">' + ui.icon(item[2]) + '<span>' + item[1] + '</span>' +
        (item[0] === 'decisions' && n ? '<span class="count">' + n + '</span>' : '') + '</a>';
    }
    var more = ['documents', 'weekend', 'updates'].indexOf(here) > -1;
    return (VKRI.api.isPreview() ? '<div class="preview">Preview: this is what ' + esc(w.short) + ' see. Read-only: nothing you tap here is saved.</div>' : '') +
      '<div class="capp" data-wedding="' + w.id + '">' +
      '<aside class="crail"><div class="brand-row"><a class="brand" href="#/home" aria-label="VKRI, back to your home page">VKRI</a>' + ui.navHtml() + '</div><nav>' + NAV.map(function (i) { return link(i); }).join('') + '</nav>' +
      '<div class="who">' + ui.avatar(C.api.me, 'lg') + '<span>' + esc(C.api.me.name) + '<br><a class="xs muted" href="../index.html">Sign out</a></span></div></aside>' +
      '<div><header class="ctop"><a class="brand" href="#/home">VKRI</a><span class="row gap-2">' + ui.navHtml() + '<a class="me-link" href="#/more" aria-label="Your account and more pages">' + ui.avatar(C.api.me) + '</a></span></header>' +
      '<main class="cmain">' + (C.screens[here] ? C.screens[here](parts.slice(1)) : C.soon(here)) + ui.demoFlag() + '</main></div>' +
      '<nav class="ctabs">' + NAV.slice(0, 4).map(function (i) { return link(i); }).join('') +
      '<a class="' + (more ? 'on' : '') + '" href="#/more">' + ui.icon('more') + '<span>More</span></a></nav></div>';
  }

  /* ---------- Home ---------- */
  C.screens.home = function () {
    var w = C.w, api = C.api, b = api.budget(w.id), holds = api.holds(w.id), lead = C.lead(), needs = C.needs();
    var days = fmt.daysUntil(w.wedding_day);
    var letter = api.list('weekly_recaps').sort(function (a, b2) { return a.week_of < b2.week_of ? 1 : -1; })[0];
    var next = b.next_payment, payer = next && (w.payers || []).filter(function (p) { return p.id === next.payer_id; })[0];
    var nowHere = fmt.timeIn(VKRI.now().toISOString(), w.home_tz), nowThere = fmt.timeIn(VKRI.now().toISOString(), lead.tz);
    var note = (w.local_notes || [])[0];

    var hero = '<section class="hero"><div class="col gap-2"><span class="eyebrow">' + esc(w.destination) + ' · ' + fmt.range(w.start_date, w.end_date) + '</span>' +
      '<h1 class="display d-lg">' + esc(w.partner_1.split(' ')[0]) + ' <em>&amp;</em> ' + esc(w.partner_2.split(' ')[0]) + '</h1>' +
      '<p class="soft">' + esc(w.venue.name) + ', ' + esc(w.venue.town) + '</p></div>' +
      '<div class="row gap-3" style="align-items:flex-end"><span class="count">' + days + '</span><span class="small soft" style="padding-bottom:8px">days until<br>' + fmt.dateLong(w.wedding_day) + '</span></div></section>';

    var needsHtml = '<section class="col gap-3" data-tour="needs"><div class="sec-head"><h2 class="display d-md">Needs you</h2><span class="small muted">' +
      (needs.length ? fmt.plural(needs.length, 'item') + '. Everything else waits until it is needed.' : '') + '</span></div>' +
      (needs.length ? '<div class="needs">' + needs.map(function (n) { return C.needCard(n); }).join('') + '</div>'
        : '<div class="panel empty">Nothing needs you today. We will tell you here when something does.</div>') + '</section>';

    var budget = '<section class="panel panel-pad col gap-4"><div class="sec-head"><h2 class="display d-sm">Your budget</h2><a class="link small" href="#/budget">Full picture</a></div>' +
      '<div class="budget-box">' + ui.ring(fmt.pct(b.forecast, b.envelope), { label: fmt.eurK(b.forecast), sub: 'of ' + fmt.eurK(b.envelope), over: b.over }) +
      '<div class="col gap-2"><p class="small">' + (b.over ? 'The forecast is <span class="strong tone-crit">' + fmt.eur(-b.remaining) + ' over</span> your envelope.'
        : 'The forecast is inside your envelope by <span class="strong">' + fmt.eur(b.remaining) + '</span>.') +
      ' It already counts ' + fmt.plural(b.still_to_book, 'item') + ' still to book' + (b.pending_changes ? ' and ' + fmt.eur(b.pending_changes) + ' of changes waiting for you' : '') + '.</p>' +
      '<p class="small muted">Paid so far: <span class="num">' + fmt.eur(b.paid) + '</span></p></div></div>' +
      (next ? '<hr class="rule"><div class="row between gap-3"><div class="col gap-1"><span class="eyebrow">' + (next.status === 'overdue' ? 'Payment overdue' : 'Next payment') + '</span><span class="small strong">' + esc(next.covers) + '</span>' +
        '<span class="xs ' + (next.status === 'overdue' ? 'tone-crit' : 'muted') + '">Due ' + fmt.date(next.due) + ' · ' + fmt.due(next.due).text + (payer ? ' · payer: ' + esc(payer.name) : '') + '</span></div>' +
        '<span class="display d-sm num">' + fmt.eur(next.amount_eur) + '</span></div>' : '') + '</section>';

    var hands = '<section class="panel" data-tour="hands"><div class="hands"><div><div class="n">' + holds.ours + '</div><div class="small muted">in our hands</div></div>' +
      '<div><div class="n" style="color:var(--wed)">' + holds.yours + '</div><div class="small muted">in yours</div></div></div></section>';

    var letterHtml = letter ? '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Friday letter</h2><span class="xs muted">' + fmt.dateY(letter.week_of) + ' · ' + esc(C.user(letter.author_id).name) + '</span></div>' +
      '<p class="eyebrow">Handled this week</p><ul class="letter col gap-2">' + letter.done.slice(0, 4).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      (letter.budget_note ? '<p class="small soft italic">' + esc(letter.budget_note) + '</p>' : '') +
      '<a class="link small" href="#/updates">Read the whole letter</a></section>' : '';

    var team = '<section class="panel panel-pad col gap-3"><div class="row gap-3">' + ui.avatar(lead, 'lg') + '<div class="col gap-1"><span class="strong">' + esc(lead.name) + '</span>' +
      '<span class="small muted">' + esc(lead.title) + ', your lead planner</span></div></div>' +
      '<p class="small soft">We reply within ' + VKRI.AGENCY.reply_promise_hours + ' hours, in writing. It is ' + nowThere + ' in ' + esc(lead.based) + ' and ' + nowHere + ' for you in ' + esc(C.homeCity()) + '.</p>' +
      '<button class="btn block" data-act="ask">Ask the team a question</button></section>';

    var local = note ? '<section class="panel panel-pad col gap-2"><span class="eyebrow">Good to know</span><p class="strong small">' + esc(note.title) + '</p><p class="small soft">' + esc(note.text) + '</p></section>' : '';

    return hero + needsHtml + '<div class="home-grid"><div class="col gap-5">' + budget + C.workHtml(5) + letterHtml + '</div><div class="col gap-5">' + hands + team + C.notesHtml(2) + quickLinks() + local + '</div></div>';
  };

  /* One line of context per page reached through More, so Home links to them with a reason to go. */
  function moreLines() {
    var api = C.api, ev = api.list('events'), days = {};
    ev.forEach(function (e) { days[e.day] = 1; });
    var docs = api.list('documents').length, waiting = api.list('messages').filter(function (m) { return !m.answered_at; }).length;
    var letters = api.list('weekly_recaps').length;
    return {
      weekend: ev.length ? fmt.plural(ev.length, 'event') + ' over ' + fmt.plural(Object.keys(days).length, 'day') : 'Your programme appears here once it is drafted',
      documents: docs ? fmt.plural(docs, 'document') + ' and links, your scope and privacy' : 'Contracts, designs and links in one place',
      updates: fmt.plural(letters, 'Friday letter') + (waiting ? ' · ' + fmt.plural(waiting, 'question') + ' with the team' : ' · every question answered')
    };
  }
  function moreList() {
    var lines = moreLines();
    return '<nav class="panel list quick" aria-label="More pages">' + NAV.slice(4).map(function (i) {
      return '<a href="#/' + i[0] + '"><span class="qi">' + ui.icon(i[2]) + '</span><span class="col gap-1 grow"><span class="strong">' + i[1] + '</span>' +
        '<span class="xs muted">' + esc(lines[i[0]]) + '</span></span>' + ui.icon('chevron') + '</a>';
    }).join('') + '</nav>';
  }
  function quickLinks() { return moreList(); }

  C.screens.more = function () {
    return C.head(C.w.destination, 'More', '') + moreList() +
      '<div class="panel panel-pad row between gap-3"><span class="row gap-3">' + ui.avatar(C.api.me, 'lg') + '<span class="strong">' + esc(C.api.me.name) + '</span></span><a class="btn sm" href="../index.html">Sign out</a></div>';
  };

  /* ---------- decision and change sheets (used from Home and from Decisions) ---------- */
  C.actions.openDecision = function (el) {
    var d = C.api.get('decisions', el.getAttribute('data-id'));
    ui.sheet('<span class="eyebrow">' + (d.kind === 'proof' ? 'Proof to approve' : 'Decision') + '</span><h3 class="display d-md">' + esc(d.title) + '</h3>' +
      (d.status === 'open' ? C.dueLine(d.deadline) : ui.pill('decision', d.status)) +
      (d.why_now ? '<p class="small soft"><span class="strong">Why now: </span>' + esc(d.why_now) + '</p>' : '') +
      '<div class="col gap-3">' + d.options.map(function (o) {
        var rec = o.id === d.recommended_option_id, chosen = o.id === d.chosen_option_id;
        return '<div class="opt ' + (rec ? 'rec' : '') + '"><div class="row between wrap gap-2"><span class="strong">' + esc(o.name) + '</span>' +
          (chosen ? '<span class="pill good">Your choice</span>' : rec ? '<span class="pill wed plain">We recommend</span>' : '') + '</div>' +
          (o.price_eur != null ? '<div class="price">' + fmt.eur(o.price_eur) + ' <span class="xs muted" style="font-family:var(--body)">all-in · about ' + fmt.usd(o.price_eur, C.w.fx_today) + '</span></div>' : '') +
          (o.includes ? '<p class="small soft">' + esc(o.includes) + '</p>' : '') +
          (o.vendor ? '<p class="xs muted">' + esc(o.vendor) + ' · ' + esc(o.relationship) + '</p>' : '') +
          (o.brief_ref ? '<p class="xs" style="color:var(--wed)">Your brief: ' + esc(o.brief_ref) + '</p>' : '') +
          (d.status === 'open' ? '<button class="btn ' + (rec ? 'accent' : '') + '" data-act="decide" data-id="' + d.id + '" data-option="' + o.id + '">' + (d.kind === 'proof' ? esc(o.name) : 'Choose this') + '</button>' : '') + '</div>';
      }).join('') + '</div>' +
      (d.recommendation_reason ? '<p class="small soft italic">' + esc(d.recommendation_reason) + '</p>' : '') +
      (d.status === 'open' && d.delegable ? '<button class="btn ghost" data-act="decide" data-id="' + d.id + '" data-option="delegate">Decide for us</button>' : ''));
  };
  C.actions.decide = function (el) {
    var option = el.getAttribute('data-option');
    if (!el.hasAttribute('data-armed')) { // first tap asks, second tap commits: a choice cannot be undone from the portal
      var sheet = el.closest('.sheet');
      if (sheet) sheet.querySelectorAll('[data-armed]').forEach(function (b) { b.removeAttribute('data-armed'); b.textContent = b.getAttribute('data-label'); });
      el.setAttribute('data-label', el.textContent); el.setAttribute('data-armed', '1');
      el.textContent = option === 'delegate' ? 'Confirm: leave this to VKRI' : 'Tap again to confirm';
      return;
    }
    C.api.decide(el.getAttribute('data-id'), option);
    ui.closeSheet(); C.render(); ui.toast(option === 'delegate' ? 'Left with us. We will tell you what we chose.' : 'Saved. Your planner has been told.');
  };
  C.actions.openChange = function (el) {
    var c = C.api.get('change_orders', el.getAttribute('data-id')), b = C.api.budget(C.w.id);
    var after = b.forecast, without = b.forecast - c.delta_eur;
    ui.sheet('<span class="eyebrow">Change to approve</span><h3 class="display d-md">' + esc(c.title) + '</h3>' +
      '<div class="opt rec"><div class="price">' + fmt.eur(c.delta_eur, true) + ' <span class="xs muted" style="font-family:var(--body)">about ' + fmt.usd(c.delta_eur, C.w.fx_today) + '</span></div><p class="small soft">' + esc(c.reason) + '</p></div>' +
      (c.alternatives ? '<p class="small"><span class="strong">Alternative: </span>' + esc(c.alternatives) + '</p>' : '') +
      '<dl class="kv"><dt>If approved</dt><dd class="num">Forecast ' + fmt.eur(after) + ' of ' + fmt.eur(b.envelope) + '</dd><dt>If declined</dt><dd class="num">Forecast ' + fmt.eur(without) + '</dd></dl>' +
      '<p class="xs muted">Proposed by ' + esc(C.user(c.proposed_by).name) + ', ' + fmt.ago(c.proposed_at) + '. Nothing is ordered until you approve.</p>' +
      (c.status === 'pending' && c.open_decision_id ? '<p class="small soft">This change is part of a decision with more than one option. Choose there and this settles itself.</p><button class="btn accent" data-act="openDecision" data-id="' + esc(c.open_decision_id) + '">Open the decision</button>'
        : c.status === 'pending' ? '<div class="row gap-3"><button class="btn accent grow" data-act="change" data-id="' + c.id + '" data-approve="1">Approve</button><button class="btn grow" data-act="change" data-id="' + c.id + '" data-approve="">Decline</button></div>' : ui.pill('change', c.status)));
  };
  C.actions.change = function (el) {
    var ok = !!el.getAttribute('data-approve');
    C.api.respondChangeOrder(el.getAttribute('data-id'), ok);
    ui.closeSheet(); C.render(); ui.toast(ok ? 'Approved. Your forecast is updated.' : 'Declined. Nothing changes.');
  };
  C.actions.ask = function () {
    var lead = C.lead();
    ui.sheet('<span class="eyebrow">Ask the team</span><h3 class="display d-md">What would you like to know?</h3>' +
      '<form class="col gap-3" data-form="ask"><label class="field"><span>Subject</span><input class="input" id="ask-subject" name="subject" required placeholder="For example: parking at the villa"></label>' +
      '<label class="field"><span>Your question</span><textarea class="textarea" id="ask-body" name="body" required></textarea></label>' +
      '<p class="xs muted">' + esc(lead.name) + ' and the team answer in writing within ' + VKRI.AGENCY.reply_promise_hours + ' hours. No call needed.</p>' +
      '<button class="btn accent" type="submit">Send</button></form>');
  };
  C.forms.ask = function (f) {
    var subject = f.elements.subject.value.trim(), body = f.elements.body.value.trim();
    if (!subject || !body) return;
    C.api.ask(subject, body);
    ui.closeSheet(); C.render(); ui.toast('Sent. You will have an answer within ' + VKRI.AGENCY.reply_promise_hours + ' hours.');
  };
  /* Every handler runs through here: in the read-only preview the API refuses changes and we say so. */
  function run(fn, a, b) {
    try { fn(a, b); }
    catch (err) { if (err && err.preview) { ui.closeSheet(); ui.toast(err.message); } else { ui.toast(err && err.message ? err.message : 'That did not work'); throw err; } }
  }
  document.addEventListener('submit', function (e) {
    var fn = C.forms[e.target.getAttribute('data-form')];
    if (!fn) return;
    e.preventDefault();
    run(fn, e.target, e);
  });

  /* ---------- boot ---------- */
  var lastHash = null, pressing = false;
  C.render = function () {
    C.api = VKRI.api.current();
    if (!C.api || C.api.isPlanner) { location.href = '../index.html'; return; }
    C.w = C.api.get('weddings', C.api.me.wedding_id);
    C.stale = false;
    var same = lastHash === location.hash, keep = same ? window.scrollY : 0, app = document.getElementById('app');
    var restore = same ? ui.keepFields(app) : null; // typed text, the focused field and the caret survive a re-render
    lastHash = location.hash;
    app.innerHTML = shell(C.parts());
    if (restore) restore();
    window.scrollTo(0, keep);
    if (VKRI.tour) VKRI.tour.refresh();
  };
  /* Changes from other devices re-render the screen, but never between a press and its click, and never behind an open sheet. */
  function onData() {
    if (pressing || ui.sheetOpen()) { C.stale = true; return; }
    C.render();
  }
  function catchUp() { if (C.stale && !pressing && !ui.sheetOpen()) C.render(); }
  document.addEventListener('DOMContentLoaded', function () {
    ui.navInit();
    ui.on(document, 'click', '[data-act]', function (el, e) { var fn = C.actions[el.getAttribute('data-act')]; if (fn) run(fn, el, e); });
    ui.on(document, 'change', '[data-change]', function (el, e) { var fn = C.changes[el.getAttribute('data-change')]; if (fn) run(fn, el, e); });
    ui.on(document, 'input', '[data-input]', function (el, e) { var fn = C.inputs[el.getAttribute('data-input')]; if (fn) run(fn, el, e); });
    window.addEventListener('hashchange', function () { ui.closeSheet(); C.render(); });
    VKRI.api.onChange(onData);
    document.addEventListener('pointerdown', function () { pressing = true; }, true);
    ['pointerup', 'pointercancel'].forEach(function (t) { document.addEventListener(t, function () { pressing = false; setTimeout(catchUp, 120); }, true); });
    document.addEventListener('click', function () { setTimeout(catchUp, 0); }); // also right after a sheet closes
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ui.sheetOpen()) { ui.closeSheet(); catchUp(); } });
    C.render();
    if (VKRI.tour) VKRI.tour.resume();
  });
})();
