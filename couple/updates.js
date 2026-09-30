/* Couple portal: Updates (#/updates). The Friday letters, newest first (Done / In motion / Waiting on / Needs you /
   budget note), and "Your questions": every message with its trail (Received, Acknowledged, Answered) in the
   couple's own time zone, the answer, and the reply promise for anything still open. */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var CHANNEL = { whatsapp: 'WhatsApp', email: 'email', call: 'a call', portal: 'this portal' };
  /* UI state that survives C.render(): which letters are open (the newest is open by default). */
  var S = { open: {} };

  function list(items) { return '<ul class="letter col gap-2">' + items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }

  function letterCard(w, r, isOpen) {
    var author = C.userName(r.author_id), needs = r.needs_you || [], done = r.done || [];
    var summary = fmt.plural(done.length, 'item') + ' done' + (needs.length ? ' · ' + needs.length + ' for you' : ' · nothing for you');
    var body = '';
    if (isOpen) {
      body = '<div class="lbody col gap-4">' +
        (done.length ? '<div class="col gap-2"><span class="eyebrow">Done</span>' + list(done) + '</div>' : '') +
        ((r.in_motion || []).length ? '<div class="col gap-2"><span class="eyebrow">In motion</span>' + list(r.in_motion) + '</div>' : '') +
        ((r.waiting_on || []).length ? '<div class="col gap-2"><span class="eyebrow">Waiting on</span><ul class="lines flat">' + r.waiting_on.map(function (x) {
          return '<li><div class="col gap-1 grow"><span class="small">' + esc(x.item) + '</span><span class="xs muted">' + esc(x.who) + (x.since ? ' · since ' + fmt.date(x.since) + ', ' + fmt.plural(Math.max(0, -fmt.daysUntil(x.since)), 'day') : '') + '</span></div></li>';
        }).join('') + '</ul></div>' : '') +
        '<div class="col gap-2"><span class="eyebrow">Needs you</span>' + (needs.length ? '<ul class="lines flat">' + needs.map(function (x) {
          return '<li><div class="col gap-1 grow"><span class="small strong">' + esc(x.text) + '</span>' + (x.due ? '<span class="xs muted">By ' + fmt.dow(x.due) + ' ' + fmt.date(x.due) + '</span>' : '') + '</div></li>';
        }).join('') + '</ul><a class="link small" href="#/decisions">Go to your decisions</a>' : '<p class="small muted">Nothing this week.</p>') + '</div>' +
        (r.budget_note ? '<p class="small soft italic budget-note">' + esc(r.budget_note) + '</p>' : '') +
        (r.note ? '<p class="small soft">' + esc(r.note) + '</p>' : '') + '</div>';
    }
    return '<article class="panel lcard' + (isOpen ? ' open' : '') + '"><button class="lhead" data-act="toggleLetter" data-id="' + esc(r.id) + '" aria-expanded="' + isOpen + '">' +
      '<span class="col gap-1 grow"><span class="display d-sm">' + fmt.dateLong(r.week_of) + '</span>' +
      '<span class="xs muted">From ' + esc(author || 'the team') + (r.sent_at ? ' · sent ' + fmt.dateTimeIn(r.sent_at, w.home_tz) + ' your time' : '') + '</span>' +
      '<span class="xs soft">' + summary + '</span></span><span class="chev">' + ui.icon('chevron') + '</span></button>' + body + '</article>';
  }

  function trailStep(label, iso, w, on) {
    return '<li class="' + (on ? 'on' : '') + '"><span class="xs strong">' + label + '</span><span class="xs muted num">' + (iso ? fmt.dateTimeIn(iso, w.home_tz) : 'Not yet') + '</span></li>';
  }
  function questionCard(w, m) {
    var owner = m.owner_id ? C.userName(m.owner_id) : '', answeredBy = m.answered_by ? C.userName(m.answered_by) : '';
    var late = !m.answered_at && m.due_by && fmt.hoursBetween(VKRI.now().toISOString(), m.due_by) < 0;
    var pill = m.answered_at ? '<span class="pill good">Answered</span>' : late ? '<span class="pill crit">Reply late</span>' : m.acknowledged_at ? '<span class="pill info">With ' + esc(owner || 'the team') + '</span>' : '<span class="pill warn">Received</span>';
    return '<article class="panel panel-pad col gap-3 q"><div class="row between gap-2" style="align-items:flex-start"><span class="strong small">' + esc(m.subject) + '</span>' + pill + '</div>' +
      '<p class="small soft quote">' + esc(m.body) + '</p>' +
      '<ol class="trail">' + trailStep('Received', m.received_at, w, true) + trailStep('Acknowledged' + (owner && m.acknowledged_at ? ' by ' + esc(owner) : ''), m.acknowledged_at, w, !!m.acknowledged_at) +
      trailStep('Answered' + (answeredBy ? ' by ' + esc(answeredBy) : ''), m.answered_at, w, !!m.answered_at) + '</ol>' +
      (m.answered_at ? '<div class="answer small">' + esc(m.answer) + '</div>'
        : '<p class="small ' + (late ? 'tone-crit' : '') + '">' + (late ? 'Our reply is later than we promised (' + fmt.dateTimeIn(m.due_by, w.home_tz) + '). It is with ' + esc(owner || 'the team') + '.'
          : 'We will reply by ' + fmt.dateTimeIn(m.due_by, w.home_tz) + ', your time.') + '</p>') +
      '<p class="xs muted">Sent through ' + esc(CHANNEL[m.channel] || m.channel || 'the portal') + '</p></article>';
  }

  C.screens.updates = function () {
    var w = C.w, api = C.api;
    var letters = api.list('weekly_recaps').sort(function (a, b) { return a.week_of < b.week_of ? 1 : -1; });
    var msgs = api.list('messages').sort(function (a, b) {
      var ao = a.answered_at ? 1 : 0, bo = b.answered_at ? 1 : 0;
      return ao - bo || (a.received_at < b.received_at ? 1 : -1);
    });
    var waiting = msgs.filter(function (m) { return !m.answered_at; }).length;
    var head = C.head('Updates', 'Letters and questions', 'A written account every Friday of what we did, what is moving and what waits on whom. Times are ' + esc(C.homeCity()) + ' time.',
      '<button class="btn accent" data-act="ask">Ask the team</button>');
    var lettersHtml = '<section class="col gap-3"><div class="sec-head"><h2 class="display d-md">Friday letters</h2><span class="small muted">' + (letters.length ? fmt.plural(letters.length, 'letter') + ', newest first' : '') + '</span></div>' +
      (letters.length ? letters.map(function (r, i) {
        var isOpen = S.open[r.id] !== undefined ? S.open[r.id] : i === 0;
        return letterCard(w, r, isOpen);
      }).join('') : C.empty('Your first Friday letter arrives at the end of this week.')) + '</section>';
    var qHtml = '<section class="col gap-3"><div class="sec-head"><h2 class="display d-md">Your questions</h2><span class="small muted">' +
      (msgs.length ? (waiting ? waiting + ' open · ' : '') + 'answered within ' + VKRI.AGENCY.reply_promise_hours + ' hours, in writing' : '') + '</span></div>' +
      (msgs.length ? msgs.map(function (m) { return questionCard(w, m); }).join('') : C.empty('Nothing asked yet. Questions you send appear here with their answers.')) +
      '<button class="btn block" data-act="ask">Ask the team a question</button></section>';
    return head + '<div class="ugrid" data-tour="updates">' + lettersHtml + qHtml + '</div>' + '<div class="ugrid">' + C.notesHtml() + C.workHtml() + '</div>';
  };

  C.actions.toggleLetter = function (el) {
    var id = el.getAttribute('data-id');
    S.open[id] = el.getAttribute('aria-expanded') !== 'true';
    C.render();
  };
})();
