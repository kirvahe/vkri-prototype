/* VKRI guided tour. Started from the sign-in page ("Take the tour"), runs inside one interface, and ends:
   after the last step or "Skip tour" it removes itself and the user carries on in the same screen.
     VKRI.tour.begin(role)   role = 'planner' | 'couple'; call before navigating into the app
     VKRI.tour.resume()      called by each app after its first render; continues a tour in progress
   A step: { route: '#/...', target: 'css selector' (optional), title, body }.
   While the tour is open the page underneath cannot be clicked, so nobody changes data by accident. */
(function () {
  'use strict';
  var VKRI = window.VKRI, KEY = 'vkri.tour';

  var STEPS = {
    planner: [
      { route: '#/portfolio', target: '.wcards', title: 'Three weddings at a glance',
        body: 'Each card shows how far the wedding is, the forecast against the agreed budget, and what is waiting on the couple. Select a card to open the wedding.' },
      { route: '#/portfolio', target: '[data-tour="pulse"]', title: 'Agency pulse',
        body: 'Four numbers for the whole agency: replies sent inside the 24-hour promise, money due in the next 30 days, decisions that have sat with a couple for more than a week, and records nobody has updated for 14 days.' },
      { route: '#/board/matrix', target: ':has(> .mx-head)', title: 'The board',
        body: 'One list of tasks, three ways to look at it. Matrix shows where every wedding stands. Kanban is for daily work: move a task between columns. Gantt shows the season on a timeline.' },
      { route: '#/w/como/phases', target: '.phase-grid', title: 'Three phases, nine steps',
        body: 'Every wedding runs through Planning, Operations and Execution. Each step has an owner, a status and a progress bar counted from its tasks. Open any of them.' },
      { route: '#/w/como/phases/como-3.1', target: '[data-tour="tasks"]', title: 'Inside a step',
        body: 'Tasks with an owner and a due date. The eye means the couple can see the task; the lock means it is internal. Select a task to change its status, owner or visibility.' },
      { route: '#/w/como/phases/como-3.1', target: '[data-tour="comments"]', title: 'Internal notes and visible comments',
        body: 'Every comment is either an internal note for the team or visible to the couple. The choice is made when you post it, and the couple never sees internal notes.' },
      { route: '#/w/como/money', target: '.main .stats', title: 'Budget in three numbers',
        body: 'The envelope agreed with the couple, the forecast (everything contracted, estimated or waiting for approval) and what is paid. The couple sees exactly the same numbers.' },
      { route: '#/inbox', target: '[data-tour="waiting"]', title: 'Questions from couples',
        body: 'Each question shows how long is left on the 24-hour reply promise. Acknowledge it so the couple knows it is with you, then answer in writing.' },
      { route: '#/w/como/overview', target: '[data-tour="as-couple"]', title: 'See what the couple sees',
        body: 'This opens the couple\'s portal exactly as they see it. That is the end of the tour: everything here is demo data, so try anything. "Reset demo data" on the sign-in page puts it all back.' }
    ],
    couple: [
      { route: '#/home', target: '.hero', title: 'Your wedding in one place',
        body: 'This is your home page. Everything about the weekend is here or one tap away: decisions, budget, guests, documents and letters from your planners.' },
      { route: '#/home', target: '[data-tour="needs"]', title: 'What needs you',
        body: 'Only a few things at a time, each with a date and the reason it is needed now. Everything else waits until it matters.' },
      { route: '#/home', target: '[data-tour="hands"]', title: 'Who is holding what',
        body: 'On the left, what your planners are working on. On the right, what is waiting for you. You should never have to chase anyone to know where things stand.' },
      { route: '#/decisions', target: '.phead + *', title: 'Decisions',
        body: 'Open one to see the options with full prices and our recommendation. Choose one, or for some of them tap "Decide for us" and we take it from there.' },
      { route: '#/budget', target: '.phead + *', title: 'The full picture of your budget',
        body: 'Your budget, the current forecast and what is paid. The forecast already includes what is not booked yet, so there are no surprises later. Invoices and the payment schedule are further down.' },
      { route: '#/guests', target: '.tiles', title: 'Your guests',
        body: 'Who is coming to each event, where they stay and what they eat. Tap a guest to see their weekend or change a reply.' },
      { route: '#/documents', target: '.dgrid .col > *', title: 'Documents and links',
        body: 'Contracts, designs, timelines and every useful link in one place. You can add your own links, and export everything whenever you like.' },
      { route: '#/updates', target: '[data-tour="updates"]', title: 'Letters and questions',
        body: 'Every Friday we write what was done, what is moving and what we need from you. Ask us anything here: we reply in writing within 24 hours. That is the end of the tour. Have a look around.' }
    ]
  };

  var state = null, els = null;
  function read() { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function write(v) { try { v ? sessionStorage.setItem(KEY, JSON.stringify(v)) : sessionStorage.removeItem(KEY); } catch (e) { /* private mode */ } }

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'tour'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'Guided tour');
    wrap.innerHTML = '<div class="tour-block"></div><div class="tour-spot"></div>' +
      '<div class="tour-card"><div class="tour-count"></div><h3 class="tour-title display d-sm"></h3><p class="tour-body"></p>' +
      '<div class="tour-actions"><button class="btn ghost sm" data-tour-act="skip">Skip tour</button><span class="grow"></span>' +
      '<button class="btn sm" data-tour-act="back">Back</button><button class="btn primary sm" data-tour-act="next">Next</button></div></div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tour-act]'); if (!b) return;
      var act = b.getAttribute('data-tour-act');
      if (act === 'skip') return finish(false);
      go(state.step + (act === 'back' ? -1 : 1));
    });
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return { wrap: wrap, spot: wrap.querySelector('.tour-spot'), card: wrap.querySelector('.tour-card'), count: wrap.querySelector('.tour-count'),
      title: wrap.querySelector('.tour-title'), body: wrap.querySelector('.tour-body'), back: wrap.querySelector('[data-tour-act="back"]'), next: wrap.querySelector('[data-tour-act="next"]') };
  }
  function onKey(e) {
    if (!state) return;
    if (e.key === 'Escape') finish(false);
    if (e.key === 'ArrowRight') go(state.step + 1);
    if (e.key === 'ArrowLeft') go(state.step - 1);
  }
  function target() {
    var step = STEPS[state.role][state.step];
    if (!step.target) return null;
    var list = document.querySelectorAll(step.target);
    for (var i = 0; i < list.length; i++) { var r = list[i].getBoundingClientRect(); if (r.width > 0 && r.height > 0) return list[i]; }
    return null;
  }
  /* Put the spotlight on the target and the card next to it (docked to the bottom on phones). */
  function place() {
    if (!state || !els) return;
    var t = target(), vw = window.innerWidth, vh = window.innerHeight, phone = vw < 768, pad = 6;
    if (!t) { els.spot.style.cssText = 'left:50%;top:40%;width:0;height:0'; }
    else {
      var r = t.getBoundingClientRect();
      var top = Math.max(r.top - pad, 4), left = Math.max(r.left - pad, 4);
      var h = Math.min(r.bottom + pad, vh - 4) - top, w = Math.min(r.right + pad, vw - 4) - left;
      els.spot.style.cssText = 'left:' + left + 'px;top:' + top + 'px;width:' + Math.max(w, 0) + 'px;height:' + Math.max(h, 0) + 'px';
    }
    if (phone) { els.card.style.cssText = ''; els.card.classList.add('docked'); return; }
    els.card.classList.remove('docked');
    var cw = 380, ch = els.card.offsetHeight || 220, x, y;
    if (!t) { x = (vw - cw) / 2; y = (vh - ch) / 2; }
    else {
      var b = t.getBoundingClientRect();
      x = Math.min(Math.max(b.left, 16), vw - cw - 16);
      y = b.bottom + 16 + ch <= vh ? b.bottom + 16 : (b.top - 16 - ch >= 0 ? b.top - 16 - ch : vh - ch - 16);
      if (b.height > vh * 0.45) { // tall target: stand beside it if there is room, otherwise inside its lower right corner
        y = Math.min(Math.max(b.top, 16), vh - ch - 16);
        if (vw - b.right >= cw + 32) x = b.right + 16;
        else if (b.left >= cw + 32) x = b.left - cw - 16;
        else { y = vh - ch - 24; x = Math.min(Math.max(b.right - cw - 24, 16), vw - cw - 16); }
      }
    }
    els.card.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + cw + 'px';
  }
  function show() {
    var steps = STEPS[state.role], step = steps[state.step];
    if (!els) els = build();
    els.count.textContent = 'Step ' + (state.step + 1) + ' of ' + steps.length;
    els.title.textContent = step.title; els.body.textContent = step.body;
    els.back.hidden = state.step === 0;
    els.next.textContent = state.step === steps.length - 1 ? 'Finish' : 'Next';
    var t = target();
    if (t) {
      var r = t.getBoundingClientRect(), vh = window.innerHeight, room = window.innerWidth < 768 ? vh * 0.45 : vh;
      if (r.top < 70 || r.top > room - 80) window.scrollTo(0, Math.max(0, window.scrollY + r.top - (window.innerWidth < 768 ? 84 : 120)));
    } else { window.scrollTo(0, 0); }
    place(); setTimeout(place, 60); setTimeout(place, 300);
    els.next.focus();
  }
  function go(i) {
    var steps = STEPS[state.role];
    if (i < 0) return;
    if (i >= steps.length) return finish(true);
    state.step = i; write(state);
    var step = steps[i];
    if (location.hash !== step.route) { location.hash = step.route; setTimeout(show, 120); } else show();
  }
  function finish(done) {
    write(null); state = null;
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('scroll', place, true);
    window.removeEventListener('resize', place);
    if (els) { els.wrap.remove(); els = null; }
    if (VKRI.ui && VKRI.ui.toast) VKRI.ui.toast(done ? 'Tour finished. Everything here is yours to try.' : 'Tour closed. You can start it again from the sign-in page.');
  }

  VKRI.tour = {
    steps: STEPS,
    begin: function (role) { write(role ? { role: role, step: 0 } : null); },
    resume: function () {
      var saved = read();
      if (!saved || !STEPS[saved.role] || state) return;
      state = saved; go(state.step);
    },
    active: function () { return !!state; },
    /* Apps call this after re-rendering so the spotlight follows the element. */
    refresh: function () { if (state) { place(); } }
  };
})();
