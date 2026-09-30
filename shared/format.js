/* VKRI prototype: pure formatting helpers (no DOM). VKRI.fmt.* */
(function (root) {
  'use strict';
  var VKRI = root.VKRI;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function d(iso) { return new Date(iso.length === 10 ? iso + 'T12:00:00Z' : iso); }
  function group(n) { return String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function todayIso() { return VKRI.now().toISOString().slice(0, 10); }

  VKRI.fmt = {
    /* eur(12400) -> "€12,400"; eur(-2400, true) -> "-€2,400"; signed adds "+" */
    eur: function (n, signed) { return (n < 0 ? '-' : (signed && n > 0 ? '+' : '')) + '€' + group(n); },
    /* eurK(720000) -> "€720k"; eurK(12400) -> "€12.4k" */
    eurK: function (n) {
      var a = Math.abs(n), s = n < 0 ? '-' : '';
      if (a >= 1e6) return s + '€' + (a / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'm';
      if (a >= 1000) return s + '€' + (a / 1000).toFixed(a >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'k';
      return s + '€' + a;
    },
    usd: function (eur, rate) { return '$' + group(eur * rate); },
    num: function (n) { return group(n); },
    pct: function (a, b) { return b ? Math.round(a / b * 100) : 0; },
    /* date('2027-06-12') -> "12 Jun"; dateY -> "12 Jun 2027"; dateLong -> "Saturday 12 June" */
    date: function (iso) { if (!iso) return ''; var x = d(iso); return x.getUTCDate() + ' ' + MONTHS[x.getUTCMonth()]; },
    dateY: function (iso) { if (!iso) return ''; var x = d(iso); return x.getUTCDate() + ' ' + MONTHS[x.getUTCMonth()] + ' ' + x.getUTCFullYear(); },
    dow: function (iso) { return DAYS[d(iso).getUTCDay()]; },
    dateLong: function (iso) { return d(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }); },
    range: function (a, b) {
      var x = d(a), y = d(b);
      return x.getUTCMonth() === y.getUTCMonth() ? x.getUTCDate() + '–' + y.getUTCDate() + ' ' + MONTHS[y.getUTCMonth()] + ' ' + y.getUTCFullYear()
        : VKRI.fmt.date(a) + ' – ' + VKRI.fmt.dateY(b);
    },
    today: todayIso,
    /* daysUntil('2027-06-12') -> 26 (negative when past) */
    daysUntil: function (iso) { return Math.round((d(iso.slice(0, 10)) - d(todayIso())) / 864e5); },
    /* due('2027-05-21') -> { text: 'in 4 days', tone: 'soon' | 'late' | 'ok' | 'today' } */
    due: function (iso) {
      var n = VKRI.fmt.daysUntil(iso);
      if (n < 0) return { text: -n + (n === -1 ? ' day late' : ' days late'), tone: 'late' };
      if (n === 0) return { text: 'today', tone: 'today' };
      if (n === 1) return { text: 'tomorrow', tone: 'soon' };
      return { text: 'in ' + n + ' days', tone: n <= 7 ? 'soon' : 'ok' };
    },
    /* weeksOut('2027-06-12') -> "T-4 weeks" */
    weeksOut: function (iso) { var n = VKRI.fmt.daysUntil(iso); return n < 0 ? 'Done' : n < 14 ? 'T-' + n + ' days' : 'T-' + Math.round(n / 7) + ' weeks'; },
    /* hoursBetween(isoA, isoB) -> number (B - A) */
    hoursBetween: function (a, b) { return (new Date(b) - new Date(a)) / 36e5; },
    /* ago('2027-05-16T22:40:00Z') -> "10h ago" / "3 days ago" */
    ago: function (iso) {
      var h = VKRI.fmt.hoursBetween(iso, VKRI.now().toISOString());
      if (h < 1) return Math.max(1, Math.round(h * 60)) + ' min ago';
      if (h < 36) return Math.round(h) + 'h ago';
      return Math.round(h / 24) + ' days ago';
    },
    dur: function (h) { return h < 1 ? Math.round(h * 60) + ' min' : h < 48 ? Math.round(h) + 'h' : Math.round(h / 24) + ' days'; },
    /* timeIn('2027-05-17T01:15:00Z', 'America/New_York') -> "Sun 21:15" */
    timeIn: function (iso, tz) {
      return new Date(iso).toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).replace(',', '');
    },
    dateTimeIn: function (iso, tz) {
      return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).replace(',', '');
    },
    /* localTimeAs('2027-06-12', '17:00', 'Europe/Rome', 'America/New_York') -> "11:00" : a wall-clock time at the venue, shown in the couple's zone */
    localTimeAs: function (day, hm, fromTz, toTz) {
      var guess = new Date(day + 'T' + hm + ':00Z');
      var shown = new Date(guess.toLocaleString('en-US', { timeZone: fromTz }));
      var utc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }));
      var real = new Date(guess.getTime() - (shown - utc));
      return real.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: toTz });
    },
    tzCity: function (tz) { return tz.split('/').pop().replace(/_/g, ' '); },
    initials: function (name) { return name.split(/[ &]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); },
    plural: function (n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
