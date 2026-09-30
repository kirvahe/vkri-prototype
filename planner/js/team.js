/* Planner CRM: Team screen. Titles are labels; every planner has the same rights. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  P.screens.team = function () {
    var api = P.api, ws = P.weddings(), tasks = api.list('tasks'), now = VKRI.now().toISOString();
    return '<div class="page-head"><div class="col gap-2"><span class="eyebrow">Six planners, equal access</span><h1 class="display d-lg">Team</h1></div></div><div class="three">' +
      api.list('users', { type: 'planner' }).map(function (u) {
        var mine = tasks.filter(function (t) { return t.assignee_id === u.id && t.status !== 'done'; });
        var late = mine.filter(function (t) { return fmt.daysUntil(t.due) < 0; }).length;
        var week = mine.filter(function (t) { var d = fmt.daysUntil(t.due); return d >= 0 && d <= 7; }).length;
        var leads = ws.filter(function (w) { return w.lead_id === u.id; });
        return '<section class="panel person"><div class="row gap-3">' + ui.avatar(u, 'lg') + '<div class="col gap-1"><span class="strong">' + esc(u.name) + '</span><span class="small muted">' + esc(u.title) + '</span></div></div>' +
          '<dl class="kv"><dt>Based in</dt><dd>' + esc(u.based) + ' · now ' + fmt.timeIn(now, u.tz) + '</dd><dt>Hours</dt><dd>' + esc(u.hours) + '</dd><dt>Speaks</dt><dd>' + esc(u.languages.join(', ')) + '</dd>' +
          '<dt>Leads</dt><dd>' + (leads.length ? leads.map(function (w) { return esc(w.title); }).join(', ') : '–') + '</dd><dt>Contact</dt><dd>' + esc(u.email) + '<br>' + esc(u.phone) + '</dd></dl>' +
          '<div class="row wrap gap-2"><span class="pill plain">' + mine.length + ' open</span>' + (week ? '<span class="pill info">' + week + ' due this week</span>' : '') + (late ? '<span class="pill crit">' + late + ' late</span>' : '') + '</div>' +
          '<div class="col gap-2">' + ws.map(function (w) {
            var n = mine.filter(function (t) { return t.wedding_id === w.id; }).length, max = Math.max(1, mine.length);
            return n ? '<div data-wedding="' + w.id + '"><div class="row between xs"><a class="link" href="#/w/' + w.id + '/tasks">' + esc(w.title) + '</a><span class="num">' + n + '</span></div>' + ui.bar(n / max * 100, 'wed thin') + '</div>' : '';
          }).join('') + '</div></section>';
      }).join('') + '</div>';
  };
})();
