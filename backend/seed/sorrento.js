/* Seed: Sorrento, 16-18 July 2027. "Project Limone". Mirrors the Como reference seed in shape and depth.
   Real: the venue and hotel names, and the facts about them cited by id from docs/venue-facts.md.
   Invented: every person, supplier, price, date and metric, including the prices and contract terms shown next to the real venue and hotels. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI, S = VKRI.seed, W = 'sorrento';

  /* ---------- wedding card ---------- */
  var wedding = {
    id: W, code_name: 'Project Limone', title: 'Sorrento', destination: 'Sorrento, Italy', accent: 'limone',
    couple_names: 'Isabella Moreno & Daniel Katz', partner_1: 'Isabella Moreno', partner_2: 'Daniel Katz', short: 'Isabella & Daniel',
    home_city: 'Los Angeles, CA', home_tz: 'America/Los_Angeles', local_tz: 'Europe/Rome',
    venue: { name: 'Grand Hotel Excelsior Vittoria', town: 'Sorrento', source_ref: 'F-SOR-01' },
    start_date: '2027-07-16', end_date: '2027-07-18', wedding_day: '2027-07-17',
    guest_target: 85, envelope_eur: 340000, vkri_fee_eur: 36000, display_currency: 'USD', fx_locked: 1.09, fx_today: 1.11,
    lead_id: 'u_beatrice', team_ids: ['u_beatrice', 'u_riccardo', 'u_matteo', 'u_elena'],
    ceremony_type: 'Symbolic ceremony on the terrace under a chuppah, blending Catholic and Jewish traditions, led by a family friend',
    contacts: [
      { name: 'Isabella Moreno', role: 'Bride', email: 'isabella@example.com', phone: '+1 310 555 0142', note: 'Leads design and the guest list. Answers fastest on WhatsApp.' },
      { name: 'Daniel Katz', role: 'Groom', email: 'daniel@example.com', phone: '+1 323 555 0187', note: 'Leads food, wine and budget. Wants every number in writing.' },
      { name: 'Carmen Moreno', role: 'Mother of the bride, payer', email: 'carmen.moreno@example.com', phone: '+1 626 555 0119', note: 'Pays venue, dinner and bar with Luis. Writes in Spanish; Beatrice answers in Spanish.' },
      { name: 'Susan Katz', role: 'Mother of the groom, payer', email: 'susan.katz@example.com', phone: '+1 818 555 0164', note: 'Pays the welcome evening, brunch and kosher meals with Robert. Prefers email.' },
      { name: 'Naomi Feld', role: 'Officiant, family friend', email: 'naomi.feld@example.com', phone: '+1 310 555 0130', note: 'Writing the ceremony with both families. Send her every draft.' }
    ],
    payers: [
      { id: 'so-pay1', name: 'Isabella & Daniel', relation: 'Couple', covers: 'Design, music, photo and film, rooms, transport, stationery, planning fee' },
      { id: 'so-pay2', name: 'Carmen & Luis Moreno', relation: 'Parents of the bride', covers: 'Venue, wedding dinner, bar and the Friday family lunch' },
      { id: 'so-pay3', name: 'Robert & Susan Katz', relation: 'Parents of the groom', covers: 'Welcome evening, farewell brunch and kosher meals' }
    ],
    decision_makers: 'Isabella decides design and the guest list. Daniel decides food, wine and money. Carmen and Luis sign off venue and dinner changes above EUR 5,000. The ceremony text goes to both families before it is final.',
    comms: {
      channel: 'WhatsApp group for quick questions; email for anything with a price',
      cadence: 'Friday letter every week; video call every second Thursday at 08:30 Los Angeles time (17:30 in Sorrento)',
      hours: 'Weekdays 08:00-20:00 Pacific. Saturdays for urgent items only. Written replies are fine at any time; calls stay inside these hours.',
      tone: 'Warm and plain. Two options with prices, one recommendation, and what each one saves.',
      do: ['Show what each option saves against the envelope', 'Send a short written summary after every call for Daniel', 'Answer Carmen in Spanish'],
      dont: ['Call before 08:00 Los Angeles time', 'Present the budget as a limit: present it as choices', 'Copy the parents on anything Isabella has not seen first']
    },
    brief: {
      words: ['A lemon grove at golden hour', 'One long family table', 'Linen, not satin', 'Food first'],
      palette: 'Lemon, olive, white linen, terracotta',
      never: ['Gold chargers', 'Pink florals', 'A sparkler exit', 'Cocktails named after us'],
      priorities: ['Food and wine from this coast', 'Both families feel equally at home', 'Nobody too hot, nobody waiting']
    },
    must_haves: ['A chuppah on the terrace with the sea behind it', 'Food from this coast, cooked on the day', 'Shade and water for every guest', 'The hora, with chairs strong enough for it'],
    deal_breakers: ['Dinner indoors on a clear night', 'Anyone left standing in the sun', 'Gold or mirrored decor', 'Speeches longer than three minutes'],
    sensitivities: [
      'Consuelo Moreno (91) hoped for a church wedding. She has accepted the symbolic ceremony; Father Rivera gives a short blessing at the Friday lunch at her request. Never describe the ceremony to her as not religious.',
      'Robert Katz takes heart medication and must not sit in direct sun. He does not want it mentioned; the shaded rows and his seat are arranged quietly.',
      'This is the smallest budget of the season. Never describe any choice as a compromise. Talk about what each option saves and what it keeps.',
      'Carmen sends guest additions straight to Beatrice at night. Thank her, then pass every name to Isabella. Nothing is added without Isabella.'
    ],
    internal_notes: 'Isabella decides quickly and in writing; Daniel wants a night and a spreadsheet. They compare every quote with Los Angeles prices, so lead with value, not with names. Luis raised fireworks twice; the answer stays no.',
    photo_consent: 'editorial', photo_consent_at: '2026-11-12T03:00:00Z',
    scope: [
      { name: 'Venue search and negotiation', status: 'done' }, { name: 'Design concept and moodboard', status: 'done' },
      { name: 'Supplier sourcing: three options per category', status: 'done' }, { name: 'Contract review and payment schedule', status: 'done' },
      { name: 'Ceremony design with both families', status: 'in_progress' }, { name: 'Budget management with weekly forecast', status: 'in_progress' },
      { name: 'Guest list, RSVP and travel desk', status: 'in_progress' }, { name: 'Room blocks and Naples transfers', status: 'in_progress' },
      { name: 'Heat plan: shade, water and timing', status: 'in_progress' }, { name: 'Production schedule and run of show', status: 'upcoming' },
      { name: 'On-site team for four days: four planners and two assistants', status: 'upcoming' }, { name: 'Supplier settlement and final account', status: 'upcoming' }
    ],
    milestones: [
      { date: '2026-10-09', label: 'Venue contract signed', kind: 'contract' },
      { date: '2027-03-01', label: 'Invitations sent', kind: 'guests' },
      { date: '2027-05-31', label: 'RSVP deadline', kind: 'guests' },
      { date: '2027-06-11', label: 'Room blocks released', kind: 'guests' },
      { date: '2027-07-02', label: 'Final headcount to the hotel', kind: 'ops' },
      { date: '2027-07-02', label: 'Final balances due', kind: 'payment' },
      { date: '2027-07-17', label: 'Wedding day', kind: 'wedding' }
    ],
    local_notes: [
      { title: 'July is hot', text: 'The long-run record for Naples (1971-2000, the nearest official station) gives July a mean daily high of 29.9 C and about 15 days at 30 C or more. Every outdoor moment has shade, water and an indoor fallback.' },
      { title: 'Naples airport closes at night', text: 'The airport is closed from 22:30 to 03:30, except for exceptional delays. Guests should land by early evening; coaches run on Thursday and Friday afternoons.' },
      { title: 'Leave early for flights home', text: 'The airport advises taking the coach from the Sorrento coast at least five hours before a flight. Sunday coaches are timed to that.' }
    ]
  };

  /* ---------- phases ---------- */
  var ph = S.makePhases(W, {
    1: { owner_id: 'u_beatrice', client_signoff_at: '2027-01-22', summary: 'Concept, venue, ceremony outline and every supplier approved by Isabella and Daniel.' },
    2: { owner_id: 'u_elena', summary: 'Contracts done. 67 of 85 guests have replied. Rooms open until 11 June; Naples transfers and the heat plan in progress.' },
    3: { owner_id: 'u_beatrice', summary: 'Starts 14 June. The heat day plan comes first.' }
  }, {
    '1.1': { status: 'done', owner_id: 'u_beatrice', start: '2026-08-03', end: '2026-09-04', summary: 'Brief and ceremony outline agreed after two days with both families in Los Angeles.' },
    '1.2': { status: 'done', owner_id: 'u_riccardo', start: '2026-08-31', end: '2026-10-16', summary: 'Excelsior Vittoria secured. Concept "a lemon grove at golden hour" approved.' },
    '1.3': { status: 'done', owner_id: 'u_beatrice', start: '2026-10-05', end: '2027-01-22', summary: 'Three options shown per category. One studio for photo and film to save on crew.' },
    '2.1': { status: 'done', owner_id: 'u_elena', start: '2026-11-02', end: '2027-04-16', summary: 'Every contract signed. Payment schedule agreed with three payers. SIAE licence bought by the couple.' },
    '2.2': { status: 'in_progress', owner_id: 'u_elena', start: '2027-01-11', end: '2027-06-18', summary: 'Invitations out since 1 March. 67 of 85 have replied, 60 yes. Room blocks open until 11 June. Naples coach plan in draft.' },
    '2.3': { status: 'in_progress', owner_id: 'u_matteo', start: '2027-02-15', end: '2027-06-25', summary: 'Sample table on 25 May. Shade and cooling plan waits for the couple\'s choice.' },
    '3.1': { status: 'not_started', owner_id: 'u_beatrice', start: '2027-06-14', end: '2027-07-11', summary: 'Supplier confirmations, final headcount and the heat day plan.' },
    '3.2': { status: 'not_started', owner_id: 'u_matteo', start: '2027-07-12', end: '2027-07-18', summary: 'Team on site from Monday 12 July.' },
    '3.3': { status: 'not_started', owner_id: 'u_beatrice', start: '2027-07-19', end: '2027-08-20', summary: 'Final account within 30 days of the wedding.' }
  });

  /* ---------- tasks: [sub, title, assignee, due, status, client_visible, note] ---------- */
  var n = 0;
  function T(sub, title, who, due, status, visible, note) {
    n++;
    return { id: 'so-t' + String(n).padStart(2, '0'), wedding_id: W, subphase_id: W + '-' + sub, title: title, assignee_id: 'u_' + who,
      due: due, status: status, client_visible: !!visible, note: note || '', updated_at: status === 'done' ? due : '2027-05-14' };
  }
  var tasks = [
    T('1.1', 'Discovery call and questionnaire', 'beatrice', '2026-08-04', 'done', 1),
    T('1.1', 'Two days in Los Angeles: both families, food and priorities', 'beatrice', '2026-08-19', 'done', 1),
    T('1.1', 'Write the brief and the never-list', 'beatrice', '2026-08-28', 'done', 1),
    T('1.1', 'Map who decides and who pays', 'beatrice', '2026-09-01', 'done', 0, 'Carmen and Luis sign off venue and dinner changes above EUR 5,000.'),
    T('1.1', 'Ceremony outline with both families and Naomi Feld', 'beatrice', '2026-09-04', 'done', 1),
    T('1.2', 'Shortlist four venues with July availability', 'riccardo', '2026-09-11', 'done', 1, 'Bellevue Syrene asks for at least 90 guests for the banquet (F-SOR-05). We are 85.'),
    T('1.2', 'Site visit with Isabella and Daniel', 'riccardo', '2026-09-25', 'done', 1),
    T('1.2', 'Negotiate and sign the Excelsior Vittoria contract', 'elena', '2026-10-09', 'done', 1),
    T('1.2', 'Design concept and moodboard v1-v3: a lemon grove at golden hour', 'riccardo', '2026-10-16', 'done', 1),
    T('1.2', 'Weekend format: six events over three days', 'beatrice', '2026-10-16', 'done', 1),
    T('1.2', 'Heat plan, first draft: shade, water and timing', 'matteo', '2026-10-23', 'done', 0, 'Naples record 1971-2000: July mean high 29.9 C, 15.1 days at 30 C or more (F-SOR-18, a proxy station 50 km away).'),
    T('1.3', 'Menus: two tastings with the hotel, priced side by side', 'beatrice', '2026-11-13', 'done', 1),
    T('1.3', 'Florals and chuppah: three studios, one sketch each', 'riccardo', '2026-11-27', 'done', 1),
    T('1.3', 'Band and ceremony trio: video shortlist of three', 'beatrice', '2026-12-04', 'done', 1),
    T('1.3', 'Photo and film: one studio or two, priced side by side', 'beatrice', '2026-12-11', 'done', 1),
    T('1.3', 'Sealed kosher meals: sourcing through the hotel', 'beatrice', '2026-12-18', 'done', 0, 'For Ruth, Avi and Miriam Katz, at four events.'),
    T('1.3', 'Menu approved after the second tasting', 'beatrice', '2027-01-22', 'done', 1),
    T('2.1', 'Review all supplier contracts', 'elena', '2027-02-12', 'done', 0, 'Cancellation terms aligned across all suppliers.'),
    T('2.1', 'Agree the payment schedule with three payers', 'elena', '2027-02-19', 'done', 1),
    T('2.1', 'Fix the dollar rate for the couple\'s share', 'elena', '2027-03-05', 'done', 1),
    T('2.1', 'Collect insurance certificates from every contracted supplier', 'elena', '2027-03-12', 'done', 0),
    T('2.1', 'Deposits paid to every contracted supplier', 'elena', '2027-04-02', 'done', 1),
    T('2.1', 'SIAE music licence: form prepared, bought by the couple', 'elena', '2027-04-16', 'done', 1, 'Only a private account can buy it (F-IT-01). Tariff under 200 guests, live and recorded music: EUR 384.73.'),
    T('2.2', 'Save-the-dates sent', 'elena', '2026-11-06', 'done', 1),
    T('2.2', 'Room blocks at three hotels', 'elena', '2027-01-22', 'done', 1),
    T('2.2', 'Invitations designed, printed and posted', 'elena', '2027-03-01', 'done', 1),
    T('2.2', 'Travel guide: Naples airport, coaches and hydrofoil', 'elena', '2027-03-19', 'done', 1, 'Airport closed 22:30-03:30 (F-SOR-13). Airport coach to Sorrento about 1h15-1h30 (F-SOR-15). Hydrofoil time not published, so we do not quote one.'),
    T('2.2', 'Chase late RSVPs', 'elena', '2027-05-31', 'doing', 1, '18 still silent. Reminder sent 12 May.'),
    T('2.2', 'Dietary and allergy sheet, first pass with the hotel kitchen', 'elena', '2027-05-28', 'doing', 1),
    T('2.2', 'Naples transfers: coach runs against the flight list', 'matteo', '2027-06-04', 'doing', 1, 'Two runs on Thursday and Friday afternoons. Cars for anyone landing after 20:00.'),
    T('2.2', 'Arrival manifest from flight details', 'matteo', '2027-06-11', 'doing', 0),
    T('2.2', 'Consuelo Moreno: shortest walk to the terrace, a car for every move', 'elena', '2027-05-21', 'doing', 0),
    T('2.2', 'Guest list: four more names, for Isabella to confirm', 'beatrice', '2027-05-20', 'client', 1),
    T('2.2', 'Room blocks: final push before the 11 June release', 'elena', '2027-06-04', 'todo', 1),
    T('2.2', 'Seating chart, draft 1', 'beatrice', '2027-06-18', 'todo', 1),
    T('2.2', 'Departure coaches timed five hours before flights', 'matteo', '2027-06-11', 'todo', 1, 'The airport advises leaving the Sorrento coast at least 5 hours before a flight (F-SOR-15).'),
    T('2.3', 'Ketubah: text approved in Hebrew and English', 'beatrice', '2027-04-09', 'done', 1),
    T('2.3', 'Floor plan v2: terrace and Vittoria Ballroom', 'matteo', '2027-04-23', 'done', 1),
    T('2.3', 'Chuppah design: lemon branches, olive and linen', 'riccardo', '2027-04-30', 'done', 1),
    T('2.3', 'Shade and cooling options priced', 'matteo', '2027-05-13', 'done', 1),
    T('2.3', 'Shade choice: sails or a later start', 'matteo', '2027-05-28', 'client', 1, 'Decision open with the couple. Rigging quote valid until 28 May.'),
    T('2.3', 'Ceremony script, draft 3 with both families', 'beatrice', '2027-05-24', 'client', 1),
    T('2.3', 'Sample table on the terrace', 'riccardo', '2027-05-25', 'todo', 1, 'Tuesday 25 May at 18:00, in the same light as the dinner.'),
    T('2.3', 'Power and sound plan with the band', 'matteo', '2027-06-04', 'doing', 0, 'Band has not sent its power list. Chased twice.'),
    T('2.3', 'Stationery: ceremony booklet, menus, escort cards', 'riccardo', '2027-06-04', 'doing', 1),
    T('2.3', 'Potted lemon trees for the aisle: hire and delivery', 'riccardo', '2027-06-11', 'todo', 1),
    T('3.1', 'Confirm every supplier: arrival time, headcount, dietary sheet, balance', 'beatrice', '2027-07-02', 'todo', 1),
    T('3.1', 'Final headcount to the hotel', 'elena', '2027-07-02', 'todo', 1),
    T('3.1', 'Run of show v1 to all suppliers', 'matteo', '2027-06-25', 'todo', 1),
    T('3.1', 'Heat day plan: water stations, cold towels, shade by the hour', 'matteo', '2027-07-05', 'todo', 1),
    T('3.1', 'Final balances: invoices to all three payers', 'elena', '2027-06-18', 'todo', 1),
    T('3.1', 'Final rooming lists to three hotels', 'elena', '2027-06-25', 'todo', 1),
    T('3.1', 'Brief the on-site team: roles, radios, heat duty', 'beatrice', '2027-07-09', 'todo', 0),
    T('3.1', 'Welcome bags: assemble and deliver to hotels', 'elena', '2027-07-12', 'todo', 1),
    T('3.2', 'Site walk with every supplier lead', 'matteo', '2027-07-15', 'todo', 0),
    T('3.2', 'Airport welcome desk for Thursday and Friday arrivals', 'elena', '2027-07-15', 'todo', 1),
    T('3.2', 'Family lunch and blessing', 'beatrice', '2027-07-16', 'todo', 1),
    T('3.2', 'Welcome evening', 'beatrice', '2027-07-16', 'todo', 1),
    T('3.2', 'Wedding day: ketubah signing, ceremony, dinner, dancing', 'beatrice', '2027-07-17', 'todo', 1),
    T('3.2', 'Farewell brunch and departures', 'elena', '2027-07-18', 'todo', 1),
    T('3.2', 'Strike and return of rentals', 'matteo', '2027-07-18', 'todo', 0),
    T('3.3', 'Settle every supplier and close the final account', 'elena', '2027-08-13', 'todo', 1),
    T('3.3', 'Return the ketubah and the chuppah linen to the couple', 'beatrice', '2027-07-23', 'todo', 1),
    T('3.3', 'Gallery and film delivery', 'beatrice', '2027-08-20', 'todo', 1),
    T('3.3', 'Thank-you notes and feedback call', 'beatrice', '2027-08-06', 'todo', 1)
  ];
  function taskId(titleStart) {
    for (var i = 0; i < tasks.length; i++) if (tasks[i].title.indexOf(titleStart) === 0) return tasks[i].id;
    throw new Error('sorrento seed: no task starting with ' + titleStart);
  }

  /* ---------- comments: [parent_type, parent_id, author, at, body, internal] ---------- */
  var c = 0;
  function C(type, pid, who, at, body, internal) {
    c++;
    return { id: 'so-c' + String(c).padStart(2, '0'), wedding_id: W, parent_type: type, parent_id: pid, author_id: 'u_' + who, at: at, body: body, internal: !!internal };
  }
  var comments = [
    C('phase', W + '-p1', 'beatrice', '2027-01-22T17:40:00Z', 'Planning signed off on today\'s call. Daniel: "It finally feels like our wedding, not a hotel package."', 0),
    C('phase', W + '-p2', 'elena', '2027-05-14T15:30:00Z', 'Contracts all in. 67 of 85 guests have replied. Transfers, seating and the heat plan are the next four weeks.', 0),
    C('phase', W + '-p2', 'beatrice', '2027-05-14T16:10:00Z', 'We are EUR 1,215 inside the envelope. Anything new needs a saving elsewhere before it goes to the couple.', 1),
    C('phase', W + '-p3', 'beatrice', '2027-05-10T09:00:00Z', 'On-site team: four of us plus two assistants from Naples. I will write a heat duty rota before 14 June.', 1),
    C('subphase', W + '-1.1', 'beatrice', '2026-08-28T16:00:00Z', 'Brief approved. Their order: food, both families, the view.', 0),
    C('subphase', W + '-1.1', 'beatrice', '2026-09-04T17:30:00Z', 'Ceremony outline agreed with both families: Naomi Feld officiates under a chuppah; the ketubah is signed before; friends read the seven blessings in English; Carmen chooses one reading; the glass is broken at the end.', 0),
    C('subphase', W + '-1.1', 'beatrice', '2026-09-04T17:45:00Z', 'Isabella\'s grandmother is the one to handle gently. The Friday blessing is her moment; keep Father Rivera\'s time protected.', 1),
    C('subphase', W + '-1.2', 'riccardo', '2026-09-20T10:15:00Z', 'Bellevue Syrene asks for at least 90 guests for the banquet. With 85 we would pay for empty seats or depend on a feasibility check. Not recommending it.', 1),
    C('subphase', W + '-1.2', 'riccardo', '2026-09-25T18:40:00Z', 'Site visit done. They chose the terrace above the gulf over the other three venues before we reached the ballroom.', 0),
    C('subphase', W + '-1.3', 'beatrice', '2027-01-22T16:30:00Z', 'Photo and film from one studio saves EUR 6,000 against two teams. Isabella and Daniel agreed.', 0),
    C('subphase', W + '-2.1', 'elena', '2027-03-05T11:00:00Z', 'Dollar rate fixed at 1.09 for the couple\'s share. Both families pay in euros from their own accounts.', 0),
    C('subphase', W + '-2.1', 'elena', '2027-04-16T09:40:00Z', 'Isabella bought the SIAE licence herself, as only a private account can. The copy is in Documents.', 0),
    C('subphase', W + '-2.2', 'elena', '2027-05-14T14:00:00Z', 'RSVPs: 60 yes, 7 no, 18 still silent. Reminder went out on 12 May; the deadline is 31 May.', 0),
    C('subphase', W + '-2.2', 'elena', '2027-05-12T08:20:00Z', 'Carmen sent four more names directly. Passed to Isabella without comment. If all four say yes, the dinner line rises by EUR 1,040.', 1),
    C('subphase', W + '-2.2', 'matteo', '2027-05-15T13:30:00Z', 'Coach plan: two runs from Naples on Thursday and Friday afternoons. Anyone landing after 20:00 gets a car. The airport is closed from 22:30.', 0),
    C('subphase', W + '-2.3', 'matteo', '2027-05-13T16:00:00Z', 'Shade options priced. The rigging points get checked on site on 25 May, with the sample table.', 0),
    C('subphase', W + '-2.3', 'riccardo', '2027-05-14T10:30:00Z', 'If they choose the later start we lose the last light for the family photograph. Say it once, gently; do not push.', 1),
    C('task', taskId('Ceremony script, draft 3'), 'beatrice', '2027-05-14T14:45:00Z', 'Draft 3 shared with both families. Carmen\'s reading is now in Spanish and English.', 0),
    C('task', taskId('Consuelo Moreno'), 'elena', '2027-05-16T09:10:00Z', 'Asked the hotel for the room with the shortest walk to the terrace. Car and escort booked for every move.', 1),
    C('subphase', W + '-1.1', 'beatrice', '2026-09-04T17:50:00Z', 'Saturday before sunset was the families\' own choice. Naomi talked it through with Ruth, Avi and Miriam, who are comfortable being there. Two friends of the couple witness the ketubah.', 1)
  ];

  /* ---------- weekend events ---------- */
  var events = [
    { id: 'so-e1', wedding_id: W, day: '2027-07-16', name: 'Family lunch and blessing', start: '13:00', end: '15:30', location: 'Grand Hotel Excelsior Vittoria, a private room', dress_code: 'Summer casual', audience: 'family', plan_b: '', note: 'A short blessing from Father Tomas Rivera, a friend of the Moreno family.' },
    { id: 'so-e2', wedding_id: W, day: '2027-07-16', name: 'Welcome evening: pizza on the terrace', start: '19:30', end: '23:00', location: 'Grand Hotel Excelsior Vittoria, the terrace', dress_code: 'Summer casual, flat shoes', audience: 'all', plan_b: 'Vittoria Ballroom', note: 'Wood-fired oven from 19:00. Lemon granita at 22:00. Hosted by Robert and Susan Katz.' },
    { id: 'so-e3', wedding_id: W, day: '2027-07-17', name: 'Ceremony under the chuppah', start: '18:30', end: '19:05', location: 'Grand Hotel Excelsior Vittoria, the terrace', dress_code: 'Black tie optional, light fabrics', audience: 'all', plan_b: 'Vittoria Ballroom', note: 'Ketubah signing with family at 17:45. Shade, hand fans, cold towels and chilled water at every row.' },
    { id: 'so-e4', wedding_id: W, day: '2027-07-17', name: 'Aperitivo, dinner and dancing', start: '19:15', end: '00:30', location: 'The terrace for dinner, the Vittoria Ballroom for dancing', dress_code: 'Black tie optional, light fabrics', audience: 'all', plan_b: 'Dinner in the Vittoria Ballroom', note: 'The hora after the first course. Band from 22:00. Limoncello and late snacks at 23:30.' },
    { id: 'so-e5', wedding_id: W, day: '2027-07-18', name: 'Farewell brunch', start: '11:00', end: '13:30', location: 'Grand Hotel Excelsior Vittoria', dress_code: 'Relaxed', audience: 'all', plan_b: '', note: 'Hosted by Robert and Susan Katz. Coaches to Naples airport at 13:45 and 15:30.' },
    { id: 'so-e6', wedding_id: W, day: '2027-07-18', name: 'Boat afternoon along the coast', start: '15:00', end: '18:30', location: 'From Marina Piccola', dress_code: 'Swimwear and linen', audience: 'party', plan_b: 'Drinks on the terrace if the sea is rough', note: 'For the wedding party. Two wooden boats.' }
  ];

  /* ---------- hotels (real names from venue-facts.md; block sizes are demo data. Only the Excelsior Vittoria has a verified
     room count, 79 [F-SOR-10]; none is verified for Bellevue Syrene or Parco dei Principi, so their small blocks stay as they are).
     claimed is computed from the guests after the generator, below. ---------- */
  var accommodations = [
    { id: 'so-h1', wedding_id: W, name: 'Grand Hotel Excelsior Vittoria', town: 'Sorrento', block_size: 40, claimed: 0, release_date: '2027-06-11', hosted: true, note: 'The venue. Family and wedding party hosted; friends at the group rate.', source_ref: 'F-SOR-10' },
    { id: 'so-h2', wedding_id: W, name: 'Bellevue Syrene', town: 'Sorrento', block_size: 12, claimed: 0, release_date: '2027-06-11', hosted: false, note: 'Friends. Guest-paid at the group rate.', source_ref: 'F-SOR-11' },
    { id: 'so-h3', wedding_id: W, name: 'Hotel Parco dei Principi', town: 'Sorrento', block_size: 8, claimed: 0, release_date: '2027-06-11', hosted: false, note: 'Friends and colleagues. Guest-paid at the group rate.', source_ref: 'F-SOR-12' }
  ];

  /* ---------- guests: 15 written by hand, the rest generated (deterministic) ---------- */
  var vips = [
    { name: 'Carmen Moreno', side: 'Moreno', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Suite', nights_hosted: 2, arrival: '2027-07-14', notes: 'Mother of the bride. Chooses and reads one reading, in Spanish and English.', internal_notes: 'Sends guest additions at night. Thank her, then route every name through Isabella.' },
    { name: 'Luis Moreno', side: 'Moreno', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Suite', nights_hosted: 2, arrival: '2027-07-14', notes: 'Father of the bride. Welcome toast on Friday, two minutes.', internal_notes: 'Asked twice about fireworks. The answer stays no; Daniel handles it.' },
    { name: 'Consuelo Moreno', side: 'Moreno', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Junior suite', nights_hosted: 3, arrival: '2027-07-14', transfer: 'Private car', language: 'Spanish', notes: 'Grandmother of the bride, 91. Walks with a cane. Seat on the aisle in the shaded front row; a car for every move.', internal_notes: 'An assistant from Naples who speaks Spanish stays with her on Saturday. The Friday blessing is for her.' },
    { name: 'Robert Katz', side: 'Katz', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Suite', nights_hosted: 2, arrival: '2027-07-14', notes: 'Father of the groom. Hosts the welcome evening and the farewell brunch.', internal_notes: 'Keep him in the shaded rows and near water. He does not want the reason mentioned.' },
    { name: 'Susan Katz', side: 'Katz', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Suite', nights_hosted: 2, arrival: '2027-07-14', dietary: 'Kosher-style', notes: 'Mother of the groom. Carries the ketubah from Los Angeles in the cabin.' },
    { name: 'Ruth Katz', side: 'Katz', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', room_type: 'Junior suite', nights_hosted: 3, arrival: '2027-07-14', transfer: 'Private car', dietary: 'Kosher, sealed meals', notes: 'Grandmother of the groom, 89. Sealed kosher meals at every event. Seat in the shaded front row.', internal_notes: 'Hard of hearing on the left side. Seat her to the right of Robert.' },
    { name: 'Avi Katz', side: 'Katz', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, dietary: 'Kosher, sealed meals', notes: 'Uncle of the groom. Keeps kosher: sealed meals at every event, confirmed with the hotel. Holds one pole of the chuppah.' },
    { name: 'Miriam Katz', side: 'Katz', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, dietary: 'Kosher, sealed meals', notes: 'Aunt of the groom. Keeps kosher: sealed meals at every event.' },
    { name: 'Sofia Moreno', side: 'Moreno', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, dietary: 'Vegetarian', notes: 'Maid of honour, sister of the bride. Holds one pole of the chuppah.' },
    { name: 'Ethan Katz', side: 'Katz', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, notes: 'Best man, brother of the groom. Holds the rings and the glass.' },
    { name: 'Naomi Feld', side: 'Both', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, notes: 'Family friend officiating the ceremony. Needs a lapel microphone and a lectern in the shade.' },
    { name: 'Marisol Vega', side: 'Moreno', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'so-h1', nights_hosted: 2, allergies: 'Shellfish', dietary: '', flight: 'Lands in Naples Thu 15 Jul, 14:20', notes: 'Bridesmaid, arriving from Mexico City. Shellfish allergy: separate plate, confirmed with the hotel kitchen.' },
    { name: 'Tomas Rivera', side: 'Moreno', tier: 'Friends', rsvp: 'yes', vip: true, accommodation_id: 'so-h2', nights_hosted: 0, notes: 'Father Tomas Rivera, a friend of the Moreno family. Gives a short blessing at the Friday lunch.' },
    { name: 'Teresa Alvarado', side: 'Moreno', tier: 'Family', rsvp: 'pending', vip: true, accommodation_id: 'so-h1', notes: 'Godmother of the bride. Her first grandchild is due in mid-July; she will confirm by 31 May.', internal_notes: 'Hold a room at the Excelsior Vittoria until 4 June.' },
    { name: 'Jonathan Weiss', side: 'Katz', tier: 'Colleagues', rsvp: 'no', vip: true, notes: 'Daniel\'s co-founder. Their company launches a product that week; he is recording a short video for the dinner.' }
  ];
  var gen = S.makeGuests({
    wedding_id: W, prefix: 'so', seed: 1707, count: 85, vips: vips,
    events: [{ id: 'so-e1', audience: 'family', turnout: 0.95 }, { id: 'so-e2', audience: 'all', turnout: 0.92 }, { id: 'so-e3', audience: 'all', turnout: 1 },
      { id: 'so-e4', audience: 'all', turnout: 1 }, { id: 'so-e5', audience: 'all', turnout: 0.78 }, { id: 'so-e6', audience: 'party', turnout: 0.9 }],
    accommodations: [['so-h1', 35], ['so-h2', 40], ['so-h3', 25]],
    responded: 0.76, yesRate: 0.9, start_date: '2027-07-16', end_date: '2027-07-18', seated: false, sides: ['Moreno', 'Katz'],
    firstNames: ['Alejandro', 'Valentina', 'Mateo', 'Camila', 'Diego', 'Gabriela', 'Rafael', 'Lucia', 'Javier', 'Adriana', 'Noah', 'Leah', 'Eli', 'Maya',
      'Adam', 'Tamar', 'Jacob', 'Rebecca', 'Aaron', 'Talia', 'Ari', 'Dana', 'Marcus', 'Priya', 'Kenji', 'Imani'],
    lastNames: ['Ramirez', 'Delgado', 'Navarro', 'Castillo', 'Herrera', 'Ortega', 'Fuentes', 'Salazar', 'Goldberg', 'Levin', 'Adler', 'Rosen',
      'Shapiro', 'Kaplan', 'Feldman', 'Bernstein', 'Park', 'Chen', 'Nguyen', 'Brooks']
  });
  /* After the generator, with no random draws, so the headcount above does not move: Father Rivera joins the Friday lunch;
     a generated relative's side follows the surname; a generated couple shares one hotel, room and travel plan; generated
     family stays at the venue hotel, hosted; nobody has hosted nights at a guest-paid hotel; nothing in the generated trail is
     later than the demo clock. A hotel's claimed rooms come from its guests: one room per household, two guests a room at most,
     and a room of their own for each hand-written VIP unless shareRoom pairs them. */
  var MORENO_SIDE = ['Ramirez', 'Delgado', 'Navarro', 'Castillo', 'Herrera', 'Ortega', 'Fuentes', 'Salazar'];
  var KATZ_SIDE = ['Goldberg', 'Levin', 'Adler', 'Rosen', 'Shapiro', 'Kaplan', 'Feldman', 'Bernstein'];
  (function (hostedId, shareRoom) {
    var hosted = {}, rooms = {}, run = 0, prev = null;
    accommodations.forEach(function (a) { hosted[a.id] = a.hosted; rooms[a.id] = {}; });
    gen.guests.forEach(function (g) {
      if (g.name === 'Tomas Rivera') gen.guest_event_rsvps.push({ id: g.id + ':so-e1', wedding_id: W, guest_id: g.id, event_id: 'so-e1', status: 'yes' });
      if (!g.vip && g.tier === 'Family') {
        if (MORENO_SIDE.indexOf(g.household) >= 0) g.side = 'Moreno';
        if (KATZ_SIDE.indexOf(g.household) >= 0) g.side = 'Katz';
      }
      var pair = !!prev && !g.vip && prev.household === g.household && prev.side === g.side && prev.tier === g.tier;
      if (pair && g.rsvp === 'yes' && prev.rsvp === 'yes') ['accommodation_id', 'room_type', 'arrival', 'departure', 'transfer'].forEach(function (k) { g[k] = prev[k]; });
      if (!g.vip && g.tier === 'Family' && g.accommodation_id) { g.accommodation_id = hostedId; g.nights_hosted = 2; }
      if (g.accommodation_id && !hosted[g.accommodation_id]) g.nights_hosted = 0;
      if (g.updated_at > '2027-05-16') g.updated_at = S.addDays(g.updated_at, -45);
      if (!pair) run++;
      var key = g.vip ? 'v:' + (shareRoom[g.name] || g.name) : 'h:' + run;
      if (g.accommodation_id) rooms[g.accommodation_id][key] = (rooms[g.accommodation_id][key] || 0) + 1;
      prev = g.vip || pair ? null : g;
    });
    accommodations.forEach(function (a) {
      a.claimed = Object.keys(rooms[a.id]).reduce(function (s, k) { return s + Math.ceil(rooms[a.id][k] / 2); }, 0);
      if (a.claimed > a.block_size) throw new Error('sorrento seed: ' + a.name + ' needs ' + a.claimed + ' rooms, block is ' + a.block_size);
    });
  })('so-h1', { 'Luis Moreno': 'Carmen Moreno', 'Susan Katz': 'Robert Katz', 'Miriam Katz': 'Avi Katz' });

  /* ---------- vendors (all invented except the venue; the venue row carries invented prices and contract terms,
     and no reply times, commissions or internal notes. The hotel caters every meal; the pizza oven is the one outside food supplier) ---------- */
  function V(id, name, category, contact, status, conf, arrival, extra) {
    return Object.assign({ id: 'so-v' + id, wedding_id: W, name: name, category: category, contact: contact, status: status, contract_eur: 0,
      insurance_ok: true, nda_signed: true, relationship: 'none', commission_pct: 0, avg_reply_hours: null, internal_notes: '',
      confirmations: conf, arrival_time: arrival, client_visible: true, updated_at: '2027-05-14' }, extra || {});
  }
  var none = { time: false, headcount: false, dietary: false, payment: false };
  var paidOnly = { time: false, headcount: false, dietary: false, payment: true };
  var timePaid = { time: true, headcount: false, dietary: false, payment: true };
  var vendors = [
    V('01', 'Grand Hotel Excelsior Vittoria', 'Venue', 'Events office', 'contracted', timePaid, 'Access from Fri 16 Jul, 07:00', { real: true, nda_signed: false, insurance_ok: true }),
    V('03', 'Forno Ciclamino', 'Catering & bar', 'Pasquale Iorio', 'contracted', timePaid, 'Fri 16:00, oven lit by 18:30', { avg_reply_hours: 9 }),
    V('04', 'Fiori di Scoglio Studio', 'Florals & design', 'Anna Maresca', 'contracted', paidOnly, 'Fri 08:00 chuppah build; Sat 07:00 tables', { avg_reply_hours: 7 }),
    V('05', 'Noleggi Costiera Rentals', 'Florals & design', 'Rentals desk', 'contracted', paidOnly, 'Fri 09:00 delivery', { avg_reply_hours: 15 }),
    V('06', 'Vela Bianca Rigging', 'Production & lighting', 'Marco Cirillo', 'quote', none, 'Sat 11:00 rigging, if chosen', { avg_reply_hours: 22, nda_signed: false, insurance_ok: false, internal_notes: 'Quote valid until 28 May. Insurance certificate requested, not yet received.' }),
    V('07', 'Lucerna Sud Production', 'Production & lighting', 'Dario Esposito', 'contracted', paidOnly, 'Fri 14:00 load-in', { avg_reply_hours: 18, internal_notes: 'Good on sound, slow on paperwork. Chase the power plan by phone.' }),
    V('08', 'Banda Marea', 'Music & entertainment', 'Stefano Cuomo', 'contracted', paidOnly, 'Sat 16:00 soundcheck', { avg_reply_hours: 31, internal_notes: 'The leader tours in May and June; replies slow down. Go through his manager.' }),
    V('09', 'Corde di Mare Trio', 'Music & entertainment', 'Chiara Palumbo', 'contracted', timePaid, 'Sat 17:30', { avg_reply_hours: 6 }),
    V('10', 'Luce Obliqua Photo & Film', 'Photo & film', 'Ilaria Donati', 'contracted', timePaid, 'Fri 12:30', { avg_reply_hours: 10, relationship: 'preferred', internal_notes: 'Second wedding together. Agreed a smaller crew to fit the budget.' }),
    V('11', 'Navette Penisola Coaches', 'Transport', 'Dispatch', 'contracted', paidOnly, 'Thu 14:00 first airport run', { avg_reply_hours: 12, internal_notes: 'Airport runs quoted separately; waiting for the final flight list.' }),
    V('12', 'Sette Curve Cars', 'Transport', 'Salvatore Gargiulo', 'contracted', timePaid, 'On call Wed 14 to Sun 18 Jul', { avg_reply_hours: 3 }),
    V('13', 'Gozzo Azzurro Charters', 'Transport', 'Captain Ciro Aiello', 'contracted', timePaid, 'Sun 14:45 at Marina Piccola', { avg_reply_hours: 20 }),
    V('14', 'Carta e Limone Press', 'Stationery', 'Irene Fusco', 'contracted', paidOnly, 'Delivery Mon 12 Jul', { avg_reply_hours: 11 }),
    V('15', 'Atelier Brezza', 'Beauty & attire', 'Valeria Russo', 'contracted', timePaid, 'Sat 11:00 at the hotel', { avg_reply_hours: 8 }),
    V('16', 'Ink & Olive Ketubah Studio', 'Stationery', 'Leah Brenner', 'confirmed', { time: true, headcount: true, dietary: true, payment: true }, 'Delivered in April; travels with Susan Katz', { avg_reply_hours: 14 })
  ];

  /* ---------- budget: [id, category, label, allocated, estimate, contracted, vendor, event, flags] ---------- */
  function B(id, category, label, allocated, estimate, contracted, vendor, event, extra) {
    return Object.assign({ id: 'so-b' + id, wedding_id: W, category: category, label: label, allocated: allocated, estimate: estimate, contracted: contracted,
      vendor_id: vendor ? 'so-v' + vendor : null, event_id: event ? 'so-e' + event : null, often_forgotten: false, includes: '', internal_notes: '',
      client_visible: true, updated_at: '2027-05-13' }, extra || {});
  }
  var budget_lines = [
    B('01', 'Venue', 'Excelsior Vittoria: terrace and Vittoria Ballroom, Saturday', 38000, 38000, 38000, '01', '4', { includes: 'Ceremony and dinner on the terrace, dancing in the Vittoria Ballroom, which is also the Plan B' }),
    B('02', 'Venue', 'Excelsior Vittoria: Friday terrace and Sunday brunch', 7500, 7500, 7500, '01', '2'),
    B('03', 'Catering & bar', 'Wedding dinner for 85', 22100, 22100, 22100, '01', '4', { includes: 'Five courses, EUR 260 a head, service staff' }),
    B('04', 'Catering & bar', 'Welcome evening: wood-fired pizza', 9800, 9800, 9800, '03', '2', { includes: 'Oven, two pizzaioli, fried starters and lemon granita' }),
    B('05', 'Catering & bar', 'Wines, limoncello and open bar', 13500, 13500, 13500, '01', '4', { includes: 'Campanian wines chosen at the tasting' }),
    B('06', 'Catering & bar', 'Family lunch on Friday', 4200, 4200, 4200, '01', '1'),
    B('07', 'Catering & bar', 'Farewell brunch', 6800, 6800, 6800, '01', '5'),
    B('08', 'Catering & bar', 'Supplier meals', 1300, 1300, 1300, '01', '4', { often_forgotten: true, includes: '38 crew on Saturday' }),
    B('09', 'Catering & bar', 'Sealed kosher meals', 1100, 1100, 1100, '01', null, { includes: 'Three guests, four events. Ordered by the hotel from a kosher kitchen, served sealed and opened at the table' }),
    B('10', 'Florals & design', 'Chuppah and ceremony florals', 19000, 19000, 19000, '04', '3', { includes: 'Chuppah of lemon branches, olive and linen; potted lemon trees along the aisle' }),
    B('11', 'Florals & design', 'Dinner florals and table design', 21500, 22500, 22500, '04', '4', { includes: 'Includes the citrus garlands approved in March' }),
    B('12', 'Florals & design', 'Tables, chairs, linen, glassware', 15500, 14800, 14800, '05', '4'),
    B('13', 'Production & lighting', 'Lighting, sound and power', 16500, 15800, 15800, '07', '4', { often_forgotten: true, includes: 'Festoon lighting over the terrace, ceremony microphones, band power' }),
    B('14', 'Production & lighting', 'Ceremony shade', 6000, 7400, 0, '06', '3', { includes: 'Choice pending: shade sails, or a later start with parasols' }),
    B('15', 'Production & lighting', 'Hand fans, cold towels and water stations', 3200, 3200, 3200, '07', '3', { often_forgotten: true, includes: 'A fan on every chair, cold towels at arrival, three water stations' }),
    B('16', 'Music & entertainment', 'Nine-piece band', 17000, 17000, 17000, '08', '4', { includes: 'Two sets, the hora and the first dance arranged' }),
    B('17', 'Music & entertainment', 'Ceremony trio', 3200, 3200, 3200, '09', '3'),
    B('18', 'Music & entertainment', 'SIAE music licence, bought by the couple', 400, 385, 385, null, '4', { often_forgotten: true, includes: 'Published tariff under 200 guests, live and recorded music: EUR 384.73' }),
    B('19', 'Photo & film', 'Photography and film, one studio, two days', 22500, 22500, 22500, '10', null, { includes: 'One team instead of two saves about EUR 6,000' }),
    B('20', 'Guest hospitality', 'Hosted rooms for family and wedding party', 25200, 26400, 26400, '01', null, { includes: 'Rooms at the Excelsior Vittoria; includes a third night for both grandmothers' }),
    B('21', 'Guest hospitality', 'Welcome bags and hospitality desk', 4000, 3400, 0, null, null, { includes: 'Choice pending' }),
    B('22', 'Stationery', 'Ketubah: artwork, calligraphy and frame', 2600, 2600, 2600, '16', '3'),
    B('23', 'Transport', 'Coaches between hotels and events', 4200, 4200, 4200, '11'),
    B('24', 'Transport', 'Naples airport transfers', 9000, 8600, 0, '11', null, { includes: 'Coach runs on Thursday and Friday, Sunday departures, cars for late landings. Quote waits for the flight list.' }),
    B('25', 'Transport', 'Private cars for the family', 3800, 3800, 3800, '12'),
    B('26', 'Transport', 'Boat afternoon for the wedding party', 2900, 2900, 2900, '13', '6'),
    B('27', 'Stationery', 'Invitations, ceremony booklet and day-of paper', 7800, 7800, 7800, '14'),
    B('28', 'Beauty & attire', 'Hair and make-up team', 4200, 4200, 4200, '15'),
    B('29', 'Planning fee', 'VKRI planning and on-site team', 36000, 36000, 36000, null, null, { includes: 'Flat fee. It does not change with your budget.' }),
    B('30', 'Contingency', 'Gratuities', 0, 3500, 0, null, null, { often_forgotten: true }),
    B('31', 'Contingency', 'Overtime after midnight', 0, 1500, 0, null, '4', { often_forgotten: true }),
    B('32', 'Contingency', 'Bank and currency fees', 0, 1200, 0, null, null, { often_forgotten: true })
  ];
  /* The reserve takes whatever is left, so allocations always add up to the envelope exactly. */
  var allocatedSoFar = budget_lines.reduce(function (s, l) { return s + l.allocated; }, 0);
  budget_lines.push(B('33', 'Contingency', 'Unallocated reserve', wedding.envelope_eur - allocatedSoFar, 0, 0, null, null, { includes: 'What is left of the original reserve' }));
  /* A vendor's contract value is the sum of its contracted lines. */
  vendors.forEach(function (v) {
    v.contract_eur = budget_lines.reduce(function (s, l) { return s + (l.vendor_id === v.id ? l.contracted : 0); }, 0);
  });

  var change_orders = [
    { id: 'so-co1', wedding_id: W, budget_line_id: 'so-b11', title: 'Citrus garlands along the long tables', delta_eur: 1000, reason: 'Isabella asked for lemon garlands after seeing the chuppah sketch.', proposed_by: 'u_riccardo', proposed_at: '2027-03-02T10:00:00Z', status: 'approved', decided_at: '2027-03-03T05:30:00Z', decided_by: 'c_sorrento', alternatives: 'Lemons in bowls on each table: EUR 400' },
    { id: 'so-co2', wedding_id: W, budget_line_id: 'so-b20', title: 'A third hosted night for both grandmothers', delta_eur: 1200, reason: 'Consuelo and Ruth arrive on Wednesday so they can rest before the weekend.', proposed_by: 'u_elena', proposed_at: '2027-04-06T09:30:00Z', status: 'approved', decided_at: '2027-04-07T03:10:00Z', decided_by: 'c_sorrento', alternatives: 'Arrive on Thursday with the others: no cost' },
    { id: 'so-co3', wedding_id: W, budget_line_id: 'so-b15', title: 'Misting fans at the aperitivo', delta_eur: 2600, reason: 'The aperitivo starts at 19:15 in the last of the sun. Four misting fans keep the edge of the terrace cool while guests stand.', proposed_by: 'u_matteo', proposed_at: '2027-05-13T11:00:00Z', status: 'pending', decided_at: null, decided_by: null, alternatives: 'Two more water stations and extra cold towels: EUR 900' },
    { id: 'so-co4', wedding_id: W, budget_line_id: 'so-b13', title: 'Fireworks from a boat after the first dance', delta_eur: 9500, reason: 'Raised by Luis at the January tasting.', proposed_by: 'u_beatrice', proposed_at: '2027-02-08T10:00:00Z', status: 'declined', decided_at: '2027-02-10T04:20:00Z', decided_by: 'c_sorrento', alternatives: '' }
  ];

  /* ---------- invoices: generated from a schedule per line ---------- */
  var invoices = [], inv = 0;
  function I(line, vendor, payer, parts) {
    parts.forEach(function (p) {
      inv++;
      invoices.push({ id: 'so-i' + String(inv).padStart(2, '0'), wedding_id: W, number: 'LIM-' + String(1000 + inv), vendor_id: vendor ? 'so-v' + vendor : null,
        budget_line_id: 'so-b' + line, amount_eur: p[0], due: p[1], status: p[2], paid_at: p[2] === 'paid' ? p[1] : null, payer_id: payer, covers: p[3], method: 'Bank transfer' });
    });
  }
  I('29', null, 'so-pay1', [[12000, '2026-08-10', 'paid', 'VKRI fee: first third'], [12000, '2027-01-11', 'paid', 'VKRI fee: second third'], [12000, '2027-06-30', 'upcoming', 'VKRI fee: final third']]);
  I('01', '01', 'so-pay2', [[11400, '2026-10-09', 'paid', 'Venue hire: deposit 30%'], [15200, '2027-03-15', 'paid', 'Venue hire: second instalment 40%'], [11400, '2027-06-30', 'upcoming', 'Venue hire: balance 30%']]);
  I('02', '01', 'so-pay3', [[3750, '2026-10-09', 'paid', 'Friday terrace and Sunday brunch: deposit 50%'], [3750, '2027-06-30', 'upcoming', 'Friday terrace and Sunday brunch: balance']]);
  I('16', '08', 'so-pay1', [[8500, '2026-12-15', 'paid', 'Band: deposit 50%'], [8500, '2027-07-02', 'upcoming', 'Band: balance']]);
  I('19', '10', 'so-pay1', [[11250, '2027-01-22', 'paid', 'Photo and film: deposit 50%'], [11250, '2027-07-02', 'upcoming', 'Photo and film: balance']]);
  I('20', '01', 'so-pay1', [[13200, '2027-01-22', 'paid', 'Hosted rooms: deposit 50%'], [13200, '2027-06-11', 'upcoming', 'Hosted rooms: balance at the block release date']]);
  I('03', '01', 'so-pay2', [[8840, '2027-01-29', 'paid', 'Wedding dinner: deposit 40%'], [13260, '2027-07-02', 'upcoming', 'Wedding dinner: balance on the final headcount']]);
  I('05', '01', 'so-pay2', [[6750, '2027-01-29', 'paid', 'Wines and bar: deposit 50%'], [6750, '2027-07-02', 'upcoming', 'Wines and bar: balance']]);
  I('06', '01', 'so-pay2', [[4200, '2027-07-02', 'upcoming', 'Family lunch on Friday, in full']]);
  I('07', '01', 'so-pay3', [[3400, '2027-05-21', 'due', 'Farewell brunch: deposit 50%'], [3400, '2027-07-02', 'upcoming', 'Farewell brunch: balance']]);
  I('08', '01', 'so-pay1', [[1300, '2027-07-02', 'upcoming', 'Supplier meals: 38 crew on Saturday']]);
  I('09', '01', 'so-pay3', [[1100, '2027-06-18', 'upcoming', 'Sealed kosher meals: three guests, four events']]);
  I('10', '04', 'so-pay1', [[5700, '2027-01-29', 'paid', 'Chuppah and ceremony florals: deposit 30%'], [7600, '2027-05-21', 'due', 'Chuppah and ceremony florals: second instalment 40%'], [5700, '2027-07-02', 'upcoming', 'Chuppah and ceremony florals: balance 30%']]);
  I('11', '04', 'so-pay1', [[6450, '2027-01-29', 'paid', 'Dinner florals: deposit 30%'], [8600, '2027-05-21', 'due', 'Dinner florals: second instalment 40%'], [7450, '2027-07-02', 'upcoming', 'Dinner florals: balance, with the citrus garlands']]);
  I('04', '03', 'so-pay3', [[4900, '2027-02-12', 'paid', 'Welcome evening: deposit 50%'], [4900, '2027-07-02', 'upcoming', 'Welcome evening: balance']]);
  I('13', '07', 'so-pay1', [[6320, '2027-02-15', 'paid', 'Lighting, sound and power: deposit 40%'], [9480, '2027-06-30', 'upcoming', 'Lighting, sound and power: balance']]);
  I('15', '07', 'so-pay1', [[3200, '2027-06-30', 'upcoming', 'Hand fans, cold towels and water stations']]);
  I('27', '14', 'so-pay1', [[5200, '2027-02-19', 'paid', 'Invitations, printed and posted'], [2600, '2027-06-18', 'upcoming', 'Ceremony booklet, menus and escort cards']]);
  I('17', '09', 'so-pay1', [[1600, '2027-02-01', 'paid', 'Ceremony trio: deposit 50%'], [1600, '2027-07-02', 'upcoming', 'Ceremony trio: balance']]);
  I('12', '05', 'so-pay1', [[7400, '2027-03-01', 'paid', 'Rentals: deposit 50%'], [7400, '2027-06-25', 'upcoming', 'Rentals: balance']]);
  I('22', '16', 'so-pay1', [[2600, '2027-03-12', 'paid', 'Ketubah: artwork, calligraphy and frame']]);
  I('23', '11', 'so-pay1', [[2100, '2027-03-20', 'paid', 'Coaches between hotels and events: deposit 50%'], [2100, '2027-07-02', 'upcoming', 'Coaches between hotels and events: balance']]);
  I('25', '12', 'so-pay1', [[1900, '2027-04-02', 'paid', 'Private cars: deposit 50%'], [1900, '2027-07-02', 'upcoming', 'Private cars: balance']]);
  I('18', null, 'so-pay1', [[385, '2027-04-14', 'paid', 'SIAE music licence, bought by Isabella']]);
  I('26', '13', 'so-pay1', [[1450, '2027-04-20', 'paid', 'Boat afternoon: deposit 50%'], [1450, '2027-07-09', 'upcoming', 'Boat afternoon: balance']]);
  I('28', '15', 'so-pay1', [[2100, '2027-04-20', 'paid', 'Hair and make-up: deposit 50%'], [2100, '2027-07-09', 'upcoming', 'Hair and make-up: balance']]);

  /* ---------- decisions ---------- */
  function opt(id, name, vendor, price, includes, extra) { return Object.assign({ id: id, name: name, vendor: vendor, price_eur: price, includes: includes, relationship: 'No commission or referral fee' }, extra || {}); }
  var decisions = [
    { id: 'so-d01', wedding_id: W, kind: 'choice', title: 'Ceremony shade: sails or a later start', why_now: 'The rigging company holds its July crew for us until Friday 28 May.',
      deadline: '2027-05-28', release_date: '2027-05-13', status: 'open', delegable: false, budget_line_id: 'so-b14', task_id: taskId('Shade choice'), risk_id: 'so-r1',
      options: [
        opt('a', 'Shade sails and an 18:30 start', 'Vela Bianca Rigging', 7400, 'Three sails over the ceremony rows, rigged at 11:00 and taken down after dinner. The time and the light stay as you planned.', { brief_ref: 'Nobody too hot, nobody waiting' }),
        opt('b', 'Start at 19:15 with parasols', 'Lucerna Sud Production', 2400, 'Parasols for the back rows only. The sun is lower, but the aperitivo moves into the last light and dinner starts 45 minutes later.', { brief_ref: 'Saves EUR 5,000; shortens the golden hour for photographs' })
      ], recommended_option_id: 'a', recommendation_reason: 'July here is hot: the long-run Naples record averages about 15 days in July at 30 C or more. The sails keep your guests comfortable and keep the light you chose. They cost EUR 1,400 more than the shade allocation.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'If they choose the later start, tell the band and the hotel kitchen the same day: dinner moves by 45 minutes.' },
    { id: 'so-d02', wedding_id: W, kind: 'proof', title: 'Ceremony script, draft 3', why_now: 'Naomi needs the final text by 24 May to prepare the readers. The booklet goes to print on 4 June.',
      deadline: '2027-05-24', release_date: '2027-05-14', status: 'open', delegable: false, budget_line_id: null, document_id: 'so-doc11', task_id: taskId('Ceremony script, draft 3'),
      options: [
        opt('approve', 'Approve draft 3', '', null, 'The text as written. Nothing goes to print without your approval.'),
        opt('changes', 'Ask for changes', '', null, 'Tell us what to change and Naomi sends draft 4 within two days.')
      ], recommended_option_id: 'approve', recommendation_reason: 'Draft 3 has everything both families asked for: the ketubah signing, Carmen\'s reading in Spanish and English, the seven blessings read by friends, and the glass at the end.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'Consuelo has not seen it. Isabella will show her in person.' },
    { id: 'so-d03', wedding_id: W, kind: 'choice', title: 'Welcome bag contents', why_now: 'Local makers need four weeks for 85 bags.',
      deadline: '2027-06-04', release_date: '2027-05-14', status: 'open', delegable: true, budget_line_id: 'so-b21',
      options: [
        opt('a', 'A heat kit', '', 3400, 'Linen fan, sun cream, a refillable bottle, electrolyte sachets and the weekend card.', { brief_ref: 'Nobody too hot, nobody waiting' }),
        opt('b', 'A taste of the coast', '', 2900, 'Limoncello miniature, lemon soap, taralli and a hand-drawn map of the town.')
      ], recommended_option_id: 'a', recommendation_reason: 'It is useful all weekend. If you would like one local thing in it, a lemon soap adds EUR 250.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'so-d04', wedding_id: W, kind: 'choice', title: 'Band: first dance and the hora', why_now: 'The band needs three weeks to arrange a first dance.',
      deadline: '2027-06-07', release_date: '2027-05-24', status: 'queued', delegable: false, budget_line_id: null, options: [
        opt('a', 'Send us your first-dance song', '', null, 'We pass it to the band leader with your notes on tempo.'), opt('b', 'Ask the band to propose three', '', null, 'They send short recordings.')
      ], recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'so-d05', wedding_id: W, kind: 'choice', title: 'Late landings on Thursday: keep the cars or switch to one coach', why_now: 'The coach company needs the final runs by 11 June.',
      deadline: '2027-06-11', release_date: '2027-06-01', status: 'queued', delegable: true, budget_line_id: null, options: [
        opt('a', 'Keep the cars for anyone landing after 20:00', 'Sette Curve Cars', 1400, 'One car per party, met at arrivals. This is the plan today.'), opt('b', 'One coach at 21:15 instead of the cars', 'Navette Penisola Coaches', 900, 'One run for everyone who lands between 19:30 and 21:00. Saves EUR 500; earlier arrivals wait for it.')
      ], recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'so-d06', wedding_id: W, kind: 'choice', title: 'Venue', why_now: '', deadline: '2026-10-02', release_date: '2026-09-18', status: 'decided', delegable: false, budget_line_id: 'so-b01',
      options: [
        opt('a', 'Grand Hotel Excelsior Vittoria', '', 38000, 'A historic hotel on the cliff edge above the Gulf of Naples. Ceremony on the terrace, dancing in the Vittoria Ballroom, which takes up to 200 guests.'),
        opt('b', 'Bellevue Syrene', '', null, 'A hotel overlooking the sea. It asks for at least 90 guests for the banquet; we are 85.'),
        opt('c', 'Villa Astor', '', null, 'A private villa with six suites and its own landing stage. It publishes no event capacity.')
      ], recommended_option_id: 'a', recommendation_reason: 'Room for 85 with space to spare, a terrace for the ceremony, and the ballroom as Plan B under the same roof.', chosen_option_id: 'a', decided_at: '2026-09-25T19:00:00Z', decided_by: 'c_sorrento', internal_notes: '' },
    { id: 'so-d07', wedding_id: W, kind: 'choice', title: 'Wedding dinner menu', why_now: '', deadline: '2026-11-20', release_date: '2026-11-06', status: 'decided', delegable: false, budget_line_id: 'so-b03',
      options: [opt('a', 'Five courses from this coast', 'Grand Hotel Excelsior Vittoria', 22100, 'EUR 260 a head, with a second pasta course for Daniel'), opt('b', 'Six courses with a crudo', 'Grand Hotel Excelsior Vittoria', 25500, 'EUR 300 a head'), opt('c', 'Three courses', 'Grand Hotel Excelsior Vittoria', 19550, 'EUR 230 a head')],
      recommended_option_id: 'a', recommendation_reason: 'The best plates of the two tastings, and it keeps the second pasta course Daniel asked for.', chosen_option_id: 'a', decided_at: '2026-11-16T04:30:00Z', decided_by: 'c_sorrento', internal_notes: '' },
    { id: 'so-d08', wedding_id: W, kind: 'choice', title: 'Floral studio and chuppah', why_now: '', deadline: '2026-12-04', release_date: '2026-11-27', status: 'decided', delegable: false, budget_line_id: 'so-b10',
      options: [opt('a', 'Fiori di Scoglio Studio: lemon, olive and white', 'Fiori di Scoglio Studio', 19000, 'Chuppah of lemon branches, potted lemon trees along the aisle'), opt('b', 'Studio two: garden roses', '', 21000, '', { brief_ref: 'Pink florals are on your never-list' }), opt('c', 'Studio three: greenery only', '', 14500, 'The least expensive; no fruit, no colour')],
      recommended_option_id: 'a', recommendation_reason: 'The only sketch that looks like the coast, and the chuppah can be rebuilt as a table arch for dinner.', chosen_option_id: 'a', decided_at: '2026-12-02T05:15:00Z', decided_by: 'c_sorrento', internal_notes: '' },
    { id: 'so-d09', wedding_id: W, kind: 'choice', title: 'Photo and film', why_now: '', deadline: '2026-12-18', release_date: '2026-12-11', status: 'decided', delegable: false, budget_line_id: 'so-b19',
      options: [opt('a', 'Luce Obliqua: photo and film together', 'Luce Obliqua Photo & Film', 22500, 'One team for two days'), opt('b', 'Separate photographer and film crew', '', 28500, 'Two teams, two styles to align')],
      recommended_option_id: 'a', recommendation_reason: 'Saves EUR 6,000, and one team is easier on a terrace this size.', chosen_option_id: 'a', decided_at: '2026-12-16T03:40:00Z', decided_by: 'c_sorrento', internal_notes: '' },
    { id: 'so-d10', wedding_id: W, kind: 'choice', title: 'Band', why_now: '', deadline: '2026-12-11', release_date: '2026-12-04', status: 'decided', delegable: false, budget_line_id: 'so-b16',
      options: [opt('a', 'Banda Marea, nine players', 'Banda Marea', 17000, 'Plays the hora, Latin sets and Neapolitan songs'), opt('b', 'Six-piece band with a DJ', '', 12500, 'A DJ covers the second half')],
      recommended_option_id: 'a', recommendation_reason: 'The only band that has played a hora and a cumbia in one night.', chosen_option_id: 'a', decided_at: '2026-12-10T05:00:00Z', decided_by: 'c_sorrento', internal_notes: '' },
    { id: 'so-d11', wedding_id: W, kind: 'choice', title: 'Pizza list for the welcome evening', why_now: '', deadline: '2027-04-30', release_date: '2027-04-16', status: 'delegated', delegable: true, budget_line_id: 'so-b04',
      options: [opt('a', 'Four classic Neapolitan pizzas', 'Forno Ciclamino', 9800, 'Margherita, marinara, and two of the season'), opt('b', 'Three classics and a lemon pizza', 'Forno Ciclamino', 9800, 'Lemon, provola and basil as the fourth')],
      recommended_option_id: 'b', recommendation_reason: '', chosen_option_id: null, decided_at: '2027-04-21T04:00:00Z', decided_by: 'c_sorrento', internal_notes: 'We chose three classics and a lemon pizza, with a gluten-free base on request.' }
  ];

  /* ---------- documents and links ---------- */
  var d = 0;
  function D(type, category, title, url, extra) {
    d++;
    return Object.assign({ id: 'so-doc' + String(d).padStart(2, '0'), wedding_id: W, type: type, category: category, title: title, url: url,
      version: 1, status: 'signed', added_by: 'u_elena', added_at: '2027-04-02', client_visible: true }, extra || {});
  }
  var U = 'https://example.com/limone/';
  var documents = [
    D('contract', 'Contracts', 'Planning agreement with VKRI', U + 'planning-agreement.pdf', { added_at: '2026-08-10' }),
    D('contract', 'Contracts', 'Grand Hotel Excelsior Vittoria hire agreement', U + 'venue-contract.pdf', { added_at: '2026-10-09' }),
    D('contract', 'Contracts', 'Menus and catering terms with the hotel', U + 'catering.pdf', { version: 2, added_at: '2027-01-29' }),
    D('contract', 'Contracts', 'Welcome evening: oven and pizza menu', U + 'welcome-evening.pdf', { added_at: '2027-02-12' }),
    D('contract', 'Contracts', 'Florals, chuppah and rentals', U + 'florals.pdf', { version: 2, added_at: '2027-03-04' }),
    D('contract', 'Contracts', 'Lighting, sound, fans and water stations', U + 'production.pdf', { added_at: '2027-02-15' }),
    D('contract', 'Contracts', 'Band and ceremony trio', U + 'music.pdf', { added_at: '2026-12-15' }),
    D('contract', 'Contracts', 'Photography and film', U + 'photo-film.pdf', { added_at: '2027-01-22' }),
    D('plan', 'Design', 'Design deck, version 3', U + 'design-deck-v3.pdf', { version: 3, status: 'approved', added_by: 'u_riccardo', added_at: '2027-02-26' }),
    D('plan', 'Design', 'Floor plan, version 2: terrace and Vittoria Ballroom', U + 'floor-plan-v2.pdf', { version: 2, status: 'approved', added_by: 'u_matteo', added_at: '2027-04-23' }),
    D('proof', 'Design', 'Ceremony script, draft 3', U + 'ceremony-script-3.pdf', { version: 3, status: 'awaiting approval', added_by: 'u_beatrice', added_at: '2027-05-14' }),
    D('proof', 'Design', 'Chuppah sketch', U + 'chuppah-sketch-2.pdf', { version: 2, status: 'approved', added_by: 'u_riccardo', added_at: '2027-04-30' }),
    D('proof', 'Design', 'Ketubah text, Hebrew and English', U + 'ketubah-text-2.pdf', { version: 2, status: 'approved', added_by: 'u_beatrice', added_at: '2027-04-09' }),
    D('plan', 'Design', 'Shade and cooling options', U + 'shade-options.pdf', { status: 'shared', added_by: 'u_matteo', added_at: '2027-05-13' }),
    D('link', 'Design', 'Moodboard', 'https://example.com/boards/limone', { status: 'shared', added_by: 'u_riccardo', added_at: '2026-10-16' }),
    D('plan', 'Guests & travel', 'Guest travel guide: Naples airport, coaches and hydrofoil', U + 'travel-guide.pdf', { status: 'shared', added_at: '2027-03-19' }),
    D('plan', 'Guests & travel', 'Rooming list by hotel', U + 'rooming-list.xlsx', { version: 3, status: 'shared', added_at: '2027-05-14' }),
    D('plan', 'Guests & travel', 'Arrival manifest, draft', U + 'manifest-draft.xlsx', { status: 'draft', client_visible: false, added_by: 'u_matteo', added_at: '2027-05-15' }),
    D('plan', 'Timeline', 'Weekend schedule, version 2', U + 'weekend-schedule-v2.pdf', { version: 2, status: 'shared', added_by: 'u_beatrice', added_at: '2027-05-07' }),
    D('plan', 'Timeline', 'Supplier contact sheet', U + 'contact-sheet.pdf', { status: 'internal', client_visible: false, added_by: 'u_matteo', added_at: '2027-04-02' }),
    D('legal', 'Legal paperwork', 'Passport copies for both', U + 'paperwork', { status: 'done', due: '2026-11-15', owner_id: 'u_beatrice' }),
    D('legal', 'Legal paperwork', 'Ketubah: text agreed and witnesses named', U + 'paperwork', { status: 'done', due: '2027-04-09', owner_id: 'u_beatrice' }),
    D('legal', 'Legal paperwork', 'Officiant: introduction letter to the hotel', U + 'paperwork', { status: 'done', due: '2027-04-30', owner_id: 'u_beatrice' }),
    D('legal', 'Legal paperwork', 'Ceremony script approved by both families', U + 'paperwork', { status: 'todo', due: '2027-05-24', owner_id: 'u_beatrice' }),
    D('legal', 'Legal paperwork', 'Symbolic certificate for signing at the ceremony', U + 'paperwork', { status: 'todo', due: '2027-06-25', owner_id: 'u_riccardo' }),
    D('legal', 'Legal paperwork', 'Appointment booked', U + 'paperwork', { status: 'todo', due: '2027-06-30', owner_id: 'u_beatrice' }),
    D('contract', 'Contracts', 'SIAE music licence, copy', U + 'siae-licence.pdf', { added_by: 'c_sorrento', added_at: '2027-04-14' }),
    D('link', 'Links', 'Wedding website', 'https://example.com/isabella-and-daniel', { status: 'shared', added_by: 'c_sorrento', added_at: '2026-11-02' }),
    D('link', 'Links', 'Shared photo album', 'https://example.com/albums/limone', { status: 'shared', added_by: 'c_sorrento', added_at: '2027-01-10' }),
    D('link', 'Links', 'Dance floor playlist', 'https://example.com/playlists/limone', { status: 'shared', added_by: 'c_sorrento', added_at: '2027-04-02' })
  ];

  /* ---------- risks and Plan B ---------- */
  var risks = [
    { id: 'so-r1', wedding_id: W, title: 'Heat during the ceremony', likelihood: 'High', impact: 'High', trigger: 'Forecast above 32 C at 17:00, two days out', plan_b: 'Shade over the rows, a fan on every chair, cold towels and chilled water; ceremony kept to 35 minutes', owner_id: 'u_matteo', status: 'Decision with the couple', client_visible: true },
    { id: 'so-r2', wedding_id: W, title: 'Older guests unwell in the heat', likelihood: 'Medium', impact: 'High', trigger: 'Any guest unwell, or above 30 C at 18:00', plan_b: 'Shaded front rows for both grandmothers and Robert Katz; an assistant stays with each grandmother; a quiet room kept ready indoors', owner_id: 'u_elena', status: 'Covered', client_visible: false },
    { id: 'so-r3', wedding_id: W, title: 'Late landings miss the coaches', likelihood: 'Medium', impact: 'Medium', trigger: 'Any flight landing after 20:00', plan_b: 'Cars on call Wednesday to Friday. The airport is closed from 22:30 to 03:30, except for exceptional delays', owner_id: 'u_matteo', status: 'In planning', client_visible: true },
    { id: 'so-r4', wedding_id: W, title: 'Wind on the terrace', likelihood: 'Low', impact: 'Medium', trigger: 'Rigger check at 14:00 on Saturday', plan_b: 'Sails come down; parasols and the Vittoria Ballroom as fallback', owner_id: 'u_matteo', status: 'Depends on the shade decision', client_visible: true },
    { id: 'so-r5', wedding_id: W, title: 'Sealed kosher meals delayed', likelihood: 'Low', impact: 'Medium', trigger: 'Meals not at the hotel by Thursday 15 July', plan_b: 'A second supplier holds a backup order', owner_id: 'u_beatrice', status: 'Covered', client_visible: false }
  ];

  /* ---------- messages from the couple (reply-time trail) ---------- */
  var messages = [
    { id: 'so-m1', wedding_id: W, from_user_id: 'c_sorrento', channel: 'whatsapp', subject: 'Can we move the ceremony later on the day?', body: 'If the forecast that week says 34 degrees, can we decide on the day to start at 19:15, or does it have to be settled now with the sails?',
      received_at: '2027-05-17T04:10:00Z', due_by: '2027-05-18T04:10:00Z', acknowledged_at: '2027-05-17T07:20:00Z', answered_at: null, answer: '', answered_by: null, owner_id: 'u_beatrice', internal_notes: 'Ask Matteo whether the rigger can hold both plans. Answer by noon.' },
    { id: 'so-m2', wedding_id: W, from_user_id: 'c_sorrento', channel: 'portal', subject: 'Two friends land in Naples at 22:50', body: 'Two friends found a cheaper flight that lands in Naples at 22:50 on Thursday. Will the shuttle wait for them?',
      received_at: '2027-05-06T05:20:00Z', due_by: '2027-05-07T05:20:00Z', acknowledged_at: '2027-05-06T07:05:00Z', answered_at: '2027-05-06T10:15:00Z', answer: 'Naples airport is closed from 22:30 to 03:30, so please ask them to check the arrival airport and time. Anyone who lands after 20:00 is met by a car; that is part of the transfer plan.', answered_by: 'u_matteo', owner_id: 'u_matteo', internal_notes: '' },
    { id: 'so-m3', wedding_id: W, from_user_id: 'c_sorrento', channel: 'whatsapp', subject: 'Pizza tasting for Daniel\'s parents', body: 'Robert and Susan will be in Sorrento on 12 June. Could they try the welcome evening pizza?',
      received_at: '2027-04-28T02:15:00Z', due_by: '2027-04-29T02:15:00Z', acknowledged_at: '2027-04-28T07:30:00Z', answered_at: '2027-04-28T11:05:00Z', answer: 'Yes. Pasquale will light the oven for them at 19:00 on 12 June at no charge, and Beatrice will join them.', answered_by: 'u_beatrice', owner_id: 'u_beatrice', internal_notes: '' },
    { id: 'so-m4', wedding_id: W, from_user_id: 'c_sorrento', channel: 'email', subject: 'Kosher meals for Ruth, Avi and Miriam', body: 'Daniel\'s grandmother, uncle and aunt keep kosher. Can they have sealed meals at every event?',
      received_at: '2027-04-22T03:30:00Z', due_by: '2027-04-23T03:30:00Z', acknowledged_at: '2027-04-22T07:10:00Z', answered_at: '2027-04-22T12:40:00Z', answer: 'Yes. The hotel orders sealed meals for all three from a kosher kitchen, for the four events. They are served sealed and opened at the table. EUR 1,100 in total, already in your forecast.', answered_by: 'u_beatrice', owner_id: 'u_beatrice', internal_notes: '' },
    { id: 'so-m5', wedding_id: W, from_user_id: 'c_sorrento', channel: 'whatsapp', subject: 'Should the ketubah travel with us?', body: 'The artist says the ketubah is ready. Should she ship it to Sorrento, or should we carry it?',
      received_at: '2027-04-12T05:00:00Z', due_by: '2027-04-13T05:00:00Z', acknowledged_at: '2027-04-12T07:02:00Z', answered_at: '2027-04-12T08:40:00Z', answer: 'Please carry it. Susan has offered to take it in the cabin in its flat case. We will have an easel and a pen ready for the signing, and a frame for afterwards.', answered_by: 'u_beatrice', owner_id: 'u_beatrice', internal_notes: '' },
    { id: 'so-m6', wedding_id: W, from_user_id: 'c_sorrento', channel: 'email', subject: 'Why is the venue paid in three parts?', body: 'My mother asks why the venue is paid in three parts, and whether the last part can wait until after the wedding.',
      received_at: '2027-03-10T04:45:00Z', due_by: '2027-03-11T04:45:00Z', acknowledged_at: '2027-03-10T07:15:00Z', answered_at: '2027-03-10T09:30:00Z', answer: 'Our contract with the hotel sets 30%, 40% and 30%; the last part is due on 30 June and cannot move past the wedding. We will send it to Carmen a month early, in Spanish, with one line on what it covers.', answered_by: 'u_elena', owner_id: 'u_elena', internal_notes: '' }
  ];

  /* ---------- Friday letters ---------- */
  var weekly_recaps = [
    { id: 'so-w1', wedding_id: W, week_of: '2027-04-30', author_id: 'u_beatrice', status: 'sent', sent_at: '2027-04-30T15:00:00Z',
      done: ['Chuppah design approved', 'Floor plan version 2 approved', 'Pizza tasting for Robert and Susan booked for 12 June'],
      in_motion: ['Ceremony script, draft 3', 'Shade and cooling options', 'RSVPs'], waiting_on: [{ item: 'Rigging quote for the shade sails', who: 'Vela Bianca Rigging', since: '2027-04-26' }],
      needs_you: [], budget_note: 'Forecast unchanged.' },
    { id: 'so-w2', wedding_id: W, week_of: '2027-05-07', author_id: 'u_beatrice', status: 'sent', sent_at: '2027-05-07T15:00:00Z',
      done: ['Weekend schedule version 2', 'Coach quotes from Naples compared', 'Rigging quote received'],
      in_motion: ['Shade options', 'Ceremony script', 'Stationery'], waiting_on: [{ item: 'Band power list', who: 'Banda Marea', since: '2027-05-03' }],
      needs_you: [], budget_note: 'Forecast unchanged.' },
    { id: 'so-w3', wedding_id: W, week_of: '2027-05-14', author_id: 'u_beatrice', status: 'sent', sent_at: '2027-05-14T15:00:00Z',
      done: ['RSVPs: 67 of 85 have replied, 60 are coming', 'Shade options priced: two choices for you', 'Ceremony script, draft 3, shared with both families', 'Sealed kosher meals confirmed for Ruth, Avi and Miriam'],
      in_motion: ['Naples coach plan against the flight list', 'Sample table on 25 May', 'Late RSVPs: a reminder went out on 12 May'],
      waiting_on: [{ item: 'Band power list', who: 'Banda Marea', since: '2027-05-03' }, { item: 'Flight details from confirmed guests', who: 'Guests', since: '2027-05-01' }],
      needs_you: [{ text: 'Ceremony script, draft 3', due: '2027-05-24' }, { text: 'Ceremony shade: sails or a later start', due: '2027-05-28' }, { text: 'Welcome bag contents', due: '2027-06-04' }],
      budget_note: 'Forecast is EUR 338,785, inside your envelope by EUR 1,215. One change waits for you: misting fans at the aperitivo, EUR 2,600.' },
    { id: 'so-w4', wedding_id: W, week_of: '2027-05-21', author_id: 'u_beatrice', status: 'draft', sent_at: null,
      done: ['Sample table confirmed: Tuesday 25 May, 18:00', 'Consuelo: a car and an escort for every move'], in_motion: ['Naples coach plan', 'Seating chart, draft 1'],
      waiting_on: [{ item: 'Band power list', who: 'Banda Marea', since: '2027-05-03' }],
      needs_you: [{ text: 'Ceremony script, draft 3', due: '2027-05-24' }, { text: 'Ceremony shade: sails or a later start', due: '2027-05-28' },
        { text: 'Misting fans at the aperitivo, EUR 2,600: with the shade choice', due: '2027-05-28' }, { text: 'Welcome bag contents', due: '2027-06-04' }],
      budget_note: 'Forecast is EUR 338,785, inside your envelope by EUR 1,215. One change waits for you: misting fans at the aperitivo, EUR 2,600.' }
  ];

  var activity_log = [
    ['2027-05-17T07:20:00Z', 'u_beatrice', 'acknowledged "Can we move the ceremony later on the day?"'],
    ['2027-05-16T09:10:00Z', 'u_elena', 'booked a car and an escort for Consuelo Moreno'],
    ['2027-05-15T13:30:00Z', 'u_matteo', 'shared the Naples coach plan'],
    ['2027-05-14T15:00:00Z', 'u_beatrice', 'sent the Friday letter'],
    ['2027-05-14T14:40:00Z', 'u_beatrice', 'published "Ceremony script, draft 3" to the couple'],
    ['2027-05-13T17:00:00Z', 'u_beatrice', 'published the shade decision to the couple'],
    ['2027-05-13T11:00:00Z', 'u_matteo', 'proposed a change: misting fans at the aperitivo'],
    ['2027-05-12T09:30:00Z', 'u_elena', 'sent the RSVP reminder to 18 guests'],
    ['2027-05-06T10:15:00Z', 'u_matteo', 'answered "Two friends land in Naples at 22:50"']
  ].map(function (a, i) { return { id: 'so-a' + (i + 1), wedding_id: W, at: a[0], user_id: a[1], text: a[2] }; });

  S.add({ weddings: [wedding], phases: ph.phases, subphases: ph.subphases, tasks: tasks, comments: comments, events: events,
    accommodations: accommodations, guests: gen.guests, guest_event_rsvps: gen.guest_event_rsvps, vendors: vendors,
    budget_lines: budget_lines, change_orders: change_orders, invoices: invoices, decisions: decisions, documents: documents,
    risks: risks, messages: messages, weekly_recaps: weekly_recaps, activity_log: activity_log });
})(typeof window !== 'undefined' ? window : globalThis);
