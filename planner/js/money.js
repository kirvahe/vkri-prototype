/* Planner CRM: Budget & Invoices tab. Read-only in v1 except publishing a line to the couple. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var state = { invoiceStatus: 'unpaid', payer: 'all', openCats: {} };

  function lineForecast(l) { return l.contracted > 0 ? l.contracted : l.estimate; }

  P.tabs.money = function (w) {
    var api = P.api, b = api.budget(w.id), fx = api.fx(w.id);
    var lines = api.list('budget_lines', { wedding_id: w.id }), invoices = api.list('invoices', { wedding_id: w.id });
    var cos = api.list('change_orders', { wedding_id: w.id }).sort(function (a, c) { return a.proposed_at < c.proposed_at ? 1 : -1; });
    var vendors = {}; api.list('vendors', { wedding_id: w.id }).forEach(function (v) { vendors[v.id] = v; });
    var paidBy = {}; invoices.forEach(function (i) { if (i.status === 'paid') paidBy[i.budget_line_id] = (paidBy[i.budget_line_id] || 0) + i.amount_eur; });
    var max = Math.max.apply(null, b.categories.map(function (c) { return Math.max(c.forecast, c.allocated); }));

    var stats = '<div class="panel stats">' +
      '<div class="stat"><div class="n">' + fmt.eurK(b.envelope) + '</div><div class="l">envelope, agreed with the couple</div></div>' +
      '<div class="stat"><div class="n ' + (b.over ? 'tone-crit' : '') + '">' + fmt.eurK(b.forecast) + '</div><div class="l">' + (b.over ? 'forecast · over by ' + fmt.eur(-b.remaining) : 'forecast · ' + fmt.eur(b.remaining) + ' to spare') + '</div></div>' +
      '<div class="stat"><div class="n">' + fmt.eurK(b.contracted) + '</div><div class="l">contracted · ' + fmt.plural(b.still_to_book, 'line') + ' still to book</div></div>' +
      '<div class="stat"><div class="n">' + fmt.eurK(b.paid) + '</div><div class="l">paid · ' + fmt.eurK(b.invoiced - b.paid) + ' invoiced and open</div></div>' +
      '<div class="stat"><div class="n ' + (b.pending_changes ? 'tone-warn' : '') + '">' + fmt.eur(b.pending_changes, true) + '</div><div class="l">changes waiting for the couple</div></div></div>';

    var fxTile = '<section class="panel panel-pad col gap-2"><div class="row between wrap"><h3 class="strong">Currency exposure</h3><span class="xs muted">Contracts in EUR, the couple pays from USD</span></div>' +
      '<p class="small soft">Unpaid: <span class="strong num">' + fmt.eur(fx.unpaid_eur) + '</span>. At the rate locked at signing (' + fx.locked + ') that was <span class="num">$' + fmt.num(fx.usd_at_locked) + '</span>; at today\'s rate (' + fx.today + ') it is <span class="num">$' + fmt.num(fx.usd_today) + '</span>. ' +
      '<span class="strong ' + (fx.delta_usd > 0 ? 'tone-warn' : 'tone-good') + '">' + (fx.delta_usd > 0 ? 'The couple pays $' + fmt.num(fx.delta_usd) + ' more' : 'The couple pays $' + fmt.num(-fx.delta_usd) + ' less') + '</span> than planned if nothing changes.</p></section>';

    var cats = '<section class="panel"><div class="panel-head"><h3 class="strong">By category</h3><div class="legend"><span><i style="background:var(--ink)"></i>Paid</span><span><i style="background:var(--line-2)"></i>Forecast</span><span><i style="background:var(--ink);width:2px;height:12px"></i>Allocated</span></div></div><div class="list">' +
      b.categories.map(function (c) {
        var open = state.openCats[c.category];
        var inside = open ? '<div class="table-wrap" style="background:var(--paper)"><table class="table"><thead><tr><th>Line</th><th>Supplier</th><th class="r">Allocated</th><th class="r">Forecast</th><th class="r">Paid</th><th>State</th></tr></thead><tbody>' +
          lines.filter(function (l) { return l.category === c.category; }).map(function (l) {
            return '<tr><td><span class="strong">' + esc(l.label) + '</span>' + (l.often_forgotten ? ' <span class="tag">Often forgotten</span>' : '') + (l.includes ? '<br><span class="xs muted">' + esc(l.includes) + '</span>' : '') + '</td>' +
              '<td>' + esc(l.vendor_id && vendors[l.vendor_id] ? vendors[l.vendor_id].name : '') + '</td><td class="r">' + fmt.eur(l.allocated) + '</td><td class="r strong">' + fmt.eur(lineForecast(l)) + '</td><td class="r">' + fmt.eur(paidBy[l.id] || 0) + '</td>' +
              '<td>' + (l.contracted > 0 ? '<span class="pill good">Contracted</span>' : '<span class="pill">Estimate</span>') + ' ' + P.staleTag(l.updated_at) + '</td>' +
              '</tr>';
          }).join('') + '</tbody></table></div>' : '';
        return '<div><button class="catbar" style="width:100%" data-act="toggleCat" data-cat="' + esc(c.category) + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          '<span class="row gap-2"><span class="strong">' + esc(c.category) + '</span>' + (c.over ? '<span class="pill crit">Over</span>' : '') + '</span>' +
          '<span class="track ' + (c.over ? 'over' : '') + '"><i class="f" style="width:' + (c.forecast / max * 100).toFixed(1) + '%"></i><i class="p" style="width:' + (c.paid / max * 100).toFixed(1) + '%"></i>' + (c.allocated ? '<span class="a" style="left:' + (c.allocated / max * 100).toFixed(1) + '%"></span>' : '') + '</span>' +
          '<span class="num small" style="text-align:right"><span class="strong">' + fmt.eur(c.forecast) + '</span> <span class="muted">of ' + fmt.eur(c.allocated) + '</span></span></button>' + inside + '</div>';
      }).join('') + '</div></section>';

    var changes = '<section class="panel"><div class="panel-head"><h3 class="strong">Change orders</h3><span class="xs muted">Nothing is ordered before the couple approves</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Change</th><th class="r">Amount</th><th>Why</th><th>Alternative offered</th><th>Proposed</th><th>Status</th></tr></thead><tbody>' +
      cos.map(function (c) {
        return '<tr><td class="strong">' + esc(c.title) + '</td><td class="r">' + fmt.eur(c.delta_eur, true) + '</td><td>' + esc(c.reason) + '</td><td>' + esc(c.alternatives || '–') + '</td><td class="nowrap">' + ui.avatar(P.user(c.proposed_by)) + ' ' + fmt.date(c.proposed_at) + '</td><td>' + ui.pill('change', c.status) + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';

    var shown = invoices.filter(function (i) {
      var okS = state.invoiceStatus === 'all' || (state.invoiceStatus === 'unpaid' ? i.status !== 'paid' : i.status === state.invoiceStatus);
      return okS && (state.payer === 'all' || i.payer_id === state.payer);
    }).sort(function (a, c) { return a.due < c.due ? -1 : 1; });
    var total = shown.reduce(function (s, i) { return s + i.amount_eur; }, 0);
    var inv = '<section class="panel"><div class="panel-head"><h3 class="strong">Invoices</h3><span class="xs muted num">' + shown.length + ' shown · ' + fmt.eur(total) + '</span></div>' +
      '<div class="toolbar"><div class="seg">' + [['unpaid', 'Unpaid'], ['overdue', 'Overdue'], ['paid', 'Paid'], ['all', 'All']].map(function (s) {
        return '<button class="' + (state.invoiceStatus === s[0] ? 'on' : '') + '" data-act="invStatus" data-v="' + s[0] + '">' + s[1] + '</button>';
      }).join('') + '</div><select class="select" id="inv-payer" data-change="invPayer" aria-label="Payer"><option value="all">Every payer</option>' + w.payers.map(function (p) {
        return '<option value="' + p.id + '"' + (state.payer === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>';
      }).join('') + '</select></div><div class="table-wrap"><table class="table"><thead><tr><th>No.</th><th>What it covers</th><th>Supplier</th><th>Payer</th><th>Due</th><th class="r">Amount</th><th>Status</th></tr></thead><tbody>' +
      (shown.length ? shown.map(function (i) {
        return '<tr><td class="num nowrap">' + esc(i.number) + '</td><td>' + esc(i.covers) + '</td><td>' + esc(i.vendor_id && vendors[i.vendor_id] ? vendors[i.vendor_id].name : 'VKRI') + '</td><td>' + esc(P.payer(w, i.payer_id).name) + '</td>' +
          '<td class="nowrap">' + (i.status === 'paid' ? fmt.dateY(i.paid_at) : P.dueHtml(i.due)) + '</td><td class="r strong">' + fmt.eur(i.amount_eur) + '</td><td>' + ui.pill('invoice', i.status) + '</td></tr>';
      }).join('') : '<tr><td colspan="7" class="empty">No invoices match these filters.</td></tr>') + '</tbody></table></div></section>';

    return stats + '<div class="two">' + fxTile + '<section class="panel panel-pad col gap-2"><h3 class="strong">Next payment</h3>' + (b.next_payment ? '<p class="small soft"><span class="strong num">' + fmt.eur(b.next_payment.amount_eur) + '</span> · ' + esc(b.next_payment.covers) + '<br>' + P.dueHtml(b.next_payment.due) + ' · payer: ' + esc(P.payer(w, b.next_payment.payer_id).name) + '</p>' : '<p class="small muted">Everything invoiced is paid.</p>') + '</section></div>' + cats + changes + inv;
  };

  P.actions.toggleCat = function (el) { var c = el.getAttribute('data-cat'); state.openCats[c] = !state.openCats[c]; P.render(); };
  P.actions.invStatus = function (el) { state.invoiceStatus = el.getAttribute('data-v'); P.render(); };
  P.changes.invPayer = function (el) { state.payer = el.value; P.render(); };
})();
