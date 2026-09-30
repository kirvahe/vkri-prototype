/* Planner CRM: Board (matrix, kanban, season Gantt) and the wedding Tasks tab.
   One table (tasks + sub-phases), three views. Filters, the phone kanban column, expanded Done lists,
   list sorting and the Gantt scroll live in module state, because the whole main area re-renders
   after every data change. Routes: #/board/<matrix|kanban|gantt>, #/w/<weddingId>/tasks. */
(function () {
  'use strict';
  var P = VKRI.planner, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;

  var VIEWS = [['matrix', 'Matrix', 'grid'], ['kanban', 'Kanban', 'board'], ['gantt', 'Gantt', 'gantt']];
  var TASK_ST = VKRI.enums.taskStatus;                       // kanban column order
  var URGENCY = { blocked: 0, client: 1, doing: 2, todo: 3, done: 4 };
  var TODO_PREVIEW = 6;                                      // To do column shows the next six by due date per lane
  var DONE_PREVIEW = 5;                                      // Done column shows the latest five per lane
  var PX_DAY = 2.2;                                          // Gantt scale
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var state = {
    view: 'matrix',
    wedding: 'all',       // 'all' | wedding id
    owner: 'all',         // 'all' | 'me' | planner id
    phoneCol: 'doing',    // kanban column shown on phones
    todoOpen: {},         // lane (wedding id) -> true when To do shows every task
    doneOpen: {},         // lane (wedding id) -> true when Done shows every task
    tabView: 'kanban',    // Tasks tab: 'kanban' | 'list'
    sort: { key: 'status', dir: 1 },
    ganttLeft: null       // horizontal scroll of the Gantt, kept across re-renders
  };

  /* ---------- data helpers ---------- */
  function today() { return fmt.today(); }
  function days(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 864e5); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ownerId() { return state.owner === 'all' ? null : state.owner === 'me' ? P.api.me.id : state.owner; }
  function ownerName() { var id = ownerId(); return !id ? '' : id === P.api.me.id ? 'you' : (P.user(id) || {}).name || ''; }
  function planners() { return P.api.list('users', { type: 'planner' }); }
  function weddingsInView() {
    var all = P.weddings();
    if (state.wedding !== 'all' && !all.some(function (w) { return w.id === state.wedding; })) state.wedding = 'all';
    return state.wedding === 'all' ? all : all.filter(function (w) { return w.id === state.wedding; });
  }
  function allTasks(wid) { return P.api.list('tasks', { wedding_id: wid }); }
  function byOwner(tasks) { var id = ownerId(); return id ? tasks.filter(function (t) { return t.assignee_id === id; }) : tasks; }
  function subsOf(wid) { return P.api.list('subphases', { wedding_id: wid }).sort(function (a, b) { return a.code < b.code ? -1 : 1; }); }
  function subMap(wid) { var m = {}; subsOf(wid).forEach(function (s) { m[s.id] = s; }); return m; }
  function isLate(t) { return t.status !== 'done' && fmt.daysUntil(t.due) < 0; }
  function stLabel(id) { return ui.statusLabel('task', id); }
  /* A sub-phase "touches" the owner filter when that planner owns it or holds a task in it. */
  function touches(s, tasks) {
    var id = ownerId();
    return !id || s.owner_id === id || tasks.some(function (t) { return t.subphase_id === s.id && t.assignee_id === id; });
  }

  /* ---------- shared chrome ---------- */
  function ownerSelect() {
    var opts = [['all', 'Everyone'], ['me', 'My tasks']].concat(planners().map(function (u) { return [u.id, u.name]; }));
    return '<select class="select bd-select" aria-label="Owner" data-change="boardOwner">' + opts.map(function (o, i) {
      return (i === 2 ? '<optgroup label="Planners">' : '') + '<option value="' + esc(o[0]) + '"' + (o[0] === state.owner ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
    }).join('') + '</optgroup></select>';
  }
  function weddingSelect() {
    return '<select class="select bd-select" aria-label="Wedding" data-change="boardWedding"><option value="all">All weddings</option>' +
      P.weddings().map(function (w) {
        return '<option value="' + esc(w.id) + '"' + (w.id === state.wedding ? ' selected' : '') + '>' + esc(w.title) + '</option>';
      }).join('') + '</select>';
  }
  function filtersHtml(view) {
    var active = state.wedding !== 'all' || state.owner !== 'all';
    return '<div class="bd-filters">' + weddingSelect() + ownerSelect() +
      (active ? '<button type="button" class="btn ghost sm bd-clear" data-act="boardClear">Clear filters</button>' : '') +
      '<nav class="bd-seg bd-views" aria-label="View">' + VIEWS.map(function (v) {
        var on = v[0] === view;
        return '<a href="#/board/' + v[0] + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' + ui.icon(v[2]) + v[1] + '</a>';
      }).join('') + '</nav></div>';
  }
  function summaryHtml(tasks) {
    var open = tasks.filter(function (t) { return t.status !== 'done'; });
    var n = function (st) { return open.filter(function (t) { return t.status === st; }).length; };
    var late = open.filter(isLate).length;
    return '<div class="bd-sum">' +
      '<span class="pill plain">' + fmt.plural(open.length, 'open task') + '</span>' +
      (n('blocked') ? '<span class="pill crit">' + n('blocked') + ' blocked</span>' : '') +
      (n('client') ? '<span class="pill warn">' + n('client') + ' awaiting client</span>' : '') +
      (late ? '<span class="pill crit">' + late + ' past due</span>' : '') +
      (open.length && !n('blocked') && !late ? '<span class="pill good">On schedule</span>' : '') + '</div>';
  }
  function emptyFiltered() {
    var who = ownerName();
    return '<div class="panel empty"><p class="display d-sm">Nothing to show</p><p>' +
      (who ? 'No tasks for ' + esc(who) + ' with these filters.' : 'No tasks with these filters.') + '</p>' +
      '<p style="margin-top:12px"><button type="button" class="btn sm" data-act="boardClear">Clear filters</button></p></div>';
  }

  /* ---------- 1. Matrix: weddings x 9 sub-phases ---------- */
  function matrixCell(w, s, tasks, t0) {
    var pr = P.api.progress(s.id), own = P.user(s.owner_id), oid = ownerId();
    var inSub = tasks.filter(function (t) { return t.subphase_id === s.id; });
    var blocked = inSub.filter(function (t) { return t.status === 'blocked'; }).length;
    var now = s.status !== 'done' && s.start && s.end && s.start <= t0 && t0 <= s.end;
    var late = s.status !== 'done' && s.end && s.end < t0;
    var foot;
    if (oid) {
      var mine = inSub.filter(function (t) { return t.assignee_id === oid && t.status !== 'done'; }).length;
      foot = mine ? '<span class="strong">' + mine + ' open</span>' : (s.owner_id === oid ? 'Owner' : 'None open');
    } else if (blocked) foot = '<span class="tone-crit strong">' + blocked + ' blocked</span>';
    else if (late) foot = '<span class="tone-crit strong">Past end date</span>';
    else foot = pr.done + '/' + pr.total + ' tasks';
    var label = s.code + ' ' + s.name + ': ' + ui.statusLabel('subphase', s.status) + ', ' + pr.pct + '% of tasks done, owner ' + (own ? own.name : 'unassigned');
    return '<a class="mx-cell st-' + s.status + (now ? ' now' : '') + (touches(s, tasks) ? '' : ' bd-dim') + (s.code.slice(-1) === '1' && s.code[0] !== '1' ? ' ph-start' : '') + '"' +
      ' href="#/w/' + esc(w.id) + '/phases/' + esc(s.id) + '" aria-label="' + esc(label) + '" title="' + esc(label) + '">' +
      '<span class="mx-code"><b>' + esc(s.code) + '</b> ' + esc(s.name) + '</span>' +
      '<span class="mx-st">' + esc(ui.statusLabel('subphase', s.status)) + '</span>' +
      '<span class="mx-mid"><span class="mx-pct">' + pr.pct + '%</span>' + ui.avatar(own) + '</span>' +
      ui.bar(pr.pct, 'thin') +
      '<span class="mx-foot">' + foot + '</span>' + (now ? '<span class="mx-now">Now</span>' : '') + '</a>';
  }
  function matrixView(ws) {
    var t0 = today();
    var head = '<div class="mx-head" aria-hidden="true"><div class="mx-corner eyebrow">Wedding</div>' + VKRI.PHASES.map(function (p) {
      return '<div class="mx-phase' + (p.n > 1 ? ' ph-start' : '') + '"><span class="eyebrow">Phase ' + p.n + '</span> ' + esc(p.name) + '</div>';
    }).join('') + '</div><div class="mx-subhead" aria-hidden="true"><div></div>' + VKRI.PHASES.map(function (p) {
      return p.sub.map(function (s, i) {
        return '<div class="mx-sub' + (i === 0 && p.n > 1 ? ' ph-start' : '') + '"><b>' + s[0] + '</b>' + esc(s[1]) + '</div>';
      }).join('');
    }).join('') + '</div>';
    var rows = ws.map(function (w) {
      var subs = subsOf(w.id), tasks = allTasks(w.id), lead = P.user(w.lead_id);
      var done = tasks.filter(function (t) { return t.status === 'done'; }).length;
      var pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
      var lab = '<div class="mx-lab">' +
        '<a class="mx-wname" href="#/w/' + esc(w.id) + '/overview"><span class="dot"></span>' + esc(w.title) + '</a>' +
        '<span class="xs muted">' + esc(w.code_name) + ' · ' + fmt.date(w.wedding_day) + '</span>' +
        '<span class="row gap-2 mx-meta"><span class="pill wed plain">' + fmt.weeksOut(w.wedding_day) + '</span>' +
        '<span class="xs soft num">' + pct + '% done</span>' + ui.avatar(lead) + '</span></div>';
      var cells = VKRI.PHASES.map(function (p) {
        return '<div class="mx-plabel"><span>Phase ' + p.n + '</span> ' + esc(p.name) + '</div>' +
          subs.filter(function (s) { return s.phase_id === w.id + '-p' + p.n; }).map(function (s) { return matrixCell(w, s, tasks, t0); }).join('');
      }).join('');
      return '<div class="mx-row" data-wedding="' + esc(w.id) + '">' + lab + cells + '</div>';
    }).join('');
    var note = ownerId() ? 'Faded cells have no tasks for ' + esc(ownerName()) + '. ' : '';
    return '<section class="mx" aria-label="Sub-phase matrix">' + head + rows + '</section>' +
      '<p class="xs muted bd-note">' + note + 'Percent is tasks done in each sub-phase. The outlined cell is where each wedding is today. Select a cell to open the sub-phase.</p>';
  }

  /* ---------- 2. Kanban: five columns, swimlanes by wedding ---------- */
  function card(t, subs) {
    var s = subs[t.subphase_id], vis = t.client_visible;
    return '<button type="button" class="kb-card ts-' + t.status + '" data-act="task" data-id="' + esc(t.id) + '" data-lane="' + esc(t.wedding_id) + '" data-status="' + esc(t.status) + '">' +
      '<span class="kb-title">' + esc(t.title) + '</span>' +
      (t.status === 'blocked' && t.note ? '<span class="kb-note">' + esc(t.note) + '</span>' : '') +
      '<span class="kb-meta"><span class="kb-code" title="' + esc(s ? s.name : '') + '">' + esc(s ? s.code : '') + '</span>' +
      '<span class="kb-vis" title="' + (vis ? 'Visible to couple' : 'Internal') + '">' + ui.icon(vis ? 'eye' : 'lock') + '<span class="bd-sr">' + (vis ? 'Visible to couple' : 'Internal') + '</span></span>' +
      (t.status === 'done' ? '<span class="nowrap">' + fmt.date(t.due) + '</span>' : P.dueHtml(t.due)) +
      '<span class="kb-av">' + ui.avatar(P.user(t.assignee_id)) + '</span></span></button>';
  }
  function laneHtml(lane, withHead) {
    var w = lane.w, subs = subMap(w.id);
    var open = lane.tasks.filter(function (t) { return t.status !== 'done'; }).length;
    var head = withHead ? '<header class="kb-lhead"><span class="dot"></span><a class="kb-ltitle" href="#/w/' + esc(w.id) + '/tasks">' + esc(w.title) + '</a>' +
      '<span class="eyebrow">' + esc(w.code_name) + '</span><span class="xs muted kb-lcount">' + fmt.plural(open, 'open task') + '</span></header>' : '';
    var cols = TASK_ST.map(function (st) {
      var list = lane.tasks.filter(function (t) { return t.status === st.id; }), more = '';
      if (st.id === 'done') {
        list.sort(function (a, b) { return a.updated_at < b.updated_at ? 1 : a.updated_at > b.updated_at ? -1 : (a.due < b.due ? 1 : -1); });
        if (list.length > DONE_PREVIEW) {
          var openAll = !!state.doneOpen[w.id];
          more = '<button type="button" class="kb-more" data-act="boardDone" data-lane="' + esc(w.id) + '" aria-expanded="' + openAll + '">' +
            (openAll ? 'Show latest ' + DONE_PREVIEW : 'Show all ' + list.length) + '</button>';
          if (!openAll) list = list.slice(0, DONE_PREVIEW);
        }
      } else {
        list.sort(function (a, b) { return a.due < b.due ? -1 : a.due > b.due ? 1 : 0; });
        /* To do can hold every future task of a wedding: show the next few by due date, the rest on request. */
        if (st.id === 'todo' && list.length > TODO_PREVIEW) {
          var openTodo = !!state.todoOpen[w.id];
          more = '<button type="button" class="kb-more" data-act="boardTodo" data-lane="' + esc(w.id) + '" aria-expanded="' + openTodo + '">' +
            (openTodo ? 'Show next ' + TODO_PREVIEW : 'Show all ' + list.length) + '</button>';
          if (!openTodo) list = list.slice(0, TODO_PREVIEW);
        }
      }
      return '<div class="kb-drop ts-' + st.id + '" data-lane="' + esc(w.id) + '" data-status="' + st.id + '" role="group" aria-label="' + esc(w.title + ': ' + st.label) + '">' +
        (list.length ? list.map(function (t) { return card(t, subs); }).join('') : '<p class="kb-empty">No tasks</p>') + more + '</div>';
    }).join('');
    return '<section class="kb-lane" data-wedding="' + esc(w.id) + '" aria-label="' + esc(w.title) + '">' + head + '<div class="kb-grid">' + cols + '</div></section>';
  }
  function kanbanHtml(lanes, withHead) {
    var counts = {};
    TASK_ST.forEach(function (s) { counts[s.id] = 0; });
    lanes.forEach(function (l) { l.tasks.forEach(function (t) { counts[t.status]++; }); });
    var tabs = '<div class="tabs kb-tabs" role="tablist" aria-label="Status">' + TASK_ST.map(function (s) {
      var on = s.id === state.phoneCol;
      return '<button type="button" role="tab" aria-selected="' + on + '" class="' + (on ? 'on' : '') + '" data-act="boardCol" data-status="' + s.id + '">' +
        s.label + '<span class="kb-n">' + counts[s.id] + '</span></button>';
    }).join('') + '</div>';
    var colHead = '<div class="kb-cols" aria-hidden="true">' + TASK_ST.map(function (s) {
      return '<div class="kb-colhead ts-' + s.id + '"><span class="kb-sdot"></span>' + s.label + '<span class="kb-n">' + counts[s.id] + '</span></div>';
    }).join('') + '</div>';
    return '<div class="kb" data-show="' + state.phoneCol + '">' + tabs + colHead +
      lanes.map(function (l) { return laneHtml(l, withHead); }).join('') +
      '<p class="xs muted bd-note kb-hint">Drag a card to another column to change its status, or select it to edit.</p></div>';
  }

  /* ---------- 3. Season Gantt ---------- */
  function lastDay(iso) { return new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7), 0)).toISOString().slice(0, 10); }
  function textW(s) { return 12 + s.length * 6.2; }
  function ganttView(ws) {
    var t0 = today(), oid = ownerId();
    var blocks = ws.map(function (w) {
      return { w: w, subs: subsOf(w.id).filter(function (s) { return s.start && s.end; }), tasks: allTasks(w.id), ms: (w.milestones || []).filter(function (m) { return m.date; }) };
    });
    var dates = [t0];
    blocks.forEach(function (b) {
      b.subs.forEach(function (s) { dates.push(s.start, s.end); });
      b.ms.forEach(function (m) { dates.push(m.date); });
    });
    dates.sort();
    var from = dates[0].slice(0, 7) + '-01', to = lastDay(dates[dates.length - 1]);
    var W = Math.round((days(from, to) + 1) * PX_DAY);
    function x(iso) { return days(from, iso) * PX_DAY; }
    function mid(iso) { return Math.round(x(iso) + PX_DAY / 2); }

    var months = [], y = +from.slice(0, 4), m = +from.slice(5, 7);
    for (;;) {
      var start = y + '-' + pad(m) + '-01';
      if (start > to) break;
      var next = m === 12 ? (y + 1) + '-01-01' : y + '-' + pad(m + 1) + '-01';
      months.push({ label: MONTHS[m - 1] + (m === 1 || !months.length ? ' ' + y : ''), x: Math.round(x(start)), w: Math.round(x(next) - x(start)) });
      m++; if (m > 12) { m = 1; y++; }
    }
    var tx = mid(t0);
    var head = '<div class="gx-row gx-head"><div class="gx-lab eyebrow">Sub-phase</div><div class="gx-track">' +
      months.map(function (mo) { return '<span class="gx-month" style="left:' + mo.x + 'px;width:' + mo.w + 'px">' + mo.label + '</span>'; }).join('') +
      '<span class="gx-todaytag" style="left:' + tx + 'px">Today ' + fmt.date(t0) + '</span></div></div>';

    var body = blocks.map(function (b) {
      var w = b.w;
      /* milestones: each label goes right of its marker, or left when that fits better,
         on the lowest level where it overlaps nothing */
      var levels = [];
      var placed = b.ms.slice().sort(function (a, c) { return a.date < c.date ? -1 : 1; }).map(function (ms) {
        var px = mid(ms.date), text = fmt.date(ms.date) + ' ' + ms.label, tw = textW(text) + (ms.kind === 'wedding' ? 16 : 0);
        var sides = [];
        if (px + tw <= W) sides.push([false, px - 7, px + tw]);
        if (px - tw >= 0) sides.push([true, px - tw, px + 7]);
        if (!sides.length) sides.push([false, px - 7, px + tw]);
        for (var lv = 0; ; lv++) {
          var row = levels[lv] || (levels[lv] = []);
          for (var i = 0; i < sides.length; i++) {
            var sd = sides[i];
            if (!row.some(function (iv) { return sd[1] < iv[1] + 8 && sd[2] > iv[0] - 8; })) {
              row.push([sd[1], sd[2]]);
              return { ms: ms, px: px, flip: sd[0], lv: lv };
            }
          }
        }
      });
      var rowH = Math.max(52, 14 + levels.length * 18);
      var msHtml = placed.map(function (p) {
        var isWed = p.ms.kind === 'wedding';
        var pos = p.flip ? 'right:' + (W - p.px) + 'px' : 'left:' + p.px + 'px';
        return '<span class="gx-ms' + (isWed ? ' is-wed' : '') + (p.flip ? ' flip' : '') + '" style="' + pos + ';top:' + (9 + p.lv * 18) + 'px">' +
          '<i></i><span><b>' + fmt.date(p.ms.date) + '</b> ' + esc(p.ms.label) + '</span></span>';
      }).join('');
      var wrow = '<div class="gx-row gx-wrow" style="height:' + rowH + 'px"><div class="gx-lab">' +
        '<a class="gx-wname" href="#/w/' + esc(w.id) + '/overview"><span class="dot"></span>' + esc(w.title) + '</a>' +
        '<span class="xs muted truncate">' + esc(w.code_name) + ' · ' + fmt.weeksOut(w.wedding_day) + '</span></div>' +
        '<div class="gx-track">' + msHtml + '</div></div>';
      var rows = b.subs.map(function (s) {
        var pr = P.api.progress(s.id), left = Math.round(x(s.start)), width = Math.max(4, Math.round(x(s.end) + PX_DAY - x(s.start)));
        var fill = s.status === 'not_started' ? 0 : s.status === 'done' ? 100 : pr.pct;
        var word = ui.statusLabel('subphase', s.status) + (s.status !== 'done' && s.status !== 'not_started' ? ' · ' + pr.pct + '%' : '');
        var tpos = left + width + 8 + textW(word) > W ? 'right:' + (W - left + 8) + 'px' : 'left:' + (left + width + 8) + 'px';
        var dim = touches(s, b.tasks) ? '' : ' bd-dim', own = P.user(s.owner_id);
        var label = s.code + ' ' + s.name + ', ' + fmt.date(s.start) + ' to ' + fmt.dateY(s.end) + ', ' + word;
        return '<div class="gx-row"><div class="gx-lab' + dim + '"><span class="gx-code">' + esc(s.code) + '</span><span class="truncate grow">' + esc(s.name) + '</span>' + ui.avatar(own) + '</div>' +
          '<div class="gx-track"><a class="gx-bar st-' + s.status + dim + '" href="#/w/' + esc(w.id) + '/phases/' + esc(s.id) + '" style="left:' + left + 'px;width:' + width + 'px" aria-label="' + esc(label) + '" title="' + esc(label) + '">' +
          '<b><i style="width:' + fill + '%"></i></b></a><span class="gx-txt st-' + s.status + dim + '" style="' + tpos + '">' + esc(word) + '</span></div></div>';
      }).join('');
      var wday = w.wedding_day ? '<i class="gx-wday" style="left:calc(var(--lab) + ' + mid(w.wedding_day) + 'px)"></i>' : '';
      return '<section class="gx-wed" data-wedding="' + esc(w.id) + '" aria-label="' + esc(w.title) + '">' + wday + wrow + rows + '</section>';
    }).join('');

    var grid = '<div class="gx-layer">' + months.map(function (mo) { return '<i class="gx-mline" style="left:' + mo.x + 'px"></i>'; }).join('') + '</div>';
    var legend = '<div class="gx-legend">' + VKRI.enums.subphaseStatus.map(function (s) {
      return '<span class="gx-key"><i class="gx-sw st-' + s.id + '"></i>' + s.label + '</span>';
    }).join('') + '<span class="gx-key"><i class="gx-dia"></i>Milestone</span><span class="gx-key"><i class="gx-dia wed"></i>Wedding day</span>' +
      '<span class="gx-key"><i class="gx-tl"></i>Today</span>' + (oid ? '<span class="gx-key muted">Faded: no tasks for ' + esc(ownerName()) + '</span>' : '') + '</div>';
    return '<section class="panel gx-panel" aria-label="Season Gantt"><div class="gx"><div class="gx-inner" style="--w:' + W + 'px">' +
      grid + head + body + '<i class="gx-today" style="left:calc(var(--lab) + ' + tx + 'px)"></i></div></div>' + legend + '</section>';
  }
  /* Keep the Gantt's horizontal position; on first view bring today into sight. */
  function afterGantt() {
    var el = document.querySelector('.gx');
    if (!el) return;
    if (state.ganttLeft != null) { el.scrollLeft = state.ganttLeft; return; }
    var t = el.querySelector('.gx-today'), lab = el.querySelector('.gx-lab');
    if (!t || !lab) return;
    var todayX = t.offsetLeft - lab.offsetWidth, visible = el.clientWidth - lab.offsetWidth;
    el.scrollLeft = Math.max(0, todayX - visible * 0.62);
    state.ganttLeft = el.scrollLeft;
  }
  /* Phones: keep the active status tab in sight after a re-render resets the strip. */
  function afterKanban() {
    var strip = document.querySelector('.kb-tabs'), on = strip && strip.querySelector('.on');
    if (!on || !strip.clientWidth) return;
    var left = on.offsetLeft - strip.offsetLeft, right = left + on.offsetWidth;
    if (right > strip.clientWidth || left < strip.scrollLeft) strip.scrollLeft = Math.max(0, right - strip.clientWidth + 16);
  }
  document.addEventListener('scroll', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('gx')) state.ganttLeft = e.target.scrollLeft;
  }, true);

  /* ---------- the Board screen ---------- */
  P.screens.board = function (parts) {
    var view = parts[0];
    if (VIEWS.some(function (v) { return v[0] === view; })) state.view = view; else view = state.view;
    var ws = weddingsInView();
    var tasks = [];
    ws.forEach(function (w) { tasks = tasks.concat(byOwner(allTasks(w.id))); });
    var head = '<div class="page-head bd-head"><div class="col gap-2"><span class="eyebrow">Season ' + VKRI.now().getUTCFullYear() + ' · ' +
      fmt.plural(P.weddings().length, 'wedding') + '</span><h1 class="display d-lg">Board</h1></div>' + summaryHtml(tasks) + '</div>';
    var body;
    if (!ws.length) body = '<div class="panel empty">No weddings yet.</div>';
    else if (view === 'kanban') {
      var lanes = ws.map(function (w) { return { w: w, tasks: byOwner(allTasks(w.id)) }; })
        .filter(function (l) { return l.tasks.length || !ownerId(); });
      body = lanes.length ? kanbanHtml(lanes, true) : emptyFiltered();
      setTimeout(afterKanban, 0);
    } else if (view === 'gantt') { body = ganttView(ws); setTimeout(afterGantt, 0); }
    else body = matrixView(ws);
    return head + filtersHtml(view) + body;
  };

  /* ---------- 5. Tasks tab of a wedding: kanban or sortable list ---------- */
  var SORTS = {
    status: function (a, b) { return URGENCY[a.status] - URGENCY[b.status]; },
    title: function (a, b) { return a.title.localeCompare(b.title); },
    sub: function (a, b) { return a.subphase_id < b.subphase_id ? -1 : a.subphase_id > b.subphase_id ? 1 : 0; },
    owner: function (a, b) { return ((P.user(a.assignee_id) || {}).name || '').localeCompare((P.user(b.assignee_id) || {}).name || ''); },
    due: function (a, b) { return a.due < b.due ? -1 : a.due > b.due ? 1 : 0; },
    vis: function (a, b) { return (b.client_visible ? 1 : 0) - (a.client_visible ? 1 : 0); }
  };
  var COLS = [['status', 'Status'], ['title', 'Task'], ['sub', 'Sub-phase'], ['owner', 'Owner'], ['due', 'Due'], ['vis', 'Visibility']];
  function listHtml(w, tasks) {
    var subs = subMap(w.id), k = state.sort.key, dir = state.sort.dir;
    var rows = tasks.slice().sort(function (a, b) { return SORTS[k](a, b) * dir || SORTS.due(a, b) || SORTS.title(a, b); });
    var thead = '<thead><tr>' + COLS.map(function (c) {
      var on = c[0] === k;
      return '<th class="tk-h-' + c[0] + '" aria-sort="' + (on ? (dir > 0 ? 'ascending' : 'descending') : 'none') + '"><button type="button" class="th-sort" data-act="boardSort" data-key="' + c[0] + '">' +
        c[1] + '<span class="th-arrow" aria-hidden="true">' + (on ? (dir > 0 ? '↑' : '↓') : '') + '</span></button></th>';
    }).join('') + '</tr></thead>';
    var body = '<tbody>' + rows.map(function (t) {
      var s = subs[t.subphase_id], u = P.user(t.assignee_id), vis = t.client_visible;
      return '<tr class="click' + (t.status === 'done' ? ' is-done' : '') + '" data-act="task" data-id="' + esc(t.id) + '">' +
        '<td class="tk-c-status">' + ui.pill('task', t.status) + '</td>' +
        '<td class="tk-c-title"><button type="button" class="tk-open" data-act="task" data-id="' + esc(t.id) + '">' + esc(t.title) + '</button></td>' +
        '<td class="tk-c-sub"><span class="strong num">' + esc(s ? s.code : '') + '</span> <span class="muted">' + esc(s ? s.name : '') + '</span></td>' +
        '<td class="tk-c-owner"><span class="row gap-2">' + ui.avatar(u) + '<span class="tk-oname">' + esc(u ? u.name : 'Unassigned') + '</span></span></td>' +
        '<td class="tk-c-due">' + (t.status === 'done' ? '<span class="muted nowrap">' + fmt.date(t.due) + '</span>' : P.dueHtml(t.due)) + '</td>' +
        '<td class="tk-c-vis"><span class="tk-vis ' + (vis ? 'tone-good' : 'muted') + '">' + ui.icon(vis ? 'eye' : 'lock') + '<span class="tk-vistext">' + (vis ? 'Couple' : 'Internal') + '</span></span></td></tr>';
    }).join('') + '</tbody>';
    var phoneSort = '<label class="tk-sortsel"><span class="xs muted">Sort by</span><select class="select" data-change="boardSortSel" aria-label="Sort by">' +
      COLS.map(function (c) { return '<option value="' + c[0] + '"' + (c[0] === k ? ' selected' : '') + '>' + c[1] + '</option>'; }).join('') + '</select></label>';
    return phoneSort + '<div class="panel tk-list"><table class="table tk-table">' + thead + body + '</table></div>';
  }

  P.tabs.tasks = function (w) {
    var tasks = byOwner(allTasks(w.id));
    var toolbar = '<div class="bd-filters tk-bar"><div class="bd-seg" role="group" aria-label="Layout">' +
      [['kanban', 'Kanban', 'board'], ['list', 'List', 'doc']].map(function (v) {
        var on = v[0] === state.tabView;
        return '<button type="button" class="' + (on ? 'on' : '') + '" aria-pressed="' + on + '" data-act="boardTabView" data-view="' + v[0] + '">' + ui.icon(v[2]) + v[1] + '</button>';
      }).join('') + '</div>' + ownerSelect() +
      (state.owner !== 'all' ? '<button type="button" class="btn ghost sm bd-clear" data-act="boardClear">Everyone</button>' : '') + summaryHtml(tasks) + '</div>';
    if (!tasks.length) return toolbar + emptyFiltered();
    if (state.tabView !== 'list') setTimeout(afterKanban, 0);
    return toolbar + (state.tabView === 'list' ? listHtml(w, tasks) : kanbanHtml([{ w: w, tasks: tasks }], false));
  };

  /* ---------- actions ---------- */
  P.changes.boardWedding = function (el) { state.wedding = el.value; state.ganttLeft = null; P.render(); };
  P.changes.boardOwner = function (el) { state.owner = el.value; P.render(); };
  P.changes.boardSortSel = function (el) { state.sort = { key: el.value, dir: 1 }; P.render(); };
  P.actions.boardClear = function () { state.wedding = 'all'; state.owner = 'all'; state.ganttLeft = null; P.render(); };
  P.actions.boardCol = function (el) { state.phoneCol = el.getAttribute('data-status'); P.render(); };
  P.actions.boardTodo = function (el) { var id = el.getAttribute('data-lane'); state.todoOpen[id] = !state.todoOpen[id]; P.render(); };
  P.actions.boardDone = function (el) { var id = el.getAttribute('data-lane'); state.doneOpen[id] = !state.doneOpen[id]; P.render(); };
  P.actions.boardTabView = function (el) { state.tabView = el.getAttribute('data-view'); P.render(); };
  P.actions.boardSort = function (el) {
    var k = el.getAttribute('data-key');
    state.sort = state.sort.key === k ? { key: k, dir: -state.sort.dir } : { key: k, dir: 1 };
    P.render();
  };

  /* ---------- kanban drag on laptops: pointer events, one set of document listeners ---------- */
  var drag = null, suppressClick = false;
  var wide = window.matchMedia ? window.matchMedia('(min-width: 768px)') : { matches: true };
  function endDrag() {
    if (!drag) return;
    if (drag.ghost) drag.ghost.remove();
    if (drag.over) drag.over.classList.remove('kb-over');
    if (drag.card) drag.card.classList.remove('kb-lifted');
    document.documentElement.classList.remove('kb-dragging');
    drag = null;
  }
  document.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || e.pointerType === 'touch' || !wide.matches) return;
    var c = e.target.closest ? e.target.closest('.kb-card') : null;
    if (!c) return;
    drag = { card: c, id: c.getAttribute('data-id'), lane: c.getAttribute('data-lane'), from: c.getAttribute('data-status'), x: e.clientX, y: e.clientY, on: false, ghost: null, over: null };
  });
  document.addEventListener('pointermove', function (e) {
    if (!drag) return;
    if (!drag.on) {
      if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) < 6) return;
      var r = drag.card.getBoundingClientRect();
      drag.dx = drag.x - r.left; drag.dy = drag.y - r.top;
      drag.ghost = drag.card.cloneNode(true);
      drag.ghost.className += ' kb-ghost';
      drag.ghost.removeAttribute('data-act');
      drag.ghost.style.width = r.width + 'px';
      document.body.appendChild(drag.ghost);
      drag.card.classList.add('kb-lifted');
      document.documentElement.classList.add('kb-dragging');
      drag.on = true;
    }
    e.preventDefault();
    drag.ghost.style.transform = 'translate(' + (e.clientX - drag.dx) + 'px,' + (e.clientY - drag.dy) + 'px) rotate(1.2deg)';
    var under = document.elementFromPoint(e.clientX, e.clientY);
    var zone = under && under.closest ? under.closest('.kb-drop') : null;
    if (zone && zone.getAttribute('data-lane') !== drag.lane) zone = null; // a task never changes wedding
    if (zone !== drag.over) {
      if (drag.over) drag.over.classList.remove('kb-over');
      if (zone) zone.classList.add('kb-over');
      drag.over = zone;
    }
    if (e.clientY < 64) window.scrollBy(0, -14);
    else if (e.clientY > window.innerHeight - 64) window.scrollBy(0, 14);
  });
  document.addEventListener('pointerup', function () {
    if (!drag) return;
    if (!drag.on) { drag = null; return; } // a plain click: the task sheet opens as usual
    var id = drag.id, from = drag.from, to = drag.over ? drag.over.getAttribute('data-status') : null;
    endDrag();
    suppressClick = true;
    setTimeout(function () { suppressClick = false; }, 400);
    if (to && to !== from) {
      P.api.updateTask(id, { status: to });
      P.render();
      ui.toast('Moved to ' + stLabel(to));
    }
  });
  document.addEventListener('pointercancel', endDrag);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drag && drag.on) { endDrag(); suppressClick = true; setTimeout(function () { suppressClick = false; }, 400); } });
  window.addEventListener('blur', endDrag);
  /* The click that follows a drag must not open the task sheet. */
  window.addEventListener('click', function (e) {
    if (!suppressClick) return;
    suppressClick = false;
    e.stopPropagation(); e.preventDefault();
  }, true);
})();
