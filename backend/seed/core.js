/* VKRI prototype: shared namespace, demo clock, enums, seed registry, guest generator.
   Loaded first by every page (classic script, global VKRI) and by node tests via vm. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI = root.VKRI || {};

  /* ---------- demo clock: the only source of "today" ---------- */
  VKRI.DEMO_NOW = '2027-05-17T08:30:00Z'; // Monday 17 May 2027, 10:30 in Italy and France
  VKRI.now = function () { return new Date(VKRI.DEMO_NOW); };
  VKRI.SEED_VERSION = 5;

  /* ---------- enums (the contract) ---------- */
  VKRI.enums = {
    taskStatus: [
      { id: 'todo', label: 'To do' },
      { id: 'doing', label: 'In progress' },
      { id: 'client', label: 'Awaiting client' },
      { id: 'blocked', label: 'Blocked' },
      { id: 'done', label: 'Done' }
    ],
    subphaseStatus: [
      { id: 'not_started', label: 'Not started' },
      { id: 'in_progress', label: 'In progress' },
      { id: 'awaiting_client', label: 'Awaiting client' },
      { id: 'blocked', label: 'Blocked' },
      { id: 'done', label: 'Done' }
    ],
    vendorStatus: ['quote', 'shortlist', 'contracted', 'confirmed'],
    invoiceStatus: ['upcoming', 'due', 'overdue', 'paid'],
    decisionStatus: ['queued', 'open', 'decided', 'delegated'],
    changeOrderStatus: ['pending', 'approved', 'declined'],
    rsvp: ['yes', 'no', 'pending'],
    budgetCategories: ['Venue', 'Catering & bar', 'Florals & design', 'Production & lighting', 'Music & entertainment',
      'Photo & film', 'Guest hospitality', 'Transport', 'Stationery', 'Beauty & attire', 'Planning fee', 'Contingency'],
    docCategories: ['Contracts', 'Design', 'Guests & travel', 'Timeline', 'Legal paperwork', 'Links'],
    channels: ['whatsapp', 'email', 'call', 'portal']
  };

  /* Phase template: identical for every wedding. */
  VKRI.PHASES = [
    { n: 1, name: 'Planning', blurb: 'Agree everything with the couple, from style to catering',
      sub: [['1.1', 'Discovery & Brief'], ['1.2', 'Concept & Venue'], ['1.3', 'Vendor Curation & Approvals']] },
    { n: 2, name: 'Operations', blurb: 'Organise what was agreed',
      sub: [['2.1', 'Contracts & Payments'], ['2.2', 'Guests & Logistics'], ['2.3', 'Production Design']] },
    { n: 3, name: 'Execution', blurb: 'Deliver the weekend',
      sub: [['3.1', 'Final Countdown'], ['3.2', 'Wedding Week'], ['3.3', 'Wrap-up']] }
  ];

  /* ---------- seed registry ---------- */
  var TABLES = ['users', 'weddings', 'phases', 'subphases', 'tasks', 'comments', 'activity_log',
    'events', 'guests', 'guest_event_rsvps', 'accommodations',
    'budget_lines', 'change_orders', 'invoices',
    'decisions', 'documents', 'vendors', 'risks', 'messages', 'weekly_recaps'];
  var tables = {};
  TABLES.forEach(function (t) { tables[t] = []; });

  VKRI.TABLES = TABLES;
  VKRI.seed = {
    tables: tables,
    /* add({ tasks: [...], guests: [...] }) */
    add: function (chunk) {
      Object.keys(chunk).forEach(function (t) {
        if (!tables[t]) throw new Error('Unknown table: ' + t);
        chunk[t].forEach(function (row) { tables[t].push(row); });
      });
    }
  };

  /* ---------- deterministic helpers ---------- */
  function rng(seed) { // mulberry32
    var a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  VKRI.seed.rng = rng;

  function addDays(iso, n) {
    var d = new Date(iso + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }
  VKRI.seed.addDays = addDays;

  /* Builds the 3 phase rows + 9 sub-phase rows of one wedding from the template.
     state: { '1.1': { status, owner_id, start, end, summary, blocked_reason }, ... }
     phaseMeta: { 1: { owner_id, client_signoff_at, summary }, ... } */
  VKRI.seed.makePhases = function (wid, phaseMeta, state) {
    var phases = [], subphases = [];
    VKRI.PHASES.forEach(function (p) {
      var pm = phaseMeta[p.n] || {};
      phases.push({ id: wid + '-p' + p.n, wedding_id: wid, n: p.n, name: p.name, blurb: p.blurb,
        owner_id: pm.owner_id, client_signoff_at: pm.client_signoff_at || null, summary: pm.summary || '' });
      p.sub.forEach(function (s) {
        var st = state[s[0]] || {};
        subphases.push({ id: wid + '-' + s[0], wedding_id: wid, phase_id: wid + '-p' + p.n, code: s[0], name: s[1],
          owner_id: st.owner_id, status: st.status || 'not_started', start: st.start, end: st.end,
          summary: st.summary || '', blocked_reason: st.blocked_reason || '' });
      });
    });
    return { phases: phases, subphases: subphases };
  };

  var FIRST = ['James', 'Emily', 'Michael', 'Sarah', 'William', 'Hannah', 'David', 'Grace', 'Andrew', 'Claire', 'Thomas', 'Julia',
    'Benjamin', 'Natalie', 'Samuel', 'Caroline', 'Matthew', 'Lauren', 'Jonathan', 'Rachel', 'Christopher', 'Megan', 'Nicholas',
    'Katherine', 'Peter', 'Anna', 'Robert', 'Elizabeth', 'Charles', 'Margaret', 'Edward', 'Victoria', 'George', 'Eleanor',
    'Patrick', 'Sophie', 'Luke', 'Abigail', 'Simon', 'Madeline', 'Owen', 'Lily', 'Ethan', 'Nora', 'Jack', 'Audrey', 'Theo', 'Isla'];
  var LAST = ['Harrington', 'Whitfield', 'Callahan', 'Prescott', 'Lindqvist', 'Marlowe', 'Donovan', 'Ashby', 'Kessler', 'Fairbanks',
    'Holloway', 'Sinclair', 'Vandermeer', 'Beaumont', 'Thornton', 'Gallagher', 'Rosenthal', 'Hastings', 'Delacroix', 'Winslow',
    'Abernathy', 'Langford', 'Pemberton', 'Castellano', 'Okafor', 'Nakamura', 'Lindgren', 'Moreau', 'Sutherland', 'Whitaker'];
  var DIETS = [['', 70], ['Vegetarian', 9], ['Pescatarian', 5], ['Gluten-free', 5], ['Vegan', 3], ['Dairy-free', 3], ['Kosher-style', 3], ['Halal', 2]];
  var ALLERGIES = [['', 90], ['Tree nuts', 3], ['Shellfish', 3], ['Peanuts', 2], ['Sesame', 1], ['Celiac', 1]];

  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function weighted(r, pairs) {
    var total = pairs.reduce(function (s, p) { return s + p[1]; }, 0), x = r() * total;
    for (var i = 0; i < pairs.length; i++) { x -= pairs[i][1]; if (x <= 0) return pairs[i][0]; }
    return pairs[0][0];
  }

  /* makeGuests(opts) -> { guests: [...], guest_event_rsvps: [...] }
     opts: {
       wedding_id, prefix ('co'), seed (int), count (total incl. vips),
       vips: [ partial guest rows written by hand: { name, side, tier, ... } ],
       events: [ { id, audience: 'all' | 'family' | 'party', turnout: 0..1 } ],
       accommodations: [ [accommodation_id, weight], ... ],
       responded: 0..1 (share of guests who answered), yesRate: 0..1 (of those who answered),
       start_date, end_date ('YYYY-MM-DD'), seated: bool (assign tables of 10 to confirmed guests), firstTable: int (default 2),
       firstNames, lastNames (optional extra pools), sides: ['Bennett', 'Ashworth']
     }
     Per-event replies are drawn from each event's turnout, except that a hand-written VIP who said yes is 'yes' for every event
     they are invited to. The draw still happens for them, so the random sequence and every other guest stay the same. */
  VKRI.seed.makeGuests = function (o) {
    var r = rng(o.seed), guests = [], rsvps = [];
    var first = (o.firstNames || []).concat(FIRST), last = (o.lastNames || []).concat(LAST);
    var used = {};
    function uniqueName(fixedLast) {
      for (var i = 0; i < 50; i++) {
        var l = fixedLast || pick(r, last), n = pick(r, first) + ' ' + l;
        if (!used[n]) { used[n] = 1; return n; }
      }
      return pick(r, first) + ' ' + pick(r, last) + ' II';
    }
    function finish(g, idx) {
      var id = o.prefix + '-g' + String(idx + 1).padStart(3, '0');
      var answered = g.rsvp ? true : r() < o.responded;
      var rsvp = g.rsvp || (answered ? (r() < o.yesRate ? 'yes' : 'no') : 'pending');
      var yes = rsvp === 'yes';
      var row = {
        id: id, wedding_id: o.wedding_id, name: g.name, household: g.household || g.name.split(' ').slice(-1)[0],
        side: g.side || pick(r, o.sides.concat(['Both'])), tier: g.tier || weighted(r, [['Friends', 55], ['Family', 30], ['Colleagues', 15]]),
        rsvp: rsvp, email: g.name.toLowerCase().replace(/[^a-z ]/g, '').replace(/ +/g, '.') + '@example.com',
        language: g.language || 'English',
        dietary: g.dietary !== undefined ? g.dietary : weighted(r, DIETS),
        allergies: g.allergies !== undefined ? g.allergies : weighted(r, ALLERGIES),
        accommodation_id: null, room_type: '', nights_hosted: 0, arrival: '', departure: '', flight: g.flight || '', transfer: '',
        table: g.table != null ? g.table : null, vip: !!g.vip, notes: g.notes || '', internal_notes: g.internal_notes || '',
        updated_at: addDays(VKRI.DEMO_NOW.slice(0, 10), -Math.floor(3 + r() * 60)) // never after the demo's today
      };
      if (yes || (rsvp === 'pending' && g.vip)) {
        row.accommodation_id = g.accommodation_id !== undefined ? g.accommodation_id : (r() < 0.86 ? weighted(r, o.accommodations) : null);
        row.room_type = row.accommodation_id ? (g.room_type || weighted(r, [['Deluxe double', 60], ['Junior suite', 22], ['Classic double', 12], ['Suite', 6]])) : 'Own arrangements';
        row.nights_hosted = g.nights_hosted !== undefined ? g.nights_hosted : (row.tier === 'Family' && row.accommodation_id ? 2 : 0);
        row.arrival = g.arrival || addDays(o.start_date, weighted(r, [[-1, 45], [0, 40], [-2, 15]]));
        row.departure = g.departure || addDays(o.end_date, weighted(r, [[1, 70], [0, 20], [2, 10]]));
        row.transfer = g.transfer || weighted(r, [['Group shuttle', 55], ['Private car', 25], ['Own arrangements', 20]]);
      }
      Object.keys(g).forEach(function (k) { if (row[k] === undefined) row[k] = g[k]; });
      guests.push(row);
      o.events.forEach(function (ev) {
        var invited = ev.audience === 'all' || (ev.audience === 'family' && (row.tier === 'Family' || row.tier === 'Wedding party')) ||
          (ev.audience === 'party' && row.tier === 'Wedding party');
        if (!invited) return;
        var status = rsvp === 'pending' ? 'pending' : (rsvp === 'no' ? 'no' : ((r() < (ev.turnout || 1)) || row.vip ? 'yes' : 'no'));
        rsvps.push({ id: id + ':' + ev.id, wedding_id: o.wedding_id, guest_id: id, event_id: ev.id, status: status });
      });
    }
    var list = (o.vips || []).map(function (v) { used[v.name] = 1; return v; });
    while (list.length < o.count) {
      var solo = r() < 0.3 || list.length === o.count - 1;
      if (solo) { list.push({ name: uniqueName() }); }
      else {
        var fam = pick(r, last), a = uniqueName(fam), b = uniqueName(fam);
        var side = pick(r, o.sides.concat(['Both'])), tier = weighted(r, [['Friends', 55], ['Family', 30], ['Colleagues', 15]]);
        list.push({ name: a, household: fam, side: side, tier: tier });
        list.push({ name: b, household: fam, side: side, tier: tier });
      }
    }
    list.forEach(finish);
    if (o.seated) {
      var n = 0;
      var first = o.firstTable || 2; // hand-seated VIP tables come before this number
      guests.forEach(function (g) { if (g.rsvp === 'yes' && g.table === null) { g.table = first + Math.floor(n / 10); n++; } });
    }
    return { guests: guests, guest_event_rsvps: rsvps };
  };

  /* ---------- agency: six planners (equal rights; titles are labels only) + one account per couple ---------- */
  VKRI.AGENCY = { name: 'VKRI', tagline: 'Private weddings in Europe', tz: 'Europe/Rome', reply_promise_hours: 24 };
  VKRI.seed.add({
    users: [
      { id: 'u_riccardo', type: 'planner', name: 'Riccardo', title: 'Founder & Creative Director', initials: 'RI', email: 'riccardo@vkri.example', phone: '+39 02 5550 0101', languages: ['Italian', 'English', 'French'], tz: 'Europe/Rome', based: 'Milan', hours: '09:00-19:00' },
      { id: 'u_sonia', type: 'planner', name: 'Sonia', title: 'Head of Planning', initials: 'SO', email: 'sonia@vkri.example', phone: '+39 02 5550 0102', languages: ['Italian', 'English', 'Russian'], tz: 'Europe/Rome', based: 'Milan', hours: '09:00-19:00' },
      { id: 'u_beatrice', type: 'planner', name: 'Beatrice Fontana', title: 'Senior Planner', initials: 'BF', email: 'beatrice@vkri.example', phone: '+39 081 5550 0103', languages: ['Italian', 'English', 'Spanish'], tz: 'Europe/Rome', based: 'Naples', hours: '09:00-19:00' },
      { id: 'u_camille', type: 'planner', name: 'Camille Laurent', title: 'Senior Planner, Paris', initials: 'CL', email: 'camille@vkri.example', phone: '+33 1 5550 0104', languages: ['French', 'English'], tz: 'Europe/Paris', based: 'Paris', hours: '09:30-19:30' },
      { id: 'u_matteo', type: 'planner', name: 'Matteo Ricci', title: 'Production & Logistics Director', initials: 'MR', email: 'matteo@vkri.example', phone: '+39 02 5550 0105', languages: ['Italian', 'English'], tz: 'Europe/Rome', based: 'Milan', hours: '08:00-18:00' },
      { id: 'u_elena', type: 'planner', name: 'Elena Marchetti', title: 'Guest Experience & Finance', initials: 'EM', email: 'elena@vkri.example', phone: '+39 02 5550 0106', languages: ['Italian', 'English', 'German'], tz: 'Europe/Rome', based: 'Milan', hours: '09:00-18:00' },
      { id: 'c_como', type: 'couple', name: 'Olivia & Henry', initials: 'OH', wedding_id: 'como', tz: 'America/New_York' },
      { id: 'c_sorrento', type: 'couple', name: 'Isabella & Daniel', initials: 'ID', wedding_id: 'sorrento', tz: 'America/Los_Angeles' },
      { id: 'c_paris', type: 'couple', name: 'Priya & Alexander', initials: 'PA', wedding_id: 'paris', tz: 'America/Los_Angeles' }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
