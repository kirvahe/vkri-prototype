/* Couple portal: Weekend (#/weekend). The programme day by day: each event at the venue's time and in the
   couple's home time zone, place, dress code, who is invited, how many are coming, notes and Plan B;
   then the published risks as "if this, then that" cards, and local notes. */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var AUDIENCE = { all: 'All guests', family: 'Family and wedding party', party: 'Wedding party' };

  function homeTime(w, day, hm) {
    try { return fmt.localTimeAs(day, hm, w.local_tz, w.home_tz); } catch (e) { return ''; }
  }
  function riskTone(status) {
    var s = String(status || '').toLowerCase();
    return /covered|ready|in place|confirmed/.test(s) ? 'good' : /overdue|late/.test(s) ? 'crit' : /decision|couple|you|open/.test(s) ? 'warn' : '';
  }

  function eventCard(w, e, counts) {
    var x = counts[e.id] || { yes: 0, total: 0 }, home = homeTime(w, e.day, e.start), homeEnd = e.end ? homeTime(w, e.day, e.end) : '';
    return '<article class="ev"><div class="ev-time"><span class="display d-sm num">' + esc(e.start) + '</span>' +
      (e.end ? '<span class="xs muted num">to ' + esc(e.end) + '</span>' : '') +
      (home ? '<span class="xs soft num home">' + home + (homeEnd ? '–' + homeEnd : '') + '<br>' + esc(C.homeCity()) + '</span>' : '') + '</div>' +
      '<div class="col gap-2 grow"><h3 class="strong">' + esc(e.name) + '</h3><p class="small soft">' + esc(e.location) + '</p>' +
      '<dl class="kv xs">' + (e.dress_code ? '<dt>Dress code</dt><dd>' + esc(e.dress_code) + '</dd>' : '') +
      '<dt>Invited</dt><dd>' + esc(AUDIENCE[e.audience] || e.audience || 'All guests') + '</dd>' +
      '<dt>Coming</dt><dd class="num"><span class="strong">' + x.yes + '</span> of ' + x.total + ' invited</dd></dl>' +
      (e.note ? '<p class="small">' + esc(e.note) + '</p>' : '') +
      (e.plan_b ? '<p class="planb small"><span class="eyebrow">Plan B</span><span>' + esc(e.plan_b) + '</span></p>' : '') + '</div></article>';
  }

  C.screens.weekend = function () {
    var w = C.w, api = C.api;
    var ev = api.list('events').sort(function (a, b) { return (a.day + a.start) < (b.day + b.start) ? -1 : 1; });
    var counts = {};
    api.list('guest_event_rsvps').forEach(function (r) { var x = counts[r.event_id] || (counts[r.event_id] = { yes: 0, total: 0 }); x.total++; if (r.status === 'yes') x.yes++; });
    var days = [], byDay = {};
    ev.forEach(function (e) { if (!byDay[e.day]) { byDay[e.day] = []; days.push(e.day); } byDay[e.day].push(e); });
    var head = C.head('The weekend', fmt.range(w.start_date, w.end_date), 'Times are local to ' + esc(w.venue && w.venue.town || w.destination) + '. Under each one: the same moment in ' + esc(fmt.tzCity(w.home_tz)) + '.');
    var daysHtml = days.length ? '<div class="days">' + days.map(function (d) {
      return '<section class="day col gap-3"><div class="day-head"><span class="eyebrow">' + (d === w.wedding_day ? 'Wedding day' : 'Day ' + (days.indexOf(d) + 1)) + '</span>' +
        '<h2 class="display d-sm">' + fmt.dateLong(d) + '</h2></div><div class="col gap-3">' + byDay[d].map(function (e) { return eventCard(w, e, counts); }).join('') + '</div></section>';
    }).join('') + '</div>' : C.empty('Your programme appears here once the first draft is agreed.');

    var risks = api.list('risks');
    var riskHtml = risks.length ? '<section class="col gap-3"><div class="sec-head"><h2 class="display d-md">If plans need to change</h2><span class="small muted">Plan B for what we cannot control</span></div>' +
      '<div class="risk-grid">' + risks.map(function (r) {
        var tone = riskTone(r.status);
        return '<article class="panel panel-pad col gap-2 risk"><span class="eyebrow">If</span><h3 class="strong">' + esc(r.title) + '</h3>' +
          '<p class="small"><span class="soft">Then: </span>' + esc(r.plan_b) + '</p>' +
          (r.trigger ? '<p class="xs muted">We decide on: ' + esc(r.trigger) + '</p>' : '') +
          '<div class="row between gap-2 wrap">' + (r.status ? '<span class="pill ' + tone + '">' + esc(r.status) + '</span>' : '') +
          (r.owner_id && C.userName(r.owner_id) ? '<span class="xs muted">' + esc(C.userName(r.owner_id)) + ' watches this</span>' : '') + '</div></article>';
      }).join('') + '</div></section>' : '';

    var notes = w.local_notes || [];
    var notesHtml = notes.length ? '<section class="col gap-3"><h2 class="display d-sm">Good to know</h2><div class="risk-grid">' + notes.map(function (n) {
      return '<article class="panel panel-pad col gap-2"><p class="small strong">' + esc(n.title) + '</p><p class="small soft">' + esc(n.text) + '</p></article>';
    }).join('') + '</div></section>' : '';

    return head + daysHtml + riskHtml + notesHtml;
  };
})();
