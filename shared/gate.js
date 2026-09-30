/* VKRI prototype: sign-in gate. Loaded first in <head> of every page except login.html.
     <script src="shared/gate.js" data-login="login.html"></script>
   Not signed in -> the page is replaced by the sign-in page, which sends people back here afterwards.
   Passwords are never stored in the code: only salted, stretched SHA-256 hashes.
   This keeps casual visitors out of a static prototype; it is not real security. */
(function () {
  'use strict';
  var KEY = 'vkri.gate', SALT = 'vkri-prototype-2027:', ROUNDS = 3000;
  var ACCOUNTS = { /* login (lower case) -> hash */ ri: 'dce4cceca917ac4447c9187a0ed6cc1fc2c2c44b926845ef231a736075d7cc68', sb: '59623dbf3118d19b9a197d12b7b5b9f83a82dbf20a50729079910b2e80fa0648', vk: 'deaff82d920abd5dc5a02fb5e3a3e450d2cdba6be83ab8efe1975dfbebe8c9bb' };

  /* SHA-256 of a string (UTF-8), hex. Plain JavaScript so it also works on http:// addresses in the local network. */
  function sha256(text) {
    var ascii = unescape(encodeURIComponent(text));
    function rot(v, a) { return (v >>> a) | (v << (32 - a)); }
    var maxWord = Math.pow(2, 32), result = '', words = [], bitLength = ascii.length * 8, i, j;
    var hash = [], k = [], primes = 0, composite = {};
    for (var c = 2; primes < 64; c++) {
      if (!composite[c]) {
        for (i = 0; i < 313; i += c) composite[i] = c;
        hash[primes] = (Math.pow(c, 0.5) * maxWord) | 0;
        k[primes++] = (Math.pow(c, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) { j = ascii.charCodeAt(i); words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words.length] = (bitLength / maxWord) | 0;
    words[words.length] = bitLength;
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), old = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var t1 = hash[7] + (rot(e, 6) ^ rot(e, 11) ^ rot(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] +
          (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rot(w15, 7) ^ rot(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rot(w2, 17) ^ rot(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rot(a, 2) ^ rot(a, 13) ^ rot(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(t1 + t2) | 0].concat(hash);
        hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + old[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { var b = (hash[i] >> (j * 8)) & 255; result += (b < 16 ? '0' : '') + b.toString(16); }
    return result;
  }
  function stretch(login, password) {
    var h = SALT + login + ':' + password;
    for (var i = 0; i < ROUNDS; i++) h = sha256(h);
    return h;
  }
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }

  var Gate = {
    sha256: sha256,
    /* check(login, password) -> the account name as typed in the list, or null */
    check: function (login, password) {
      var id = String(login || '').trim().toLowerCase();
      return ACCOUNTS[id] && stretch(id, String(password || '')) === ACCOUNTS[id] ? id : null;
    },
    account: function () { var s = read(); return s && ACCOUNTS[s.a] ? s.a : null; },
    signIn: function (id) { try { localStorage.setItem(KEY, JSON.stringify({ a: id })); } catch (e) { /* private mode: this tab only */ } Gate._tab = id; },
    signOut: function () { try { localStorage.removeItem(KEY); sessionStorage.clear(); } catch (e) { /* nothing stored */ } },
    _hashFor: stretch
  };
  if (typeof window === 'undefined') { globalThis.VKRIGate = Gate; return; }
  window.VKRIGate = Gate;

  var me = document.currentScript, login = me && me.getAttribute('data-login');
  if (login && !Gate.account()) {
    document.documentElement.style.visibility = 'hidden';
    var next = location.pathname + location.search + location.hash;
    location.replace(login + '?next=' + encodeURIComponent(next));
  }
})();
