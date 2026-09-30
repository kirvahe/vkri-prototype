/* Planner CRM: Portfolio (all weddings at a glance, agency pulse, the next 14 days). */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;

  function card(w) {
    var b = P.api.budget(w.id), subs = P.api.list('subphases', { wedding_id: w.id }), holds = P.api.holds(w.id), h = P.api.headcount(w.id);
    var tasks = P.api.list('tasks', { wedding_id: w.id });
    var late = tasks.filter(function (t) { return t.status !== 'done' && fmt.daysUntil(t.due) < 0; }).length;
    var blocked = subs.filter(function (s) { return s.status === 'blocked'; }).length;
    var current = subs.filter(function (s) { return s.status !== 'done' && s.status !== 'not_started'; })[0] || subs[subs.length - 1];
    return '<a class="panel wcard" data-wedding="' + w.id + '" href="#/w/' + w.id + '/overview">' +
      '<div class="row between"><span class="eyebrow">' + esc(w.code_name) + '</span><span class="pill wed plain">' + fmt.weeksOut(w.wedding_day) + '</span></div>' +
      '<div><h2 class="display d-md">' + esc(w.title) + '</h2><p class="small soft">' + esc(w.short) + ' · ' + fmt.range(w.start_date, w.end_date) + ' · ' + h.yes + ' of ' + h.invited + ' guests</p></div>' +
      '<div class="col gap-2"><div class="mini-phases">' + subs.map(function (s) { return '<i class="' + s.status + '" title="' + s.code + ' ' + esc(s.name) + ': ' + ui.statusLabel('subphase', s.status) + '"></i>'; }).join('') + '</div>' +
      '<p class="xs muted">Now: ' + current.code + ' ' + esc(current.name) + ' · ' + ui.statusLabel('subphase', current.status).toLowerCase() + '</p></div>' +
      '<div class="col gap-2"><div class="row between small"><span class="muted">Forecast of envelope</span><span class="num strong ' + (b.over ? 'tone-crit' : '') + '">' + fmt.eurK(b.forecast) + ' / ' + fmt.eurK(b.envelope) + '</span></div>' +
      ui.bar(fmt.pct(b.forecast, b.envelope), b.over ? 'crit thin' : 'wed thin') +
      '<div class="row between small"><span class="muted">Paid</span><span class="num">' + fmt.eurK(b.paid) + '</span></div></div>' +
      '<div class="row wrap gap-2">' + (b.over ? '<span class="pill crit">Over by ' + fmt.eurK(-b.remaining) + '</span>' : '') + (blocked ? '<span class="pill crit">' + blocked + ' blocked</span>' : '') +
      (late ? '<span class="pill crit">' + fmt.plural(late, 'task') + ' late</span>' : '<span class="pill good">On schedule</span>') +
      (holds.yours ? '<span class="pill warn">' + holds.yours + ' with the couple</span>' : '') + '<span style="margin-left:auto">' + ui.avatar(P.user(w.lead_id)) + '</span></div></a>';
  }

  function pulse() {
    var api = P.api, msgs = api.list('messages'), answered = msgs.filter(function (m) { return m.answered_at; });
    var inTime = answered.filter(function (m) { return m.answered_at <= m.due_by; }).length;
    var lateNow = msgs.filter(function (m) { return !m.answered_at && P.slaLeft(m) < 0; }).length;
    var due30 = api.list('invoices').filter(function (i) { return i.status !== 'paid' && fmt.daysUntil(i.due) <= 30; });
    var overdue = due30.filter(function (i) { return i.status === 'overdue'; }).length;
    var stuck = api.list('decisions').filter(function (d) { return d.status === 'open' && fmt.daysUntil(d.release_date) < -7; }).length;
    var stale = api.list('tasks').filter(function (t) { return t.status !== 'done' && P.staleDays(t.updated_at) > 14; }).length +
      api.list('budget_lines').filter(function (l) { return !(l.contracted > 0) && P.staleDays(l.updated_at) > 14; }).length;
    return '<section class="panel" data-tour="pulse"><div class="panel-head"><h3 class="strong">Agency pulse</h3><span class="xs muted">All weddings</span></div><div class="stats">' +
      '<div class="stat"><div class="n ' + (answered.length && inTime < answered.length ? 'tone-warn' : 'tone-good') + '">' + (answered.length ? fmt.pct(inTime, answered.length) + '%' : '–') + '</div><div class="l">replies inside the ' + VKRI.AGENCY.reply_promise_hours + 'h promise' + (lateNow ? ' · <span class="tone-crit">' + lateNow + ' late now</span>' : '') + '</div></div>' +
      '<div class="stat"><div class="n">' + fmt.eurK(due30.reduce(function (s, i) { return s + i.amount_eur; }, 0)) + '</div><div class="l">to collect in 30 days · ' + due30.length + ' invoices' + (overdue ? ' · <span class="tone-crit">' + overdue + ' overdue</span>' : '') + '</div></div>' +
      '<div class="stat"><div class="n ' + (stuck ? 'tone-warn' : '') + '">' + stuck + '</div><div class="l">decisions with a couple for more than 7 days</div></div>' +
      '<div class="stat"><div class="n ' + (stale ? 'tone-warn' : '') + '">' + stale + '</div><div class="l">records not updated for 14 days</div></div></div></section>';
  }

  function deadlines() {
    var api = P.api, items = [];
    P.weddings().forEach(function (w) {
      api.list('tasks', { wedding_id: w.id }).forEach(function (t) { if (t.status !== 'done') items.push({ d: t.due, w: w, text: t.title, kind: ui.statusLabel('task', t.status), href: '#/w/' + w.id + '/phases/' + t.subphase_id, who: t.assignee_id }); });
      api.list('decisions', { wedding_id: w.id }).forEach(function (x) { if (x.status === 'open') items.push({ d: x.deadline, w: w, text: x.title, kind: 'Couple decides', href: '#/w/' + w.id + '/log' }); });
      api.list('invoices', { wedding_id: w.id }).forEach(function (i) { if (i.status !== 'paid') items.push({ d: i.due, w: w, text: i.covers + ' · ' + fmt.eur(i.amount_eur), kind: 'Payment', href: '#/w/' + w.id + '/money' }); });
      (w.milestones || []).forEach(function (m) { if (fmt.daysUntil(m.date) >= 0) items.push({ d: m.date, w: w, text: m.label, kind: 'Milestone', href: '#/w/' + w.id + '/overview' }); });
    });
    items = items.filter(function (x) { var n = fmt.daysUntil(x.d); return n <= 14 && n >= -30; }).sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    var late = items.filter(function (x) { return fmt.daysUntil(x.d) < 0; }), next = items.filter(function (x) { return fmt.daysUntil(x.d) >= 0; });
    function row(x) {
      return '<a class="deadline" data-wedding="' + x.w.id + '" href="' + x.href + '"><span class="num tone-' + fmt.due(x.d).tone + '">' + fmt.date(x.d) + '</span><span class="dot"></span>' +
        '<span class="truncate">' + esc(x.text) + ' <span class="muted">· ' + esc(x.w.title) + '</span></span><span class="row gap-2"><span class="xs muted nowrap">' + esc(x.kind) + '</span>' + (x.who ? ui.avatar(P.user(x.who)) : '') + '</span></a>';
    }
    return '<div class="two"><section class="panel"><div class="panel-head"><h3 class="strong">Past due</h3><span class="pill ' + (late.length ? 'crit' : 'good') + '">' + late.length + '</span></div><div class="list">' +
      (late.length ? late.map(row).join('') : '<div class="empty">Nothing is late.</div>') + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h3 class="strong">Next 14 days</h3><span class="xs muted">' + next.length + ' items</span></div><div class="list">' + next.slice(0, 12).map(row).join('') +
      (next.length > 12 ? '<div class="panel-pad xs muted">And ' + (next.length - 12) + ' more on the <a class="link" href="#/board/kanban">board</a>.</div>' : '') + '</div></section></div>';
  }

  P.screens.portfolio = function () {
    return '<div class="page-head"><div class="col gap-2"><span class="eyebrow">' + fmt.dateLong(fmt.today()) + ' 2027</span><h1 class="display d-lg">Good morning, ' + esc(P.api.me.name.split(' ')[0]) + '</h1></div></div>' +
      '<div class="wcards">' + P.weddings().map(card).join('') + '</div>' + pulse() + deadlines();
  };
})();
