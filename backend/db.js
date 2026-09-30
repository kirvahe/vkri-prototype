/* VKRI prototype: the one database.
   State = seed tables + an ordered log of mutations ("ops"). Only the ops are persisted, so editing seed
   files never leaves stale copies behind.
   Storage modes:
     memory : node tests
     local  : file:// or a plain static server; ops live in localStorage and sync across tabs of one browser
     server : opened through serve.py; ops live on disk on the Mac, every device polls them every 2 s
   UI code never touches this file directly: it goes through VKRI.api. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI;
  var KEY = 'vkri.ops.v' + VKRI.SEED_VERSION;
  var hasWindow = typeof window !== 'undefined';
  var state = {}, index = {}, ops = [], seen = {}, listeners = [];
  var mode = hasWindow ? 'local' : 'memory', epoch = 0, rev = 0;
  var serverOps = [], onServer = {}, pending = []; // server mode: confirmed log, its ids, and changes made here that are not confirmed yet

  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function rebuild() {
    state = {}; index = {};
    VKRI.TABLES.forEach(function (t) {
      state[t] = clone(VKRI.seed.tables[t]);
      index[t] = {};
      state[t].forEach(function (row) { index[t][row.id] = row; });
    });
    seen = {};
    ops.forEach(apply);
  }
  function apply(op) {
    if (seen[op.oid]) return false;
    seen[op.oid] = 1;
    if (op.k === 'i') {
      if (!index[op.t][op.r.id]) { var row = clone(op.r); state[op.t].push(row); index[op.t][row.id] = row; }
    } else if (op.k === 'u') {
      var target = index[op.t][op.id];
      if (target) Object.keys(op.p).forEach(function (f) { target[f] = clone(op.p[f]); });
    }
    return true;
  }
  function notify() { listeners.forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } }); }
  function readLocal() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function writeLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(ops)); } catch (e) { /* private mode: keep in memory */ }
  }
  function commit(op) {
    op.oid = 'o' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    ops.push(op); apply(op);
    if (mode === 'local') writeLocal();
    if (mode === 'server') { pending.push(op); flush(); }
    notify();
  }
  /* Send every change the server has not confirmed; called after each change and on each poll. */
  function flush() {
    pending.slice().forEach(function (op) {
      fetch('/api/ops', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(op) })
        .catch(function () { /* offline: stays in pending and is sent again on the next poll */ });
    });
  }
  function takeServerOps(list) {
    var fresh = false;
    list.forEach(function (op) { if (!onServer[op.oid]) { onServer[op.oid] = 1; serverOps.push(op); if (!seen[op.oid]) fresh = true; } });
    pending = pending.filter(function (op) { return !onServer[op.oid]; });
    return fresh;
  }

  /* ---------- server mode ---------- */
  function poll() {
    fetch('/api/ops?since=' + rev, { cache: 'no-store' }).then(function (res) { return res.json(); }).then(function (data) {
      if (data.epoch !== epoch) { // someone reset the demo: start again from the seed
        epoch = data.epoch; ops = []; serverOps = []; onServer = {}; pending = []; rev = 0; rebuild();
        if (data.since !== 0) { notify(); return poll(); }
        takeServerOps(data.ops); ops = serverOps.slice(); rebuild(); rev = data.rev; return notify();
      }
      var fresh = takeServerOps(data.ops);
      rev = data.rev;
      if (fresh) { ops = serverOps.concat(pending); rebuild(); notify(); } // the server's order first, then what is still only here
      if (pending.length) flush();
    }).catch(function () { /* server away: keep showing what we have */ });
  }
  function tryServer() {
    if (!hasWindow || !/^https?:$/.test(location.protocol)) return;
    /* serve.py is only ever reached on this machine or the local network; on a public static host there is nothing to ask. */
    var host = location.hostname;
    if (host.indexOf('.') > -1 && !/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host) && !/\.(local|lan|home)$/.test(host)) return;
    fetch('/api/ops?since=0', { cache: 'no-store' }).then(function (res) {
      if (!res.ok || (res.headers.get('content-type') || '').indexOf('json') < 0) throw new Error('static host');
      return res.json();
    }).then(function (data) {
      mode = 'server'; epoch = data.epoch; rev = data.rev; serverOps = []; onServer = {}; pending = []; takeServerOps(data.ops); ops = serverOps.slice(); rebuild(); notify();
      setInterval(poll, 2000);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) poll(); });
    }).catch(function () { /* stay in local mode */ });
  }

  if (mode === 'local') {
    ops = readLocal();
    window.addEventListener('storage', function (e) {
      if (e.key === KEY && mode === 'local') { ops = readLocal(); rebuild(); notify(); }
    });
  }
  rebuild();
  tryServer();

  VKRI.db = {
    mode: function () { return mode; },
    table: function (t) { return state[t]; },
    get: function (t, id) { return index[t][id] || null; },
    insert: function (t, row) { commit({ k: 'i', t: t, r: row }); return index[t][row.id]; },
    update: function (t, id, patch) { commit({ k: 'u', t: t, id: id, p: patch }); return index[t][id]; },
    onChange: function (fn) { listeners.push(fn); },
    /* Back to the seed, on every device in server mode. */
    reset: function () {
      ops = []; serverOps = []; onServer = {}; pending = []; rev = 0; rebuild();
      if (mode === 'local') writeLocal();
      if (mode === 'server') fetch('/api/ops', { method: 'DELETE' }).then(poll).catch(function () {});
      notify();
    },
    _rebuild: rebuild // for tests after seeding
  };
})(typeof window !== 'undefined' ? window : globalThis);
