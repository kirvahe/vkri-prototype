/* VKRI shared UI helpers. Everything returns HTML strings; pages render with innerHTML and one delegated listener.
   VKRI.ui.esc(text)                      escape user text (always use for data)
   VKRI.ui.pill(kind, id)                 status pill: kind = 'task' | 'subphase' | 'invoice' | 'vendor' | 'decision' | 'rsvp' | 'change' | 'doc'
   VKRI.ui.avatar(user, 'lg'?)            initials disc
   VKRI.ui.bar(pct, cls?)                 progress bar
   VKRI.ui.ring(pct, { size, label, sub, over }) SVG progress ring
   VKRI.ui.icon(name)                     inline SVG icon
   VKRI.ui.sheet(html) / closeSheet()     bottom sheet (phone) or drawer (laptop)
   VKRI.ui.toast(text)
   VKRI.ui.on(root, 'click', '[data-act]', fn(el, event))   delegated events
   VKRI.ui.visibilityTag(internal)        "Internal" / "Visible to couple" tag
   VKRI.ui.demoFlag()                     footer line */
(function (root) {
  'use strict';
  var VKRI = root.VKRI;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var STATUS = {
    task: { todo: ['To do', ''], doing: ['In progress', 'info'], client: ['Awaiting client', 'warn'], blocked: ['Blocked', 'crit'], done: ['Done', 'good'] },
    subphase: { not_started: ['Not started', ''], in_progress: ['In progress', 'info'], awaiting_client: ['Awaiting client', 'warn'], blocked: ['Blocked', 'crit'], done: ['Done', 'good'] },
    invoice: { upcoming: ['Upcoming', ''], due: ['Due now', 'warn'], overdue: ['Overdue', 'crit'], paid: ['Paid', 'good'] },
    vendor: { quote: ['Quote', ''], shortlist: ['Shortlist', 'info'], contracted: ['Contracted', 'info'], confirmed: ['Confirmed', 'good'] },
    decision: { queued: ['Coming up', ''], open: ['Needs you', 'warn'], decided: ['Decided', 'good'], delegated: ['Left to VKRI', 'info'] },
    rsvp: { yes: ['Attending', 'good'], no: ['Declined', ''], pending: ['No reply yet', 'warn'] },
    change: { pending: ['Awaiting approval', 'warn'], approved: ['Approved', 'good'], declined: ['Declined', ''] },
    doc: { 'changes requested': ['Changes requested', 'warn'], signed: ['Signed', 'good'], approved: ['Approved', 'good'], shared: ['Shared', ''], draft: ['Draft', ''], internal: ['Internal', 'warn'], 'awaiting approval': ['Awaiting approval', 'warn'], done: ['Done', 'good'], todo: ['To do', ''] },
    scope: { done: ['Complete', 'good'], in_progress: ['Under way', 'info'], upcoming: ['Upcoming', ''] }
  };
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    board: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/>',
    inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
    team: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5 6-5s5.400 1.600 6 5"/><circle cx="17.500" cy="9" r="2.400"/><path d="M17 14.500c2.300.100 3.600 1.700 4 4.500"/>',
    check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alert: '<path d="M12 4 3 19.500h18z"/><path d="M12 10v4.500M12 17v.100"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    back: '<path d="m15 6-6 6 6 6"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1"/><path d="M14 10a4 4 0 0 0-5.700 0l-3 3A4 4 0 0 0 11 18.700l1-1"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    euro: '<path d="M18 6.500A7 7 0 1 0 18 17.500M4 10.500h9M4 13.500h9"/>',
    users: '<circle cx="12" cy="8" r="3.500"/><path d="M5 20c.700-3.800 3.500-5.500 7-5.500s6.300 1.700 7 5.500"/>',
    calendar: '<rect x="3.500" y="5" width="17" height="15" rx="1.500"/><path d="M3.500 10h17M8 3v4M16 3v4"/>',
    decide: '<path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/>',
    more: '<circle cx="5" cy="12" r="1.300"/><circle cx="12" cy="12" r="1.300"/><circle cx="19" cy="12" r="1.300"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    eye: '<path d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12z"/><circle cx="12" cy="12" r="2.800"/>',
    lock: '<rect x="5" y="10.500" width="14" height="9.500" rx="1.500"/><path d="M8 10.500V8a4 4 0 0 1 8 0v2.500"/>',
    letter: '<rect x="3" y="5.500" width="18" height="13" rx="1.500"/><path d="m3.500 7 8.500 6.500L20.500 7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    shield: '<path d="M12 3 5 6v5.500c0 4.300 2.900 7.700 7 9.500 4.100-1.800 7-5.200 7-9.500V6z"/>',
    out: '<path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h9"/>',
    gantt: '<path d="M4 6h9M8 12h10M6 18h8"/>',
    grid: '<rect x="3.500" y="3.500" width="7" height="7" rx="1"/><rect x="13.500" y="3.500" width="7" height="7" rx="1"/><rect x="3.500" y="13.500" width="7" height="7" rx="1"/><rect x="13.500" y="13.500" width="7" height="7" rx="1"/>'
  };

  var ui = {
    esc: esc,
    statusLabel: function (kind, id) { return (STATUS[kind] && STATUS[kind][id] || [id, ''])[0]; },
    pill: function (kind, id, text) {
      var s = STATUS[kind] && STATUS[kind][id] || [id, ''];
      return '<span class="pill ' + s[1] + '">' + esc(text || s[0]) + '</span>';
    },
    avatar: function (user, size) {
      if (!user) return '<span class="avatar ' + (size || '') + '" title="Unassigned">–</span>';
      return '<span class="avatar ' + (size || '') + (user.type === 'couple' ? ' couple' : '') + '" title="' + esc(user.name) + '">' + esc(user.initials || VKRI.fmt.initials(user.name)) + '</span>';
    },
    bar: function (pct, cls) { return '<div class="bar ' + (cls || '') + '" role="img" aria-label="' + pct + '%"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>'; },
    icon: function (name) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>'; },
    ring: function (pct, o) {
      o = o || {};
      var size = o.size || 132, r = size / 2 - 9, c = 2 * Math.PI * r, p = Math.max(0, Math.min(100, pct));
      var stroke = o.over ? 'var(--crit)' : 'var(--wed)';
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + esc((o.label || '') + ' ' + (o.sub || '')) + '">' +
        '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--sunken)" stroke-width="8"/>' +
        '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + stroke + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (c * p / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
        '<text x="50%" y="48%" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="' + (size * 0.2) + '" font-weight="500" fill="var(--ink)">' + esc(o.label || (pct + '%')) + '</text>' +
        '<text x="50%" y="64%" text-anchor="middle" font-family="Inter, sans-serif" font-size="' + (size * 0.085) + '" fill="var(--ink-3)">' + esc(o.sub || '') + '</text></svg>';
    },
    visibilityTag: function (internal) {
      return internal ? '<span class="tag internal">' + ui.icon('lock') + 'Internal</span>' : '<span class="tag public">' + ui.icon('eye') + 'Visible to couple</span>';
    },
    demoFlag: function () { return '<p class="demo-flag">Demo data. Every person, supplier and price is invented, including prices shown next to real venues and hotels. Today in this demo is Monday 17 May 2027.</p>'; },
    /* safeUrl(u) -> u if it is an http(s) address, otherwise ''. */
    safeUrl: function (u) { return /^https?:\/\/\S+$/i.test(String(u || '')) ? String(u) : ''; },
    /* docHref(doc, base) -> where a document link goes. Seeded sample documents open a local placeholder page
       (base is the path to shared/, e.g. '../shared/'); links people added open as they are. */
    docHref: function (doc, base) {
      var u = ui.safeUrl(doc.url);
      if (!u) return '';
      return /^https:\/\/example\.com\//i.test(u) ? base + 'doc.html?t=' + encodeURIComponent(doc.title) + '&k=' + encodeURIComponent(doc.category || '') : u;
    },
    /* docAttrs(doc, base) -> the href (and target) attributes for a document link; '' when there is no usable address.
       Sample documents open in the same tab so Back returns to the prototype; real links open in a new tab. */
    docAttrs: function (doc, base) {
      var href = ui.docHref(doc, base);
      if (!href) return '';
      return ' href="' + esc(href) + '"' + (href.indexOf(base + 'doc.html') === 0 ? '' : ' target="_blank" rel="noopener"');
    },
    /* Keep what people have typed across a re-render: keepFields(root) before, then call the returned function after. */
    keepFields: function (root) {
      var saved = [], active = document.activeElement, focusId = active && active.id, pos = null;
      try { pos = active && active.selectionStart; } catch (e) { pos = null; }
      root.querySelectorAll('input[id], textarea[id]').forEach(function (el) {
        if (el.type === 'checkbox' || el.type === 'radio') { if (el.hasAttribute('data-keep')) saved.push([el.id, 'checked', el.checked]); }
        else if (el.value) saved.push([el.id, 'value', el.value]);
      });
      return function () {
        saved.forEach(function (s) { var el = document.getElementById(s[0]); if (el && !el.hasAttribute('data-input')) el[s[1]] = s[2]; });
        var again = focusId && document.getElementById(focusId);
        if (again && again !== document.activeElement) { again.focus(); try { if (pos != null) again.setSelectionRange(pos, pos); } catch (e) { /* not a text field */ } }
      };
    },
    /* Back and forward inside the interface. The history lives in this tab (sessionStorage).
       navInit() once per app; navHtml() returns the two arrow buttons; they carry data-nav="back|forward". */
    navInit: function () {
      var KEY = 'vkri.nav.' + location.pathname, st;
      try { st = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { st = null; }
      if (!st || st.list[st.i] !== location.hash) st = { list: [location.hash], i: 0 };
      function save() { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* private mode */ } }
      save();
      window.addEventListener('hashchange', function () {
        var h = location.hash;
        if (st.list[st.i] === h) return;
        if (st.list[st.i - 1] === h) st.i--;               // our Back, or the browser's
        else if (st.list[st.i + 1] === h) st.i++;          // Forward
        else { st.list = st.list.slice(0, st.i + 1).concat(h).slice(-60); st.i = st.list.length - 1; }
        save();
      });
      document.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-nav]');
        if (!b || b.disabled) return;
        var to = st.i + (b.getAttribute('data-nav') === 'back' ? -1 : 1);
        if (to < 0 || to >= st.list.length) return;
        st.i = to; save(); location.hash = st.list[to];
      });
      ui._nav = st;
    },
    navHtml: function () {
      var st = ui._nav || { list: [], i: 0 };
      return '<span class="navarrows"><button type="button" data-nav="back" aria-label="Back"' + (st.i > 0 ? '' : ' disabled') + '>' + ui.icon('left') + '</button>' +
        '<button type="button" data-nav="forward" aria-label="Forward"' + (st.i < st.list.length - 1 ? '' : ' disabled') + '>' + ui.icon('arrow') + '</button></span>';
    },

    on: function (rootEl, type, selector, handler) {
      rootEl.addEventListener(type, function (e) {
        var el = e.target.closest ? e.target.closest(selector) : null;
        if (el && rootEl.contains(el)) handler(el, e);
      });
    },
    sheet: function (html) {
      ui.closeSheet();
      var wrap = document.createElement('div');
      wrap.className = 'sheet-wrap'; wrap.id = 'vkri-sheet';
      var scope = document.querySelector('.capp[data-wedding], .main[data-wedding]'); // keep the wedding's signature colour inside the sheet
      if (scope) wrap.setAttribute('data-wedding', scope.getAttribute('data-wedding'));
      wrap.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"><button class="sheet-close" data-close aria-label="Close">' + ui.icon('close') + '</button>' + html + '</div>';
      wrap.addEventListener('click', function (e) { if (e.target === wrap || e.target.closest('[data-close]')) ui.closeSheet(); });
      document.body.appendChild(wrap);
      return wrap.querySelector('.sheet');
    },
    closeSheet: function () { var el = document.getElementById('vkri-sheet'); if (el) el.remove(); },
    sheetOpen: function () { return !!document.getElementById('vkri-sheet'); },
    toast: function (text) {
      var old = document.querySelector('.toast'); if (old) old.remove();
      var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = text;
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 2600);
    }
  };
  VKRI.ui = ui;
})(window);
