/* Couple portal: Budget (#/budget). The honest picture of money:
   envelope / forecast / paid, currency view, categories as bars on one scale (expandable to their lines),
   "Often forgotten", the VKRI fee as its own fixed line, changes (pending and history),
   payment schedule and the invoices folder (cards on phones, table on laptops).
   Every figure comes from api.budget(), api.fx() and api.list(); nothing is computed on internal fields. */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var FEE = 'Planning fee';
  /* UI state that survives C.render() */
  var S = { cur: null, open: {}, status: 'all', payer: 'all', schedAll: false, invLimit: 12 };

  function cur() { return S.cur || 'EUR'; } // euros first, like every other screen; dollars are one tap away
  function usd() { return cur() === 'USD'; }
  /* money(12400) -> "€12,400" or "$13,888" at today's rate; signed adds "+". */
  function money(n, signed) {
    var v = usd() ? n * C.w.fx_today : n, r = Math.round(v);
    return (r < 0 ? '-' : (signed && r > 0 ? '+' : '')) + (usd() ? '$' : '€') + fmt.num(Math.abs(v));
  }
  /* Invoices are always in euros: in dollar view the euro amount stays visible underneath. */
  function moneyInv(n) { return '<span class="money2"><span class="num">' + money(n) + '</span>' + (usd() ? '<span class="xs muted num" title="Invoiced in euros">' + fmt.eur(n) + '</span>' : '') + '</span>'; }
  function lineAmount(l) { return l.contracted > 0 ? l.contracted : l.estimate; }
  function lineStatus(l) { return l.contracted > 0 ? '<span class="pill good">Contracted</span>' : '<span class="pill">Estimate</span>'; }
  function monthName(ym) { return new Date(ym + '-15T12:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }); }
  function pct(v, scale) { return scale > 0 ? Math.max(0, Math.min(100, v / scale * 100)) : 0; }

  /* Bullet bar: forecast (light) with paid (solid) inside it, the allocation as an ink tick,
     and any part of the forecast past the allocation hatched in the "over" colour. One shared scale per chart. */
  function bullet(o) {
    var f = pct(o.forecast, o.scale), p = pct(Math.min(o.paid, o.forecast), o.scale), m = pct(o.mark, o.scale);
    var over = o.mark > 0 && o.forecast > o.mark;
    var label = 'Forecast ' + money(o.forecast) + ', paid ' + money(o.paid) + (o.mark > 0 ? ', ' + o.markName + ' ' + money(o.mark) : '');
    return '<div class="bullet" role="img" aria-label="' + esc(label) + '">' +
      '<i class="b-fc" style="width:' + f.toFixed(2) + '%"></i>' +
      (over ? '<i class="b-over" style="left:' + m.toFixed(2) + '%;width:' + (f - m).toFixed(2) + '%"></i>' : '') +
      (p > 0 ? '<i class="b-paid" style="width:' + p.toFixed(2) + '%"></i>' : '') +
      (o.mark > 0 ? '<i class="b-mark" style="left:' + m.toFixed(2) + '%"></i>' : '') + '</div>';
  }
  function legend(markName, withOver) {
    return '<div class="legend" aria-hidden="true"><span><i class="sw sw-paid"></i>Paid</span><span><i class="sw sw-fc"></i>Forecast</span>' +
      '<span><i class="sw sw-mark"></i>' + esc(markName) + '</span>' + (withOver ? '<span><i class="sw sw-over"></i>Over ' + esc(markName.toLowerCase()) + '</span>' : '') + '</div>';
  }
  function nums(items) {
    return '<span class="bnums">' + items.map(function (x) { return '<span><span class="xs muted">' + esc(x[0]) + '</span><span class="small num ' + (x[2] || '') + '">' + x[1] + '</span></span>'; }).join('') + '</span>';
  }

  /* ---------- header: the three numbers ---------- */
  function picture(b, fx, lines, pendingCount) {
    var toBook = lines.filter(function (l) { return !(l.contracted > 0) && l.category !== 'Contingency'; });
    var toBookSum = toBook.reduce(function (s, l) { return s + lineAmount(l); }, 0);
    var scale = Math.max(b.envelope, b.forecast);
    var verdict = b.over
      ? 'The forecast is <span class="strong">' + money(-b.remaining) + ' above</span> your envelope. The categories and changes behind it are listed below.'
      : 'The forecast is inside your envelope by <span class="strong">' + money(b.remaining) + '</span>.';
    var delta = fx.delta_usd, fxLine = '';
    if (fx.unpaid_eur > 0 && fx.locked && fx.today) {
      fxLine = 'Contracts are in euros. What is still to pay, ' + fmt.eur(fx.unpaid_eur) + ', comes to $' + fmt.num(fx.usd_today) + ' at today\'s rate of ' + fx.today.toFixed(2) +
        (delta === 0 ? ', the same as at the rate your budget was set at.' : ', $' + fmt.num(Math.abs(delta)) + (delta > 0 ? ' more' : ' less') + ' than at the ' + fx.locked.toFixed(2) + ' rate your budget was set at.');
    }
    return '<section class="panel panel-pad col gap-4 picture">' +
      '<div class="three">' +
      '<div class="stat"><div class="n num">' + money(b.envelope) + '</div><div class="l">Your envelope</div></div>' +
      '<div class="stat"><div class="n num">' + money(b.forecast) + '</div><div class="l">Forecast</div></div>' +
      '<div class="stat"><div class="n num">' + money(b.paid) + '</div><div class="l">Paid so far</div></div></div>' +
      '<div class="col gap-2">' + legend('Envelope', b.over) + bullet({ forecast: b.forecast, paid: b.paid, mark: b.envelope, markName: 'envelope', scale: scale }) + '</div>' +
      '<p class="small">' + verdict + (b.over ? ' <span class="pill crit">Over envelope</span>' : ' <span class="pill good">Inside envelope</span>') + '</p>' +
      '<ul class="facts-list small">' +
      '<li><span class="soft">Still to book</span><span>' + (toBook.length ? fmt.plural(toBook.length, 'item') + ', ' + money(toBookSum) + ' held for them in the forecast' : 'Nothing. Every supplier is contracted.') + '</span></li>' +
      '<li><span class="soft">Waiting for you</span><span>' + (pendingCount ? fmt.plural(pendingCount, 'change') + ', ' + money(b.pending_changes, true) + ', already counted in the forecast' : 'No changes to approve.') + '</span></li>' +
      '<li><span class="soft">Invoiced so far</span><span class="num">' + money(b.invoiced) + ' of ' + money(b.contracted) + ' contracted</span></li></ul>' +
      (fxLine ? '<p class="small soft fx">' + fxLine + '</p>' : '') +
      (usd() ? '<p class="xs muted">Shown in dollars at today\'s rate, 1 EUR = ' + C.w.fx_today.toFixed(2) + ' USD. Contracts and invoices are in euros.</p>' : '') +
      '</section>';
  }

  /* ---------- categories ---------- */
  function categories(b, lines, pending) {
    var cats = b.categories.filter(function (c) { return c.category !== FEE; });
    if (!cats.length) return C.empty('Your budget categories appear here once the first estimates are in.');
    var scale = 0;
    cats.forEach(function (c) { scale = Math.max(scale, c.allocated, c.forecast); });
    var pendingByLine = {};
    pending.forEach(function (co) { pendingByLine[co.budget_line_id] = (pendingByLine[co.budget_line_id] || 0) + co.delta_eur; });
    var overCount = cats.filter(function (c) { return c.over; }).length;
    var rows = cats.map(function (c) {
      var open = !!S.open[c.category], inCat = lines.filter(function (l) { return l.category === c.category; });
      var overBy = c.forecast - c.allocated;
      return '<div class="cat' + (open ? ' open' : '') + '">' +
        '<button class="cat-head" data-act="budgetCat" data-cat="' + esc(c.category) + '" aria-expanded="' + open + '">' +
        '<span class="row between gap-2"><span class="strong small">' + esc(c.category) + '</span><span class="row gap-2">' +
        (c.over ? '<span class="pill crit">Over by ' + money(overBy) + '</span>' : c.allocated > 0 && c.forecast <= c.allocated ? '<span class="pill good">Within</span>' : '') +
        '<span class="chev">' + ui.icon('chevron') + '</span></span></span>' +
        bullet({ forecast: c.forecast, paid: c.paid, mark: c.allocated, markName: 'allocated', scale: scale }) +
        nums([['Forecast', money(c.forecast), 'strong'], ['Allocated', c.allocated ? money(c.allocated) : 'None'], ['Paid', money(c.paid)]]) +
        '</button>' +
        (open ? '<ul class="lines">' + inCat.map(function (l) {
          var pend = pendingByLine[l.id];
          return '<li><div class="col gap-1 grow"><span class="small strong">' + esc(l.label) + '</span>' +
            (l.includes ? '<span class="xs muted">' + esc(l.includes) + '</span>' : '') +
            (l.vendor_id && C.vendorName(l.vendor_id) ? '<span class="xs muted">' + esc(C.vendorName(l.vendor_id)) + '</span>' : '') +
            (pend ? '<span class="xs tone-warn">' + money(pend, true) + ' waiting for your approval</span>' : '') + '</div>' +
            '<div class="col gap-1 lr"><span class="small num strong">' + money(lineAmount(l)) + '</span>' + lineStatus(l) +
            (l.allocated && l.allocated !== lineAmount(l) ? '<span class="xs muted num">allocated ' + money(l.allocated) + '</span>' : '') + '</div></li>';
        }).join('') + '</ul>' : '') + '</div>';
    }).join('');
    return '<section class="panel panel-pad col gap-4"><div class="sec-head"><h2 class="display d-sm">By category</h2><span class="xs muted">Tap a category to see its lines</span></div>' +
      legend('Allocated', overCount > 0) +
      (overCount ? '<p class="small soft">' + fmt.plural(overCount, 'category is', 'categories are') + (overCount > 1 ? ' above their allocations. ' : ' above its allocation. ') +
        (b.over ? 'Together they explain the gap to your envelope.' : 'The total is still inside your envelope.') + '</p>' : '') +
      '<div class="cats">' + rows + '</div></section>';
  }

  function feeLine(b, lines, invoices) {
    var cat = b.categories.filter(function (c) { return c.category === FEE; })[0];
    var line = lines.filter(function (l) { return l.category === FEE; })[0];
    var amount = cat ? cat.forecast : (C.w.vkri_fee_eur || 0);
    if (!amount) return '';
    var feeLines = lines.filter(function (l) { return l.category === FEE; }).map(function (l) { return l.id; });
    var nextFee = invoices.filter(function (i) { return feeLines.indexOf(i.budget_line_id) > -1 && i.status !== 'paid'; }).sort(function (a, c) { return a.due < c.due ? -1 : 1; })[0];
    return '<section class="panel panel-pad fee"><div class="col gap-1 grow"><span class="eyebrow">VKRI planning fee</span>' +
      '<p class="small">' + esc(line && line.includes ? line.includes : 'A fixed fee, agreed at the start.') + '</p>' +
      '<p class="xs muted">' + (cat ? money(cat.paid) + ' paid' : '') + (nextFee ? ' · ' + money(nextFee.amount_eur) + ' due ' + fmt.date(nextFee.due) : cat && cat.paid >= amount ? ' · paid in full' : '') + '</p></div>' +
      '<div class="col gap-1 lr"><span class="display d-sm num">' + money(amount) + '</span><span class="pill plain">Fixed</span></div></section>';
  }

  function forgotten(lines) {
    var list = lines.filter(function (l) { return l.often_forgotten; });
    if (!list.length) return '';
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Often forgotten</h2><span class="xs muted">Already in your forecast</span></div>' +
      '<p class="small soft">The costs that tend to appear late at weddings like yours. We counted them from the start.</p>' +
      '<ul class="lines flat">' + list.map(function (l) {
        return '<li><div class="col gap-1 grow"><span class="small strong">' + esc(l.label) + '</span>' + (l.includes ? '<span class="xs muted">' + esc(l.includes) + '</span>' : '') +
          '<span class="xs muted">' + esc(l.category) + '</span></div><div class="col gap-1 lr"><span class="small num strong">' + money(lineAmount(l)) + '</span>' + lineStatus(l) + '</div></li>';
      }).join('') + '</ul></section>';
  }

  function changes(pending, history) {
    var pendHtml = pending.length ? '<div class="col gap-3">' + pending.map(function (c) {
      return '<button class="need" data-act="openChange" data-id="' + esc(c.id) + '"><span class="when tone-warn">Awaiting your approval · ' + money(c.delta_eur, true) + '</span>' +
        '<span class="strong">' + esc(c.title) + '</span><span class="small soft">' + esc(c.reason) + '</span>' +
        '<span class="row gap-2 small strong" style="color:var(--wed)">Review ' + ui.icon('arrow') + '</span></button>';
    }).join('') + '</div>' : '<p class="small muted">No changes are waiting for you.</p>';
    var histHtml = history.length ? '<ul class="lines flat">' + history.map(function (c) {
      return '<li><button class="line-btn" data-act="openChange" data-id="' + esc(c.id) + '"><div class="col gap-1 grow"><span class="small strong">' + esc(c.title) + '</span>' +
        '<span class="xs muted">' + (c.decided_at ? fmt.dateY(c.decided_at.slice(0, 10)) : '') + (c.decided_by ? ' · by ' + esc(C.userName(c.decided_by)) : '') + '</span></div>' +
        '<div class="col gap-1 lr"><span class="small num ' + (c.status === 'declined' ? 'muted strike' : 'strong') + '">' + money(c.delta_eur, true) + '</span>' + ui.pill('change', c.status) + '</div></button></li>';
    }).join('') + '</ul>' : '<p class="small muted">No changes so far.</p>';
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Changes</h2><span class="xs muted">Nothing is ordered until you approve</span></div>' +
      pendHtml + '<span class="eyebrow" style="margin-top:8px">History</span>' + histHtml + '</section>';
  }

  /* ---------- payments ---------- */
  function schedule(invoices) {
    var unpaid = invoices.filter(function (i) { return i.status !== 'paid'; }).sort(function (a, b) { return a.due < b.due ? -1 : a.due > b.due ? 1 : 0; });
    if (!unpaid.length) return '<section class="panel panel-pad col gap-3"><h2 class="display d-sm">Payment schedule</h2><p class="small muted">Everything invoiced so far is paid.</p></section>';
    var byPayer = {};
    unpaid.forEach(function (i) { byPayer[i.payer_id] = (byPayer[i.payer_id] || 0) + i.amount_eur; });
    var months = [], seen = {}, shownList = S.schedAll ? unpaid : unpaid.slice(0, 8);
    shownList.forEach(function (i) { var m = i.due.slice(0, 7); if (!seen[m]) { seen[m] = []; months.push(m); } seen[m].push(i); });
    var overdue = unpaid.filter(function (i) { return i.status === 'overdue'; }).length;
    return '<section class="panel col schedule"><div class="panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Payment schedule</h2><span class="xs muted">' + fmt.plural(unpaid.length, 'payment') + ' still to make' + (overdue ? ', ' + overdue + ' overdue' : '') + '</span></div>' +
      '<div class="payers">' + Object.keys(byPayer).map(function (pid) {
        var p = C.payer(pid);
        return '<div class="stat"><div class="n num" style="font-size:1.5rem">' + money(byPayer[pid]) + '</div><div class="l">' + esc(p ? p.name : 'Payer to confirm') + (p && p.relation ? ' · ' + esc(p.relation) : '') + '</div></div>';
      }).join('') + '</div></div>' +
      months.map(function (m) {
        return '<div class="month"><div class="eyebrow">' + monthName(m) + '</div><ul class="lines flat">' + seen[m].map(function (i) {
          var p = C.payer(i.payer_id), due = fmt.due(i.due), v = C.vendorName(i.vendor_id);
          return '<li><div class="when-col"><span class="strong small num">' + fmt.date(i.due) + '</span><span class="xs muted">' + fmt.dow(i.due) + '</span></div>' +
            '<div class="col gap-1 grow"><span class="small strong">' + esc(i.covers) + '</span><span class="xs muted">' + (v ? esc(v) + ' · ' : '') + 'payer: ' + esc(p ? p.name : 'to confirm') + '</span>' +
            '<span class="xs tone-' + (i.status === 'overdue' ? 'crit' : due.tone) + '">' + (i.status === 'overdue' ? 'Overdue, ' + due.text : 'Due ' + due.text) + '</span></div>' +
            '<div class="col gap-1 lr"><span class="small strong">' + moneyInv(i.amount_eur) + '</span>' + ui.pill('invoice', i.status) + '</div></li>';
        }).join('') + '</ul></div>';
      }).join('') + (unpaid.length > 8 ? '<div class="panel-pad" style="padding-top:0"><button class="btn block" data-act="budgetSched">' +
        (S.schedAll ? 'Show the next 8 only' : 'Show all ' + unpaid.length + ' payments') + '</button></div>' : '') + '</section>';
  }

  function folder(invoices, lines) {
    var lineById = {}; lines.forEach(function (l) { lineById[l.id] = l; });
    var payers = C.w.payers || [];
    var list = invoices.filter(function (i) { return (S.status === 'all' || i.status === S.status) && (S.payer === 'all' || i.payer_id === S.payer); })
      .sort(function (a, b) { return a.due < b.due ? 1 : a.due > b.due ? -1 : 0; });
    var total = list.reduce(function (s, i) { return s + i.amount_eur; }, 0);
    function supplier(i) { var l = lineById[i.budget_line_id]; return C.vendorName(i.vendor_id) || (l && l.category === FEE ? 'VKRI' : ''); }
    function when(i) { return i.status === 'paid' ? 'Paid ' + fmt.dateY(i.paid_at || i.due) : 'Due ' + fmt.dateY(i.due); }
    var statuses = [['all', 'All statuses']].concat(VKRI.enums.invoiceStatus.map(function (s) { return [s, ui.statusLabel('invoice', s)]; }));
    var filters = '<div class="filters two">' +
      '<label class="field"><span class="xs muted">Status</span><select class="select" id="inv-status" data-change="invStatus">' + statuses.map(function (s) {
        return '<option value="' + s[0] + '"' + (S.status === s[0] ? ' selected' : '') + '>' + esc(s[1]) + '</option>'; }).join('') + '</select></label>' +
      '<label class="field"><span class="xs muted">Payer</span><select class="select" id="inv-payer" data-change="invPayer"><option value="all">Every payer</option>' + payers.map(function (p) {
        return '<option value="' + esc(p.id) + '"' + (S.payer === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '</select></label></div>';
    if (!invoices.length) return '<section class="panel panel-pad col gap-3"><h2 class="display d-sm">Invoices</h2><p class="small muted">No invoices yet. Each one will appear here with what it covers and who pays it.</p></section>';
    var all = list; list = list.slice(0, S.invLimit);
    var count = '<p class="xs muted">' + (all.length > list.length ? 'Showing ' + list.length + ' of ' : '') + fmt.plural(all.length, 'invoice') +
      (all.length < invoices.length ? ' matching, of ' + invoices.length : '') + ' · ' + money(total) + ' in total</p>';
    var cards = '<div class="inv-cards">' + (list.length ? list.map(function (i) {
      var l = lineById[i.budget_line_id], p = C.payer(i.payer_id), sup = supplier(i);
      return '<article class="inv"><div class="row between gap-2"><span class="xs muted num">' + esc(i.number) + '</span>' + ui.pill('invoice', i.status) + '</div>' +
        '<div class="row between gap-3" style="align-items:flex-start"><span class="small strong grow">' + esc(i.covers) + '</span><span class="col gap-1 lr small strong">' + moneyInv(i.amount_eur) + '</span></div>' +
        '<dl class="kv xs"><dt>Supplier</dt><dd>' + (sup ? esc(sup) : '<span class="muted">Not a single supplier</span>') + '</dd><dt>Budget line</dt><dd>' + esc(l ? l.label : 'Not linked') + '</dd>' +
        '<dt>Payer</dt><dd>' + esc(p ? p.name : 'To confirm') + '</dd><dt>' + (i.status === 'paid' ? 'Paid' : 'Due') + '</dt><dd class="' + (i.status === 'overdue' ? 'tone-crit' : '') + '">' + when(i).replace(/^(Paid|Due) /, '') + '</dd></dl></article>';
    }).join('') : '<div class="empty">No invoices match these filters.</div>') + '</div>';
    var table = '<div class="inv-table"><table class="table"><thead><tr><th>Number</th><th>What it covers</th><th>Supplier</th><th>Budget line</th><th>Payer</th><th class="r">Amount</th><th>Status</th><th>Due or paid</th></tr></thead><tbody>' +
      (list.length ? list.map(function (i) {
        var l = lineById[i.budget_line_id], p = C.payer(i.payer_id), sup = supplier(i);
        return '<tr><td class="num nowrap">' + esc(i.number) + '</td><td>' + esc(i.covers) + '</td><td>' + (sup ? esc(sup) : '<span class="muted">–</span>') + '</td><td class="soft">' + esc(l ? l.label : 'Not linked') + '</td>' +
          '<td>' + esc(p ? p.name : 'To confirm') + '</td><td class="r">' + moneyInv(i.amount_eur) + '</td><td>' + ui.pill('invoice', i.status) + '</td>' +
          '<td class="nowrap ' + (i.status === 'overdue' ? 'tone-crit' : '') + '">' + when(i) + '</td></tr>';
      }).join('') : '<tr><td colspan="8" class="empty">No invoices match these filters.</td></tr>') + '</tbody></table></div>';
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Invoices</h2><span class="xs muted">Each one tied to a budget line and a payer</span></div>' +
      filters + count + cards + table +
      (all.length > list.length ? '<button class="btn block" data-act="invMore">Show ' + Math.min(12, all.length - list.length) + ' more of ' + (all.length - list.length) + '</button>' : '') + '</section>';
  }

  C.screens.budget = function () {
    var w = C.w, api = C.api, b = api.budget(w.id), fx = api.fx(w.id);
    var lines = api.list('budget_lines'), invoices = api.list('invoices'), cos = api.list('change_orders');
    var pending = cos.filter(function (c) { return c.status === 'pending'; });
    var history = cos.filter(function (c) { return c.status !== 'pending'; }).sort(function (a, c) { return (a.decided_at || '') < (c.decided_at || '') ? 1 : -1; });
    var toggle = w.fx_today ? '<div class="seg cseg" role="group" aria-label="Currency"><button class="' + (usd() ? '' : 'on') + '" data-act="budgetCur" data-cur="EUR" aria-pressed="' + !usd() + '">EUR</button>' +
      '<button class="' + (usd() ? 'on' : '') + '" data-act="budgetCur" data-cur="USD" aria-pressed="' + usd() + '">USD</button></div>' : '';
    return C.head('Budget and payments', 'The full picture', 'One set of numbers, the same ones your planners see. The forecast already includes what is not booked yet.', toggle) +
      picture(b, fx, lines, pending.length) +
      '<div class="bgrid"><div class="col gap-5">' + categories(b, lines, pending) + feeLine(b, lines, invoices) + '</div>' +
      '<div class="col gap-5">' + changes(pending, history) + forgotten(lines) + '</div></div>' +
      schedule(invoices) + folder(invoices, lines);
  };

  C.actions.budgetCur = function (el) { S.cur = el.getAttribute('data-cur'); C.render(); };
  C.actions.budgetCat = function (el) { var k = el.getAttribute('data-cat'); S.open[k] = !S.open[k]; C.render(); };
  C.changes.invStatus = function (el) { S.status = el.value; S.invLimit = 12; C.render(); };
  C.changes.invPayer = function (el) { S.payer = el.value; S.invLimit = 12; C.render(); };
  C.actions.invMore = function () { S.invLimit += 12; C.render(); };
  C.actions.budgetSched = function () { S.schedAll = !S.schedAll; C.render(); };
})();
