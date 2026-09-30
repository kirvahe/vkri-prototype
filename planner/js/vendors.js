/* Planner CRM: Vendors tab (with the final-confirmations grid) and Documents & Links tab. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var KEYS = [['time', 'Arrival time'], ['headcount', 'Headcount'], ['dietary', 'Dietary sheet'], ['payment', 'Payment']];

  P.tabs.vendors = function (w) {
    var vendors = P.api.list('vendors', { wedding_id: w.id });
    var full = vendors.filter(function (v) { return KEYS.every(function (k) { return v.confirmations[k[0]]; }); }).length;
    var contracted = vendors.reduce(function (s, v) { return s + (v.contract_eur || 0); }, 0);
    var replies = vendors.filter(function (v) { return v.avg_reply_hours != null; });
    var avg = replies.length ? Math.round(replies.reduce(function (s, v) { return s + v.avg_reply_hours; }, 0) / replies.length) : 0;
    var stats = '<div class="panel stats">' +
      '<div class="stat"><div class="n">' + vendors.length + '</div><div class="l">suppliers on this wedding</div></div>' +
      '<div class="stat"><div class="n ' + (full < vendors.length ? 'tone-warn' : 'tone-good') + '">' + full + '<span class="small muted"> / ' + vendors.length + '</span></div><div class="l">fully confirmed</div></div>' +
      '<div class="stat"><div class="n">' + fmt.eurK(contracted) + '</div><div class="l">under contract</div></div>' +
      '<div class="stat"><div class="n">' + vendors.filter(function (v) { return v.nda_signed; }).length + '<span class="small muted"> / ' + vendors.length + '</span></div><div class="l">NDAs signed</div></div>' +
      '<div class="stat"><div class="n">' + avg + 'h</div><div class="l">average supplier reply time</div></div></div>';
    var grid = '<section class="panel"><div class="panel-head"><h3 class="strong">Final confirmations</h3><span class="xs muted">Tap a box when the supplier has confirmed it in writing</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Supplier</th><th>Status</th><th>On site</th>' +
      KEYS.map(function (k) { return '<th>' + k[1] + '</th>'; }).join('') + '</tr></thead><tbody>' + vendors.map(function (v) {
        return '<tr><td><span class="strong">' + esc(v.name) + '</span><br><span class="xs muted">' + esc(v.category) + '</span></td><td>' + ui.pill('vendor', v.status) + '</td><td class="small">' + esc(v.arrival_time) + '</td>' +
          KEYS.map(function (k) {
            var on = v.confirmations[k[0]];
            return '<td><button class="conf ' + (on ? 'on' : '') + '" data-act="confirm" data-id="' + v.id + '" data-k="' + k[0] + '" data-v="' + (on ? '' : '1') + '" aria-pressed="' + (on ? 'true' : 'false') + '" aria-label="' + k[1] + ' for ' + esc(v.name) + '">' + (on ? ui.icon('check') : '–') + '</button></td>';
          }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></section>';
    var book = '<section class="panel"><div class="panel-head"><h3 class="strong">Supplier book</h3><span class="xs muted">Reply times and notes are internal</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Supplier</th><th>Contact</th><th class="r">Contract</th><th>Insurance</th><th>NDA</th><th>Relationship</th><th class="r">Avg reply</th><th>Internal note</th></tr></thead><tbody>' +
      vendors.map(function (v) {
        return '<tr><td><span class="strong">' + esc(v.name) + '</span>' + (v.real ? ' <span class="tag">Real venue</span>' : '') + '<br><span class="xs muted">' + esc(v.category) + '</span></td><td>' + esc(v.contact) + '</td><td class="r">' + (v.contract_eur ? fmt.eur(v.contract_eur) : '–') + '</td>' +
          '<td>' + P.check(v.insurance_ok) + '</td><td>' + P.check(v.nda_signed) + '</td><td>' + (v.real ? '–' : v.relationship === 'preferred' ? '<span class="pill info plain">Worked together before</span>' : '<span class="small muted">No commission, no referral fee</span>') + '</td>' +
          '<td class="r ' + (v.avg_reply_hours > 24 ? 'tone-crit strong' : '') + '">' + (v.avg_reply_hours != null ? v.avg_reply_hours + 'h' : '–') + '</td><td class="small soft">' + esc(v.internal_notes || '') + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';
    return stats + grid + book;
  };
  P.actions.confirm = function (el) { P.api.confirmVendor(el.getAttribute('data-id'), el.getAttribute('data-k'), !!el.getAttribute('data-v')); P.render(); };

  P.tabs.documents = function (w) {
    var docs = P.api.list('documents', { wedding_id: w.id });
    var cats = VKRI.enums.docCategories.filter(function (c) { return docs.some(function (d) { return d.category === c; }); });
    var html = cats.map(function (c) {
      var list = docs.filter(function (d) { return d.category === c; });
      var legal = c === 'Legal paperwork';
      var done = list.filter(function (d) { return d.status === 'done'; }).length;
      return '<section class="panel"><div class="panel-head"><h3 class="strong">' + esc(c) + '</h3><span class="xs muted">' + (legal ? done + ' of ' + list.length + ' complete · illustrative checklist' : list.length + ' items') + '</span></div><div class="table-wrap"><table class="table"><thead><tr><th>' + (legal ? 'Step' : 'Document') + '</th>' +
        (legal ? '<th>Due</th><th>Owner</th>' : '<th>Version</th><th>Added</th>') + '<th>Status</th><th>Couple</th></tr></thead><tbody>' + list.map(function (d) {
          var by = P.user(d.added_by) || { name: w.short, type: 'couple', initials: fmt.initials(w.short) };
          var link = ui.docAttrs(d, '../shared/');
          return '<tr><td>' + (link && !legal ? '<a class="link strong"' + link + '>' + esc(d.title) + '</a>' : '<span class="strong">' + esc(d.title) + '</span>') + '</td>' +
            (legal ? '<td class="nowrap">' + (!d.due ? 'No date' : d.status === 'done' ? fmt.dateY(d.due) : P.dueHtml(d.due)) + '</td><td>' + ui.avatar(P.user(d.owner_id)) + '</td>'
              : '<td class="num">v' + d.version + '</td><td class="nowrap">' + ui.avatar(by) + ' ' + fmt.dateY(d.added_at) + '</td>') +
            '<td>' + ui.pill('doc', d.status) + '</td><td><label class="check" style="min-height:0"><input type="checkbox" id="doc-' + d.id + '" data-change="visible" data-table="documents" data-id="' + d.id + '"' + (d.client_visible !== false ? ' checked' : '') + '><span class="xs">' + (d.client_visible !== false ? 'Sees it' : 'Hidden') + '</span></label></td></tr>';
        }).join('') + '</tbody></table></div></section>';
    }).join('');
    var add = '<section class="panel"><div class="panel-head"><h3 class="strong">Add a link</h3><span class="xs muted">Everything in one place, at least as a link</span></div><form class="toolbar" style="border:0" data-form="addLink" data-wid="' + w.id + '">' +
      '<input class="input" id="link-title" name="title" placeholder="Title" required aria-label="Title"><input class="input" id="link-url" name="url" type="text" inputmode="url" placeholder="https://" required aria-label="Address">' +
      '<select class="select" id="link-cat" name="category" aria-label="Category">' + VKRI.enums.docCategories.filter(function (c) { return c !== 'Legal paperwork'; }).map(function (c) { return '<option' + (c === 'Links' ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select><button class="btn primary sm" type="submit">Add</button></form></section>';
    return html + add;
  };
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.getAttribute('data-form') !== 'addLink') return;
    e.preventDefault();
    var url = f.elements.url.value.trim();
    if (url && !/^[a-z][a-z0-9+.-]*:/i.test(url)) url = 'https://' + url; // a bare address is fine
    if (!ui.safeUrl(url)) { ui.toast('The address should start with https://'); return; }
    P.api.addLink(f.elements.title.value.trim(), url, f.elements.category.value, f.getAttribute('data-wid'));
    f.reset();
    P.render(); ui.toast('Link added, visible to the couple');
  });
})();
