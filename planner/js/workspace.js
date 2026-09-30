/* Planner CRM: Phases tab, phase page, sub-phase page (drill-down: status, tasks, owners, comments). */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;

  function subRow(w, s) {
    var pr = P.api.progress(s.id);
    return '<a class="sub-row" href="#/w/' + w.id + '/phases/' + s.id + '">' +
      '<span class="code">' + s.code + '</span>' +
      '<span class="col gap-1"><span class="row between gap-2"><span class="strong small truncate">' + esc(s.name) + '</span>' + ui.pill('subphase', s.status) + '</span>' +
      ui.bar(pr.pct, s.status === 'done' ? 'good thin' : 'wed thin') +
      '<span class="xs muted">' + pr.done + ' of ' + pr.total + ' tasks · ' + fmt.date(s.start) + ' – ' + fmt.date(s.end) + '</span></span>' +
      ui.avatar(P.user(s.owner_id)) + '</a>';
  }

  /* Tab: three phases, each with its three sub-phases. */
  P.tabs.phases = function (w, rest) {
    if (rest[0]) return rest[0].indexOf('-p') > -1 && P.api.get('phases', rest[0]) ? phasePage(w, P.api.get('phases', rest[0])) : subphasePage(w, rest[0]);
    var subs = P.api.list('subphases', { wedding_id: w.id });
    return '<div class="phase-grid">' + P.api.list('phases', { wedding_id: w.id }).map(function (p) {
      var pp = P.api.phaseProgress(p.id);
      return '<section class="panel phase-card"><a class="ph-head" href="#/w/' + w.id + '/phases/' + p.id + '">' +
        '<div class="row between"><span class="eyebrow">Phase ' + p.n + '</span>' + ui.pill('subphase', pp.status) + '</div>' +
        '<h2 class="display d-md">' + esc(p.name) + '</h2><p class="small muted">' + esc(p.blurb) + '</p>' +
        '<div class="row gap-2" style="margin-top:12px">' + ui.avatar(P.user(p.owner_id)) + '<span class="grow">' + ui.bar(pp.pct, 'wed') + '</span><span class="small num strong">' + pp.pct + '%</span></div>' +
        (p.client_signoff_at ? '<p class="xs tone-good" style="margin-top:8px">Signed off by the couple on ' + fmt.dateY(p.client_signoff_at) + '</p>' : '<p class="xs muted" style="margin-top:8px">Not yet signed off by the couple</p>') +
        '</a><div class="list">' + subs.filter(function (s) { return s.phase_id === p.id; }).map(function (s) { return subRow(w, s); }).join('') + '</div></section>';
    }).join('') + '</div>';
  };

  function commentsHtml(type, id) {
    var list = P.api.list('comments', { parent_type: type, parent_id: id }).sort(function (a, b) { return a.at < b.at ? -1 : 1; });
    return '<section class="panel" data-tour="comments"><div class="panel-head"><h3 class="strong">Comments</h3><span class="xs muted">' + list.length + '</span></div>' +
      '<div class="list">' + (list.length ? list.map(function (c) {
        var u = P.user(c.author_id);
        return '<div class="comment ' + (c.internal ? 'internal' : '') + '">' + ui.avatar(u) + '<div><div class="row between gap-2 wrap"><span class="who">' + esc(u.name) +
          ' <span class="xs muted" style="font-weight:400">' + fmt.dateTimeIn(c.at, 'Europe/Rome') + '</span></span>' + ui.visibilityTag(c.internal) + '</div><p class="body">' + esc(c.body) + '</p></div></div>';
      }).join('') : '<div class="empty">No comments yet.</div>') + '</div>' +
      '<form class="composer" data-form="comment" data-type="' + type + '" data-id="' + esc(id) + '">' +
      '<textarea class="textarea" id="comment-' + esc(id) + '" name="body" placeholder="Write an update" aria-label="New comment"></textarea>' +
      '<div class="row between wrap"><label class="check"><input type="checkbox" name="internal" checked data-keep id="internal-' + esc(id) + '"> Internal note, team only</label>' +
      '<button class="btn primary sm" type="submit">Post</button></div></form></section>';
  }

  function taskRow(t) {
    return '<button class="task-row ' + (t.status === 'done' ? 'done' : '') + '" data-act="task" data-id="' + t.id + '">' +
      '<span class="pill-cell">' + ui.pill('task', t.status) + '</span><span class="t-title">' + esc(t.title) + '</span>' +
      '<span class="t-meta"><span class="vis" title="' + (t.client_visible ? 'Visible to couple' : 'Internal') + '">' + ui.icon(t.client_visible ? 'eye' : 'lock') + '</span>' +
      (t.status === 'done' ? fmt.date(t.due) : P.dueHtml(t.due)) + ui.avatar(P.user(t.assignee_id)) + '</span></button>';
  }

  function waitingOnCouple(w) {
    var decs = P.api.list('decisions', { wedding_id: w.id }).filter(function (d) { return d.status === 'open'; });
    var cos = P.api.list('change_orders', { wedding_id: w.id }).filter(function (c) { return c.status === 'pending' && !c.open_decision_id; });
    var ours = P.api.list('decisions', { wedding_id: w.id }).filter(function (d) { return d.status === 'delegated' && !d.chosen_option_id && fmt.daysUntil(d.deadline) >= 0; });
    if (!decs.length && !cos.length && !ours.length) return '';
    return (ours.length ? '<section class="panel"><div class="panel-head"><h3 class="strong">Left to us to decide</h3><span class="pill info">' + ours.length + '</span></div><div class="list">' +
      ours.map(function (d) { return '<div class="wait-row"><span class="grow">' + esc(d.title) + ' <span class="muted">· the couple asked us to choose</span></span>' + P.dueHtml(d.deadline) + '</div>'; }).join('') + '</div></section>' : '') +
      (!decs.length && !cos.length ? '' : '<section class="panel"><div class="panel-head"><h3 class="strong">Waiting on the couple</h3><span class="pill warn">' + (decs.length + cos.length) + ' open</span></div><div class="list">' +
      decs.map(function (d) { return '<div class="wait-row"><span class="grow">' + esc(d.title) + '</span>' + P.dueHtml(d.deadline) + '</div>'; }).join('') +
      cos.map(function (c) { return '<div class="wait-row"><span class="grow">Change: ' + esc(c.title) + ' <span class="muted num">' + fmt.eur(c.delta_eur, true) + '</span></span><span class="muted">asked ' + fmt.ago(c.proposed_at) + '</span></div>'; }).join('') +
      '</div></section>');
  }
  P.waitingOnCouple = waitingOnCouple;

  function subphasePage(w, id) {
    var s = P.api.get('subphases', id);
    if (!s) return '<div class="panel empty">This sub-phase does not exist.</div>';
    var phase = P.api.get('phases', s.phase_id), pr = P.api.progress(id), owner = P.user(s.owner_id);
    var order = { blocked: 0, client: 1, doing: 2, todo: 3, done: 4 };
    var tasks = P.api.list('tasks', { subphase_id: id }).sort(function (a, b) { return order[a.status] - order[b.status] || (a.due < b.due ? -1 : 1); });
    var open = tasks.filter(function (t) { return t.status !== 'done'; });
    return '<div class="crumbs"><a href="#/w/' + w.id + '/phases">Phases</a>' + ui.icon('chevron') + '<a href="#/w/' + w.id + '/phases/' + phase.id + '">Phase ' + phase.n + ' ' + esc(phase.name) + '</a>' + ui.icon('chevron') + '<span>' + s.code + '</span></div>' +
      '<div class="page-head"><div class="col gap-2"><h2 class="display d-md">' + s.code + ' ' + esc(s.name) + '</h2><p class="soft small">' + esc(s.summary) + '</p></div>' +
      '<label class="field" style="min-width:190px"><span class="xs muted">Status</span><select class="select" id="status-' + id + '" data-change="subphaseStatus" data-id="' + id + '">' +
      VKRI.enums.subphaseStatus.map(function (o) { return '<option value="' + o.id + '"' + (o.id === s.status ? ' selected' : '') + '>' + o.label + '</option>'; }).join('') + '</select></label></div>' +
      '<div class="panel facts list-none">' +
      '<div class="fact stat"><div class="n">' + pr.pct + '%</div><div class="l">' + pr.done + ' of ' + pr.total + ' tasks done</div>' + ui.bar(pr.pct, 'wed thin') + '</div>' +
      '<div class="fact"><div class="row gap-2">' + ui.avatar(owner) + '<span class="strong small">' + esc(owner.name) + '</span></div><div class="xs muted" style="margin-top:6px">Owner · ' + esc(owner.title) + '</div></div>' +
      '<div class="fact"><div class="strong small">' + fmt.date(s.start) + ' – ' + fmt.dateY(s.end) + '</div><div class="xs muted" style="margin-top:6px">' + (s.status === 'done' ? 'Closed' : 'Ends ' + fmt.due(s.end).text) + '</div></div>' +
      '<div class="fact"><div class="strong small">' + open.filter(function (t) { return t.status === 'blocked'; }).length + ' blocked · ' + open.filter(function (t) { return t.status === 'client'; }).length + ' with client</div><div class="xs muted" style="margin-top:6px">' + open.filter(function (t) { return fmt.daysUntil(t.due) < 0; }).length + ' past due</div></div></div>' +
      '<div class="split"><div class="col gap-4"><section class="panel" data-tour="tasks"><div class="panel-head"><h3 class="strong">Tasks</h3><span class="xs muted hint">Tap a task to change status, owner or visibility</span></div>' +
      '<div class="list">' + (tasks.length ? tasks.map(taskRow).join('') : '<div class="empty">No tasks in this sub-phase yet.</div>') + '</div></section>' +
      (s.status !== 'done' ? waitingOnCouple(w) : '') + '</div>' +
      '<div class="col gap-4">' + commentsHtml('subphase', id) + '</div></div>';
  }

  function phasePage(w, p) {
    var pp = P.api.phaseProgress(p.id), owner = P.user(p.owner_id);
    var subs = P.api.list('subphases', { phase_id: p.id });
    return '<div class="crumbs"><a href="#/w/' + w.id + '/phases">Phases</a>' + ui.icon('chevron') + '<span>Phase ' + p.n + '</span></div>' +
      '<div class="page-head"><div class="col gap-2"><h2 class="display d-md">Phase ' + p.n + ' · ' + esc(p.name) + '</h2><p class="soft small">' + esc(p.summary || p.blurb) + '</p></div>' + ui.pill('subphase', pp.status) + '</div>' +
      '<div class="panel facts">' +
      '<div class="fact stat"><div class="n">' + pp.pct + '%</div><div class="l">' + pp.done + ' of ' + pp.total + ' tasks done</div>' + ui.bar(pp.pct, 'wed thin') + '</div>' +
      '<div class="fact"><div class="row gap-2">' + ui.avatar(owner) + '<span class="strong small">' + esc(owner.name) + '</span></div><div class="xs muted" style="margin-top:6px">Phase owner</div></div>' +
      '<div class="fact"><div class="strong small">' + fmt.date(subs[0].start) + ' – ' + fmt.dateY(subs[subs.length - 1].end) + '</div><div class="xs muted" style="margin-top:6px">Planned dates</div></div>' +
      '<div class="fact"><div class="strong small ' + (p.client_signoff_at ? 'tone-good' : '') + '">' + (p.client_signoff_at ? 'Signed off ' + fmt.dateY(p.client_signoff_at) : 'Not signed off yet') + '</div><div class="xs muted" style="margin-top:6px">Client sign-off</div></div></div>' +
      '<div class="split"><section class="panel"><div class="panel-head"><h3 class="strong">Sub-phases</h3></div><div class="list">' + subs.map(function (s) { return subRow(w, s); }).join('') + '</div></section>' +
      commentsHtml('phase', p.id) + '</div>';
  }

  /* Task sheet: status, owner, visibility, note, task comments. */
  P.actions.task = function (el) {
    var t = P.api.get('tasks', el.getAttribute('data-id'));
    var planners = P.api.list('users', { type: 'planner' });
    var notes = P.api.list('comments', { parent_type: 'task', parent_id: t.id });
    ui.sheet('<span class="eyebrow">Task</span><h3 class="display d-sm">' + esc(t.title) + '</h3>' +
      '<div class="row wrap gap-2">' + VKRI.enums.taskStatus.map(function (o) {
        return '<button class="btn sm ' + (o.id === t.status ? 'primary' : '') + '" data-act="taskStatus" data-id="' + t.id + '" data-status="' + o.id + '">' + o.label + '</button>';
      }).join('') + '</div>' +
      '<label class="field"><span>Owner</span><select class="select" id="owner-' + t.id + '" data-change="taskOwner" data-id="' + t.id + '">' + planners.map(function (u) {
        return '<option value="' + u.id + '"' + (u.id === t.assignee_id ? ' selected' : '') + '>' + esc(u.name) + '</option>';
      }).join('') + '</select></label>' +
      '<label class="check"><input type="checkbox" id="vis-' + t.id + '" data-change="taskVisible" data-id="' + t.id + '"' + (t.client_visible ? ' checked' : '') + '> Show this task to the couple</label>' +
      '<dl class="kv"><dt>Due</dt><dd>' + fmt.dateY(t.due) + '</dd><dt>Updated</dt><dd>' + fmt.dateY(t.updated_at) + '</dd>' + (t.note ? '<dt>Note</dt><dd>' + esc(t.note) + '</dd>' : '') + '</dl>' +
      (notes.length ? '<hr class="rule"><div class="col gap-2">' + notes.map(function (c) {
        return '<p class="small"><span class="strong">' + esc(P.user(c.author_id).name) + '</span> ' + ui.visibilityTag(c.internal) + '<br><span class="soft">' + esc(c.body) + '</span></p>';
      }).join('') + '</div>' : ''));
  };
  P.actions.taskStatus = function (el) {
    P.api.updateTask(el.getAttribute('data-id'), { status: el.getAttribute('data-status') });
    ui.closeSheet(); P.render(); ui.toast('Moved to ' + ui.statusLabel('task', el.getAttribute('data-status')));
  };
  P.changes.taskOwner = function (el) { P.api.updateTask(el.getAttribute('data-id'), { assignee_id: el.value }); P.render(); ui.toast('Owner changed'); };
  P.changes.taskVisible = function (el) { P.api.updateTask(el.getAttribute('data-id'), { client_visible: el.checked }); P.render(); ui.toast(el.checked ? 'Now visible to the couple' : 'Hidden from the couple'); };
  P.changes.subphaseStatus = function (el) { P.api.setSubphaseStatus(el.getAttribute('data-id'), el.value); P.render(); ui.toast('Status updated'); };

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.getAttribute('data-form') !== 'comment') return;
    e.preventDefault();
    var body = f.elements.body.value.trim();
    if (!body) return;
    P.api.addComment(f.getAttribute('data-type'), f.getAttribute('data-id'), body, f.elements.internal.checked);
    f.elements.body.value = '';
    P.render(); ui.toast(f.elements.internal.checked ? 'Internal note added' : 'Comment posted, visible to the couple');
  });
})();
