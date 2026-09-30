/* Planner CRM: Guests tab. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var state = { q: '', rsvp: 'all', hotel: 'all', flag: 'all', limit: 40, wid: null };

  P.tabs.guests = function (w) {
    if (state.wid !== w.id) { state = { q: '', rsvp: 'all', hotel: 'all', flag: 'all', limit: 40, wid: w.id }; }
    var api = P.api, h = api.headcount(w.id), guests = api.list('guests', { wedding_id: w.id });
    var hotels = api.list('accommodations', { wedding_id: w.id }), hotelName = {}; hotels.forEach(function (x) { hotelName[x.id] = x.name; });
    var events = api.list('events', { wedding_id: w.id }), rsvps = api.list('guest_event_rsvps', { wedding_id: w.id });
    var diets = {}, allergies = 0;
    guests.forEach(function (g) { if (g.rsvp !== 'no') { if (g.dietary) diets[g.dietary] = (diets[g.dietary] || 0) + 1; if (g.allergies) allergies++; } });

    var stats = '<div class="panel stats">' +
      '<div class="stat"><div class="n">' + h.invited + '</div><div class="l">invited</div></div>' +
      '<div class="stat"><div class="n tone-good">' + h.yes + '</div><div class="l">attending</div></div>' +
      '<div class="stat"><div class="n">' + h.no + '</div><div class="l">declined</div></div>' +
      '<div class="stat"><div class="n ' + (h.pending ? 'tone-warn' : '') + '">' + h.pending + '</div><div class="l">no reply yet</div></div>' +
      '<div class="stat"><div class="n">' + h.forecast + '</div><div class="l">forecast for the caterer</div></div></div>';

    var ev = '<section class="panel"><div class="panel-head"><h3 class="strong">By event</h3></div><div class="table-wrap"><table class="table compact"><thead><tr><th>Event</th><th class="r">Invited</th><th class="r">Yes</th><th class="r">No reply</th></tr></thead><tbody>' +
      events.map(function (e) {
        var r = rsvps.filter(function (x) { return x.event_id === e.id; });
        return '<tr><td><span class="strong">' + esc(e.name) + '</span><br><span class="xs muted">' + fmt.dow(e.day) + ' ' + e.start + '</span></td><td class="r">' + r.length + '</td><td class="r strong">' + r.filter(function (x) { return x.status === 'yes'; }).length + '</td><td class="r">' + r.filter(function (x) { return x.status === 'pending'; }).length + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';

    var rooms = '<section class="panel"><div class="panel-head"><h3 class="strong">Room blocks</h3></div><div class="list">' + hotels.map(function (x) {
      var used = guests.filter(function (g) { return g.accommodation_id === x.id; }).length;
      return '<div class="panel-pad col gap-2"><div class="row between wrap"><span class="strong">' + esc(x.name) + ' <span class="muted small" style="font-weight:400">' + esc(x.town) + '</span></span>' + (x.hosted ? '<span class="pill wed plain">Hosted</span>' : '<span class="pill plain">Guest-paid</span>') + '</div>' +
        ui.bar(fmt.pct(x.claimed, x.block_size), 'wed thin') + '<div class="row between xs muted"><span>' + x.claimed + ' of ' + x.block_size + ' rooms claimed · ' + used + ' guests</span><span>' + (fmt.daysUntil(x.release_date) < 0 ? 'Unclaimed rooms released ' + fmt.date(x.release_date) : 'Release ' + P.dueHtml(x.release_date)) + '</span></div>' +
        '<p class="xs muted">' + esc(x.note || '') + '</p></div>';
    }).join('') + '</div></section>';

    var diet = '<section class="panel"><div class="panel-head"><h3 class="strong">Dietary sheet</h3><span class="xs muted">' + allergies + ' with allergies</span></div><div class="panel-pad chips">' +
      (Object.keys(diets).length ? Object.keys(diets).sort(function (a, c) { return diets[c] - diets[a]; }).map(function (k) { return '<span class="chip">' + esc(k) + ' · ' + diets[k] + '</span>'; }).join('') : '<span class="small muted">No dietary needs recorded.</span>') + '</div></section>';

    var q = state.q.toLowerCase();
    var rows = guests.filter(function (g) {
      return (!q || g.name.toLowerCase().indexOf(q) > -1 || (g.notes || '').toLowerCase().indexOf(q) > -1) &&
        (state.rsvp === 'all' || g.rsvp === state.rsvp) && (state.hotel === 'all' || g.accommodation_id === state.hotel || (state.hotel === 'none' && !g.accommodation_id)) &&
        (state.flag === 'all' || (state.flag === 'vip' && g.vip) || (state.flag === 'diet' && (g.dietary || g.allergies)) || (state.flag === 'notes' && g.internal_notes));
    });
    function opt(v, label, cur) { return '<option value="' + v + '"' + (cur === v ? ' selected' : '') + '>' + label + '</option>'; }
    var table = '<section class="panel"><div class="panel-head"><h3 class="strong">Guest list</h3><span class="xs muted">' + rows.length + ' of ' + guests.length + '</span></div>' +
      '<div class="toolbar"><input class="input" id="guest-q" type="search" placeholder="Search a name or a note" value="' + esc(state.q) + '" data-input="guestQ" aria-label="Search guests">' +
      '<select class="select" id="guest-rsvp" data-change="guestF" data-k="rsvp" aria-label="RSVP">' + opt('all', 'Any reply', state.rsvp) + opt('yes', 'Attending', state.rsvp) + opt('pending', 'No reply yet', state.rsvp) + opt('no', 'Declined', state.rsvp) + '</select>' +
      '<select class="select" id="guest-hotel" data-change="guestF" data-k="hotel" aria-label="Hotel">' + opt('all', 'Any hotel', state.hotel) + hotels.map(function (x) { return opt(x.id, esc(x.name), state.hotel); }).join('') + opt('none', 'Own arrangements', state.hotel) + '</select>' +
      '<select class="select" id="guest-flag" data-change="guestF" data-k="flag" aria-label="Show">' + opt('all', 'Everyone', state.flag) + opt('vip', 'VIP', state.flag) + opt('diet', 'Dietary or allergy', state.flag) + opt('notes', 'With internal notes', state.flag) + '</select></div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>Guest</th><th>Side</th><th>Reply</th><th>Hotel</th><th>Arrives</th><th>Transfer</th><th>Diet</th><th class="r">Table</th></tr></thead><tbody>' +
      (rows.length ? rows.slice(0, state.limit).map(function (g) {
        return '<tr class="click" data-act="guest" data-id="' + g.id + '"><td><span class="strong">' + esc(g.name) + '</span>' + (g.vip ? ' <span class="tag">VIP</span>' : '') + (g.internal_notes ? ' <span class="muted" title="Has an internal note">' + ui.icon('lock') + '</span>' : '') + (g.notes ? '<br><span class="xs muted">' + esc(g.notes) + '</span>' : '') + '</td>' +
          '<td>' + esc(g.side) + '<br><span class="xs muted">' + esc(g.tier) + '</span></td><td>' + ui.pill('rsvp', g.rsvp) + '</td><td>' + esc(hotelName[g.accommodation_id] || g.room_type || '–') + (g.accommodation_id ? '<br><span class="xs muted">' + esc(g.room_type) + (g.nights_hosted ? ' · ' + g.nights_hosted + ' nights hosted' : '') + '</span>' : '') + '</td>' +
          '<td class="nowrap">' + (g.arrival ? fmt.date(g.arrival) + ' – ' + fmt.date(g.departure) : '–') + '</td><td>' + esc(g.transfer || '–') + '</td><td>' + esc([g.dietary, g.allergies ? 'Allergy: ' + g.allergies : ''].filter(Boolean).join(' · ') || '–') + '</td><td class="r">' + (g.table || '–') + '</td></tr>';
      }).join('') : '<tr><td colspan="8" class="empty">No guests match these filters.</td></tr>') + '</tbody></table></div>' +
      (rows.length > state.limit ? '<div class="panel-pad" style="text-align:center"><button class="btn sm" data-act="guestMore">Show ' + Math.min(40, rows.length - state.limit) + ' more</button></div>' : '') + '</section>';

    return stats + '<div class="three">' + ev + rooms + diet + '</div>' + table;
  };

  P.inputs.guestQ = function (el) { state.q = el.value; state.limit = 40; };
  P.changes.guestF = function (el) { state[el.getAttribute('data-k')] = el.value; state.limit = 40; P.render(); };
  P.actions.guestMore = function () { state.limit += 40; P.render(); };
  P.actions.guest = function (el) {
    var api = P.api, g = api.get('guests', el.getAttribute('data-id')), hotel = g.accommodation_id && api.get('accommodations', g.accommodation_id);
    var events = api.list('events', { wedding_id: g.wedding_id }), mine = {};
    api.list('guest_event_rsvps', { guest_id: g.id }).forEach(function (r) { mine[r.event_id] = r.status; });
    ui.sheet('<span class="eyebrow">' + esc(g.tier) + ' · ' + esc(g.side) + '</span><h3 class="display d-md">' + esc(g.name) + '</h3><div class="row wrap gap-2">' + ui.pill('rsvp', g.rsvp) + (g.vip ? '<span class="tag">VIP</span>' : '') + '</div>' +
      '<dl class="kv"><dt>Hotel</dt><dd>' + esc(hotel ? hotel.name + ', ' + g.room_type : g.room_type || 'Not assigned') + (g.nights_hosted ? ' · ' + g.nights_hosted + ' nights hosted' : '') + '</dd>' +
      '<dt>Travel</dt><dd>' + (g.arrival ? fmt.dateY(g.arrival) + ' to ' + fmt.dateY(g.departure) : 'Not known yet') + (g.flight ? ' · ' + esc(g.flight) : '') + '</dd><dt>Transfer</dt><dd>' + esc(g.transfer || 'Not assigned') + '</dd>' +
      '<dt>Diet</dt><dd>' + esc(g.dietary || 'None') + '</dd><dt>Allergies</dt><dd>' + esc(g.allergies || 'None') + '</dd><dt>Table</dt><dd>' + (g.table || 'Not seated') + '</dd><dt>Email</dt><dd>' + esc(g.email) + '</dd>' +
      (g.notes ? '<dt>Notes</dt><dd>' + esc(g.notes) + '</dd>' : '') + '</dl>' +
      (g.internal_notes ? '<div class="panel internal-panel panel-pad small">' + ui.visibilityTag(true) + '<p style="margin-top:6px">' + esc(g.internal_notes) + '</p></div>' : '') +
      '<div><p class="eyebrow">Events</p><ul class="plain-list">' + events.map(function (e) {
        return '<li class="row between"><span>' + esc(e.name) + ' <span class="muted">' + fmt.dow(e.day) + '</span></span>' + (mine[e.id] ? ui.pill('rsvp', mine[e.id]) : '<span class="xs muted">Not invited</span>') + '</li>';
      }).join('') + '</ul></div>');
  };
})();
