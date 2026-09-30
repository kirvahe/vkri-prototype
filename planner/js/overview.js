/* Planner CRM: wedding Overview tab (the wedding card, risks and Plan B, milestones, recent activity). */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  function li(items) { return items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join(''); }
  function panel(title, body, extra) { return '<section class="panel ' + (extra || '') + '"><div class="panel-head"><h3 class="strong">' + title + '</h3></div>' + body + '</section>'; }

  P.tabs.overview = function (w) {
    var api = P.api, b = api.budget(w.id), h = api.headcount(w.id), holds = api.holds(w.id), now = VKRI.now().toISOString();
    var risks = api.list('risks', { wedding_id: w.id });
    var log = api.list('activity_log', { wedding_id: w.id }).sort(function (a, c) { return a.at < c.at ? 1 : -1; }).slice(0, 7);
    var stats = '<div class="panel stats">' +
      '<div class="stat"><div class="n">' + Math.max(fmt.daysUntil(w.wedding_day), 0) + '</div><div class="l">days to ' + fmt.date(w.wedding_day) + '</div></div>' +
      '<div class="stat"><div class="n">' + h.yes + '<span class="small muted"> / ' + h.invited + '</span></div><div class="l">guests confirmed · ' + h.pending + ' no reply</div></div>' +
      '<div class="stat"><div class="n ' + (b.over ? 'tone-crit' : '') + '">' + fmt.eurK(b.forecast) + '</div><div class="l">forecast of ' + fmt.eurK(b.envelope) + (b.over ? ' · over by ' + fmt.eurK(-b.remaining) : '') + '</div></div>' +
      '<div class="stat"><div class="n">' + fmt.eurK(b.paid) + '</div><div class="l">paid · ' + fmt.pct(b.paid, b.forecast) + '% of forecast</div></div>' +
      '<div class="stat"><div class="n ' + (holds.yours ? 'tone-warn' : '') + '">' + holds.yours + '</div><div class="l">waiting on the couple</div></div></div>';

    var couple = panel('The couple', '<div class="panel-pad col gap-3"><dl class="kv"><dt>Names</dt><dd>' + esc(w.couple_names) + '</dd><dt>Home</dt><dd>' + esc(w.home_city) + ' · now ' + fmt.timeIn(now, w.home_tz) + ' there</dd>' +
      '<dt>Venue</dt><dd>' + esc(w.venue.name) + ', ' + esc(w.venue.town) + '</dd><dt>Ceremony</dt><dd>' + esc(w.ceremony_type) + '</dd>' +
      '<dt>Photo consent</dt><dd>' + esc({ private: 'Private: nothing is published', editorial: 'Editorial features only', portfolio: 'Our portfolio and editorial' }[w.photo_consent] || w.photo_consent) + '</dd><dt>Currency</dt><dd>Contracts in EUR · couple sees USD at ' + w.fx_today + ' (locked ' + w.fx_locked + ')</dd></dl></div>' +
      '<div class="list" style="border-top:1px solid var(--line)">' + w.contacts.map(function (c) {
        return '<div class="contact"><span><span class="strong">' + esc(c.name) + '</span> <span class="muted">' + esc(c.role) + '</span></span><span class="muted nowrap">' + esc(c.phone) + '</span><span class="note">' + esc(c.email) + ' · ' + esc(c.note) + '</span></div>';
      }).join('') + '</div>');

    var comms = panel('How they like to work', '<div class="panel-pad col gap-3"><dl class="kv"><dt>Channel</dt><dd>' + esc(w.comms.channel) + '</dd><dt>Rhythm</dt><dd>' + esc(w.comms.cadence) + '</dd>' +
      '<dt>Hours</dt><dd>' + esc(w.comms.hours) + '</dd><dt>Tone</dt><dd>' + esc(w.comms.tone) + '</dd></dl>' +
      '<div class="two" style="gap:var(--s4)"><div><p class="eyebrow">Do</p><ul class="plain-list">' + li(w.comms.do) + '</ul></div><div><p class="eyebrow">Do not</p><ul class="plain-list">' + li(w.comms.dont) + '</ul></div></div></div>');

    var money = panel('Who decides, who pays', '<div class="panel-pad col gap-3"><p class="small soft">' + esc(w.decision_makers) + '</p></div><div class="table-wrap"><table class="table" style="min-width:0"><thead><tr><th>Payer</th><th>Relation</th><th>Covers</th></tr></thead><tbody>' +
      w.payers.map(function (p) { return '<tr><td class="strong">' + esc(p.name) + '</td><td>' + esc(p.relation) + '</td><td>' + esc(p.covers) + '</td></tr>'; }).join('') + '</tbody></table></div>');

    var brief = panel('The brief', '<div class="panel-pad col gap-4"><div class="chips">' + w.brief.words.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +
      '<p class="small"><span class="muted">Palette: </span>' + esc(w.brief.palette) + '</p>' +
      '<div><p class="eyebrow">Priorities, in their order</p><ol class="plain-list ordered">' + w.brief.priorities.map(function (x) { return '<li><span>' + esc(x) + '</span></li>'; }).join('') + '</ol></div>' +
      '<div><p class="eyebrow">Never</p><div class="chips" style="margin-top:8px">' + w.brief.never.map(function (x) { return '<span class="chip no">' + esc(x) + '</span>'; }).join('') + '</div></div>' +
      '<div class="two" style="gap:var(--s4)"><div><p class="eyebrow">Must have</p><ul class="plain-list">' + li(w.must_haves) + '</ul></div><div><p class="eyebrow">Deal-breakers</p><ul class="plain-list">' + li(w.deal_breakers) + '</ul></div></div></div>');

    var sens = '<section class="panel internal-panel"><div class="panel-head" style="border-color:#EBD9A8"><h3 class="strong">Handle with care</h3>' + ui.visibilityTag(true) + '</div><div class="panel-pad col gap-3"><ul class="plain-list">' + li(w.sensitivities) + '</ul>' +
      (w.internal_notes ? '<p class="small soft italic">' + esc(w.internal_notes) + '</p>' : '') + '</div></section>';

    var riskHtml = '<section class="panel"><div class="panel-head"><h3 class="strong">Risks and Plan B</h3><span class="xs muted">' + risks.length + ' on the register</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Risk</th><th>Likelihood / impact</th><th>Trigger</th><th>Plan B</th><th>Owner</th><th>Status</th><th>Couple</th></tr></thead><tbody>' +
      risks.map(function (r) {
        return '<tr><td class="strong">' + esc(r.title) + '</td><td>' + esc(r.likelihood) + ' / ' + esc(r.impact) + '</td><td>' + esc(r.trigger) + '</td><td>' + esc(r.plan_b) + '</td><td>' + ui.avatar(P.user(r.owner_id)) + '</td><td>' + esc(r.status) + '</td>' +
          '<td><label class="check" style="min-height:0"><input type="checkbox" id="risk-' + r.id + '" data-change="visible" data-table="risks" data-id="' + r.id + '"' + (r.client_visible ? ' checked' : '') + '><span class="xs">' + (r.client_visible ? 'Sees it' : 'Hidden') + '</span></label></td></tr>';
      }).join('') + '</tbody></table></div></section>';

    var miles = panel('Milestones', '<div class="list">' + w.milestones.map(function (m) {
      var past = fmt.daysUntil(m.date) < 0;
      return '<div class="deadline"><span class="num ' + (past ? 'muted' : 'strong') + '">' + fmt.date(m.date) + '</span><span class="dot" style="background:' + (past ? 'var(--line-2)' : 'var(--wed)') + '"></span><span class="' + (past ? 'muted' : '') + '">' + esc(m.label) + '</span><span class="xs muted">' + (past ? 'done' : fmt.due(m.date).text) + '</span></div>';
    }).join('') + '</div>');

    var activity = panel('Recent activity', '<div class="list">' + log.map(function (a) {
      var u = P.user(a.user_id) || { name: w.short, type: 'couple', initials: fmt.initials(w.short) };
      return '<div class="deadline" style="grid-template-columns:28px minmax(0,1fr) auto">' + ui.avatar(u) + '<span><span class="strong">' + esc(u.name) + '</span> ' + esc(a.text) + '</span><span class="xs muted nowrap">' + fmt.ago(a.at) + '</span></div>';
    }).join('') + '</div>');

    return stats + '<div class="two"><div class="col gap-5">' + couple + comms + money + '</div><div class="col gap-5">' + brief + sens + '</div></div>' + riskHtml + '<div class="two">' + miles + activity + '</div>';
  };

  /* Publish or hide any record for the couple ("prep mode"). */
  P.changes.visible = function (el) {
    P.api.setVisible(el.getAttribute('data-table'), el.getAttribute('data-id'), el.checked);
    P.render(); ui.toast(el.checked ? 'Published to the couple' : 'Hidden from the couple');
  };
})();
