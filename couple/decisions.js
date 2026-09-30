/* Couple portal: Decisions (#/decisions).
   Three groups: Needs you (open decisions, at most three by design, plus pending changes),
   Coming up (queued: locked until their release date, not actionable), Decided (decided or left to VKRI).
   Cards open the decision and change sheets defined in couple.js. */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;

  function optionOf(d, id) { return (d.options || []).filter(function (o) { return o.id === id; })[0] || null; }
  function price(o) { return o && o.price_eur != null ? fmt.eur(o.price_eur) : ''; }

  /* Extra line on an open decision: how many options and which one we recommend. */
  function openDetail(d) {
    var rec = optionOf(d, d.recommended_option_id), n = (d.options || []).length;
    var bits = [];
    if (d.kind === 'proof') bits.push('A proof to check. Nothing goes to print without your approval.');
    else bits.push(fmt.plural(n, 'option') + (rec ? ' · our recommendation: ' + rec.name + (rec.price_eur != null ? ', ' + fmt.eur(rec.price_eur) : '') : ''));
    if (d.delegable) bits.push('You can leave this one to us');
    return '<span class="xs muted">' + bits.map(esc).join('<br>') + '</span>';
  }

  function queuedCard(d) {
    return '<div class="dq locked"><span class="row gap-2 xs muted">' + ui.icon('lock') + '<span>Opens ' + fmt.dow(d.release_date) + ' ' + fmt.date(d.release_date) +
      ' · decide by ' + fmt.dow(d.deadline) + ' ' + fmt.date(d.deadline) + '</span></span>' +
      '<span class="strong">' + esc(d.title) + '</span>' + (d.why_now ? '<span class="small muted">' + esc(d.why_now) + '</span>' : '') +
      '<span class="xs muted">' + fmt.plural((d.options || []).length, 'option') + ' prepared. We send it when it is needed, not before.</span></div>';
  }

  function decidedCard(d) {
    var o = optionOf(d, d.chosen_option_id), who = C.userName(d.decided_by);
    var what = d.status === 'delegated' ? 'You asked us to choose.' : (o ? o.name : 'Chosen');
    return '<button class="dq done" data-act="openDecision" data-id="' + esc(d.id) + '">' +
      '<span class="row between gap-2" style="align-items:flex-start"><span class="strong">' + esc(d.title) + '</span>' + ui.pill('decision', d.status) + '</span>' +
      '<span class="small">' + (d.status === 'delegated' ? esc(what) : '<span class="soft">Your choice: </span>' + esc(what)) + '</span>' +
      '<span class="row between gap-2 xs muted"><span>' + (d.decided_at ? fmt.dateY(d.decided_at.slice(0, 10)) : '') + (who ? ' · by ' + esc(who) : '') + '</span>' +
      (o && o.price_eur != null ? '<span class="num strong" style="color:var(--ink)">' + price(o) + '</span>' : '') + '</span></button>';
  }

  C.screens.decisions = function () {
    var all = C.api.list('decisions'), needs = C.needs();
    var byId = {}; all.forEach(function (d) { byId[d.id] = d; });
    var queued = all.filter(function (d) { return d.status === 'queued'; }).sort(function (a, b) { return a.release_date < b.release_date ? -1 : 1; });
    var done = all.filter(function (d) { return d.status === 'decided' || d.status === 'delegated'; })
      .sort(function (a, b) { return (a.decided_at || '') < (b.decided_at || '') ? 1 : -1; });
    var openCount = needs.filter(function (n) { return n.kind === 'decision'; }).length;

    var head = C.head('Decisions', 'What we need from you', 'We send you at most three decisions at a time, each with a date, a reason it is needed now and our recommendation. The rest wait until they are needed.');

    var needsHtml = '<section class="col gap-3"><div class="sec-head"><h2 class="display d-md">Needs you</h2><span class="small muted">' +
      (needs.length ? fmt.plural(openCount, 'decision') + (needs.length > openCount ? ' and ' + fmt.plural(needs.length - openCount, 'change') + ' to approve' : '') : '') + '</span></div>' +
      (needs.length ? '<div class="needs">' + needs.map(function (n) {
        return C.needCard(n, n.kind === 'decision' && byId[n.id] ? openDetail(byId[n.id]) : '<span class="xs muted">Nothing is ordered until you approve.</span>');
      }).join('') + '</div>' : C.empty('Nothing needs you right now. The next decision appears here on its release date.')) + '</section>';

    var queuedHtml = '<section class="col gap-3"><div class="sec-head"><h2 class="display d-sm">Coming up</h2><span class="small muted">' + (queued.length ? fmt.plural(queued.length, 'decision') + ', locked until their date' : '') + '</span></div>' +
      (queued.length ? '<div class="dq-grid">' + queued.map(queuedCard).join('') + '</div>' : C.empty('Nothing else is queued. We will tell you if that changes.')) + '</section>';

    var doneHtml = '<section class="col gap-3"><div class="sec-head"><h2 class="display d-sm">Decided</h2><span class="small muted">' + (done.length ? fmt.plural(done.length, 'decision') + ', newest first' : '') + '</span></div>' +
      (done.length ? '<div class="dq-grid">' + done.map(decidedCard).join('') + '</div>' : C.empty('Your decisions will be kept here, with what you chose and when.')) + '</section>';

    return head + needsHtml + queuedHtml + doneHtml;
  };
})();
