/* Couple portal: Guests (#/guests).
   Summary tiles (api.headcount), replies per event (guest_event_rsvps), hotels with their room blocks,
   and the guest list with search and filters (cards on phones, a table on laptops), 60 rows at a time.
   The guest sheet lets the couple change the overall reply, dietary needs, allergies, notes (api.updateGuest)
   and the reply per event (api.setRsvp). */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var PAGE = 60;
  /* UI state that survives C.render() */
  var S = { q: '', rsvp: 'all', hotel: 'all', diet: false, vip: false, limit: PAGE };
  var AUDIENCE = { all: 'All guests', family: 'Family and wedding party', party: 'Wedding party' };

  function surname(g) { return (g.household || g.name.split(' ').slice(-1)[0] || '').toLowerCase(); }
  function hotels() { var m = {}; C.api.list('accommodations').forEach(function (h) { m[h.id] = h; }); return m; }
  function events() {
    return C.api.list('events').sort(function (a, b) { return (a.day + a.start) < (b.day + b.start) ? -1 : 1; });
  }
  function filtered() {
    var q = S.q.trim().toLowerCase();
    return C.api.list('guests').filter(function (g) {
      if (q && g.name.toLowerCase().indexOf(q) < 0 && String(g.household || '').toLowerCase().indexOf(q) < 0) return false;
      if (S.rsvp !== 'all' && g.rsvp !== S.rsvp) return false;
      if (S.hotel === 'none' && g.accommodation_id) return false;
      if (S.hotel !== 'all' && S.hotel !== 'none' && g.accommodation_id !== S.hotel) return false;
      if (S.diet && !g.dietary && !g.allergies) return false;
      if (S.vip && !g.vip) return false;
      return true;
    }).sort(function (a, b) { return surname(a) < surname(b) ? -1 : surname(a) > surname(b) ? 1 : (a.name < b.name ? -1 : 1); });
  }
  function needsTags(g) {
    return (g.dietary ? '<span class="tag">' + esc(g.dietary) + '</span>' : '') +
      (g.allergies ? '<span class="tag allergy">' + ui.icon('alert') + 'Allergy: ' + esc(g.allergies) + '</span>' : '');
  }
  function stay(g, H) {
    var h = g.accommodation_id && H[g.accommodation_id];
    return h ? esc(h.name) + (g.room_type ? ', ' + esc(g.room_type) : '') : (g.room_type ? esc(g.room_type) : '');
  }

  /* ---------- the list (re-rendered on its own while the couple types in the search field) ---------- */
  function results() {
    var list = filtered(), shown = list.slice(0, S.limit), H = hotels();
    var count = '<p class="xs muted" aria-live="polite">' + (list.length > shown.length ? 'Showing ' + shown.length + ' of ' + list.length + ' guests' : fmt.plural(list.length, 'guest')) + '</p>';
    if (!list.length) return count + '<div class="empty">No guests match. Try another name or clear a filter.</div>';
    var cards = '<div class="g-cards">' + shown.map(function (g) {
      var s = stay(g, H);
      return '<button class="gcard" data-act="openGuest" data-id="' + esc(g.id) + '"><span class="row between gap-2" style="align-items:flex-start"><span class="strong">' + esc(g.name) +
        (g.vip ? ' <span class="tag vip">VIP</span>' : '') + '</span>' + ui.pill('rsvp', g.rsvp) + '</span>' +
        '<span class="xs muted">' + esc(g.side) + ' · ' + esc(g.tier) + (g.table ? ' · table ' + esc(g.table) : '') + '</span>' +
        (s ? '<span class="xs soft">' + s + '</span>' : '') + ((g.dietary || g.allergies) ? '<span class="row wrap gap-1">' + needsTags(g) + '</span>' : '') + '</button>';
    }).join('') + '</div>';
    var table = '<div class="g-table"><table class="table"><thead><tr><th>Guest</th><th>Reply</th><th>Side</th><th>Hotel and room</th><th>Arrives</th><th>Departs</th><th class="r">Table</th><th>Dietary and allergies</th></tr></thead><tbody>' +
      shown.map(function (g) {
        return '<tr class="click" data-act="openGuest" data-id="' + esc(g.id) + '"><td><span class="strong">' + esc(g.name) + '</span>' + (g.vip ? ' <span class="tag vip">VIP</span>' : '') + '<br><span class="xs muted">' + esc(g.tier) + '</span></td>' +
          '<td>' + ui.pill('rsvp', g.rsvp) + '</td><td>' + esc(g.side) + '</td><td>' + (stay(g, H) || '<span class="muted">–</span>') + '</td>' +
          '<td class="nowrap">' + (g.arrival ? fmt.dow(g.arrival) + ' ' + fmt.date(g.arrival) : '<span class="muted">–</span>') + '</td>' +
          '<td class="nowrap">' + (g.departure ? fmt.dow(g.departure) + ' ' + fmt.date(g.departure) : '<span class="muted">–</span>') + '</td>' +
          '<td class="r">' + (g.table ? esc(g.table) : '<span class="muted">–</span>') + '</td><td><span class="row wrap gap-1">' + (needsTags(g) || '<span class="muted">–</span>') + '</span></td></tr>';
      }).join('') + '</tbody></table></div>';
    var more = list.length > shown.length ? '<button class="btn block" data-act="guestMore">Show ' + Math.min(PAGE, list.length - shown.length) + ' more of ' + (list.length - shown.length) + '</button>' : '';
    return count + cards + table + more;
  }

  function tiles(h) {
    function t(n, l, cls) { return '<div class="tile stat"><div class="n num ' + (cls || '') + '">' + n + '</div><div class="l">' + l + '</div></div>'; }
    return '<section class="tiles">' + t(h.invited, 'Invited') + t(h.yes, 'Attending') + t(h.no, 'Declined') +
      t(h.pending, 'No reply yet', h.pending ? 'tone-warn' : '') + t(h.forecast, 'Expected on the day') + '</section>';
  }

  function perEvent() {
    var ev = events(), rs = C.api.list('guest_event_rsvps');
    if (!ev.length) return '';
    var by = {};
    rs.forEach(function (r) { var x = by[r.event_id] || (by[r.event_id] = { yes: 0, no: 0, pending: 0, total: 0 }); x[r.status] = (x[r.status] || 0) + 1; x.total++; });
    var max = 0; ev.forEach(function (e) { max = Math.max(max, (by[e.id] || {}).total || 0); });
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Replies per event</h2>' +
      '<div class="legend" aria-hidden="true"><span><i class="sw sw-paid"></i>Attending</span><span><i class="sw sw-pend"></i>No reply</span><span><i class="sw sw-track"></i>Declined</span></div></div>' +
      '<ul class="ev-counts">' + ev.map(function (e) {
        var x = by[e.id] || { yes: 0, no: 0, pending: 0, total: 0 };
        var s = function (v) { return max ? (v / max * 100).toFixed(2) : 0; };
        return '<li><div class="row between gap-2"><span class="small strong truncate">' + esc(e.name) + '</span><span class="xs muted nowrap">' + fmt.dow(e.day) + ' ' + esc(e.start) + '</span></div>' +
          '<div class="stack" role="img" aria-label="' + x.yes + ' attending, ' + x.pending + ' no reply, ' + x.no + ' declined">' +
          '<i class="s-yes" style="width:' + s(x.yes) + '%"></i><i class="s-pend" style="width:' + s(x.pending) + '%"></i><i class="s-no" style="width:' + s(x.no) + '%"></i></div>' +
          '<span class="xs soft num"><span class="strong" style="color:var(--ink)">' + x.yes + ' attending</span> of ' + x.total + ' invited' + (x.pending ? ' · ' + x.pending + ' no reply' : '') + (x.no ? ' · ' + x.no + ' declined' : '') +
          ' · ' + esc(AUDIENCE[e.audience] || e.audience) + '</span></li>';
      }).join('') + '</ul></section>';
  }

  function hotelBlock() {
    var list = C.api.list('accommodations'), guests = C.api.list('guests');
    if (!list.length) return '<section class="panel panel-pad col gap-2"><h2 class="display d-sm">Hotels</h2><p class="small muted">Room blocks appear here once they are agreed.</p></section>';
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Hotels</h2><span class="xs muted">Rooms claimed of each block</span></div>' +
      '<ul class="hotels">' + list.map(function (h) {
        var staying = guests.filter(function (g) { return g.accommodation_id === h.id && g.rsvp !== 'no'; }).length;
        var left = Math.max(0, h.block_size - h.claimed), days = fmt.daysUntil(h.release_date), released = days < 0;
        var line = released ? 'Block released ' + fmt.dateY(h.release_date) + (left ? '. ' + fmt.plural(left, 'unclaimed room') + ' went back to the hotel.' : '. Every room was claimed.')
          : 'Unclaimed rooms go back on ' + fmt.dateY(h.release_date) + ', ' + fmt.due(h.release_date).text + (left ? '. ' + fmt.plural(left, 'room') + ' still free.' : '.');
        return '<li class="col gap-2"><div class="row between gap-2" style="align-items:flex-start"><div class="col gap-1"><span class="small strong">' + esc(h.name) + '</span><span class="xs muted">' + esc(h.town || '') + (h.note ? ' · ' + esc(h.note) : '') + '</span></div>' +
          (h.hosted ? '<span class="pill wed">Hosted</span>' : '<span class="pill">Guest-paid</span>') + '</div>' +
          ui.bar(fmt.pct(h.claimed, h.block_size), 'wed') +
          '<div class="row between gap-2 xs"><span class="num"><span class="strong">' + h.claimed + ' of ' + h.block_size + '</span> rooms claimed · ' + fmt.plural(staying, 'guest') + '</span></div>' +
          '<span class="xs ' + (!released && days <= 7 && left ? 'tone-warn' : 'muted') + '">' + line + '</span></li>';
      }).join('') + '</ul></section>';
  }

  function filters() {
    var H = C.api.list('accommodations');
    return '<div class="col gap-3 gfilters">' +
      '<label class="field"><span class="xs muted">Search by name</span><input class="input" type="search" id="guest-q" data-input="guestSearch" value="' + esc(S.q) + '" placeholder="For example: Bennett" autocomplete="off"></label>' +
      '<div class="filters two">' +
      '<label class="field"><span class="xs muted">Reply</span><select class="select" id="guest-rsvp" data-change="guestRsvpFilter">' +
      [['all', 'Every reply'], ['yes', 'Attending'], ['no', 'Declined'], ['pending', 'No reply yet']].map(function (o) {
        return '<option value="' + o[0] + '"' + (S.rsvp === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>' +
      '<label class="field"><span class="xs muted">Hotel</span><select class="select" id="guest-hotel" data-change="guestHotel"><option value="all">Every hotel</option>' +
      H.map(function (h) { return '<option value="' + esc(h.id) + '"' + (S.hotel === h.id ? ' selected' : '') + '>' + esc(h.name) + '</option>'; }).join('') +
      '<option value="none"' + (S.hotel === 'none' ? ' selected' : '') + '>No hotel with us</option></select></label></div>' +
      '<div class="row wrap gap-4"><label class="check"><input type="checkbox" id="guest-diet" data-change="guestDiet"' + (S.diet ? ' checked' : '') + '> Dietary need or allergy</label>' +
      '<label class="check"><input type="checkbox" id="guest-vip" data-change="guestVip"' + (S.vip ? ' checked' : '') + '> VIP only</label></div></div>';
  }

  C.screens.guests = function () {
    var h = C.api.headcount(C.w.id);
    var head = C.head('Guests', 'Your guests', h.invited ? fmt.plural(h.yes, 'guest') + ' attending of ' + h.invited + ' invited. Tap anyone to see their weekend or change their details.' : '');
    if (!h.invited) return head + C.empty('Your guest list appears here once we start collecting replies.');
    return head + tiles(h) +
      '<div class="ggrid">' + perEvent() + hotelBlock() + '</div>' +
      '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Guest list</h2></div>' + filters() +
      '<div id="guest-results" class="col gap-3">' + results() + '</div></section>';
  };

  function refreshList() { var box = document.getElementById('guest-results'); if (box) box.innerHTML = results(); else C.render(); }
  C.inputs.guestSearch = function (el) { S.q = el.value; S.limit = PAGE; refreshList(); };
  C.changes.guestRsvpFilter = function (el) { S.rsvp = el.value; S.limit = PAGE; C.render(); };
  C.changes.guestHotel = function (el) { S.hotel = el.value; S.limit = PAGE; C.render(); };
  C.changes.guestDiet = function (el) { S.diet = el.checked; S.limit = PAGE; C.render(); };
  C.changes.guestVip = function (el) { S.vip = el.checked; S.limit = PAGE; C.render(); };
  C.actions.guestMore = function () { S.limit += PAGE; refreshList(); };

  /* ---------- guest sheet ---------- */
  var RSVP = [['yes', 'Attending'], ['no', 'Declined'], ['pending', 'No reply yet']];
  C.actions.openGuest = function (el) {
    var g = C.api.get('guests', el.getAttribute('data-id'));
    if (!g) return;
    var H = hotels(), h = g.accommodation_id && H[g.accommodation_id];
    var evById = {}; events().forEach(function (e) { evById[e.id] = e; });
    var mine = C.api.list('guest_event_rsvps', { guest_id: g.id }).filter(function (r) { return evById[r.event_id]; })
      .sort(function (a, b) { var x = evById[a.event_id], y = evById[b.event_id]; return (x.day + x.start) < (y.day + y.start) ? -1 : 1; });
    function kv(k, v) { return v ? '<dt>' + k + '</dt><dd>' + v + '</dd>' : ''; }
    var info = '<dl class="kv">' +
      kv('Hotel', h ? esc(h.name) : (g.rsvp === 'yes' ? 'Own arrangements' : '')) + kv('Room', esc(g.room_type)) +
      kv('Hosted nights', g.nights_hosted ? String(g.nights_hosted) : '') +
      kv('Arrives', g.arrival ? fmt.dateLong(g.arrival) : '') + kv('Departs', g.departure ? fmt.dateLong(g.departure) : '') +
      kv('Flight', esc(g.flight)) + kv('Transfer', esc(g.transfer)) + kv('Table', g.table ? esc(g.table) : '') +
      kv('Email', esc(g.email)) + '</dl>';
    var perEventHtml = mine.length ? '<hr class="rule"><div class="col gap-3"><span class="strong small">Reply per event</span>' + mine.map(function (r) {
      var e = evById[r.event_id];
      return '<div class="ev-rsvp"><div class="col gap-1"><span class="small strong">' + esc(e.name) + '</span><span class="xs muted">' + fmt.dow(e.day) + ' ' + fmt.date(e.day) + ', ' + esc(e.start) + '</span></div>' +
        '<div class="seg cseg" role="group" aria-label="Reply for ' + esc(e.name) + '">' + [['yes', 'Yes'], ['no', 'No'], ['pending', 'Not yet']].map(function (o) {
          return '<button type="button" class="' + (r.status === o[0] ? 'on' : '') + '" aria-pressed="' + (r.status === o[0]) + '" data-act="guestEventRsvp" data-guest="' + esc(g.id) + '" data-event="' + esc(e.id) + '" data-status="' + o[0] + '">' + o[1] + '</button>';
        }).join('') + '</div></div>';
    }).join('') + '</div>' : '';
    var form = '<hr class="rule"><form class="col gap-4" data-form="guest" data-id="' + esc(g.id) + '"><span class="strong small">Details you can change</span>' +
      '<fieldset class="field bare"><legend class="small">Overall reply</legend><div class="radio-seg">' + RSVP.map(function (o) {
        return '<label><input type="radio" name="rsvp" value="' + o[0] + '"' + (g.rsvp === o[0] ? ' checked' : '') + '><span>' + o[1] + '</span></label>';
      }).join('') + '</div></fieldset>' +
      '<label class="field"><span>Dietary needs</span><input class="input" name="dietary" id="g-dietary" value="' + esc(g.dietary) + '" placeholder="For example: vegetarian"></label>' +
      '<label class="field"><span>Allergies</span><input class="input" name="allergies" id="g-allergies" value="' + esc(g.allergies) + '" placeholder="For example: tree nuts"></label>' +
      '<label class="field"><span>Notes for the team</span><textarea class="textarea" name="notes" id="g-notes">' + esc(g.notes) + '</textarea></label>' +
      '<button class="btn accent" type="submit">Save changes</button></form>';
    ui.sheet('<span class="eyebrow">Guest' + (g.vip ? ' · VIP' : '') + '</span><h3 class="display d-md">' + esc(g.name) + '</h3>' +
      '<div class="row wrap gap-2">' + ui.pill('rsvp', g.rsvp) + '<span class="small muted">' + esc(g.side) + ' side · ' + esc(g.tier) + (g.language && g.language !== 'English' ? ' · speaks ' + esc(g.language) : '') + '</span></div>' +
      (g.allergies ? '<p class="allergy-note small">' + ui.icon('alert') + '<span><span class="strong">Allergy: ' + esc(g.allergies) + '.</span> Keep this up to date: the team uses it for every meal of the weekend.</span></p>' : '') +
      info + perEventHtml + form);
  };
  C.actions.guestEventRsvp = function (el) {
    var status = el.getAttribute('data-status');
    C.api.setRsvp(el.getAttribute('data-guest'), el.getAttribute('data-event'), status);
    Array.prototype.forEach.call(el.parentNode.querySelectorAll('button'), function (b) {
      var on = b === el; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
    });
    ui.toast('Saved. The team sees it now.');
  };
  C.forms.guest = function (f) {
    var checked = f.querySelector('input[name="rsvp"]:checked');
    C.api.updateGuest(f.getAttribute('data-id'), {
      rsvp: checked ? checked.value : undefined, dietary: f.elements.dietary.value.trim(),
      allergies: f.elements.allergies.value.trim(), notes: f.elements.notes.value.trim()
    });
    ui.closeSheet(); C.render(); ui.toast('Saved. The team sees it now.');
  };
})();
