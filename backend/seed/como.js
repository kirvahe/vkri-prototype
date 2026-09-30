/* Seed: Lake Como, 11-13 June 2027. "Project Camelia". REFERENCE wedding: Sorrento and Paris copy this depth.
   Real: the venue and hotel names, and the facts about them cited from docs/venue-facts.md.
   Invented: every person, supplier, price, date and metric, including the prices and contract terms shown next to the real venue and hotels. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI, S = VKRI.seed, W = 'como';

  /* ---------- wedding card ---------- */
  var wedding = {
    id: W, code_name: 'Project Camelia', title: 'Lake Como', destination: 'Lake Como, Italy', accent: 'camelia',
    couple_names: 'Olivia Bennett & Henry Ashworth', partner_1: 'Olivia Bennett', partner_2: 'Henry Ashworth', short: 'Olivia & Henry',
    home_city: 'New York, NY', home_tz: 'America/New_York', local_tz: 'Europe/Rome',
    venue: { name: 'Villa Erba', town: 'Cernobbio', source_ref: 'F-COMO-01' },
    start_date: '2027-06-11', end_date: '2027-06-13', wedding_day: '2027-06-12',
    guest_target: 160, envelope_eur: 720000, vkri_fee_eur: 70500, display_currency: 'USD', fx_locked: 1.08, fx_today: 1.12,
    lead_id: 'u_sonia', team_ids: ['u_sonia', 'u_riccardo', 'u_matteo', 'u_elena'],
    ceremony_type: 'Symbolic ceremony in the park, in English, led by their friend Julian Reyes',
    contacts: [
      { name: 'Olivia Bennett', role: 'Bride', email: 'olivia@example.com', phone: '+1 212 555 0141', note: 'Leads design. Prefers WhatsApp voice notes.' },
      { name: 'Henry Ashworth', role: 'Groom', email: 'henry@example.com', phone: '+1 212 555 0176', note: 'Leads music, bar and budget.' },
      { name: 'Richard Bennett', role: 'Father of the bride, payer', email: 'richard.bennett@example.com', phone: '+1 203 555 0119', note: 'Pays venue and catering. Wants invoices with one line on what they cover.' },
      { name: 'Catherine Bennett', role: 'Mother of the bride', email: 'catherine.b@example.com', phone: '+1 917 555 0133', note: 'Involved in florals and the welcome dinner.' },
      { name: 'Margaret Ashworth', role: 'Mother of the groom', email: 'margaret.ashworth@example.com', phone: '+1 617 555 0162', note: 'Hosting the farewell brunch.' },
      { name: 'Dana Whitlock', role: "Olivia's executive assistant", email: 'dana.whitlock@example.com', phone: '+1 212 555 0108', note: 'Books every call. Copy her on anything with a date.' }
    ],
    payers: [
      { id: 'co-pay1', name: 'Olivia & Henry', relation: 'Couple', covers: 'Design, music, photo, guests, planning fee' },
      { id: 'co-pay2', name: 'Richard Bennett', relation: 'Father of the bride', covers: 'Venue and catering' },
      { id: 'co-pay3', name: 'Margaret Ashworth', relation: 'Mother of the groom', covers: 'Farewell brunch' }
    ],
    decision_makers: 'Olivia decides design. Henry decides music, bar and money. Richard signs off venue and catering changes above EUR 10,000.',
    comms: {
      channel: 'WhatsApp group for quick questions; email for anything with a number in it',
      cadence: 'Friday letter every week; video call every second Tuesday at 12:30 New York time (18:30 in Italy)',
      hours: 'Weekdays 12:00-20:00 ET. Saturdays after 12:00 ET. Sundays off. Written replies are fine at any time; calls stay inside these hours.',
      tone: 'Direct and brief. Options with prices, one recommendation. No exclamation marks.',
      do: ['Send a written summary after every call', 'Give a price with every option', 'Flag budget movement the same day'],
      dont: ['Ask the same question twice', 'Call without booking through Dana', 'Send more than three decisions in a week']
    },
    brief: {
      words: ['A garden at dusk', 'Unfussy', 'Candlelight', 'An old villa on the lake, not a ballroom'],
      palette: 'Ivory, sage, apricot, a touch of oxblood',
      never: ['All-white florals', 'Gold chargers', 'A photo booth', 'Long speeches'],
      priorities: ['Guests feel looked after from landing to departure', 'Food and wine', 'A dance floor that stays full']
    },
    must_haves: ['Arrival by boat for every guest', 'Long tables outdoors, not rounds', 'Live band, no playlists before midnight', 'A quiet tribute to Henry\'s father'],
    deal_breakers: ['Any supplier posting images without consent', 'Visible branding or sponsor signage', 'Buffet service'],
    sensitivities: [
      'Olivia\'s parents are divorced. Richard and Catherine sit at separate tables and are never placed side by side in the photo line-up.',
      'Henry\'s father died in 2024. The tribute is a reserved chair with his boutonniere. No announcement, no mention in speeches unless Henry raises it.',
      'Budget conversations go to Henry. On calls, Olivia prefers not to go through running totals unless something moves by more than EUR 5,000.',
      'Eleanor Bennett (grandmother, 88) cannot use the boats. Car to the land gate, ground-floor room.'
    ],
    internal_notes: 'Richard pays on time but questions every line: attach the quote to each invoice. Catherine tends to reopen floral choices; route her ideas through Olivia.',
    photo_consent: 'private', photo_consent_at: '2026-09-02T16:00:00Z',
    scope: [
      { name: 'Venue search and negotiation', status: 'done' }, { name: 'Design concept and moodboard', status: 'done' },
      { name: 'Supplier sourcing: three options per category', status: 'done' }, { name: 'Contract review and payment schedule', status: 'done' },
      { name: 'Budget management with weekly forecast', status: 'in_progress' }, { name: 'Guest list, RSVP and travel desk', status: 'in_progress' },
      { name: 'Room blocks and transfers', status: 'in_progress' }, { name: 'Production schedule and run of show', status: 'in_progress' },
      { name: 'Ceremony paperwork', status: 'in_progress' }, { name: 'On-site team for four days: four planners and two assistants', status: 'upcoming' },
      { name: 'Supplier settlement and final account', status: 'upcoming' }, { name: 'Gallery delivery and thank-you notes', status: 'upcoming' }
    ],
    milestones: [
      { date: '2026-07-28', label: 'Venue contract signed', kind: 'contract' },
      { date: '2026-12-01', label: 'Invitations sent', kind: 'guests' },
      { date: '2027-03-15', label: 'RSVP deadline', kind: 'guests' },
      { date: '2027-05-11', label: 'Room blocks released', kind: 'guests' },
      { date: '2027-05-28', label: 'Final headcount to caterer', kind: 'ops' },
      { date: '2027-06-01', label: 'Final balances due', kind: 'payment' },
      { date: '2027-06-12', label: 'Wedding day', kind: 'wedding' }
    ],
    local_notes: [
      { title: 'Boats stop in high wind', text: 'If the lake is rough, guests move by coach to the land gate. Coaches are on standby both evenings.' },
      { title: 'After midnight the party moves inside', text: 'The band plays in the park until 23:45, then the DJ takes over inside the villa.' }
    ]
  };

  /* ---------- phases ---------- */
  var ph = S.makePhases(W, {
    1: { owner_id: 'u_riccardo', client_signoff_at: '2027-01-29', summary: 'Concept, venue and every supplier approved by Olivia and Henry.' },
    2: { owner_id: 'u_elena', client_signoff_at: '2027-05-14', summary: 'All contracts signed. 144 guests confirmed. Production drawings final.' },
    3: { owner_id: 'u_sonia', summary: 'Four weeks out. Confirming every supplier against the final numbers.' }
  }, {
    '1.1': { status: 'done', owner_id: 'u_sonia', start: '2026-06-08', end: '2026-07-10', summary: 'Brief signed off after two calls and a day in New York.' },
    '1.2': { status: 'done', owner_id: 'u_riccardo', start: '2026-07-01', end: '2026-09-18', summary: 'Villa secured for three days. Concept "a garden at dusk" approved.' },
    '1.3': { status: 'done', owner_id: 'u_sonia', start: '2026-09-01', end: '2027-01-29', summary: 'Three options shown per category. All suppliers chosen.' },
    '2.1': { status: 'done', owner_id: 'u_elena', start: '2026-10-01', end: '2027-03-31', summary: 'Every contract countersigned. Payment schedule agreed with both payers.' },
    '2.2': { status: 'done', owner_id: 'u_elena', start: '2026-12-01', end: '2027-05-14', summary: 'RSVPs closed at 144 yes. Rooms and transfers assigned.' },
    '2.3': { status: 'done', owner_id: 'u_matteo', start: '2027-01-15', end: '2027-05-07', summary: 'Floor plan v6, lighting plot and power plan signed off on site.' },
    '3.1': { status: 'in_progress', owner_id: 'u_sonia', start: '2027-05-03', end: '2027-06-06', summary: 'Supplier confirmations 9 of 15 complete. Rain plan decision due 21 May.' },
    '3.2': { status: 'not_started', owner_id: 'u_matteo', start: '2027-06-07', end: '2027-06-13', summary: 'Team on site from Monday 7 June.' },
    '3.3': { status: 'not_started', owner_id: 'u_sonia', start: '2027-06-14', end: '2027-07-16', summary: 'Final account within 30 days of the wedding.' }
  });

  /* ---------- tasks: [sub, title, assignee, due, status, client_visible, note] ---------- */
  var n = 0;
  function T(sub, title, who, due, status, visible, note) {
    n++;
    return { id: 'co-t' + String(n).padStart(2, '0'), wedding_id: W, subphase_id: W + '-' + sub, title: title, assignee_id: 'u_' + who,
      due: due, status: status, client_visible: !!visible, note: note || '', updated_at: status === 'done' ? due : '2027-05-14' };
  }
  var tasks = [
    T('1.1', 'Discovery call and questionnaire', 'sonia', '2026-06-12', 'done', 1),
    T('1.1', 'Day in New York: walk through priorities and budget envelope', 'riccardo', '2026-06-24', 'done', 1),
    T('1.1', 'Write the brief and the never-list', 'sonia', '2026-07-03', 'done', 1),
    T('1.1', 'Map who decides and who pays', 'sonia', '2026-07-08', 'done', 0, 'Richard signs off venue and catering above 10k.'),
    T('1.2', 'Shortlist four villas with availability and hire terms', 'riccardo', '2026-07-17', 'done', 1),
    T('1.2', 'Site visit with the couple', 'riccardo', '2026-07-24', 'done', 1),
    T('1.2', 'Negotiate and sign the villa contract', 'elena', '2026-07-28', 'done', 1),
    T('1.2', 'Design concept and moodboard v1-v3', 'riccardo', '2026-09-04', 'done', 1),
    T('1.2', 'Weekend format: five events over three days', 'sonia', '2026-09-18', 'done', 1),
    T('1.3', 'Catering: three tastings and side-by-side quotes', 'sonia', '2026-10-30', 'done', 1),
    T('1.3', 'Florals: three studios, one sample table each', 'riccardo', '2026-11-20', 'done', 1),
    T('1.3', 'Band auditions by video, shortlist of three', 'sonia', '2026-11-27', 'done', 1),
    T('1.3', 'Photo and film: portfolio review and reference calls', 'sonia', '2026-12-11', 'done', 1),
    T('1.3', 'Production partner and power survey', 'matteo', '2027-01-15', 'done', 0),
    T('1.3', 'Menu approved after second tasting', 'sonia', '2027-01-29', 'done', 1),
    T('2.1', 'Review all supplier contracts', 'elena', '2027-02-12', 'done', 0, 'Liability cap raised in the production contract.'),
    T('2.1', 'Agree the payment schedule with both payers', 'elena', '2027-02-19', 'done', 1),
    T('2.1', 'Collect insurance certificates from every supplier', 'elena', '2027-03-12', 'done', 0),
    T('2.1', 'NDAs signed by suppliers and on-site staff', 'elena', '2027-03-26', 'done', 1),
    T('2.1', 'SIAE music licence: form prepared, bought by the couple', 'matteo', '2027-03-31', 'done', 1, 'Only a private account can buy it (F-IT-01). Tariff under 200 guests, live and recorded music: EUR 384.73.'),
    T('2.2', 'Invitations designed, printed and posted', 'elena', '2026-12-01', 'done', 1),
    T('2.2', 'Room blocks at three hotels', 'elena', '2026-11-20', 'done', 1),
    T('2.2', 'Chase late RSVPs', 'elena', '2027-03-19', 'done', 1),
    T('2.2', 'Dietary and allergy sheet, checked against the caterer', 'elena', '2027-04-30', 'done', 1),
    T('2.2', 'Boat and coach plan for every arrival', 'matteo', '2027-05-07', 'done', 1),
    T('2.2', 'Seating chart draft v2', 'sonia', '2027-05-14', 'done', 1),
    T('2.3', 'Floor plan v6 with table numbers', 'matteo', '2027-04-09', 'done', 1),
    T('2.3', 'Lighting plot and power plan', 'matteo', '2027-04-23', 'done', 0),
    T('2.3', 'Sample table approved on site', 'riccardo', '2027-04-30', 'done', 1),
    T('2.3', 'Stationery proofs: menus, escort cards, signage', 'riccardo', '2027-05-07', 'done', 1),
    T('3.1', 'Confirm every supplier: arrival time, headcount, dietary sheet, balance', 'sonia', '2027-05-28', 'doing', 1, '9 of 15 complete.'),
    T('3.1', 'Rain plan: tent hold or dinner inside the villa', 'matteo', '2027-05-21', 'client', 1, 'Waiting for the couple. Hold expires 21 May.'),
    T('3.1', 'Seating chart v3: family tables', 'sonia', '2027-05-20', 'client', 1),
    T('3.1', 'Final headcount to the caterer', 'elena', '2027-05-28', 'todo', 1),
    T('3.1', 'Run of show v4 to all suppliers', 'matteo', '2027-05-25', 'doing', 1),
    T('3.1', 'Late-night food choice', 'sonia', '2027-05-24', 'client', 1),
    T('3.1', 'Car to the land gate for Eleanor Bennett instead of the boat', 'elena', '2027-05-16', 'done', 0, 'Eleanor Bennett cannot use boats.'),
    T('3.1', 'Second boat for late departures: quote and approval', 'matteo', '2027-05-18', 'client', 1),
    T('3.1', 'Welcome bags: assemble 91 and deliver to hotels', 'elena', '2027-06-04', 'todo', 1, 'One bag per room claimed.'),
    T('3.1', 'Generator load test with the production partner', 'matteo', '2027-05-14', 'blocked', 0, 'Supplier moved the test twice. Escalated to their owner.'),
    T('3.1', 'Final balances: send invoices to both payers', 'elena', '2027-05-21', 'doing', 1),
    T('3.1', 'Brief the on-site team: roles, radios, contact sheet', 'sonia', '2027-06-02', 'todo', 0),
    T('3.1', 'Ceremony walk-through with Julian Reyes', 'sonia', '2027-06-09', 'todo', 1),
    T('3.1', 'Band: first-dance arrangement', 'sonia', '2027-05-26', 'doing', 1),
    T('3.1', 'Final rooming lists sent to three hotels', 'elena', '2027-05-12', 'done', 1),
    T('3.1', 'Order of service approved', 'sonia', '2027-05-10', 'done', 1),
    T('3.1', 'Caterer and florist confirmed against final numbers', 'sonia', '2027-05-14', 'done', 1),
    T('3.1', 'Daily weather call set up with the boat company', 'matteo', '2027-05-13', 'done', 0),
    T('3.1', 'Dietary cards printed for every plated course', 'elena', '2027-05-14', 'done', 1),
    T('3.2', 'Site walk with every supplier lead', 'matteo', '2027-06-08', 'todo', 0),
    T('3.2', 'Hospitality desks open at three hotels', 'elena', '2027-06-10', 'todo', 1),
    T('3.2', 'Rehearsal and family lunch', 'sonia', '2027-06-11', 'todo', 1),
    T('3.2', 'Welcome dinner', 'sonia', '2027-06-11', 'todo', 1),
    T('3.2', 'Load-in and build: florals, lighting, tables', 'matteo', '2027-06-12', 'todo', 0),
    T('3.2', 'Wedding day: ceremony, dinner, dancing', 'sonia', '2027-06-12', 'todo', 1),
    T('3.2', 'Farewell brunch and departures', 'elena', '2027-06-13', 'todo', 1),
    T('3.2', 'Strike and return of rentals', 'matteo', '2027-06-14', 'todo', 0),
    T('3.3', 'Settle every supplier and close the final account', 'elena', '2027-07-09', 'todo', 1),
    T('3.3', 'Return sentimental items to the couple', 'sonia', '2027-06-16', 'todo', 1),
    T('3.3', 'Gallery and film delivery', 'sonia', '2027-07-16', 'todo', 1),
    T('3.3', 'Supplier debrief and notes for next season', 'matteo', '2027-06-25', 'todo', 0),
    T('3.3', 'Thank-you notes and feedback call', 'sonia', '2027-07-02', 'todo', 1)
  ];
  function taskId(titleStart) {
    for (var i = 0; i < tasks.length; i++) if (tasks[i].title.indexOf(titleStart) === 0) return tasks[i].id;
    throw new Error('como seed: no task starting with ' + titleStart);
  }

  /* ---------- comments: [parent_type, parent_id, author, at, body, internal] ---------- */
  var c = 0;
  function C(type, pid, who, at, body, internal) {
    c++;
    return { id: 'co-c' + String(c).padStart(2, '0'), wedding_id: W, parent_type: type, parent_id: pid, author_id: 'u_' + who, at: at, body: body, internal: !!internal };
  }
  var comments = [
    C('phase', W + '-p1', 'riccardo', '2027-01-29T18:05:00Z', 'Planning signed off on today\'s call. Olivia: "This is exactly the garden I had in my head."', 0),
    C('phase', W + '-p2', 'elena', '2027-05-14T15:00:00Z', 'Operations closed. 144 confirmed, all contracts in, production drawings final.', 0),
    C('phase', W + '-p3', 'sonia', '2027-05-14T17:30:00Z', 'Four items are with the couple this week: rain plan, family tables, late-night food and the second boat. Nothing else goes to them until those are answered.', 1),
    C('subphase', W + '-1.1', 'sonia', '2026-07-03T10:00:00Z', 'Brief approved. Priorities in their order: guests, food and wine, dance floor.', 0),
    C('subphase', W + '-1.1', 'sonia', '2026-07-08T09:20:00Z', 'Parents are divorced. Keep Richard and Catherine apart in seating and photos. Do not raise it with Olivia again.', 1),
    C('subphase', W + '-1.2', 'riccardo', '2026-07-24T18:40:00Z', 'Site visit done. They chose the villa within ten minutes of walking the park.', 0),
    C('subphase', W + '-1.3', 'sonia', '2026-11-20T12:00:00Z', 'Florals: three sample tables shown. Petalo Nero Studio chosen at EUR 70,000, on the allocation.', 0),
    C('subphase', W + '-2.1', 'elena', '2027-02-19T11:15:00Z', 'Payment schedule agreed. Richard covers venue and catering, the couple everything else.', 0),
    C('subphase', W + '-2.1', 'elena', '2027-02-19T11:20:00Z', 'Richard asked for the original quote attached to every invoice. Doing that for all of his.', 1),
    C('subphase', W + '-2.2', 'elena', '2027-05-14T14:00:00Z', 'List closed at 144 yes, 10 no, 6 still silent. We are forecasting 148 for the caterer.', 0),
    C('subphase', W + '-2.3', 'matteo', '2027-04-30T17:00:00Z', 'Sample table approved on site with Olivia on video. Candle height reduced by 5 cm.', 0),
    C('subphase', W + '-3.1', 'sonia', '2027-05-14T09:00:00Z', 'Confirmations 9 of 15. Missing: production instalment, band meal count, boat timings, tent, stationery delivery, hair and make-up schedule.', 0),
    C('subphase', W + '-3.1', 'matteo', '2027-05-14T16:45:00Z', 'Generator test moved again by the production partner. If it slips past Wednesday I book a second supplier.', 1),
    C('subphase', W + '-3.1', 'sonia', '2027-05-15T10:30:00Z', 'Rain plan is with Olivia and Henry. Tent hold expires 21 May.', 0),
    C('subphase', W + '-3.1', 'elena', '2027-05-16T08:50:00Z', 'Grandmother transfer confirmed by car. Hotel has a ground-floor room on hold.', 1),
    C('task', 'co-t40', 'matteo', '2027-05-14T16:40:00Z', 'Called their owner directly. New date promised by Tuesday.', 1),
    C('task', 'co-t31', 'sonia', '2027-05-14T09:05:00Z', 'Caterer and florist confirmed everything this morning.', 0)
  ];

  /* ---------- weekend events ---------- */
  var events = [
    { id: 'co-e1', wedding_id: W, day: '2027-06-11', name: 'Family lunch and rehearsal', start: '12:30', end: '15:00', location: 'Villa Erba, ground floor', dress_code: 'Summer casual', audience: 'family', plan_b: '', note: '' },
    { id: 'co-e2', wedding_id: W, day: '2027-06-11', name: 'Welcome dinner', start: '19:00', end: '23:00', location: 'Villa Erba, the park', dress_code: 'Garden party', audience: 'all', plan_b: 'Inside the villa, ground floor', note: 'Boats from each hotel at 18:15 and 18:45.' },
    { id: 'co-e3', wedding_id: W, day: '2027-06-12', name: 'Ceremony', start: '17:00', end: '17:40', location: 'Villa Erba, the park', dress_code: 'Black tie', audience: 'all', plan_b: 'Inside the villa', note: 'Parasols and chilled water at every row.' },
    { id: 'co-e4', wedding_id: W, day: '2027-06-12', name: 'Aperitivo, dinner and dancing', start: '17:45', end: '23:45', location: 'Long tables in the park', dress_code: 'Black tie', audience: 'all', plan_b: 'Clear tent in the park, or inside the villa', note: 'Band from 21:30.' },
    { id: 'co-e5', wedding_id: W, day: '2027-06-12', name: 'After-party', start: '23:45', end: '02:00', location: 'Inside Villa Erba', dress_code: 'As you are', audience: 'all', plan_b: '', note: 'Late-night food at 00:30. Last boats at 01:00 and 02:00.' },
    { id: 'co-e6', wedding_id: W, day: '2027-06-13', name: 'Farewell brunch', start: '11:00', end: '14:00', location: 'Villa d\'Este', dress_code: 'Relaxed', audience: 'all', plan_b: '', note: 'Hosted by Margaret Ashworth. Served by the hotel.' }
  ];

  /* ---------- hotels (real names from venue-facts.md; block sizes are demo data, never above the verified room count:
     Villa d'Este 151 rooms, Mandarin Oriental 75 keys; no count is verified for the Hilton, so its block stays at 25).
     claimed is computed from the guests after the generator, below. ---------- */
  var accommodations = [
    { id: 'co-h1', wedding_id: W, name: 'Villa d\'Este', town: 'Cernobbio', block_size: 54, claimed: 0, release_date: '2027-05-11', hosted: true, note: 'Family and wedding party hosted, two nights; friends at the group rate.', source_ref: 'F-COMO-10' },
    { id: 'co-h2', wedding_id: W, name: 'Mandarin Oriental, Lago di Como', town: 'Blevio', block_size: 30, claimed: 0, release_date: '2027-05-11', hosted: false, note: 'Friends. Guest-paid at the group rate.', source_ref: 'F-COMO-11' },
    { id: 'co-h3', wedding_id: W, name: 'Hilton Lake Como', town: 'Como', block_size: 25, claimed: 0, release_date: '2027-05-11', hosted: false, note: 'Friends and colleagues. Guest-paid at the group rate.', source_ref: 'F-COMO-12' }
  ];

  /* ---------- guests: 14 written by hand, the rest generated (deterministic) ---------- */
  var vips = [
    { name: 'Richard Bennett', side: 'Bennett', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-06-09', table: 1, notes: 'Father of the bride. Speech at the welcome dinner.', internal_notes: 'Never next to Catherine.' },
    { name: 'Catherine Bennett', side: 'Bennett', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-06-09', table: 3, dietary: 'Pescatarian', notes: 'Mother of the bride.', internal_notes: 'Separate table from Richard. Different floor at the hotel.' },
    { name: 'Eleanor Bennett', side: 'Bennett', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', room_type: 'Junior suite', nights_hosted: 3, arrival: '2027-06-10', table: 1, transfer: 'Private car', notes: 'Grandmother, 88. Car to the land gate, no boats. Ground-floor room.', internal_notes: 'Assign Elena as her escort on Saturday.' },
    { name: 'Margaret Ashworth', side: 'Ashworth', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-06-09', table: 2, notes: 'Mother of the groom. Hosts the brunch.' },
    { name: 'Thomas Ashworth', side: 'Ashworth', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 2, notes: 'Best man, brother of the groom. Holds the rings.' },
    { name: 'Amelia Bennett', side: 'Bennett', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 1, dietary: 'Vegetarian', notes: 'Maid of honour, sister of the bride.' },
    { name: 'Julian Reyes', side: 'Both', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 4, notes: 'Friend leading the ceremony. Needs a lapel microphone.' },
    { name: 'Priscilla Vance', side: 'Bennett', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 3, allergies: 'Tree nuts', dietary: '', notes: 'Aunt. Severe tree-nut allergy: separate preparation, confirmed with the caterer.' },
    { name: 'Dana Whitlock', side: 'Bennett', tier: 'Colleagues', rsvp: 'yes', vip: true, accommodation_id: 'co-h2', table: 4, notes: 'Olivia\'s executive assistant.' },
    { name: 'George Ashworth', side: 'Ashworth', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 2, dietary: 'Gluten-free', notes: 'Uncle. Reads at the ceremony.' },
    { name: 'Sofia Lindqvist', side: 'Ashworth', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 4, notes: 'Bridesmaid. Arrives from Stockholm.', flight: 'From Stockholm, lands at Milan Malpensa at 11:05' },
    { name: 'Marcus Oyelaran', side: 'Ashworth', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'co-h1', nights_hosted: 2, table: 4, notes: 'Groomsman. Toast at dinner, two minutes.' },
    { name: 'Helen Prescott', side: 'Bennett', tier: 'Family', rsvp: 'pending', vip: true, notes: 'Godmother. Recovering from surgery, will confirm by 20 May.', internal_notes: 'Hold a room at Villa d\'Este until 24 May.' },
    { name: 'Walter Kessler', side: 'Ashworth', tier: 'Colleagues', rsvp: 'no', vip: true, notes: 'Henry\'s managing partner. Sends regrets.' }
  ];
  var gen = S.makeGuests({
    wedding_id: W, prefix: 'co', seed: 1106, count: 160, vips: vips,
    events: [{ id: 'co-e1', audience: 'family', turnout: 0.95 }, { id: 'co-e2', audience: 'all', turnout: 0.93 }, { id: 'co-e3', audience: 'all', turnout: 1 },
      { id: 'co-e4', audience: 'all', turnout: 1 }, { id: 'co-e5', audience: 'all', turnout: 0.62 }, { id: 'co-e6', audience: 'all', turnout: 0.8 }],
    accommodations: [['co-h1', 30], ['co-h2', 40], ['co-h3', 30]],
    responded: 0.975, yesRate: 0.945, start_date: '2027-06-11', end_date: '2027-06-13', seated: true, firstTable: 5, sides: ['Bennett', 'Ashworth']
  });
  /* Rooms and hosted nights, set after the generator with no random draws, so the headcount above does not move.
     A generated couple shares one hotel, room and travel plan; generated family stays at the hosted hotel; nobody has hosted
     nights at a guest-paid hotel. A hotel's claimed rooms come from its guests: one room per household, two guests a room
     at most, and a room of their own for each hand-written VIP unless shareRoom pairs them. */
  (function (hostedId, shareRoom) {
    var hosted = {}, rooms = {}, run = 0, prev = null;
    accommodations.forEach(function (a) { hosted[a.id] = a.hosted; rooms[a.id] = {}; });
    gen.guests.forEach(function (g) {
      var pair = !!prev && !g.vip && prev.household === g.household && prev.side === g.side && prev.tier === g.tier;
      if (pair && g.rsvp === 'yes' && prev.rsvp === 'yes') ['accommodation_id', 'room_type', 'arrival', 'departure', 'transfer'].forEach(function (k) { g[k] = prev[k]; });
      if (!g.vip && g.tier === 'Family' && g.accommodation_id) { g.accommodation_id = hostedId; g.nights_hosted = 2; }
      if (g.accommodation_id && !hosted[g.accommodation_id]) g.nights_hosted = 0;
      if (!pair) run++;
      var key = g.vip ? 'v:' + (shareRoom[g.name] || g.name) : 'h:' + run;
      if (g.accommodation_id) rooms[g.accommodation_id][key] = (rooms[g.accommodation_id][key] || 0) + 1;
      prev = g.vip || pair ? null : g;
    });
    accommodations.forEach(function (a) {
      a.claimed = Object.keys(rooms[a.id]).reduce(function (s, k) { return s + Math.ceil(rooms[a.id][k] / 2); }, 0);
      if (a.claimed > a.block_size) throw new Error('como seed: ' + a.name + ' needs ' + a.claimed + ' rooms, block is ' + a.block_size);
    });
  })('co-h1', {});

  /* ---------- vendors (all invented except the venue; the venue row carries invented prices and contract terms,
     and no reply times, commissions or internal notes) ---------- */
  function V(id, name, category, contact, status, contract, conf, arrival, extra) {
    return Object.assign({ id: 'co-v' + id, wedding_id: W, name: name, category: category, contact: contact, status: status, contract_eur: contract,
      insurance_ok: true, nda_signed: true, relationship: 'none', commission_pct: 0, avg_reply_hours: null, internal_notes: '',
      confirmations: conf, arrival_time: arrival, client_visible: true, updated_at: '2027-05-14' }, extra || {});
  }
  var ok = { time: true, headcount: true, dietary: true, payment: true };
  var vendors = [
    V('01', 'Villa Erba', 'Venue', 'Events office', 'confirmed', 95000, ok, 'Access from Thu 10 Jun, 08:00', { real: true, nda_signed: false, insurance_ok: true }),
    V('02', 'Cucina Alta Lago', 'Catering & bar', 'Chef Bruno Salvi', 'confirmed', 125500, ok, 'Sat 09:00, kitchen tent', { avg_reply_hours: 6 }),
    V('03', 'Petalo Nero Studio', 'Florals & design', 'Ginevra Aldi', 'confirmed', 92000, ok, 'Fri 07:00, two trucks', { avg_reply_hours: 9 }),
    V('04', 'Luce Ferma Production', 'Production & lighting', 'Dario Monti', 'contracted', 74500, { time: true, headcount: true, dietary: true, payment: false }, 'Thu 08:00 load-in', { avg_reply_hours: 41, internal_notes: 'Slow in May. Owner answers faster than the project manager.' }),
    V('05', 'Orchestra Fiato Lungo', 'Music & entertainment', 'Luca Ferri', 'contracted', 32000, { time: true, headcount: false, dietary: false, payment: true }, 'Sat 15:00 soundcheck', { avg_reply_hours: 20 }),
    V('06', 'Quartetto Riva Scura', 'Music & entertainment', 'Anna Conti', 'confirmed', 4800, ok, 'Sat 16:00', { avg_reply_hours: 5 }),
    V('07', 'Tommaso V.', 'Music & entertainment', 'Tommaso Villa', 'confirmed', 5500, ok, 'Sat 22:30', { avg_reply_hours: 12 }),
    V('08', 'Studio Ombra e Sole', 'Photo & film', 'Marta Greco', 'confirmed', 26000, ok, 'Fri 17:00', { avg_reply_hours: 8, relationship: 'preferred', internal_notes: 'Fourth wedding together.' }),
    V('09', 'Ventotto Films', 'Photo & film', 'Paolo Rinaldi', 'confirmed', 22000, ok, 'Fri 17:00', { avg_reply_hours: 10 }),
    V('10', 'Noleggio Bellavista', 'Florals & design', 'Rentals desk', 'confirmed', 31000, ok, 'Thu 10:00 delivery', { avg_reply_hours: 14 }),
    V('11', 'Motoscafi Tre Rive', 'Transport', 'Captain Enzo Riva', 'contracted', 21000, { time: false, headcount: true, dietary: true, payment: true }, 'Fri 18:00 first run', { avg_reply_hours: 30 }),
    V('12', 'Linea Verde Coaches', 'Transport', 'Dispatch', 'confirmed', 13500, ok, 'Fri 17:30', { avg_reply_hours: 7 }),
    V('13', 'Carta Fina Press', 'Stationery', 'Irene Bassi', 'contracted', 12400, { time: false, headcount: true, dietary: true, payment: true }, 'Delivery Wed 9 Jun', { avg_reply_hours: 16 }),
    V('14', 'Salone Aurelia', 'Beauty & attire', 'Aurelia Neri', 'contracted', 7200, { time: false, headcount: true, dietary: true, payment: true }, 'Sat 09:30 at the hotel', { avg_reply_hours: 11 }),
    V('15', 'Tende Alpine', 'Production & lighting', 'Sales office', 'quote', 0, { time: false, headcount: false, dietary: true, payment: false }, 'Hold until 21 May', { avg_reply_hours: 26, nda_signed: false, insurance_ok: false, internal_notes: 'Tent hold: decision with the couple.' })
  ];

  /* ---------- budget: [id, category, label, allocated, estimate, contracted, vendor, event, flags] ---------- */
  function B(id, category, label, allocated, estimate, contracted, vendor, event, extra) {
    return Object.assign({ id: 'co-b' + id, wedding_id: W, category: category, label: label, allocated: allocated, estimate: estimate, contracted: contracted,
      vendor_id: vendor ? 'co-v' + vendor : null, event_id: event ? 'co-e' + event : null, often_forgotten: false, includes: '', internal_notes: '',
      client_visible: true, updated_at: '2027-05-10' }, extra || {});
  }
  var budget_lines = [
    B('01', 'Venue', 'Villa Erba, three days', 95000, 95000, 95000, '01', null, { includes: 'The historic villa, its park and private dock' }),
    B('02', 'Venue', 'Villa staffing and clean-down', 8000, 8000, 8000, '01'),
    B('03', 'Catering & bar', 'Wedding dinner for 150', 46500, 46500, 46500, '02', '4', { includes: 'Four courses, EUR 310 a head, service staff' }),
    B('04', 'Catering & bar', 'Welcome dinner', 28000, 28000, 28000, '02', '2'),
    B('05', 'Catering & bar', 'Wines, champagne and open bar', 26000, 26000, 26000, '02', '4'),
    B('06', 'Catering & bar', 'Farewell brunch at Villa d\'Este', 11500, 11500, 11500, null, '6', { includes: 'Served by the hotel' }),
    B('07', 'Catering & bar', 'Family lunch and after-party food', 8000, 8000, 8000, '02', '5'),
    B('08', 'Catering & bar', 'Supplier meals', 2400, 2400, 2400, '02', '4', { often_forgotten: true, includes: '62 crew over two days' }),
    B('09', 'Catering & bar', 'Late-night food at 00:30', 3100, 3100, 0, '02', '5', { includes: 'Choice pending' }),
    B('10', 'Florals & design', 'Ceremony and dinner florals', 70000, 78000, 78000, '03', '4', { includes: 'Includes the aisle meadow approved in March' }),
    B('11', 'Florals & design', 'Welcome dinner styling', 14000, 14000, 14000, '03', '2'),
    B('12', 'Florals & design', 'Tables, chairs, linen, glassware', 31000, 31000, 31000, '10', '4'),
    B('13', 'Production & lighting', 'Lighting, sound and power', 50000, 58000, 58000, '04', '4', { often_forgotten: true, includes: 'Two generators, festoon and pin-spot lighting, speech microphones' }),
    B('14', 'Production & lighting', 'Dance floor and staging', 16500, 16500, 16500, '04', '4'),
    B('15', 'Production & lighting', 'Rain plan: clear-span tent on hold', 0, 12000, 0, '15', '4', { includes: 'Only if the tent is confirmed by 21 May' }),
    B('16', 'Music & entertainment', 'Twelve-piece band', 32000, 32000, 32000, '05', '4'),
    B('17', 'Music & entertainment', 'String quartet for the ceremony', 4800, 4800, 4800, '06', '3'),
    B('18', 'Music & entertainment', 'DJ for the after-party', 5500, 5500, 5500, '07', '5'),
    B('19', 'Music & entertainment', 'SIAE music licence, bought by the couple', 400, 385, 385, null, '4', { often_forgotten: true, includes: 'Published tariff under 200 guests, live and recorded music: EUR 384.73' }),
    B('20', 'Photo & film', 'Photography, two days', 26000, 26000, 26000, '08'),
    B('21', 'Photo & film', 'Film, two days', 22000, 22000, 22000, '09'),
    B('22', 'Guest hospitality', 'Hosted rooms for family and wedding party', 36000, 36000, 36000, null, null, { includes: 'Rooms at Villa d\'Este: two nights, three for the parents and Eleanor Bennett' }),
    B('23', 'Guest hospitality', 'Welcome bags and hospitality desks', 11000, 11000, 11000),
    B('24', 'Transport', 'Boats for all lake transfers', 21000, 21000, 21000, '11'),
    B('25', 'Transport', 'Coaches and cars', 13500, 13500, 13500, '12'),
    B('26', 'Stationery', 'Invitations and day-of paper', 12400, 12400, 12400, '13'),
    B('27', 'Beauty & attire', 'Hair and make-up team', 7200, 7200, 7200, '14'),
    B('28', 'Planning fee', 'VKRI planning and on-site team', 70500, 70500, 70500, null, null, { includes: 'Flat fee. It does not change with your budget.' }),
    B('29', 'Contingency', 'Gratuities', 0, 6000, 0, null, null, { often_forgotten: true }),
    B('30', 'Contingency', 'Overtime after 01:00', 0, 3500, 0, null, '5', { often_forgotten: true }),
    B('31', 'Contingency', 'Bank and currency fees', 0, 2500, 0, null, null, { often_forgotten: true })
  ];
  /* The reserve takes whatever is left, so allocations always add up to the envelope exactly. */
  var allocatedSoFar = budget_lines.reduce(function (s, l) { return s + l.allocated; }, 0);
  budget_lines.push(B('32', 'Contingency', 'Unallocated reserve', wedding.envelope_eur - allocatedSoFar, 0, 0, null, null, { includes: 'What is left of the original reserve' }));
  /* A vendor's contract value is the sum of its contracted lines. */
  vendors.forEach(function (v) {
    v.contract_eur = budget_lines.reduce(function (s, l) { return s + (l.vendor_id === v.id ? l.contracted : 0); }, 0);
  });

  var change_orders = [
    { id: 'co-co1', wedding_id: W, budget_line_id: 'co-b10', title: 'Aisle meadow installation', delta_eur: 8000, reason: 'Olivia asked for planted borders along the aisle after the sample table.', proposed_by: 'u_riccardo', proposed_at: '2027-03-09T10:00:00Z', status: 'approved', decided_at: '2027-03-11T22:15:00Z', decided_by: 'c_como', alternatives: 'Potted borders on hire: EUR 3,200' },
    { id: 'co-co2', wedding_id: W, budget_line_id: 'co-b13', title: 'Second generator for the dance floor', delta_eur: 8000, reason: 'The production partner\'s power survey showed one generator cannot carry the band and the lighting together.', proposed_by: 'u_matteo', proposed_at: '2027-04-20T09:00:00Z', status: 'approved', decided_at: '2027-04-21T23:40:00Z', decided_by: 'c_como', alternatives: 'Reduce festoon lighting by half: saves EUR 5,500' },
    { id: 'co-co3', wedding_id: W, budget_line_id: 'co-b24', title: 'Second boat for late departures', delta_eur: 2400, reason: 'The after-party has 84 yes replies. One boat means a 35-minute wait at 02:00.', proposed_by: 'u_matteo', proposed_at: '2027-05-13T15:00:00Z', status: 'pending', decided_at: null, decided_by: null, alternatives: 'Keep one boat and add a coach from the land gate: EUR 900', task_id: taskId('Second boat for late departures') },
    { id: 'co-co4', wedding_id: W, budget_line_id: 'co-b13', title: 'Fireworks over the lake', delta_eur: 14000, reason: 'Raised by Catherine after the site visit.', proposed_by: 'u_sonia', proposed_at: '2027-02-02T10:00:00Z', status: 'declined', decided_at: '2027-02-04T20:00:00Z', decided_by: 'c_como', alternatives: '' }
  ];

  /* ---------- invoices: generated from a schedule per line ---------- */
  var invoices = [], inv = 0;
  function I(line, vendor, payer, parts) {
    parts.forEach(function (p) {
      inv++;
      invoices.push({ id: 'co-i' + String(inv).padStart(2, '0'), wedding_id: W, number: 'CAM-' + String(1000 + inv), vendor_id: vendor ? 'co-v' + vendor : null,
        budget_line_id: 'co-b' + line, amount_eur: p[0], due: p[1], status: p[2], paid_at: p[2] === 'paid' ? p[1] : null, payer_id: payer, covers: p[3], method: 'Bank transfer' });
    });
  }
  I('01', '01', 'co-pay2', [[28500, '2026-07-28', 'paid', 'Villa hire: deposit 30%'], [38000, '2027-01-15', 'paid', 'Villa hire: second instalment 40%'], [28500, '2027-06-01', 'upcoming', 'Villa hire: balance 30%']]);
  I('02', '01', 'co-pay2', [[8000, '2027-06-01', 'upcoming', 'Villa staffing and clean-down']]);
  I('03', '02', 'co-pay2', [[18600, '2027-02-01', 'paid', 'Wedding dinner: deposit 40%'], [27900, '2027-06-01', 'upcoming', 'Wedding dinner: balance on final headcount']]);
  I('04', '02', 'co-pay2', [[14000, '2027-02-01', 'paid', 'Welcome dinner: deposit 50%'], [14000, '2027-06-01', 'upcoming', 'Welcome dinner: balance']]);
  I('05', '02', 'co-pay2', [[13000, '2027-02-01', 'paid', 'Wines and bar: deposit 50%'], [13000, '2027-06-01', 'upcoming', 'Wines and bar: balance']]);
  I('06', null, 'co-pay3', [[11500, '2027-05-20', 'due', 'Farewell brunch at Villa d\'Este, in full']]);
  I('07', '02', 'co-pay2', [[8000, '2027-06-01', 'upcoming', 'Family lunch and after-party food']]);
  I('08', '02', 'co-pay2', [[2400, '2027-06-01', 'upcoming', 'Supplier meals: 62 crew over two days']]);
  I('19', null, 'co-pay1', [[385, '2027-03-31', 'paid', 'SIAE music licence, bought by Olivia']]);
  I('10', '03', 'co-pay1', [[21000, '2026-12-01', 'paid', 'Florals: deposit 30%'], [31200, '2027-04-01', 'paid', 'Florals: second instalment 40%, with the aisle meadow'], [25800, '2027-05-28', 'upcoming', 'Florals: balance, with the aisle meadow']]);
  I('11', '03', 'co-pay1', [[7000, '2027-04-01', 'paid', 'Welcome dinner styling: 50%'], [7000, '2027-05-28', 'upcoming', 'Welcome dinner styling: balance']]);
  I('12', '10', 'co-pay1', [[15500, '2027-03-01', 'paid', 'Rentals: deposit 50%'], [15500, '2027-05-25', 'upcoming', 'Rentals: balance']]);
  I('13', '04', 'co-pay1', [[25000, '2027-02-15', 'paid', 'Lighting, sound and power: deposit'], [16500, '2027-05-20', 'due', 'Lighting, sound and power: second instalment'], [16500, '2027-06-05', 'upcoming', 'Lighting, sound and power: balance']]);
  I('14', '04', 'co-pay1', [[8250, '2027-02-15', 'paid', 'Dance floor and staging: 50%'], [8250, '2027-06-05', 'upcoming', 'Dance floor and staging: balance']]);
  I('16', '05', 'co-pay1', [[16000, '2026-12-15', 'paid', 'Band: deposit 50%'], [16000, '2027-06-01', 'upcoming', 'Band: balance']]);
  I('17', '06', 'co-pay1', [[4800, '2027-04-15', 'paid', 'String quartet, in full']]);
  I('18', '07', 'co-pay1', [[2750, '2027-03-01', 'paid', 'DJ: deposit 50%'], [2750, '2027-06-01', 'upcoming', 'DJ: balance']]);
  I('20', '08', 'co-pay1', [[13000, '2026-12-20', 'paid', 'Photography: deposit 50%'], [13000, '2027-06-01', 'upcoming', 'Photography: balance']]);
  I('21', '09', 'co-pay1', [[11000, '2026-12-20', 'paid', 'Film: deposit 50%'], [11000, '2027-06-01', 'upcoming', 'Film: balance']]);
  I('22', null, 'co-pay1', [[18000, '2027-01-22', 'paid', 'Hosted rooms: deposit 50%'], [18000, '2027-05-27', 'upcoming', 'Hosted rooms: balance']]);
  I('23', null, 'co-pay1', [[5500, '2027-04-10', 'paid', 'Welcome bags: materials'], [5500, '2027-06-04', 'upcoming', 'Welcome bags and hospitality desks: balance']]);
  I('24', '11', 'co-pay1', [[10500, '2027-02-20', 'paid', 'Boats: deposit 50%'], [10500, '2027-06-01', 'upcoming', 'Boats: balance']]);
  I('25', '12', 'co-pay1', [[6750, '2027-03-20', 'paid', 'Coaches and cars: deposit 50%'], [6750, '2027-06-01', 'upcoming', 'Coaches and cars: balance']]);
  I('26', '13', 'co-pay1', [[9300, '2026-11-10', 'paid', 'Invitations, printed and posted'], [3100, '2027-05-31', 'upcoming', 'Day-of paper: menus, escort cards, signage']]);
  I('27', '14', 'co-pay1', [[3600, '2027-04-20', 'paid', 'Hair and make-up: deposit 50%'], [3600, '2027-06-08', 'upcoming', 'Hair and make-up: balance']]);
  I('28', null, 'co-pay1', [[23500, '2026-06-15', 'paid', 'VKRI fee: first third'], [23500, '2026-12-15', 'paid', 'VKRI fee: second third'], [23500, '2027-05-31', 'upcoming', 'VKRI fee: final third']]);

  /* ---------- decisions ---------- */
  function opt(id, name, vendor, price, includes, extra) { return Object.assign({ id: id, name: name, vendor: vendor, price_eur: price, includes: includes, relationship: 'No commission or referral fee' }, extra || {}); }
  var decisions = [
    { id: 'co-d01', wedding_id: W, kind: 'choice', title: 'Rain plan for Saturday dinner', why_now: 'The tent supplier holds the structure until Friday 21 May. After that it goes to another event.',
      deadline: '2027-05-21', release_date: '2027-05-10', status: 'open', delegable: false, budget_line_id: 'co-b15', task_id: taskId('Rain plan'), risk_id: 'co-r1',
      options: [
        opt('a', 'Hold the clear-span tent', 'Tende Alpine', 12000, 'Transparent roof over the long tables. You keep the trees and the sky. Charged only if built; EUR 3,000 hold fee if not.', { brief_ref: 'Keeps "a garden at dusk" even in rain' }),
        opt('b', 'Move dinner inside the villa', 'Villa Erba', 0, 'Ground-floor rooms, round tables. No long tables, no garden.', { brief_ref: 'Breaks "not a ballroom"' })
      ], recommended_option_id: 'a', recommendation_reason: 'The nearest long-run record, Lugano, gives June about ten rain days. The tent keeps the design you chose; moving inside changes it.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'If they choose dinner inside the villa, Riccardo must redo the floor plan by 25 May.' },
    { id: 'co-d02', wedding_id: W, kind: 'choice', title: 'Late-night food at 00:30', why_now: 'The caterer orders ingredients on 25 May.',
      deadline: '2027-05-24', release_date: '2027-05-12', status: 'open', delegable: true, budget_line_id: 'co-b09', task_id: taskId('Late-night food choice'),
      options: [
        opt('a', 'Pizza al taglio from a wood oven', 'Cucina Alta Lago', 2800, 'Four kinds, served from boards on the dance floor.'),
        opt('b', 'Truffle toasties and fries', 'Cucina Alta Lago', 3400, 'Passed in paper cones.', { brief_ref: 'Food and wine is your second priority' }),
        opt('c', 'Gelato cart', 'Cucina Alta Lago', 2200, 'Six flavours, cones and cups.')
      ], recommended_option_id: 'a', recommendation_reason: 'It is what guests eat fastest while still dancing, and it suits the after-party indoors.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'co-d03', wedding_id: W, kind: 'proof', title: 'Seating chart, proof 3: family tables', why_now: 'Escort cards go to print on 24 May.',
      deadline: '2027-05-20', release_date: '2027-05-14', status: 'open', delegable: false, budget_line_id: null, document_id: 'co-doc09', task_id: taskId('Seating chart v3'),
      options: [
        opt('approve', 'Approve proof 3', '', null, 'Tables 1 to 4 as drawn. Nothing prints without your approval.'),
        opt('changes', 'Ask for changes', '', null, 'Tell us what to move and we send proof 4 within a day.')
      ], recommended_option_id: 'approve', recommendation_reason: 'Proof 3 follows everything you told us about the family tables.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'Richard table 1, Catherine table 3. Do not mention why in the client note.' },
    { id: 'co-d04', wedding_id: W, kind: 'choice', title: 'Band set list: first dance and last song', why_now: 'The band needs two weeks to arrange a first dance.',
      deadline: '2027-05-28', release_date: '2027-05-21', status: 'queued', delegable: false, budget_line_id: null, options: [
        opt('a', 'Send us your two songs', '', null, 'We pass them to the band leader with your notes.'), opt('b', 'Ask the band to propose three', '', null, 'They send recordings.')
      ], recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'co-d05', wedding_id: W, kind: 'choice', title: 'Departure gifts at the brunch', why_now: 'Twelve days to label, print and pack before the brunch.',
      deadline: '2027-06-01', release_date: '2027-05-24', status: 'queued', delegable: true, budget_line_id: 'co-b23', options: [
        opt('a', 'Olive oil from the lake, hand-labelled', '', 1900, '150 bottles'), opt('b', 'A printed photograph from Saturday', '', 2600, 'Printed overnight, in a card sleeve')
      ], recommended_option_id: 'b', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'co-d06', wedding_id: W, kind: 'choice', title: 'Venue', why_now: '', deadline: '2026-07-27', release_date: '2026-07-17', status: 'decided', delegable: false, budget_line_id: 'co-b01',
      options: [opt('a', 'Villa Erba, Cernobbio', '', 95000, 'A historic villa in a park on the lake, with its own dock'), opt('b', 'A hotel terrace with a private wing', '', 78000, 'Easier logistics, shared with hotel guests'), opt('c', 'A hilltop villa above the lake', '', 64000, 'No boat arrival')],
      recommended_option_id: 'a', recommendation_reason: 'The only one where every guest arrives by boat.', chosen_option_id: 'a', decided_at: '2026-07-24T17:00:00Z', decided_by: 'c_como', internal_notes: '' },
    { id: 'co-d07', wedding_id: W, kind: 'choice', title: 'Caterer', why_now: '', deadline: '2026-11-06', release_date: '2026-10-20', status: 'decided', delegable: false, budget_line_id: 'co-b03',
      options: [opt('a', 'Cucina Alta Lago', 'Cucina Alta Lago', 46500, 'EUR 310 a head, four courses'), opt('b', 'A Milan restaurant group', '', 52500, 'EUR 350 a head, five courses'), opt('c', 'A caterer from Como', '', 40500, 'EUR 270 a head, three courses')],
      recommended_option_id: 'a', recommendation_reason: 'Best tasting of the three and the only one that cooks on site.', chosen_option_id: 'a', decided_at: '2026-11-02T23:10:00Z', decided_by: 'c_como', internal_notes: '' },
    { id: 'co-d08', wedding_id: W, kind: 'choice', title: 'Floral studio', why_now: '', deadline: '2026-11-27', release_date: '2026-11-10', status: 'decided', delegable: false, budget_line_id: 'co-b10',
      options: [opt('a', 'Studio one: structured, architectural', '', 62000, ''), opt('b', 'Petalo Nero Studio: loose, garden-grown', 'Petalo Nero Studio', 70000, ''), opt('c', 'Studio three: classic, all-white', '', 58000, '', { brief_ref: 'On your never-list' })],
      recommended_option_id: 'b', recommendation_reason: 'The only sample table that looked picked from a garden.', chosen_option_id: 'b', decided_at: '2026-11-20T21:30:00Z', decided_by: 'c_como', internal_notes: '' },
    { id: 'co-d09', wedding_id: W, kind: 'choice', title: 'Band', why_now: '', deadline: '2026-12-04', release_date: '2026-11-20', status: 'decided', delegable: false, budget_line_id: 'co-b16',
      options: [opt('a', 'Orchestra Fiato Lungo, twelve players', 'Orchestra Fiato Lungo', 32000, ''), opt('b', 'Eight-piece soul band', '', 24000, ''), opt('c', 'Six-piece with DJ hybrid', '', 17500, '')],
      recommended_option_id: 'a', recommendation_reason: 'Henry asked for horns.', chosen_option_id: 'a', decided_at: '2026-11-29T19:00:00Z', decided_by: 'c_como', internal_notes: '' },
    { id: 'co-d10', wedding_id: W, kind: 'choice', title: 'Welcome bag contents', why_now: '', deadline: '2027-04-05', release_date: '2027-03-25', status: 'delegated', delegable: true, budget_line_id: 'co-b23',
      options: [opt('a', 'Local: amaretti, lake map, linen fan', '', 8800, ''), opt('b', 'Practical: water, sunscreen, blister kit, itinerary', '', 7400, '')],
      recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: '2027-03-27T20:00:00Z', decided_by: 'c_como', internal_notes: 'We chose the local bag, plus the blister kit.' }
  ];

  /* ---------- documents and links ---------- */
  var d = 0;
  function D(type, category, title, url, extra) {
    d++;
    return Object.assign({ id: 'co-doc' + String(d).padStart(2, '0'), wedding_id: W, type: type, category: category, title: title, url: url,
      version: 1, status: 'signed', added_by: 'u_elena', added_at: '2027-03-31', client_visible: true }, extra || {});
  }
  var U = 'https://example.com/camelia/';
  var documents = [
    D('contract', 'Contracts', 'Planning agreement with VKRI', U + 'planning-agreement.pdf', { added_at: '2026-06-15' }),
    D('contract', 'Contracts', 'Villa Erba hire agreement', U + 'villa-contract.pdf', { added_at: '2026-07-28' }),
    D('contract', 'Contracts', 'Catering contract and final menu', U + 'catering.pdf', { version: 3 }),
    D('contract', 'Contracts', 'Florals and rentals', U + 'florals.pdf', { version: 2 }),
    D('contract', 'Contracts', 'Production, lighting and power', U + 'production.pdf', { version: 2 }),
    D('contract', 'Contracts', 'Band, quartet and DJ', U + 'music.pdf'),
    D('contract', 'Contracts', 'Photography and film', U + 'photo-film.pdf'),
    D('plan', 'Design', 'Design deck, version 4', U + 'design-deck-v4.pdf', { version: 4, status: 'approved', added_by: 'u_riccardo' }),
    D('proof', 'Design', 'Seating chart, proof 3', U + 'seating-proof-3.pdf', { version: 3, status: 'awaiting approval', added_by: 'u_sonia', added_at: '2027-05-14' }),
    D('plan', 'Design', 'Floor plan, version 6', U + 'floor-plan-v6.pdf', { version: 6, status: 'approved', added_by: 'u_matteo' }),
    D('proof', 'Design', 'Menus and escort cards, proof 2', U + 'paper-proof-2.pdf', { version: 2, status: 'approved', added_by: 'u_riccardo', added_at: '2027-05-07' }),
    D('link', 'Design', 'Moodboard', 'https://example.com/boards/camelia', { status: 'shared', added_by: 'u_riccardo' }),
    D('plan', 'Guests & travel', 'Guest travel guide', U + 'travel-guide.pdf', { status: 'shared' }),
    D('plan', 'Guests & travel', 'Rooming list by hotel', U + 'rooming-list.xlsx', { version: 5, status: 'shared', added_at: '2027-05-12' }),
    D('plan', 'Guests & travel', 'Transfer manifest, draft', U + 'manifest-draft.xlsx', { status: 'draft', client_visible: false, added_by: 'u_matteo', added_at: '2027-05-13' }),
    D('plan', 'Timeline', 'Run of show, version 3', U + 'run-of-show-v3.pdf', { version: 3, status: 'shared', added_by: 'u_matteo', added_at: '2027-05-10' }),
    D('plan', 'Timeline', 'Supplier contact sheet', U + 'contact-sheet.pdf', { status: 'internal', client_visible: false, added_by: 'u_matteo' }),
    D('legal', 'Legal paperwork', 'Passports: copies of both', U + 'paperwork', { status: 'done', due: '2026-10-01', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Ceremony documents collected', U + 'paperwork', { status: 'done', due: '2027-04-14', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Translations ordered', U + 'paperwork', { status: 'done', due: '2027-04-14', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Appointment booked', U + 'paperwork', { status: 'done', due: '2027-04-30', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Ceremony text agreed with Julian Reyes', U + 'paperwork', { status: 'done', due: '2027-05-07', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Keepsake certificate for signing at the ceremony', U + 'paperwork', { status: 'todo', due: '2027-06-09', owner_id: 'u_sonia' }),
    D('legal', 'Legal paperwork', 'Certificate copies requested', U + 'paperwork', { status: 'todo', due: '2027-06-30', owner_id: 'u_elena' }),
    D('link', 'Links', 'Wedding website', 'https://example.com/olivia-and-henry', { status: 'shared', added_by: 'c_como', added_at: '2026-11-15' }),
    D('link', 'Links', 'Shared photo album', 'https://example.com/albums/camelia', { status: 'shared', added_by: 'c_como', added_at: '2027-02-02' }),
    D('link', 'Links', 'Dance floor playlist', 'https://example.com/playlists/camelia', { status: 'shared', added_by: 'c_como', added_at: '2027-04-18' }),
    D('link', 'Links', 'Dress fittings calendar', 'https://example.com/calendar/fittings', { status: 'shared', added_by: 'c_como', added_at: '2027-03-03' })
  ];

  /* ---------- risks and Plan B ---------- */
  var risks = [
    { id: 'co-r1', wedding_id: W, title: 'Rain on Saturday evening', likelihood: 'Medium', impact: 'High', trigger: 'Forecast above 40% at 72 hours', plan_b: 'Clear-span tent over the long tables, or dinner inside the villa', owner_id: 'u_matteo', status: 'Decision with the couple', client_visible: true },
    { id: 'co-r2', wedding_id: W, title: 'Wind stops the boats', likelihood: 'Low', impact: 'High', trigger: 'Boat company call at 15:00 each day', plan_b: 'Coaches to the land gate, on standby both evenings', owner_id: 'u_matteo', status: 'Covered', client_visible: true },
    { id: 'co-r3', wedding_id: W, title: 'Heat during the 17:00 ceremony', likelihood: 'Medium', impact: 'Medium', trigger: 'Above 29 C at noon', plan_b: 'Parasols, fans and chilled water at every row; ceremony kept to 35 minutes', owner_id: 'u_sonia', status: 'Covered', client_visible: true },
    { id: 'co-r4', wedding_id: W, title: 'Power fails under band and lighting load', likelihood: 'Low', impact: 'High', trigger: 'Generator load test', plan_b: 'Second generator contracted; load test still to be done', owner_id: 'u_matteo', status: 'Open: test overdue', client_visible: false },
    { id: 'co-r5', wedding_id: W, title: 'Band flights delayed on Saturday', likelihood: 'Low', impact: 'Medium', trigger: 'Arrival after 13:00', plan_b: 'Band travels Friday; DJ covers the first set if needed', owner_id: 'u_sonia', status: 'Covered', client_visible: false }
  ];

  /* ---------- messages from the couple (reply-time trail) ---------- */
  var messages = [
    { id: 'co-m1', wedding_id: W, from_user_id: 'c_como', channel: 'whatsapp', subject: 'First dance: can the band play it slower?', body: 'Henry wants the first dance at about 80 bpm, slower than the recording. Can the band arrange that, and can we hear it before the day?',
      received_at: '2027-05-16T22:40:00Z', due_by: '2027-05-17T22:40:00Z', acknowledged_at: '2027-05-17T07:05:00Z', answered_at: null, answer: '', answered_by: null, owner_id: 'u_sonia', internal_notes: 'Band leader is slow to reply. Call him.' },
    { id: 'co-m2', wedding_id: W, from_user_id: 'c_como', channel: 'portal', subject: 'Is the tent price the full price?', body: 'Does EUR 12,000 include flooring and lighting inside the tent, or is that extra?',
      received_at: '2027-05-17T01:15:00Z', due_by: '2027-05-18T01:15:00Z', acknowledged_at: null, answered_at: null, answer: '', answered_by: null, owner_id: null, internal_notes: '' },
    { id: 'co-m3', wedding_id: W, from_user_id: 'c_como', channel: 'whatsapp', subject: 'Grandmother and the boats', body: 'My grandmother cannot manage the boat. Can she be driven to the villa instead?',
      received_at: '2027-05-14T20:30:00Z', due_by: '2027-05-15T20:30:00Z', acknowledged_at: '2027-05-14T20:52:00Z', answered_at: '2027-05-15T09:10:00Z', answer: 'Yes. A car will take her to the land gate and Elena will walk with her to her seat. Her room at the hotel is on the ground floor.', answered_by: 'u_sonia', owner_id: 'u_sonia', internal_notes: '' },
    { id: 'co-m4', wedding_id: W, from_user_id: 'c_como', channel: 'email', subject: 'Invoice CAM-1023: what is the second instalment for?', body: 'Henry asks what the second production instalment covers.',
      received_at: '2027-05-11T14:00:00Z', due_by: '2027-05-12T14:00:00Z', acknowledged_at: '2027-05-11T14:20:00Z', answered_at: '2027-05-11T16:45:00Z', answer: 'It covers the second generator and the festoon lighting, approved on 21 April. The quote is attached to the invoice in your folder.', answered_by: 'u_elena', owner_id: 'u_elena', internal_notes: '' },
    { id: 'co-m5', wedding_id: W, from_user_id: 'c_como', channel: 'portal', subject: 'Can we add two guests?', body: 'Two friends can now come. Is it too late?',
      received_at: '2027-05-06T23:30:00Z', due_by: '2027-05-07T23:30:00Z', acknowledged_at: '2027-05-07T07:30:00Z', answered_at: '2027-05-07T11:00:00Z', answer: 'Not too late. Both added, with rooms at the group rate and seats at table 18. The caterer charges EUR 310 each; your forecast is updated.', answered_by: 'u_elena', owner_id: 'u_elena', internal_notes: '' },
    { id: 'co-m6', wedding_id: W, from_user_id: 'c_como', channel: 'whatsapp', subject: 'Candle height on the long tables', body: 'Olivia thinks the tall candles block the view across the table.',
      received_at: '2027-04-29T21:10:00Z', due_by: '2027-04-30T21:10:00Z', acknowledged_at: '2027-04-29T21:40:00Z', answered_at: '2027-04-30T17:20:00Z', answer: 'Agreed on site today: candles are 5 cm shorter. Photo attached to the design deck.', answered_by: 'u_riccardo', owner_id: 'u_riccardo', internal_notes: '' }
  ];

  /* ---------- Friday letters ---------- */
  var weekly_recaps = [
    { id: 'co-w1', wedding_id: W, week_of: '2027-04-30', author_id: 'u_sonia', status: 'sent', sent_at: '2027-04-30T16:00:00Z',
      done: ['Sample table approved on site', 'Dietary sheet checked line by line with the caterer', 'Lighting plot and power plan signed off'],
      in_motion: ['Stationery proofs', 'Boat and coach plan'], waiting_on: [{ item: 'Room confirmations from one hotel', who: 'Hotel reservations', since: '2027-04-26' }],
      needs_you: [] , budget_note: 'Forecast unchanged.' },
    { id: 'co-w2', wedding_id: W, week_of: '2027-05-07', author_id: 'u_sonia', status: 'sent', sent_at: '2027-05-07T16:00:00Z',
      done: ['Floor plan version 6', 'Menus and escort cards approved', 'Every arrival has a boat or a coach'],
      in_motion: ['Seating chart', 'Supplier confirmations'], waiting_on: [{ item: 'Generator load test', who: 'Production partner', since: '2027-05-05' }],
      needs_you: [], budget_note: 'Two guests added: forecast up EUR 620.' },
    { id: 'co-w3', wedding_id: W, week_of: '2027-05-14', author_id: 'u_sonia', status: 'sent', sent_at: '2027-05-14T16:00:00Z',
      done: ['RSVPs closed: 144 yes', 'Rooms and transfers assigned for every confirmed guest', 'Nine of fifteen suppliers fully confirmed'],
      in_motion: ['Remaining six supplier confirmations', 'Run of show version 4', 'Final balances to both payers'],
      waiting_on: [{ item: 'Generator load test', who: 'Production partner', since: '2027-05-05' }, { item: 'Band meal count', who: 'Band leader', since: '2027-05-12' }],
      needs_you: [{ text: 'Rain plan: tent or inside the villa', due: '2027-05-21' }, { text: 'Seating chart, proof 3', due: '2027-05-20' }, { text: 'Late-night food', due: '2027-05-24' }],
      budget_note: 'Forecast is inside your envelope. One change waits for you: a second boat, EUR 2,400.' },
    { id: 'co-w4', wedding_id: W, week_of: '2027-05-21', author_id: 'u_sonia', status: 'draft', sent_at: null,
      done: ['A car to the land gate for your grandmother, instead of the boat', 'Her room at Villa d\'Este is on the ground floor'],
      in_motion: ['Supplier confirmations: band, boats, stationery, hair and make-up', 'Run of show version 4'],
      waiting_on: [{ item: 'Generator load test', who: 'Production partner', since: '2027-05-05' }],
      needs_you: [{ text: 'Second boat for late departures, EUR 2,400', due: '2027-05-18' }, { text: 'Seating chart, proof 3', due: '2027-05-20' },
        { text: 'Rain plan: tent or inside the villa', due: '2027-05-21' }, { text: 'Late-night food', due: '2027-05-24' }],
      budget_note: 'Forecast is inside your envelope. One change waits for you: a second boat, EUR 2,400.' }
  ];

  var activity_log = [
    ['2027-05-17T07:05:00Z', 'u_sonia', 'acknowledged "First dance: can the band play it slower?"'],
    ['2027-05-16T08:50:00Z', 'u_elena', 'confirmed the car transfer for Eleanor Bennett'],
    ['2027-05-14T16:40:00Z', 'u_matteo', 'marked "Generator load test" as blocked'],
    ['2027-05-14T16:00:00Z', 'u_sonia', 'sent the Friday letter'],
    ['2027-05-14T14:00:00Z', 'u_elena', 'closed the guest list at 144 confirmed'],
    ['2027-05-13T15:00:00Z', 'u_matteo', 'proposed a change: second boat for late departures'],
    ['2027-05-11T16:45:00Z', 'u_elena', 'answered "Invoice CAM-1023"'],
    ['2027-05-10T10:30:00Z', 'u_sonia', 'published the rain plan decision to the couple']
  ].map(function (a, i) { return { id: 'co-a' + (i + 1), wedding_id: W, at: a[0], user_id: a[1], text: a[2] }; });

  S.add({ weddings: [wedding], phases: ph.phases, subphases: ph.subphases, tasks: tasks, comments: comments, events: events,
    accommodations: accommodations, guests: gen.guests, guest_event_rsvps: gen.guest_event_rsvps, vendors: vendors,
    budget_lines: budget_lines, change_orders: change_orders, invoices: invoices, decisions: decisions, documents: documents,
    risks: risks, messages: messages, weekly_recaps: weekly_recaps, activity_log: activity_log });
})(typeof window !== 'undefined' ? window : globalThis);
