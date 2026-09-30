/* Planner CRM: Inbox (all weddings), the wedding Client log tab, and Friday letters. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var CH = { whatsapp: 'WhatsApp', email: 'Email', call: 'Call', portal: 'Portal' };

  function sla(m) {
    if (m.answered_at) {
      var took = fmt.hoursBetween(m.received_at, m.answered_at), late = m.answered_at > m.due_by;
      return '<span class="pill ' + (late ? 'crit' : 'good') + '">Answered in ' + fmt.dur(took) + '</span>';
    }
    var left = P.slaLeft(m);
    return left < 0 ? '<span class="pill crit">' + fmt.dur(-left) + ' past the promise</span>' : '<span class="pill ' + (left < 6 ? 'warn' : 'info') + '">' + fmt.dur(left) + ' left to reply</span>';
  }
  function message(m, w, withWedding) {
    var owner = m.owner_id && P.user(m.owner_id), tz = w.home_tz;
    return '<div class="msg" data-wedding="' + w.id + '"><div class="row between wrap gap-2"><span class="row gap-2 wrap">' + (withWedding ? '<span class="pill wed plain">' + esc(w.title) + '</span>' : '') +
      '<span class="tag">' + CH[m.channel] + '</span><span class="strong">' + esc(m.subject) + '</span></span>' + sla(m) + '</div>' +
      '<p class="small soft">' + esc(m.body) + '</p>' +
      '<div class="trail"><span>Received ' + fmt.dateTimeIn(m.received_at, 'Europe/Rome') + ' (' + fmt.timeIn(m.received_at, tz) + ' for them)</span>' +
      '<span>' + (m.acknowledged_at ? 'Acknowledged after ' + fmt.dur(fmt.hoursBetween(m.received_at, m.acknowledged_at)) : 'Not acknowledged') + '</span>' +
      (owner ? '<span class="row gap-1">' + ui.avatar(owner) + esc(owner.name) + '</span>' : '<span>No owner yet</span>') + '</div>' +
      (m.internal_notes ? '<p class="xs"><span class="tag internal">Internal</span> ' + esc(m.internal_notes) + '</p>' : '') +
      (m.answered_at ? '<p class="answer">' + esc(m.answer) + '<br><span class="xs muted">' + esc(P.user(m.answered_by).name) + ' · ' + fmt.dateTimeIn(m.answered_at, 'Europe/Rome') + '</span></p>'
        : '<form class="col gap-2" data-form="answer" data-id="' + m.id + '"><textarea class="textarea" id="ans-' + m.id + '" name="text" placeholder="Write the reply the couple will read" aria-label="Reply" style="min-height:72px"></textarea>' +
          '<div class="row gap-2 wrap">' + (m.acknowledged_at ? '' : '<button class="btn sm" type="button" data-act="ack" data-id="' + m.id + '">Acknowledge</button>') + '<button class="btn primary sm" type="submit">Send reply</button></div></form>') + '</div>';
  }
  function letter(r, w) {
    function ul(title, items) { return items.length ? '<div><p class="eyebrow">' + title + '</p><ul class="plain-list">' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' : ''; }
    return '<div class="msg" data-wedding="' + w.id + '"><div class="row between wrap gap-2"><span class="strong">Friday letter, ' + fmt.dateY(r.week_of) + '</span>' +
      (r.status === 'sent' ? '<span class="pill good">Sent ' + fmt.dateTimeIn(r.sent_at, 'Europe/Rome') + '</span>' : '<span class="row gap-2"><span class="pill warn">Draft</span><button class="btn primary sm" data-act="sendRecap" data-id="' + r.id + '">Send to the couple</button></span>') + '</div>' +
      '<div class="two" style="gap:var(--s4)">' + ul('Done', r.done.map(esc)) + ul('In motion', r.in_motion.map(esc)) +
      ul('Waiting on', r.waiting_on.map(function (x) { return esc(x.item) + ' <span class="muted">· ' + esc(x.who) + ', since ' + fmt.date(x.since) + '</span>'; })) +
      ul('Needs the couple', r.needs_you.map(function (x) { return esc(x.text) + ' <span class="muted">· by ' + fmt.date(x.due) + '</span>'; })) + '</div>' +
      (r.budget_note ? '<p class="small soft italic">' + esc(r.budget_note) + '</p>' : '') +
      (r.note ? '<p class="small"><span class="tag">Note</span> ' + esc(r.note) + '</p>' : '') + '</div>';
  }

  /* Wedding tab: every exchange with the couple, plus the letters. */
  P.tabs.log = function (w) {
    var msgs = P.api.list('messages', { wedding_id: w.id }).sort(function (a, b) { return a.received_at < b.received_at ? 1 : -1; });
    var letters = P.api.list('weekly_recaps', { wedding_id: w.id }).sort(function (a, b) { return a.week_of < b.week_of ? 1 : -1; });
    var answered = msgs.filter(function (m) { return m.answered_at; }), inTime = answered.filter(function (m) { return m.answered_at <= m.due_by; }).length;
    var avg = answered.length ? answered.reduce(function (s, m) { return s + fmt.hoursBetween(m.received_at, m.answered_at); }, 0) / answered.length : 0;
    return P.waitingOnCouple(w) + '<div class="panel stats"><div class="stat"><div class="n">' + (msgs.length - answered.length) + '</div><div class="l">waiting for a reply</div></div>' +
      '<div class="stat"><div class="n">' + (answered.length ? fmt.pct(inTime, answered.length) + '%' : '–') + '</div><div class="l">answered within the ' + VKRI.AGENCY.reply_promise_hours + 'h promise</div></div>' +
      '<div class="stat"><div class="n">' + (answered.length ? fmt.dur(avg) : '–') + '</div><div class="l">average time to answer</div></div>' +
      '<div class="stat"><div class="n">' + letters.filter(function (r) { return r.status === 'sent'; }).length + '</div><div class="l">Friday letters sent</div></div></div>' +
      '<div class="two"><section class="panel"><div class="panel-head"><h3 class="strong">Questions from the couple</h3></div><div class="list">' + (msgs.length ? msgs.map(function (m) { return message(m, w); }).join('') : '<div class="empty">No questions yet.</div>') + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h3 class="strong">Friday letters</h3></div><div class="list">' + (letters.length ? letters.map(function (r) { return letter(r, w); }).join('') : '<div class="empty">No letters yet.</div>') + '</div></section></div>';
  };

  /* Screen: everything that waits for a planner, across weddings. */
  P.screens.inbox = function () {
    var ws = {}; P.weddings().forEach(function (w) { ws[w.id] = w; });
    var open = P.api.list('messages').filter(function (m) { return !m.answered_at; }).sort(function (a, b) { return a.due_by < b.due_by ? -1 : 1; });
    var drafts = P.api.list('weekly_recaps').filter(function (r) { return r.status === 'draft'; });
    var recent = P.api.list('messages').filter(function (m) { return m.answered_at; }).sort(function (a, b) { return a.answered_at < b.answered_at ? 1 : -1; }).slice(0, 6);
    var late = open.filter(function (m) { return P.slaLeft(m) < 0; }).length;
    return '<div class="page-head"><div class="col gap-2"><span class="eyebrow">We reply within ' + VKRI.AGENCY.reply_promise_hours + ' hours, in writing</span><h1 class="display d-lg">Inbox</h1></div>' +
      (late ? '<span class="pill crit">' + fmt.plural(late, 'reply', 'replies') + ' past the promise</span>' : '<span class="pill good">Every promise kept so far</span>') + '</div>' +
      '<div class="two"><div class="col gap-5"><section class="panel" data-tour="waiting"><div class="panel-head"><h3 class="strong">Waiting for a reply</h3><span class="xs muted">' + open.length + '</span></div><div class="list">' +
      (open.length ? open.map(function (m) { return message(m, ws[m.wedding_id], true); }).join('') : '<div class="empty">Nothing is waiting.</div>') + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h3 class="strong">Recently answered</h3></div><div class="list">' + recent.map(function (m) {
        return '<a class="deadline" data-wedding="' + m.wedding_id + '" style="grid-template-columns:12px minmax(0,1fr) auto" href="#/w/' + m.wedding_id + '/log"><span class="dot"></span><span class="truncate">' + esc(m.subject) + ' <span class="muted">· ' + esc(ws[m.wedding_id].title) + '</span></span>' + sla(m) + '</a>';
      }).join('') + '</div></section></div>' +
      '<section class="panel"><div class="panel-head"><h3 class="strong">Friday letters to send</h3><span class="xs muted">' + drafts.length + ' draft' + (drafts.length === 1 ? '' : 's') + '</span></div><div class="list">' +
      (drafts.length ? drafts.map(function (r) { return '<div><div class="panel-pad" style="padding-bottom:0"><span class="pill wed plain" data-wedding="' + r.wedding_id + '">' + esc(ws[r.wedding_id].title) + '</span></div>' + letter(r, ws[r.wedding_id]) + '</div>'; }).join('') : '<div class="empty">Every letter for this week has gone out.</div>') + '</div></section></div>';
  };

  P.actions.ack = function (el) { P.api.acknowledgeMessage(el.getAttribute('data-id')); P.render(); ui.toast('Acknowledged. The couple sees that it is with you.'); };
  P.actions.sendRecap = function (el) { P.api.sendRecap(el.getAttribute('data-id')); P.render(); ui.toast('Friday letter sent'); };
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.getAttribute('data-form') !== 'answer') return;
    e.preventDefault();
    var text = f.elements.text.value.trim(); if (!text) return;
    P.api.answerMessage(f.getAttribute('data-id'), text);
    f.elements.text.value = '';
    P.render(); ui.toast('Reply sent');
  });
})();
