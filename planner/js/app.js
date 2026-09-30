/* Planner CRM shell: session guard, router, sidebar, shared helpers.
   Screens register themselves:
     VKRI.planner.screens.<name> = function (parts) -> html          (#/<name>/...)
     VKRI.planner.tabs.<name>    = function (wedding, parts) -> html  (#/w/<weddingId>/<name>/...)
     VKRI.planner.actions.<name> = function (el, event)               ([data-act="<name>"] clicks)
     VKRI.planner.changes.<name> = function (el, event)               ([data-change="<name>"] change events) */
(function () {
  'use strict';
  var ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var P = VKRI.planner = { screens: {}, tabs: {}, actions: {}, changes: {}, inputs: {}, api: null };

  var TABS = [['overview', 'Overview'], ['phases', 'Phases'], ['tasks', 'Tasks'], ['money', 'Budget & Invoices'], ['guests', 'Guests'],
    ['vendors', 'Vendors'], ['documents', 'Documents & Links'], ['log', 'Client log']];
  var NAV = [['portfolio', 'Portfolio', 'home'], ['board', 'Board', 'board'], ['inbox', 'Inbox', 'inbox'], ['team', 'Team', 'team']];

  P.parts = function () { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent); };
  P.go = function (path) { location.hash = '#/' + path; };
  P.user = function (id) { return P.api.user(id); };
  P.weddings = function () { return P.api.list('weddings').sort(function (a, b) { return a.start_date < b.start_date ? -1 : 1; }); };
  P.waitingCount = function () { return P.api.list('messages').filter(function (m) { return !m.answered_at; }).length; };
  /* Hours left (negative = late) on a message's reply promise. */
  P.slaLeft = function (m) { return fmt.hoursBetween(VKRI.now().toISOString(), m.due_by); };
  P.dueHtml = function (iso) { var d = fmt.due(iso); return '<span class="tone-' + d.tone + ' nowrap">' + fmt.date(iso) + ' · ' + d.text + '</span>'; };
  /* Days since a record was last touched; records older than 14 days are flagged as stale. */
  P.staleDays = function (iso) { return iso ? -fmt.daysUntil(iso.slice(0, 10)) : 0; };
  P.staleTag = function (iso) { var n = P.staleDays(iso); return n > 14 ? '<span class="tag internal" title="Not updated for ' + n + ' days">Stale ' + n + 'd</span>' : ''; };
  P.wdot = function (wid) { return '<span class="dot" data-wedding="' + wid + '" style="background:var(--wed)"></span>'; };
  P.payer = function (w, id) { return (w.payers || []).filter(function (p) { return p.id === id; })[0] || { name: '' }; };
  P.check = function (on) { return on ? '<span class="tone-good" title="Yes">' + ui.icon('check') + '</span>' : '<span class="muted" title="Not yet">\u2013</span>'; };
  P.soon = function (name) {
    return '<div class="panel empty"><p class="display d-sm">' + esc(name) + '</p><p>This screen is built in the next wave.</p></div>';
  };

  /* Wedding header + tab strip, shared by every workspace tab. */
  P.weddingHead = function (w, tab) {
    var lead = P.user(w.lead_id);
    return '<header class="whead">' +
      '<div class="col gap-2"><span class="eyebrow code"><span class="dot"></span>' + esc(w.code_name) + ' · ' + esc(w.short) + '</span>' +
      '<h1 class="display d-lg">' + esc(w.title) + '</h1></div>' +
      '<div class="meta"><span class="pill wed plain">' + fmt.weeksOut(w.wedding_day) + '</span><span>' + fmt.range(w.start_date, w.end_date) + '</span>' +
      '<span>' + esc(w.venue.name) + ', ' + esc(w.venue.town) + '</span><span class="row gap-2">' + ui.avatar(lead) + esc(lead.name) + '</span>' +
      '<a class="btn sm" data-tour="as-couple" target="_blank" rel="noopener" href="../couple/index.html?as=c_' + w.id + '&preview=1">' + ui.icon('eye') + 'View as couple</a></div></header>' +
      '<nav class="tabs">' + TABS.map(function (t) {
        return '<a class="' + (t[0] === tab ? 'on' : '') + '" href="#/w/' + w.id + '/' + t[0] + '">' + t[1] + '</a>';
      }).join('') + '</nav>';
  };

  function shell(parts) {
    var here = parts[0] || 'portfolio', wid = here === 'w' ? parts[1] : null, waiting = P.waitingCount();
    var side = '<aside class="side"><div class="brand-row"><a class="brand" href="#/portfolio" aria-label="VKRI, back to the portfolio">VKRI<small>Private weddings in Europe</small></a>' + ui.navHtml() + '</div><nav>' +
      NAV.map(function (n) {
        return '<a class="nav ' + (here === n[0] ? 'on' : '') + '" href="#/' + n[0] + '">' + ui.icon(n[2]) + n[1] +
          (n[0] === 'inbox' && waiting ? '<span class="count">' + waiting + '</span>' : '') + '</a>';
      }).join('') + '</nav><nav><div class="label">Weddings</div>' +
      P.weddings().map(function (w) {
        return '<a class="nav ' + (wid === w.id ? 'on' : '') + '" data-wedding="' + w.id + '" href="#/w/' + w.id + '/overview"><span class="wdot"></span>' +
          '<span>' + esc(w.title) + '<span class="sub">' + esc(w.code_name) + ' · ' + fmt.date(w.wedding_day) + '</span></span></a>';
      }).join('') + '</nav>' +
      '<div class="me">' + ui.avatar(P.api.me) + '<span class="grow truncate">' + esc(P.api.me.name) + '<br><a href="../index.html">Switch user</a></span></div></aside>';
    var tabbar = '<nav class="tabbar">' + NAV.map(function (n) {
      return '<a class="' + (here === n[0] || (n[0] === 'portfolio' && here === 'w') ? 'on' : '') + '" href="#/' + n[0] + '">' + ui.icon(n[2]) + n[1] +
        (n[0] === 'inbox' && waiting ? '<span class="count">' + waiting + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
    var topline = '<div class="topline"><span class="row gap-2"><a class="brand-sm" href="#/portfolio" aria-label="VKRI, back to the portfolio">VKRI</a>' + ui.navHtml() + '</span>' + '<a class="me-phone" href="../index.html" aria-label="Switch user">' + ui.avatar(P.api.me) + '<span class="xs muted">Switch user</span></a></div>';
    return '<div class="app">' + side + '<main class="main" id="main"' + (wid ? ' data-wedding="' + esc(wid) + '"' : '') + '>' + topline + body(parts) + ui.demoFlag() + '</main>' + tabbar + '</div>';
  }
  function body(parts) {
    var here = parts[0] || 'portfolio';
    if (here === 'w') {
      var w = P.api.get('weddings', parts[1]);
      if (!w) return '<div class="panel empty">This wedding does not exist.</div>';
      var tab = parts[2] || 'overview';
      return P.weddingHead(w, tab) + (P.tabs[tab] ? P.tabs[tab](w, parts.slice(3)) : P.soon(tab));
    }
    return P.screens[here] ? P.screens[here](parts.slice(1)) : P.soon(here);
  }

  var lastHash = null;
  P.render = function () {
    P.api = VKRI.api.current();
    if (!P.api || !P.api.isPlanner) { location.href = '../index.html'; return; }
    var same = lastHash === location.hash, keepScroll = same ? window.scrollY : 0, app = document.getElementById('app');
    var restore = same ? ui.keepFields(app) : null; // what someone has typed survives a re-render of the same screen
    lastHash = location.hash; P.stale = false;
    app.innerHTML = shell(P.parts());
    if (restore) restore();
    window.scrollTo(0, keepScroll);
    var tab = app.querySelector('.tabs .on');
    if (tab && tab.scrollIntoView && window.innerWidth < 768) tab.scrollIntoView({ block: 'nearest', inline: 'center' });
    if (VKRI.tour) VKRI.tour.refresh();
  };
  /* Changes from other devices re-render the screen, but never between a press and its click, and never behind an open sheet. */
  var pressing = false;
  function onData() {
    if (pressing || ui.sheetOpen()) { P.stale = true; return; }
    P.render();
  }
  function catchUp() { if (P.stale && !pressing && !ui.sheetOpen()) P.render(); }

  document.addEventListener('DOMContentLoaded', function () {
    ui.navInit();
    ui.on(document, 'click', '[data-act]', function (el, e) { var fn = P.actions[el.getAttribute('data-act')]; if (fn) fn(el, e); });
    document.addEventListener('pointerdown', function () { pressing = true; }, true);
    ['pointerup', 'pointercancel'].forEach(function (t) { document.addEventListener(t, function () { pressing = false; setTimeout(catchUp, 120); }, true); });
    document.addEventListener('click', function () { setTimeout(catchUp, 0); }); // also after a sheet closes
    ui.on(document, 'change', '[data-change]', function (el, e) { var fn = P.changes[el.getAttribute('data-change')]; if (fn) fn(el, e); });
    /* [data-input="name"]: live text filters. The handler updates module state, then the screen re-renders and the caret is put back. */
    ui.on(document, 'input', '[data-input]', function (el, e) {
      var fn = P.inputs[el.getAttribute('data-input')]; if (!fn) return;
      fn(el, e); P.render(); // render() puts the caret back
    });
    window.addEventListener('hashchange', function () { ui.closeSheet(); P.render(); });
    VKRI.api.onChange(onData);
    P.render();
    if (VKRI.tour) VKRI.tour.resume();
  });
})();
