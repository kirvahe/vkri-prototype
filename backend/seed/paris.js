/* Seed: Paris, 27-29 August 2027. "Project Lumiere". The wedding with friction: florals reopened, forecast above the envelope.
   Real: the venue and hotel names, and the facts about them cited by source_ref from docs/venue-facts.md.
   Invented: every person, supplier, price, date and metric, including the prices and contract terms shown next to the real venue and hotels. */
(function (root) {
  'use strict';
  var VKRI = root.VKRI, S = VKRI.seed, W = 'paris';

  /* ---------- wedding card ---------- */
  var wedding = {
    id: W, code_name: 'Project Lumiere', title: 'Paris', destination: 'Paris, France', accent: 'lumiere',
    couple_names: 'Priya Raman & Alexander Sterling', partner_1: 'Priya Raman', partner_2: 'Alexander Sterling', short: 'Priya & Alexander',
    home_city: 'San Francisco, CA', home_tz: 'America/Los_Angeles', local_tz: 'Europe/Paris',
    venue: { name: 'Shangri-La Paris', town: 'Paris 16e', source_ref: 'F-PAR-01' },
    start_date: '2027-08-27', end_date: '2027-08-29', wedding_day: '2027-08-28',
    guest_target: 220, envelope_eur: 980000, vkri_fee_eur: 95000, display_currency: 'USD', fx_locked: 1.07, fx_today: 1.13,
    lead_id: 'u_camille', team_ids: ['u_camille', 'u_riccardo', 'u_matteo', 'u_elena', 'u_sonia'],
    ceremony_type: 'Symbolic ceremony joining both traditions: Hindu rites led by the Raman family priest, then vows led by a friend. In English, with the Sanskrit verses explained.',
    contacts: [
      { name: 'Priya Raman', role: 'Bride', email: 'priya@example.com', phone: '+1 415 555 0142', note: 'Leads design and the ceremony. Decides quickly when there is a recommendation.' },
      { name: 'Alexander Sterling', role: 'Groom', email: 'alexander@example.com', phone: '+1 415 555 0187', note: 'Leads budget, music and guest travel. Wants the arithmetic before a call.' },
      { name: 'Lakshmi Raman', role: 'Mother of the bride, payer', email: 'lakshmi.raman@example.com', phone: '+1 408 555 0126', note: 'Ceremony traditions and the sangeet. Prefers WhatsApp.' },
      { name: 'Suresh Raman', role: 'Father of the bride, payer', email: 'suresh.raman@example.com', phone: '+1 408 555 0131', note: 'Pays the venue, the Saturday dinner and the sangeet evening. Signs off above EUR 15,000 on his lines.' },
      { name: 'Charles Sterling', role: 'Father of the groom, payer', email: 'charles.sterling@example.com', phone: '+1 503 555 0164', note: 'Pays the bar, the brunch and transport, in US dollars. Wants each invoice shown in dollars at the day\'s rate.' },
      { name: 'Diane Sterling', role: 'Mother of the groom', email: 'diane.sterling@example.com', phone: '+1 503 555 0158', note: 'Hosting the farewell brunch.' },
      { name: 'Meera Raman', role: 'Sister of the bride, maid of honour', email: 'meera.raman@example.com', phone: '+1 646 555 0119', note: 'Runs the sangeet performances with her cousin Anjali.' }
    ],
    payers: [
      { id: 'pa-pay1', name: 'Priya & Alexander', relation: 'Couple', covers: 'Florals and rentals, lighting, the band, photo and film, hosted rooms, stationery, beauty, planning fee' },
      { id: 'pa-pay2', name: 'Suresh & Lakshmi Raman', relation: 'Parents of the bride', covers: 'Venue, Saturday dinner, the family lunch, the sangeet evening (food, styling, sound), the mandap and the ceremony musicians' },
      { id: 'pa-pay3', name: 'Diane & Charles Sterling', relation: 'Parents of the groom', covers: 'Wines and bar, the farewell brunch, airport transfers and evening shuttles. Pays in US dollars at the day\'s rate.' }
    ],
    decision_makers: 'Priya decides design and the ceremony. Alexander decides music, guest travel and money. Suresh and Charles each sign off changes above EUR 15,000 on the lines they pay. Lakshmi is consulted on the ceremony and the sangeet.',
    comms: {
      channel: 'WhatsApp group for quick questions; email for anything with a number in it',
      cadence: 'Friday letter every week; video call every second Thursday at 09:00 San Francisco time (18:00 in Paris)',
      hours: 'Weekdays from 08:00 Pacific. Weekends only if something has moved. Written replies are fine at any time; calls stay inside these hours.',
      tone: 'Warm and precise. Every number with what it includes. One recommendation.',
      do: ['Send the numbers to Alexander a day before any call about money', 'Give a price and what it includes with every option', 'Write family names and titles exactly as the families give them'],
      dont: ['Copy one family on the other family\'s payments', 'Call before 08:00 in San Francisco', 'Send more than three decisions in a week']
    },
    brief: {
      words: ['Two families, one weekend', 'Lit from within', 'Warm, not formal', 'Paris in the evening'],
      palette: 'Ivory and pale gold; since the April visit, jasmine white with marigold and saffron at the ceremony',
      never: ['A theme-party version of either tradition', 'Cold white ballroom light', 'Speeches longer than three minutes', 'A photo booth'],
      priorities: ['Both families feel equally at home', 'Food that is as good for the vegetarians as for everyone else', 'A dance floor that stays full, both nights']
    },
    must_haves: ['Hindu rites led by the Raman family priest, then vows the couple wrote themselves', 'Garland exchange at the mandap', 'Priya\'s grandmother seated where she sees everything, close to the mandap', 'Performances by both families at the sangeet', 'Vegetarian and Jain meals cooked with the same care as every other plate'],
    deal_breakers: ['Any supplier posting images without consent', 'A family name or title printed wrongly', 'Buffet queues at the Saturday dinner'],
    sensitivities: [
      'The floral change came from the family visit on 24 April. Never present it as the family\'s fault or as a cost problem in front of Lakshmi; numbers go to Priya and Alexander only.',
      'The two families pay separately. We send each family only its own invoices, and in conversation we never discuss one family\'s payments with the other.',
      'Kamala Raman, 86, uses a wheelchair for longer distances and speaks mainly Tamil. Her grandson Arjun translates for her. She sits in the front row, close to the mandap.',
      'Charles and Diane Sterling are careful with money and pay in dollars. Any budget movement goes to Alexander first, by call, before it appears in writing.'
    ],
    internal_notes: 'Priya decides fast once she has a recommendation; Alexander wants the arithmetic first. Send him the numbers the day before. The Sterling bar deposit is late: Elena handles it with Charles directly and does not raise it with Priya or Alexander.',
    photo_consent: 'private', photo_consent_at: '2026-10-02T17:00:00Z',
    scope: [
      { name: 'Venue search and negotiation', status: 'done' }, { name: 'Design concept and moodboard', status: 'in_progress' },
      { name: 'Supplier sourcing: three options per category', status: 'done' }, { name: 'Contract review and payment schedule', status: 'in_progress' },
      { name: 'Budget management with weekly forecast', status: 'in_progress' }, { name: 'Guest list, RSVP and travel desk, including invitation letters for visas', status: 'in_progress' },
      { name: 'Room blocks and transfers', status: 'in_progress' }, { name: 'Production schedule and run of show', status: 'in_progress' },
      { name: 'Ceremony planning with the family priest and the friend leading the vows', status: 'in_progress' }, { name: 'On-site team for four days: five planners and two assistants', status: 'upcoming' },
      { name: 'Supplier settlement and final account', status: 'upcoming' }, { name: 'Gallery delivery and thank-you notes', status: 'upcoming' }
    ],
    milestones: [
      { date: '2026-09-18', label: 'Venue contract signed', kind: 'contract' },
      { date: '2026-11-16', label: 'Save-the-dates sent', kind: 'guests' },
      { date: '2027-03-12', label: 'Planning signed off (reopened 28 April)', kind: 'ops' },
      { date: '2027-04-12', label: 'Invitations sent', kind: 'guests' },
      { date: '2027-06-01', label: 'Room block released at The Peninsula Paris', kind: 'guests' },
      { date: '2027-06-15', label: 'RSVP deadline', kind: 'guests' },
      { date: '2027-07-02', label: 'Room block released at Shangri-La Paris', kind: 'guests' },
      { date: '2027-07-30', label: 'Final headcount and final balances due', kind: 'payment' },
      { date: '2027-08-28', label: 'Wedding day', kind: 'wedding' }
    ],
    local_notes: [
      { title: 'Paris slows down in mid-August', text: 'Our planning assumption, based on past summers: many suppliers and restaurants close for part of August, most often between about 3 and 23 August. Every tasting, fitting and final meeting is booked before 31 July, and balances fall due on 30 July.', source_ref: 'F-PAR-18' },
      { title: 'From the airport', text: 'Allow 35 to 60 minutes from Charles de Gaulle to central Paris; the hotel gives 45 minutes from CDG and 30 from Orly. In 2025 the flat taxi fare from CDG to the Right Bank, where all three hotels are, was EUR 56. We will confirm the 2027 fare in the travel guide.', source_ref: 'F-PAR-14, F-PAR-15' },
      { title: 'Late-August weather', text: 'Usually warm: the long-run average high in August is about 26 C, with around eight days of rain in the month (Meteo-France, Paris-Montsouris, 1991-2020). Everything but the cocktail is indoors, and the cocktail has a plan B.', source_ref: 'F-PAR-16' }
    ]
  };

  /* ---------- phases ---------- */
  var ph = S.makePhases(W, {
    1: { owner_id: 'u_camille', summary: 'Signed off by Priya and Alexander on 12 March, then reopened on 28 April when they changed the floral concept after a family visit. The sign-off is withdrawn until the floral direction is agreed.' },
    2: { owner_id: 'u_elena', summary: 'Contracts nearly complete; replies coming in; production design blocked on the florals.' },
    3: { owner_id: 'u_camille', summary: 'Not started. Planned from 5 July; every supplier meeting falls before the August closures.' }
  }, {
    '1.1': { status: 'done', owner_id: 'u_camille', start: '2026-06-14', end: '2026-07-24', summary: 'Brief signed off after a weekend in San Francisco with both families.' },
    '1.2': { status: 'done', owner_id: 'u_riccardo', start: '2026-07-20', end: '2026-10-30', summary: 'Shangri-La Paris secured for three days. Concept "Paris by candlelight" approved.' },
    '1.3': { status: 'awaiting_client', owner_id: 'u_camille', start: '2026-11-02', end: '2027-05-28', summary: 'Closed on 12 March with every supplier chosen. Reopened on 28 April: the couple changed the floral concept after a family visit. Waiting for their floral decision and the change order.' },
    '2.1': { status: 'in_progress', owner_id: 'u_elena', start: '2026-11-16', end: '2027-06-04', summary: 'Twelve of thirteen suppliers under contract; the sangeet music contract and the sangeet dinner addendum with the hotel are outstanding. One invoice overdue.' },
    '2.2': { status: 'in_progress', owner_id: 'u_elena', start: '2026-11-02', end: '2027-07-16', summary: 'Invitations out since 12 April. 99 of 220 have replied, 91 attending. Room blocks at three hotels.' },
    '2.3': { status: 'blocked', owner_id: 'u_matteo', start: '2027-03-15', end: '2027-07-09', summary: 'Floor plan v2 and the sangeet stage agreed. Mandap, table design and lighting wait for the florals.',
      blocked_reason: 'Waiting for the floral decision: the mandap drawings, the table design and the lighting plot all depend on it.' },
    '3.1': { status: 'not_started', owner_id: 'u_camille', start: '2027-07-05', end: '2027-08-24', summary: 'Confirmations, final headcount and balances, all before the August closures.' },
    '3.2': { status: 'not_started', owner_id: 'u_matteo', start: '2027-08-25', end: '2027-08-30', summary: 'Team on site from Wednesday 25 August.' },
    '3.3': { status: 'not_started', owner_id: 'u_elena', start: '2027-08-30', end: '2027-10-15', summary: 'Final account within 30 days of the wedding.' }
  });

  /* ---------- tasks: [sub, title, assignee, due, status, client_visible, note, updated_at] ---------- */
  var n = 0;
  function T(sub, title, who, due, status, visible, note, updated) {
    n++;
    return { id: 'pa-t' + String(n).padStart(2, '0'), wedding_id: W, subphase_id: W + '-' + sub, title: title, assignee_id: 'u_' + who,
      due: due, status: status, client_visible: !!visible, note: note || '', updated_at: updated || (status === 'done' ? due : '2027-05-14') };
  }
  var tasks = [
    T('1.1', 'Discovery call and questionnaire', 'camille', '2026-06-18', 'done', 1),
    T('1.1', 'Weekend in San Francisco with both families', 'riccardo', '2026-07-03', 'done', 1),
    T('1.1', 'Write the brief: two traditions, one weekend', 'camille', '2026-07-14', 'done', 1),
    T('1.1', 'Map who decides and who pays across both families', 'camille', '2026-07-17', 'done', 0, 'Suresh and Charles each sign off above 15k on their own lines. The Sterlings pay in USD.'),
    T('1.1', 'Budget envelope agreed: EUR 980,000', 'elena', '2026-07-24', 'done', 1),
    T('1.2', 'Shortlist venues that seat 220 for dinner', 'riccardo', '2026-07-31', 'done', 1, 'Ritz Paris, Crillon and Vaux-le-Vicomte ruled out on seated capacity [F-PAR-08..10].'),
    T('1.2', 'Site visit: Shangri-La Paris and Pavillon Ledoyen with the couple', 'riccardo', '2026-09-04', 'done', 1),
    T('1.2', 'Negotiate and sign the Shangri-La contract: salons for three days', 'elena', '2026-09-18', 'done', 1),
    T('1.2', 'Design concept v1-v3: Paris by candlelight', 'riccardo', '2026-10-16', 'done', 1),
    T('1.2', 'Weekend format: family lunch, sangeet, ceremony, dinner, brunch', 'camille', '2026-10-30', 'done', 1),
    T('1.3', 'Catering: two tastings of French and South Indian menus', 'camille', '2026-12-04', 'done', 1),
    T('1.3', 'Florals: three studios, one sample table each', 'riccardo', '2027-01-22', 'done', 1),
    T('1.3', 'Music: shortlists for the band, the sangeet DJ and the ceremony', 'camille', '2027-01-29', 'done', 1),
    T('1.3', 'Photo and film: portfolios and reference calls', 'camille', '2027-02-12', 'done', 1),
    T('1.3', 'Production partner and power survey of the salons', 'matteo', '2027-02-19', 'done', 0),
    T('1.3', 'Menu approved after the second tasting', 'camille', '2027-03-05', 'done', 1),
    T('1.3', 'Planning sign-off call', 'camille', '2027-03-12', 'done', 1),
    T('1.3', 'Family visit to the salons: sample table and mandap corner', 'riccardo', '2027-04-24', 'done', 1),
    T('1.3', 'Floral concept v2: three priced directions', 'riccardo', '2027-05-07', 'done', 1, 'Sent on 10 May, three days late.', '2027-05-10'),
    T('1.3', 'Floral direction and change order: answer from the couple', 'camille', '2027-05-21', 'client', 1, 'Florist holds our August slot and the growers\' order until 24 May.'),
    T('1.3', 'Planning sign-off again, once the florals are agreed', 'camille', '2027-05-28', 'todo', 1),
    T('2.1', 'Review every supplier contract', 'elena', '2027-02-26', 'done', 0, 'Cancellation terms tightened in the production contract.'),
    T('2.1', 'Payment schedule agreed with all three payers', 'elena', '2027-03-05', 'done', 1),
    T('2.1', 'Dollar payments: wire dates and rate with Charles Sterling', 'elena', '2027-03-19', 'done', 0, 'He converts on the day he pays. The couple\'s dollar view uses the locked rate.'),
    T('2.1', 'NDAs signed by suppliers and on-site staff', 'elena', '2027-04-16', 'done', 1),
    T('2.1', 'Sign the sangeet music contract: DJ and dhol players', 'camille', '2027-05-07', 'doing', 1, 'Waiting for their revised rider. Chased on 12 May.', '2027-05-12'),
    T('2.1', 'Bar deposit from the Sterlings (LUM-1007)', 'elena', '2027-05-10', 'doing', 0, 'Charles was waiting for a better dollar rate. Reminder sent on 10 May; on the call of 11 May he promised to pay by 21 May.', '2027-05-11'),
    T('2.1', 'Florals: contract amendment for the chosen direction', 'elena', '2027-05-28', 'todo', 1),
    T('2.1', 'Sangeet dinner addendum with the hotel', 'elena', '2027-06-04', 'client', 1, 'Waits for the sangeet layout decision.'),
    T('2.2', 'Room blocks at three hotels', 'elena', '2027-01-29', 'done', 1),
    T('2.2', 'Wedding website with travel pages', 'elena', '2027-03-12', 'done', 1),
    T('2.2', 'Invitations designed, printed and posted', 'elena', '2027-04-12', 'done', 1),
    T('2.2', 'Hosted rooms: first rooming list to the Shangri-La', 'elena', '2027-05-12', 'doing', 0, 'Two family households still to confirm who shares.'),
    T('2.2', 'Invitation letters for guests applying for visas', 'elena', '2027-05-14', 'doing', 1, '31 requested, 24 sent.', '2027-05-14'),
    T('2.2', 'First RSVP reminder to everyone who has not replied', 'elena', '2027-05-24', 'todo', 1),
    T('2.2', 'Room block at The Peninsula Paris: release or hold', 'elena', '2027-05-27', 'client', 1),
    T('2.2', 'Airport arrivals plan for CDG and Orly', 'matteo', '2027-06-18', 'todo', 1),
    T('2.2', 'Dietary sheet: vegetarian, Jain, halal and allergies by guest', 'elena', '2027-06-25', 'doing', 1),
    T('2.2', 'Travel desk: flights from the US and India logged', 'elena', '2027-06-30', 'doing', 1),
    T('2.3', 'Floor plan v2 for the historic salons', 'matteo', '2027-04-02', 'done', 1),
    T('2.3', 'Sangeet stage and dance floor agreed with the hotel', 'matteo', '2027-04-16', 'done', 1),
    T('2.3', 'Sample table on the approved concept', 'riccardo', '2027-04-23', 'done', 1),
    T('2.3', 'Ceremonial fire: agree the arrangement with the hotel', 'camille', '2027-05-12', 'doing', 1, 'Asked in writing on 5 May. Fallback agreed with the priest: a brass lamp.', '2027-05-06'),
    T('2.3', 'Mandap design and build drawings', 'matteo', '2027-05-14', 'blocked', 1, 'Waiting for the floral decision.'),
    T('2.3', 'Lighting plot for the salons and the terrace', 'matteo', '2027-05-21', 'blocked', 0, 'Depends on the mandap and the table design. The lighting partner holds the rig until 4 June.', '2027-05-16'),
    T('2.3', 'Floor plan v3 with the new table design', 'matteo', '2027-06-04', 'todo', 1),
    T('2.3', 'Sample table on the chosen floral direction', 'riccardo', '2027-06-11', 'todo', 1),
    T('3.1', 'Supplier closures in August: who works, who covers', 'matteo', '2027-07-09', 'todo', 0, 'Planning assumption: closures cluster between about 3 and 23 August [F-PAR-18].'),
    T('3.1', 'Seating chart: family tables for both sides', 'sonia', '2027-07-16', 'todo', 1),
    T('3.1', 'Run of show v1 to every supplier', 'matteo', '2027-07-23', 'todo', 1),
    T('3.1', 'Final headcount to the hotel', 'elena', '2027-07-30', 'todo', 1),
    T('3.1', 'Final balances: invoices to all three payers', 'elena', '2027-07-30', 'todo', 1),
    T('3.1', 'Confirm every supplier: arrival time, headcount, dietary sheet, balance', 'camille', '2027-08-02', 'todo', 1),
    T('3.1', 'Welcome bags: assemble and deliver to three hotels', 'elena', '2027-08-24', 'todo', 1),
    T('3.2', 'Grandmother\'s arrival: car and wheelchair at CDG', 'elena', '2027-08-25', 'todo', 1),
    T('3.2', 'Hospitality desks open at three hotels', 'elena', '2027-08-25', 'todo', 1),
    T('3.2', 'Load-in and build: mandap, florals, stage', 'matteo', '2027-08-27', 'todo', 0),
    T('3.2', 'Family lunch and sangeet', 'camille', '2027-08-27', 'todo', 1),
    T('3.2', 'Wedding day: ceremony, terrace, dinner and dancing', 'camille', '2027-08-28', 'todo', 1),
    T('3.2', 'Farewell brunch and departures', 'elena', '2027-08-29', 'todo', 1),
    T('3.2', 'Strike and return of rentals', 'matteo', '2027-08-30', 'todo', 0),
    T('3.3', 'Return sentimental items: pressed garlands, the mandap cloth', 'camille', '2027-09-03', 'todo', 1),
    T('3.3', 'Supplier debrief and notes for next season', 'matteo', '2027-09-10', 'todo', 0),
    T('3.3', 'Thank-you notes and feedback call', 'camille', '2027-09-17', 'todo', 1),
    T('3.3', 'Settle every supplier and close the final account', 'elena', '2027-09-24', 'todo', 1),
    T('3.3', 'Gallery and film delivery', 'camille', '2027-10-15', 'todo', 1)
  ];
  function tid(prefix) { return tasks.filter(function (t) { return t.title.indexOf(prefix) === 0; })[0].id; }

  /* ---------- comments: [parent_type, parent_id, author, at, body, internal] ---------- */
  var c = 0;
  function C(type, pid, who, at, body, internal) {
    c++;
    return { id: 'pa-c' + String(c).padStart(2, '0'), wedding_id: W, parent_type: type, parent_id: pid, author_id: 'u_' + who, at: at, body: body, internal: !!internal };
  }
  var comments = [
    C('phase', W + '-p1', 'camille', '2027-03-12T17:40:00Z', 'Planning signed off on today\'s call: concept, venue and every supplier approved by Priya and Alexander.', 0),
    C('phase', W + '-p1', 'camille', '2027-04-28T16:20:00Z', 'Planning is reopened at Priya and Alexander\'s request: after the family visit they would like a new floral concept. The sign-off of 12 March is withdrawn until the floral direction is agreed.', 0),
    C('phase', W + '-p1', 'riccardo', '2027-04-28T17:05:00Z', 'We showed the pale concept in March without a mandap sample. With the mandap corner built earlier, we would have heard this in March, not in April. Build it first next time.', 1),
    C('phase', W + '-p1', 'sonia', '2027-05-11T15:00:00Z', 'Went through the three floral directions with Camille. We recommend the new concept for the ceremony only. Whatever they choose, the mandap drawings cannot slip past 4 June.', 1),
    C('phase', W + '-p2', 'elena', '2027-05-14T15:30:00Z', 'Twelve of thirteen suppliers under contract. 99 of 220 guests have replied. Production design waits for the florals.', 0),
    C('phase', W + '-p3', 'camille', '2027-05-16T09:10:00Z', 'If the floral decision slips past 24 May, the florist releases our slot and the mandap build moves into July, too close to the August closures.', 1),
    C('subphase', W + '-1.1', 'camille', '2026-07-14T16:00:00Z', 'Brief approved. Priorities in their order: both families at home, food for everyone, a full dance floor both nights.', 0),
    C('subphase', W + '-1.1', 'camille', '2026-07-17T09:30:00Z', 'Two payers besides the couple. Keep each family\'s invoices separate, and never discuss one family\'s payments with the other.', 1),
    C('subphase', W + '-1.2', 'riccardo', '2026-09-04T18:10:00Z', 'Site visit done. Dinner in the historic salons, the sangeet in the Salon Roland Bonaparte, cocktails on the Eiffel Terrace. Priya asked to see the terrace at dusk; we stayed for it.', 0),
    C('subphase', W + '-1.2', 'elena', '2026-09-18T15:00:00Z', 'The hotel\'s own documents give two seated figures for the Salon Roland Bonaparte: 200 and 220. We plan the sangeet to work at 200 and confirm the layout in writing [F-PAR-03].', 1),
    C('subphase', W + '-1.3', 'camille', '2027-04-28T16:30:00Z', 'Reopened. The florals move from the approved pale concept towards jasmine, marigold and tuberose, with a flowered mandap. Three priced directions promised by 7 May.', 0),
    C('subphase', W + '-1.3', 'riccardo', '2027-05-10T08:05:00Z', 'Three floral directions sent, three days later than promised. Prices and what each includes are in the decision.', 0),
    C('subphase', W + '-1.3', 'elena', '2027-05-09T08:00:00Z', 'The florist priced the three directions yesterday. The full new concept takes the forecast EUR 27,100 over the envelope. Camille walks Alexander through the numbers on a call this evening, before anything reaches the portal.', 1),
    C('subphase', W + '-2.1', 'elena', '2027-03-05T14:00:00Z', 'Payment schedule agreed with all three payers. Balances fall due on 30 July, before the August closures.', 0),
    C('subphase', W + '-2.1', 'elena', '2027-05-10T09:20:00Z', 'The Sterling bar deposit (LUM-1007) is three days overdue. Charles is waiting for a better dollar rate. Reminder sent; I call him on Tuesday 11 May. We do not raise it with Priya or Alexander.', 1),
    C('subphase', W + '-2.2', 'elena', '2027-05-14T14:10:00Z', 'Replies so far: 99 of 220, 91 attending. 24 of 31 invitation letters for visa appointments sent.', 0),
    C('subphase', W + '-2.3', 'matteo', '2027-05-14T09:30:00Z', 'Blocked: the mandap, the table design and the lighting all depend on the floral decision. Floor plan v2 stands for everything else.', 0),
    C('subphase', W + '-2.3', 'matteo', '2027-05-16T16:10:00Z', 'The lighting partner holds the rig until 4 June. After that we pay a rush fee or lose the date.', 1),
    C('task', tid('Sign the sangeet music'), 'camille', '2027-05-12T11:00:00Z', 'Chased their agent again and wrote to Nikhil directly. Contract promised by Wednesday.', 1),
    C('task', tid('Ceremonial fire'), 'camille', '2027-05-06T10:00:00Z', 'We asked the hotel in writing on 5 May what is possible for the ceremonial fire. If a live flame cannot be used, the priest is happy with a brass lamp.', 0),
    C('subphase', W + '-1.3', 'camille', '2027-05-10T08:10:00Z', 'Numbers walked through with Alexander on a call yesterday. The three floral directions and their prices are in the decision.', 0),
    C('task', tid('Bar deposit from the Sterlings'), 'elena', '2027-05-12T09:00:00Z', 'Spoke to Charles on Tuesday. He pays the deposit by 21 May, whatever the rate does.', 1)
  ];

  /* ---------- weekend events (spaces named as in F-PAR-02..04) ---------- */
  var events = [
    { id: 'pa-e1', wedding_id: W, day: '2027-08-27', name: 'Family lunch', start: '12:30', end: '15:30', location: 'Shangri-La Paris, Les Salons Historiques', dress_code: 'Summer day wear', audience: 'family', plan_b: '', note: 'Both families together before the weekend begins. Henna from 14:00 for anyone who would like it.' },
    { id: 'pa-e2', wedding_id: W, day: '2027-08-27', name: 'Sangeet', start: '19:30', end: '00:30', location: 'Salon Roland Bonaparte', dress_code: 'Festive: Indian or evening wear, colour welcome', audience: 'all', plan_b: '', note: 'Performances by both families from 21:00. A soundproofed salon with its own stage and dance floor.' },
    { id: 'pa-e3', wedding_id: W, day: '2027-08-28', name: 'Ceremony', start: '16:00', end: '17:30', location: 'Les Salons Historiques', dress_code: 'Indian formal or black tie', audience: 'all', plan_b: '', note: 'Garland exchange and the Hindu rites led by the Raman family priest, then the vows. The order of service explains each part in English.' },
    { id: 'pa-e4', wedding_id: W, day: '2027-08-28', name: 'Cocktails on the Eiffel Terrace', start: '17:45', end: '19:15', location: 'Eiffel Terrace', dress_code: 'Indian formal or black tie', audience: 'all', plan_b: 'Foyer of the historic salons', note: 'Reserved together with the historic salons, which are set for dinner meanwhile.' },
    { id: 'pa-e5', wedding_id: W, day: '2027-08-28', name: 'Dinner and dancing', start: '19:30', end: '01:00', location: 'Les Salons Historiques', dress_code: 'Indian formal or black tie', audience: 'all', plan_b: '', note: 'French and South Indian courses. Band from 22:00, late-night food at midnight.' },
    { id: 'pa-e6', wedding_id: W, day: '2027-08-29', name: 'Farewell brunch', start: '11:00', end: '14:00', location: 'Shangri-La Paris, Les Salons Historiques', dress_code: 'Relaxed', audience: 'all', plan_b: '', note: 'Hosted by Diane and Charles Sterling.' }
  ];

  /* ---------- hotels (real names from venue-facts.md; block sizes are demo data, below the verified room counts:
     Shangri-La Paris 100 [F-PAR-11], The Peninsula Paris 200 [F-PAR-12], Plaza Athenee 154 rooms and 54 suites [F-PAR-13]).
     claimed is computed from the guests after the generator, below. ---------- */
  var accommodations = [
    { id: 'pa-h1', wedding_id: W, name: 'Shangri-La Paris', town: 'Paris 16e', block_size: 60, claimed: 0, release_date: '2027-07-02', hosted: true, note: 'Both families and the wedding party. Two nights hosted; the parents and grandmothers stay longer.', source_ref: 'F-PAR-11' },
    { id: 'pa-h2', wedding_id: W, name: 'The Peninsula Paris', town: 'Paris 16e', block_size: 55, claimed: 0, release_date: '2027-06-01', hosted: false, note: 'Friends and colleagues. Guest-paid at the group rate.', source_ref: 'F-PAR-12' },
    { id: 'pa-h3', wedding_id: W, name: 'Hôtel Plaza Athénée', town: 'Paris 8e', block_size: 30, claimed: 0, release_date: '2027-06-15', hosted: false, note: 'Friends. Guest-paid at the group rate.', source_ref: 'F-PAR-13' }
  ];

  /* ---------- guests: 16 written by hand, the rest generated (deterministic) ---------- */
  var vips = [
    { name: 'Suresh Raman', side: 'Raman', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-08-25', dietary: 'Vegetarian', notes: 'Father of the bride. Welcomes everyone at the sangeet.', internal_notes: 'Signs off above EUR 15,000 on the lines he pays. Prefers a call to an email when money moves.' },
    { name: 'Lakshmi Raman', side: 'Raman', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-08-25', dietary: 'Vegetarian', notes: 'Mother of the bride. Leads the family side of the ceremony with the priest.', internal_notes: 'The floral change began with her after the April visit. Route her ideas through Priya and thank her for them.' },
    { name: 'Kamala Raman', side: 'Raman', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Junior suite', nights_hosted: 4, arrival: '2027-08-25', transfer: 'Private car', language: 'Tamil', dietary: 'Vegetarian', notes: 'Grandmother of the bride, 86. Wheelchair for longer distances. Front row, close to the mandap. Speaks mainly Tamil; her grandson Arjun translates.', internal_notes: 'Sonia looks after her and Arjun on Saturday. Room close to the lift, with a bed rail.' },
    { name: 'Arjun Subramanian', side: 'Raman', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', nights_hosted: 2, arrival: '2027-08-25', dietary: 'No beef', notes: 'Cousin of the bride. Travels with his grandmother from Chennai and translates for her.' },
    { name: 'Meera Raman', side: 'Raman', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', nights_hosted: 2, dietary: 'Vegetarian', notes: 'Maid of honour, sister of the bride. Runs the sangeet running order with Anjali.' },
    { name: 'Anjali Krishnan', side: 'Raman', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h2', dietary: 'Vegan', notes: 'Cousin of the bride. Choreographs the sangeet performances; needs a rehearsal room on Friday from 14:00 to 17:00.' },
    { name: 'Ganesh Sastry', side: 'Raman', tier: 'Friends', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', nights_hosted: 2, dietary: 'Vegetarian, no onion or garlic', notes: 'Family priest, travels from San Jose to lead the Hindu rites. Needs a quiet room from 14:00 on Saturday to prepare.', internal_notes: 'Would like a small live flame at the ceremony; content with a brass lamp if the hotel cannot allow it.' },
    { name: 'Nirav Shah', household: 'Shah', side: 'Raman', tier: 'Friends', rsvp: 'yes', vip: true, accommodation_id: 'pa-h3', dietary: 'Jain: vegetarian, no root vegetables (no onion, garlic, potato or carrot), no eggs', notes: 'Family friend. Jain meals at every event, prepared separately and brought to him at the sangeet.' },
    { name: 'Hetal Shah', household: 'Shah', side: 'Raman', tier: 'Friends', rsvp: 'yes', vip: true, accommodation_id: 'pa-h3', dietary: 'Jain: vegetarian, no root vegetables (no onion, garlic, potato or carrot), no eggs', allergies: 'Sesame', notes: 'Family friend. Jain meals at every event, prepared separately. Sesame allergy: confirmed on the dietary sheet.' },
    { name: 'Farah Qureshi', side: 'Raman', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'pa-h2', dietary: 'Halal', notes: 'Bridesmaid, college friend of the bride. No pork; halal meat wherever meat is served.' },
    { name: 'Diane Sterling', side: 'Sterling', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-08-26', dietary: 'Gluten-free', notes: 'Mother of the groom. Hosts the farewell brunch.' },
    { name: 'Charles Sterling', side: 'Sterling', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Suite', nights_hosted: 3, arrival: '2027-08-26', dietary: '', notes: 'Father of the groom. Toast at dinner, three minutes.', internal_notes: 'Pays in USD. The bar deposit is late; Elena handles it with him directly and does not ask the couple to chase it.' },
    { name: 'Margaret Sterling', side: 'Sterling', tier: 'Family', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', room_type: 'Junior suite', nights_hosted: 3, arrival: '2027-08-26', transfer: 'Private car', dietary: '', notes: 'Grandmother of the groom, 89. Hard of hearing: seat her near the front, away from the speakers.' },
    { name: 'Nathaniel Sterling', side: 'Sterling', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', nights_hosted: 2, dietary: '', notes: 'Best man, brother of the groom. Holds the rings.' },
    { name: 'Jordan Ellis', side: 'Both', tier: 'Wedding party', rsvp: 'yes', vip: true, accommodation_id: 'pa-h1', nights_hosted: 2, dietary: 'Pescatarian', notes: 'Friend leading the vows after the Hindu rites. Needs a lapel microphone.' },
    { name: 'Vikram Menon', side: 'Raman', tier: 'Family', rsvp: 'pending', vip: true, accommodation_id: 'pa-h1', dietary: 'No beef', notes: 'Uncle of the bride. A doctor on the hospital rota in August; will confirm by 31 May.', internal_notes: 'Hold a room at the Shangri-La until 4 June.' }
  ];
  var gen = S.makeGuests({
    wedding_id: W, prefix: 'pa', seed: 2708, count: 220, vips: vips,
    events: [{ id: 'pa-e1', audience: 'family', turnout: 0.95 }, { id: 'pa-e2', audience: 'all', turnout: 0.94 }, { id: 'pa-e3', audience: 'all', turnout: 1 },
      { id: 'pa-e4', audience: 'all', turnout: 0.97 }, { id: 'pa-e5', audience: 'all', turnout: 1 }, { id: 'pa-e6', audience: 'all', turnout: 0.78 }],
    accommodations: [['pa-h1', 25], ['pa-h2', 45], ['pa-h3', 30]],
    responded: 0.44, yesRate: 0.9, start_date: '2027-08-27', end_date: '2027-08-29', seated: false, sides: ['Raman', 'Sterling'],
    firstNames: ['Arjun', 'Kavya', 'Vikram', 'Ananya', 'Rohan', 'Divya', 'Karthik', 'Meenakshi', 'Sanjay', 'Aishwarya', 'Rahul', 'Nandini', 'Vivek',
      'Shreya', 'Aditya', 'Ravi', 'Deepa', 'Harish', 'Padma', 'Siddharth', 'Janani', 'Ganesh', 'Revathi', 'Naveen', 'Anjali', 'Prakash', 'Sowmya',
      'Ashwin', 'Nisha', 'Vijay', 'Kavitha', 'Anand', 'Preethi', 'Raghav', 'Sunita', 'Varun', 'Lavanya', 'Krishna', 'Uma', 'Hari',
      'Caleb', 'Hazel', 'Wyatt', 'Maya', 'Declan', 'Ruby', 'Miles', 'Iris', 'Graham', 'Tessa'],
    lastNames: ['Subramanian', 'Krishnan', 'Iyer', 'Venkataraman', 'Natarajan', 'Sundaram', 'Ramachandran', 'Srinivasan', 'Narayanan',
      'Chandrasekhar', 'Balasubramanian', 'Menon', 'Rao', 'Reddy', 'Pillai', 'Patel', 'Mehta', 'Desai', 'Kapoor', 'Bhat',
      'Caldwell', 'Brennan', 'Hollis', 'McAllister', 'Garrison', 'Park', 'Alvarez', 'Novak', 'Brooks', 'Fitzgerald', 'Larsen', 'Chen',
      'Sharma', 'Joshi', 'Nair', 'Kumar', 'Raghavan', 'Swaminathan', 'Viswanathan', 'Gopalan', 'Agarwal', 'Mani']
  });
  /* makeGuests keeps its own empty 'flight' on every row, so VIP flights are set here. */
  var flights = {
    'Suresh Raman': 'From San Francisco, lands CDG Wed 25 Aug, 11:05',
    'Lakshmi Raman': 'From San Francisco, lands CDG Wed 25 Aug, 11:05'
  };
  gen.guests.forEach(function (g) { if (flights[g.name]) g.flight = flights[g.name]; });
  /* After the generator, with no random draws, so the headcount above does not move: a generated relative's side follows the
     surname; guests with a South Asian surname eat vegetarian about half the time (never kosher-style); a generated couple shares
     one hotel, room and travel plan; generated family stays at the hosted hotel; nobody has hosted nights at a guest-paid hotel.
     A hotel's claimed rooms come from its guests: one room per household, two guests a room at most, and a room of their own
     for each hand-written VIP unless shareRoom pairs them. */
  var RAMAN_SURNAMES = ['Subramanian', 'Krishnan', 'Iyer', 'Venkataraman', 'Natarajan', 'Sundaram', 'Ramachandran', 'Srinivasan', 'Narayanan',
    'Chandrasekhar', 'Balasubramanian', 'Menon', 'Rao', 'Reddy', 'Pillai', 'Patel', 'Mehta', 'Desai', 'Kapoor', 'Bhat',
    'Sharma', 'Joshi', 'Nair', 'Kumar', 'Raghavan', 'Swaminathan', 'Viswanathan', 'Gopalan', 'Agarwal', 'Mani'];
  (function (hostedId, shareRoom) {
    var hosted = {}, rooms = {}, run = 0, prev = null, veg = 0;
    accommodations.forEach(function (a) { hosted[a.id] = a.hosted; rooms[a.id] = {}; });
    gen.guests.forEach(function (g) {
      var southAsian = RAMAN_SURNAMES.indexOf(g.household) >= 0;
      if (!g.vip && g.tier === 'Family') g.side = southAsian ? 'Raman' : 'Sterling';
      if (!g.vip && southAsian) {
        if (g.dietary === 'Kosher-style' || g.dietary === 'Halal') g.dietary = 'Vegetarian';
        else if (!g.dietary && veg++ % 2 === 0) g.dietary = 'Vegetarian';
      }
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
      if (a.claimed > a.block_size) throw new Error('paris seed: ' + a.name + ' needs ' + a.claimed + ' rooms, block is ' + a.block_size);
    });
  })('pa-h1', { 'Lakshmi Raman': 'Suresh Raman', 'Charles Sterling': 'Diane Sterling', 'Hetal Shah': 'Nirav Shah' });

  /* ---------- vendors (all invented except the venue; the venue row carries invented prices and contract terms,
     and no reply times, commissions or internal notes) ---------- */
  function V(id, name, category, contact, status, contract, conf, arrival, extra) {
    return Object.assign({ id: 'pa-v' + id, wedding_id: W, name: name, category: category, contact: contact, status: status, contract_eur: contract,
      insurance_ok: true, nda_signed: true, relationship: 'none', commission_pct: 0, avg_reply_hours: null, internal_notes: '',
      confirmations: conf, arrival_time: arrival, client_visible: true, updated_at: '2027-05-14' }, extra || {});
  }
  var none = { time: false, headcount: false, dietary: false, payment: false };
  var paidDep = { time: false, headcount: false, dietary: false, payment: true };
  var vendors = [
    V('01', 'Shangri-La Paris', 'Venue', 'Events office', 'contracted', 307800, paidDep, 'Access from Thu 26 Aug, 07:00', { real: true, nda_signed: false, insurance_ok: true, source_ref: 'F-PAR-01' }),
    V('02', 'Atelier Feuille Lente', 'Florals & design', 'Solène Marchal', 'contracted', 102000, paidDep, 'Thu 26 Aug, 07:00, three vans', { avg_reply_hours: 14, internal_notes: 'Holds our August slot and the jasmine and tuberose order until 24 May. Needs ten days\' notice for quantities.' }),
    V('03', 'Faisceau Clair Production', 'Production & lighting', 'Hugo Ferrand', 'contracted', 88000, paidDep, 'Thu 26 Aug, 08:00 load-in', { avg_reply_hours: 19, internal_notes: 'Holds the lighting rig until 4 June.' }),
    V('04', 'Nappe et Verre Location', 'Florals & design', 'Rentals desk', 'contracted', 34000, paidDep, 'Thu 26 Aug, 10:00 delivery', { avg_reply_hours: 9 }),
    V('05', 'Dhol & Deck Collective', 'Music & entertainment', 'Nikhil Rao', 'shortlist', 0, none, 'Fri 27 Aug, 16:00 soundcheck', { avg_reply_hours: 58, nda_signed: false, insurance_ok: false, internal_notes: 'Slow through their agent. Nikhil answers WhatsApp directly. Contract outstanding since April.' }),
    V('06', 'Orchestre Minuit Douze', 'Music & entertainment', 'Marc Delorme', 'contracted', 34000, paidDep, 'Sat 28 Aug, 15:00 soundcheck', { avg_reply_hours: 11 }),
    V('07', 'Kalyana Isai Ensemble', 'Music & entertainment', 'Karthik Sundar', 'contracted', 9500, paidDep, 'Sat 28 Aug, 14:30', { avg_reply_hours: 22, internal_notes: 'Travels from London on Friday. Two players, nadaswaram and thavil.' }),
    V('08', 'Studio Lanterne Vingt', 'Photo & film', 'Inès Moreau', 'contracted', 30000, paidDep, 'Fri 27 Aug, 12:00', { avg_reply_hours: 7, relationship: 'preferred', internal_notes: 'Third wedding together.' }),
    V('09', 'Films du Quai Neuf', 'Photo & film', 'Julien Carrel', 'contracted', 24000, paidDep, 'Fri 27 Aug, 12:00', { avg_reply_hours: 10 }),
    V('10', 'Henna by Sana Qadri', 'Beauty & attire', 'Sana Qadri', 'contracted', 3200, none, 'Fri 27 Aug, 13:30', { avg_reply_hours: 6 }),
    V('11', 'Poudre et Soie Beauty', 'Beauty & attire', 'Nadia Benali', 'contracted', 13500, paidDep, 'Sat 28 Aug, 08:00 at the hotel', { avg_reply_hours: 13, internal_notes: 'Two artists who drape saris; booked for both families from 08:00.' }),
    V('12', 'Chauffeurs Étoile Onze', 'Transport', 'Dispatch', 'contracted', 30000, paidDep, 'Wed 25 Aug, first airport run', { avg_reply_hours: 8 }),
    V('13', 'Papeterie Encre Douce', 'Stationery', 'Clémence Aubry', 'contracted', 15600, paidDep, 'Delivery Mon 23 Aug', { avg_reply_hours: 16 })
  ];

  /* ---------- budget: [id, category, label, allocated, estimate, contracted, vendor, event, flags] ---------- */
  function B(id, category, label, allocated, estimate, contracted, vendor, event, extra) {
    return Object.assign({ id: 'pa-b' + id, wedding_id: W, category: category, label: label, allocated: allocated, estimate: estimate, contracted: contracted,
      vendor_id: vendor ? 'pa-v' + vendor : null, event_id: event ? 'pa-e' + event : null, often_forgotten: false, includes: '', internal_notes: '',
      client_visible: true, updated_at: '2027-05-10' }, extra || {});
  }
  var budget_lines = [
    B('01', 'Venue', 'Shangri-La Paris: historic salons, three days', 120000, 120000, 120000, '01', null, { includes: 'Les Salons Historiques, the Salon Roland Bonaparte and the Eiffel Terrace' }),
    B('02', 'Venue', 'Salon staffing, security and clean-down', 12000, 12000, 12000, '01'),
    B('03', 'Catering & bar', 'Wedding dinner for 220', 88000, 88000, 88000, '01', '5', { includes: 'Five courses, French and South Indian, EUR 400 a head. Vegetarian and Jain plates prepared separately.' }),
    B('04', 'Catering & bar', 'Sangeet dinner', 58000, 58000, 0, '01', '2', { includes: 'Layout decision pending: food stations or a seated dinner' }),
    B('05', 'Catering & bar', 'Wines, champagne and open bar, three events', 52000, 52000, 52000, '01', '5'),
    B('06', 'Catering & bar', 'Family lunch', 10000, 10000, 10000, '01', '1'),
    B('07', 'Catering & bar', 'Farewell brunch', 22000, 22000, 22000, '01', '6'),
    B('08', 'Catering & bar', 'Supplier meals', 3800, 3800, 3800, '01', '5', { often_forgotten: true, includes: 'About 90 crew over three days' }),
    B('09', 'Catering & bar', 'Late-night food at midnight', 5000, 5000, 0, '01', '5', { includes: 'Choice in July', updated_at: '2027-04-19' }),
    B('10', 'Florals & design', 'Ceremony and dinner florals', 84000, 84000, 84000, '02', '3', { includes: 'Contract of 12 March: the approved pale concept. A change for the new concept waits for you.',
      internal_notes: 'Second instalment (LUM-1014) to be reissued once the direction is chosen.' }),
    B('11', 'Florals & design', 'Sangeet styling and florals', 18000, 18000, 18000, '02', '2'),
    B('12', 'Florals & design', 'Tables, chairs, linen, glassware', 34000, 34000, 34000, '04', '5'),
    B('13', 'Production & lighting', 'Lighting, sound and power, historic salons', 46000, 52000, 52000, '03', '5', { often_forgotten: true, includes: 'Free-standing lighting, pin spots, speech microphones and a separate power feed approved in February' }),
    B('14', 'Production & lighting', 'Sangeet sound, lights and LED wall', 21000, 21000, 21000, '03', '2'),
    B('15', 'Production & lighting', 'Mandap: build, drapes and seating', 15000, 15000, 15000, '03', '3', { includes: 'The structure only. Its flowers sit in the florals line.' }),
    B('16', 'Music & entertainment', 'Twelve-piece band, Saturday', 30000, 34000, 34000, '06', '5', { includes: 'Plays until 01:00, extended in April' }),
    B('17', 'Music & entertainment', 'Sangeet DJ and dhol players', 14000, 14500, 0, '05', '2', { includes: 'Contract not yet signed', updated_at: '2027-04-27' }),
    B('18', 'Music & entertainment', 'Nadaswaram and thavil for the ceremony', 9500, 9500, 9500, '07', '3', { includes: 'Two players, travel from London included' }),
    B('19', 'Photo & film', 'Photography, three days', 30000, 30000, 30000, '08'),
    B('20', 'Photo & film', 'Film, three days', 24000, 24000, 24000, '09'),
    B('21', 'Guest hospitality', 'Hosted rooms for both families and the wedding party', 64000, 64000, 64000, null, null, { includes: 'Rooms at Shangri-La Paris: two nights, more for the parents and both grandmothers' }),
    B('22', 'Guest hospitality', 'Welcome bags and hospitality desks', 12000, 12000, 0, null, null, { includes: 'Contents left to us in April; bought in July', updated_at: '2027-04-12' }),
    B('23', 'Guest hospitality', 'Room block guarantee at The Peninsula Paris', 0, 6000, 0, null, null, { often_forgotten: true, includes: 'Depends on your decision about the room block' }),
    B('24', 'Transport', 'Airport transfers: cars and coaches', 22000, 22000, 22000, '12'),
    B('25', 'Transport', 'Evening shuttles between three hotels', 8000, 8000, 8000, '12'),
    B('26', 'Stationery', 'Invitations, order of service and day-of paper', 15600, 15600, 15600, '13'),
    B('27', 'Beauty & attire', 'Hair, make-up and sari draping for both families', 13500, 13500, 13500, '11'),
    B('28', 'Beauty & attire', 'Henna artists at the family lunch', 3200, 3200, 3200, '10', '1'),
    B('29', 'Planning fee', 'VKRI planning and on-site team', 95000, 95000, 95000, null, null, { includes: 'Flat fee. It does not change with your budget.' }),
    B('30', 'Contingency', 'Gratuities', 0, 7500, 0, null, null, { often_forgotten: true }),
    B('31', 'Contingency', 'Overtime after 01:00', 0, 4000, 0, null, '5', { often_forgotten: true }),
    B('32', 'Contingency', 'Bank and currency fees', 0, 3500, 0, null, null, { often_forgotten: true, includes: 'Three payers, two currencies' })
  ];
  /* The reserve takes whatever is left, so allocations always add up to the envelope exactly. */
  var allocatedSoFar = budget_lines.reduce(function (s, l) { return s + l.allocated; }, 0);
  budget_lines.push(B('33', 'Contingency', 'Unallocated reserve', wedding.envelope_eur - allocatedSoFar, 0, 0, null, null, { includes: 'What is left of the original reserve' }));

  var change_orders = [
    { id: 'pa-co1', wedding_id: W, budget_line_id: 'pa-b13', title: 'Separate power feed for band and lighting', delta_eur: 6000, reason: 'Our production partner advised a separate feed so that the band and the lighting do not share one supply.', proposed_by: 'u_matteo', proposed_at: '2027-02-22T10:00:00Z', status: 'approved', decided_at: '2027-02-24T17:30:00Z', decided_by: 'c_paris', alternatives: 'Reduce the lighting by a third: saves EUR 4,000' },
    { id: 'pa-co2', wedding_id: W, budget_line_id: 'pa-b16', title: 'Band plays until 01:00', delta_eur: 4000, reason: 'Alexander asked for the band to play the last hour instead of the DJ.', proposed_by: 'u_camille', proposed_at: '2027-04-14T09:00:00Z', status: 'approved', decided_at: '2027-04-16T04:10:00Z', decided_by: 'c_paris', alternatives: 'DJ from midnight: no extra cost' },
    { id: 'pa-co3', wedding_id: W, budget_line_id: 'pa-b10', title: 'Floral concept v2: jasmine, marigold and a flowered mandap', delta_eur: 46000, reason: 'Asked for on 27 April after the family visit. The full new concept for the ceremony and dinner, as priced by the florist on 8 May.', proposed_by: 'u_riccardo', proposed_at: '2027-05-10T08:00:00Z', status: 'pending', decided_at: null, decided_by: null, alternatives: 'The new concept for the ceremony only adds EUR 20,000; the approved concept with garlands and a jasmine canopy adds EUR 9,500.', task_id: tid('Floral direction and change order'), risk_id: 'pa-r1' },
    { id: 'pa-co4', wedding_id: W, budget_line_id: 'pa-b24', title: 'Vintage cars for the couple and both sets of parents', delta_eur: 7200, reason: 'Asked for by Alexander.', proposed_by: 'u_camille', proposed_at: '2027-02-26T10:00:00Z', status: 'declined', decided_at: '2027-03-01T05:20:00Z', decided_by: 'c_paris', alternatives: '' }
  ];

  /* ---------- invoices: generated from a schedule per line ---------- */
  var invoices = [], inv = 0;
  function I(line, vendor, payer, parts) {
    parts.forEach(function (p) {
      inv++;
      invoices.push({ id: 'pa-i' + String(inv).padStart(2, '0'), wedding_id: W, number: 'LUM-' + String(1000 + inv), vendor_id: vendor ? 'pa-v' + vendor : null,
        budget_line_id: 'pa-b' + line, amount_eur: p[0], due: p[1], status: p[2], paid_at: p[2] === 'paid' ? p[1] : null, payer_id: payer, covers: p[3], method: 'Bank transfer' });
    });
  }
  I('01', '01', 'pa-pay2', [[36000, '2026-09-18', 'paid', 'Salons hire: deposit 30%'], [48000, '2027-02-15', 'paid', 'Salons hire: second instalment 40%'], [36000, '2027-07-30', 'upcoming', 'Salons hire: balance 30%']]);
  I('02', '01', 'pa-pay2', [[12000, '2027-07-30', 'upcoming', 'Salon staffing, security and clean-down']]);
  I('03', '01', 'pa-pay2', [[35200, '2027-03-01', 'paid', 'Wedding dinner: deposit 40%'], [52800, '2027-07-30', 'upcoming', 'Wedding dinner: balance on final headcount']]);
  I('05', '01', 'pa-pay3', [[26000, '2027-05-07', 'overdue', 'Wines and bar: deposit 50%'], [26000, '2027-07-30', 'upcoming', 'Wines and bar: balance']]);
  I('06', '01', 'pa-pay2', [[10000, '2027-07-30', 'upcoming', 'Family lunch, in full']]);
  I('07', '01', 'pa-pay3', [[11000, '2027-05-20', 'due', 'Farewell brunch: deposit 50%'], [11000, '2027-07-30', 'upcoming', 'Farewell brunch: balance']]);
  I('08', '01', 'pa-pay2', [[3800, '2027-07-30', 'upcoming', 'Supplier meals: about 90 crew over three days']]);
  I('10', '02', 'pa-pay1', [[25200, '2027-03-15', 'paid', 'Florals: deposit 30%'], [33600, '2027-06-15', 'upcoming', 'Florals: second instalment 40%'], [25200, '2027-07-30', 'upcoming', 'Florals: balance 30%']]);
  I('11', '02', 'pa-pay2', [[9000, '2027-03-15', 'paid', 'Sangeet styling: 50%'], [9000, '2027-07-30', 'upcoming', 'Sangeet styling: balance']]);
  I('12', '04', 'pa-pay1', [[17000, '2027-04-01', 'paid', 'Rentals: deposit 50%'], [17000, '2027-07-23', 'upcoming', 'Rentals: balance']]);
  I('13', '03', 'pa-pay1', [[20800, '2027-03-01', 'paid', 'Lighting, sound and power: deposit 40%'], [15600, '2027-06-01', 'upcoming', 'Lighting, sound and power: second instalment 30%'], [15600, '2027-07-30', 'upcoming', 'Lighting, sound and power: balance 30%']]);
  I('14', '03', 'pa-pay2', [[10500, '2027-03-01', 'paid', 'Sangeet sound, lights and LED wall: 50%'], [10500, '2027-07-30', 'upcoming', 'Sangeet sound, lights and LED wall: balance']]);
  I('15', '03', 'pa-pay2', [[7500, '2027-04-15', 'paid', 'Mandap build: 50%'], [7500, '2027-07-30', 'upcoming', 'Mandap build: balance']]);
  I('16', '06', 'pa-pay1', [[15000, '2027-01-15', 'paid', 'Band: deposit'], [4000, '2027-04-20', 'paid', 'Band: extension to 01:00, approved 16 April'], [15000, '2027-07-30', 'upcoming', 'Band: balance']]);
  I('18', '07', 'pa-pay2', [[4750, '2027-04-01', 'paid', 'Nadaswaram and thavil: 50%'], [4750, '2027-07-30', 'upcoming', 'Nadaswaram and thavil: balance, with travel']]);
  I('19', '08', 'pa-pay1', [[15000, '2027-01-20', 'paid', 'Photography: deposit 50%'], [15000, '2027-07-30', 'upcoming', 'Photography: balance']]);
  I('20', '09', 'pa-pay1', [[12000, '2027-01-20', 'paid', 'Film: deposit 50%'], [12000, '2027-07-30', 'upcoming', 'Film: balance']]);
  I('21', null, 'pa-pay1', [[32000, '2027-02-01', 'paid', 'Hosted rooms: deposit 50%'], [32000, '2027-07-02', 'upcoming', 'Hosted rooms: balance at the block release']]);
  I('24', '12', 'pa-pay3', [[11000, '2027-04-15', 'paid', 'Airport transfers: deposit 50%'], [11000, '2027-07-30', 'upcoming', 'Airport transfers: balance']]);
  I('25', '12', 'pa-pay3', [[8000, '2027-07-30', 'upcoming', 'Evening shuttles, in full']]);
  I('26', '13', 'pa-pay1', [[9800, '2027-03-26', 'paid', 'Invitations, printed and posted'], [5800, '2027-07-23', 'upcoming', 'Order of service, menus and signage']]);
  I('27', '11', 'pa-pay1', [[6750, '2027-04-20', 'paid', 'Hair, make-up and draping: deposit 50%'], [6750, '2027-07-30', 'upcoming', 'Hair, make-up and draping: balance']]);
  I('28', '10', 'pa-pay2', [[3200, '2027-05-24', 'upcoming', 'Henna artists, in full']]);
  I('29', null, 'pa-pay1', [[31667, '2026-07-15', 'paid', 'VKRI fee: first third'], [31667, '2027-01-15', 'paid', 'VKRI fee: second third'], [31666, '2027-07-15', 'upcoming', 'VKRI fee: final third']]);

  /* ---------- decisions ---------- */
  function opt(id, name, vendor, price, includes, extra) { return Object.assign({ id: id, name: name, vendor: vendor, price_eur: price, includes: includes, relationship: 'No commission or referral fee' }, extra || {}); }
  var decisions = [
    { id: 'pa-d01', wedding_id: W, kind: 'choice', change_order_id: 'pa-co3', title: 'Floral direction for the ceremony and dinner', why_now: 'The florist holds our August slot and the growers\' order until Monday 24 May. The mandap drawings, the table design and the lighting all wait for this.',
      deadline: '2027-05-21', release_date: '2027-05-10', status: 'open', delegable: false, budget_line_id: 'pa-b10', document_id: 'pa-doc11',
      unblocks: 'paris-2.3', task_id: tid('Floral direction and change order'), risk_id: 'pa-r1',
      options: [
        opt('a', 'The full new concept', 'Atelier Feuille Lente', 130000, 'Jasmine, marigold and tuberose throughout. A flowered mandap, fresh garlands for the exchange and jasmine strings on every dinner table. Adds EUR 46,000 to the contract.', { brief_ref: 'What both of you asked for after the April visit' }),
        opt('b', 'New concept for the ceremony, the approved concept for dinner', 'Atelier Feuille Lente', 104000, 'A flowered mandap, fresh garlands and jasmine for the ceremony. Dinner keeps the ivory and pale-gold tables approved in March, with a jasmine string at every place. Adds EUR 20,000.', { brief_ref: 'Both families feel equally at home' }),
        opt('c', 'The approved concept, with garlands and a jasmine canopy', 'Atelier Feuille Lente', 93500, 'Ceremony and dinner as approved in March, plus fresh garlands for the exchange and a canopy of jasmine over the mandap. Adds EUR 9,500.')
      ], recommended_option_id: 'b', recommendation_reason: 'It puts the new flowers where both families will be closest to them, at the mandap, and keeps the dinner you approved. With it the forecast is EUR 1,100 over your envelope; with the full new concept it is EUR 27,100 over.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'Lakshmi prefers the full new concept. Alexander has asked Camille privately what the ceremony-only option saves. Camille calls them both on Tuesday 18 May, before they decide.' },
    { id: 'pa-d02', wedding_id: W, kind: 'choice', title: 'Sangeet layout: food stations or a seated dinner', why_now: 'The hotel needs the layout to confirm the sangeet menu and the position of the stage.',
      deadline: '2027-05-28', release_date: '2027-05-12', status: 'open', delegable: true, budget_line_id: 'pa-b04', document_id: 'pa-doc14', task_id: tid('Sangeet dinner addendum'),
      options: [
        opt('a', 'Food stations and high tables', 'Shangri-La Paris', 54000, 'Six stations, seats for about half the room and the full dance floor. Guests move between the food and the performances. The salon is listed for 300 at a cocktail.', { brief_ref: 'A dance floor that stays full, both nights' }),
        opt('b', 'Seated dinner at round tables', 'Shangri-La Paris', 63000, 'A plated dinner for up to 200, with a smaller dance floor. The hotel\'s own documents give 200 and 220 as the seated figure for this salon, so we would confirm the layout with them first.')
      ], recommended_option_id: 'a', recommendation_reason: 'The sangeet is for the performances and the dancing. Stations keep the floor open and fit everyone; a seated dinner for all your guests in this salon is not certain.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'pa-d03', wedding_id: W, kind: 'choice', title: 'Room block at The Peninsula Paris: release or hold', why_now: 'Unclaimed rooms go back to the hotel on 1 June. After that, guests who book late pay the public rate, if rooms are left.',
      deadline: '2027-05-27', release_date: '2027-05-14', status: 'open', delegable: true, budget_line_id: 'pa-b23', task_id: tid('Room block at The Peninsula'),
      options: [
        opt('a', 'Release the 32 unclaimed rooms', '', 0, 'No cost. Guests who reply late book on their own at the public rate.'),
        opt('b', 'Hold 15 rooms until 15 July', '', 6000, 'You pay only for rooms still empty on 15 July, up to EUR 6,000.'),
        opt('c', 'Hold all 32 rooms until 15 July', '', 12800, 'You pay only for rooms still empty on 15 July, up to EUR 12,800.')
      ], recommended_option_id: 'b', recommendation_reason: 'More than half of your guests have not replied yet, and most of them are friends who would stay at the Peninsula. Fifteen rooms covers what we expect without guaranteeing all of them.',
      chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: 'Elena expects 10 to 14 more rooms from the late replies.' },
    { id: 'pa-d04', wedding_id: W, kind: 'choice', title: 'Late-night food at midnight', why_now: 'We confirm the late menu with the hotel a month ahead.',
      deadline: '2027-07-02', release_date: '2027-06-14', status: 'queued', delegable: true, budget_line_id: 'pa-b09', options: [
        opt('a', 'Dosa station', 'Shangri-La Paris', 5000, 'Made to order, with three chutneys.'), opt('b', 'Croque-monsieur and fries', 'Shangri-La Paris', 4200, 'Passed on trays.'),
        opt('c', 'Both, in half portions', 'Shangri-La Paris', 6400, 'One of each for every guest who wants it.')
      ], recommended_option_id: 'c', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'pa-d05', wedding_id: W, kind: 'choice', title: 'Band set list: entrance, first dance and last song', why_now: 'The band needs six weeks to arrange a first dance.',
      deadline: '2027-07-09', release_date: '2027-06-21', status: 'queued', delegable: false, budget_line_id: null, options: [
        opt('a', 'Send us your three songs', '', null, 'We pass them to the band leader with your notes.'), opt('b', 'Ask the band to propose three for each', '', null, 'They send recordings.')
      ], recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: null, decided_by: null, internal_notes: '' },
    { id: 'pa-d06', wedding_id: W, kind: 'choice', title: 'Venue', why_now: '', deadline: '2026-09-11', release_date: '2026-08-28', status: 'decided', delegable: false, budget_line_id: 'pa-b01',
      options: [
        opt('a', 'Shangri-La Paris, 16e', 'Shangri-La Paris', 120000, 'Historic salons for a seated dinner of 220, a soundproofed salon for the sangeet, the Eiffel Terrace for cocktails.', { source_ref: 'F-PAR-02' }),
        opt('b', 'Pavillon Ledoyen, 8e', 'Pavillon Ledoyen', null, 'Private salons close to the Champs-\u00c9lys\u00e9es. A seated figure for 220 is not published, so it would need a site check.', { source_ref: 'F-PAR-06' }),
        opt('c', 'Musée Rodin sculpture garden, 7e', 'Musée Rodin', null, 'Garden hire from EUR 39,500 before VAT (published price), plus a marquee, staff and technical costs. Events from 19:30, or all day on Mondays. The museum does not say whether it hosts weddings.', { source_ref: 'F-PAR-07' })
      ], recommended_option_id: 'a', recommendation_reason: 'The only one of the three with a seated dinner for 220 in the venue\'s own figures, and a separate soundproofed salon for the sangeet.',
      chosen_option_id: 'a', decided_at: '2026-09-06T04:30:00Z', decided_by: 'c_paris', internal_notes: '' },
    { id: 'pa-d07', wedding_id: W, kind: 'choice', title: 'Floral studio', why_now: '', deadline: '2027-01-29', release_date: '2027-01-22', status: 'decided', delegable: false, budget_line_id: 'pa-b10',
      options: [opt('a', 'Atelier Feuille Lente: loose, garden-grown', 'Atelier Feuille Lente', 84000, 'Sample table in ivory, blush and pale gold'), opt('b', 'Studio two: structured, architectural', '', 78000, ''),
        opt('c', 'Studio three: dense, all-white', '', 91000, '', { brief_ref: 'Against "Warm, not formal" in your brief' })],
      recommended_option_id: 'a', recommendation_reason: 'The only sample table that felt warm under candlelight.', chosen_option_id: 'a', decided_at: '2027-01-28T05:15:00Z', decided_by: 'c_paris', internal_notes: '' },
    { id: 'pa-d08', wedding_id: W, kind: 'choice', title: 'Saturday band', why_now: '', deadline: '2027-02-05', release_date: '2027-01-29', status: 'decided', delegable: false, budget_line_id: 'pa-b16',
      options: [opt('a', 'Orchestre Minuit Douze, twelve players', 'Orchestre Minuit Douze', 30000, 'Soul, disco, and Tamil and Hindi film songs'), opt('b', 'Eight-piece soul band', '', 22000, ''), opt('c', 'DJ with live saxophone', '', 12000, '')],
      recommended_option_id: 'a', recommendation_reason: 'The only band that plays both families\' dance floors well.', chosen_option_id: 'a', decided_at: '2027-02-03T03:40:00Z', decided_by: 'c_paris', internal_notes: '' },
    { id: 'pa-d09', wedding_id: W, kind: 'choice', title: 'Ceremony musicians', why_now: '', deadline: '2027-02-05', release_date: '2027-01-29', status: 'decided', delegable: false, budget_line_id: 'pa-b18',
      options: [opt('a', 'Kalyana Isai Ensemble: nadaswaram and thavil', 'Kalyana Isai Ensemble', 9500, 'Two players from London, travel included'), opt('b', 'String quartet only', '', 5200, 'Western repertoire for the whole ceremony')],
      recommended_option_id: 'a', recommendation_reason: 'Lakshmi asked for the sound she remembers from family weddings.', chosen_option_id: 'a', decided_at: '2027-02-02T06:00:00Z', decided_by: 'c_paris', internal_notes: '' },
    { id: 'pa-d10', wedding_id: W, kind: 'choice', title: 'Welcome bag contents', why_now: '', deadline: '2027-04-23', release_date: '2027-04-12', status: 'delegated', delegable: true, budget_line_id: 'pa-b22',
      options: [opt('a', 'Paris: macarons, a hand-drawn map of the 16e, a linen fan', '', 11000, ''), opt('b', 'Practical: water, a travel adaptor, blister plasters, the weekend card', '', 9000, '')],
      recommended_option_id: 'a', recommendation_reason: '', chosen_option_id: null, decided_at: '2027-04-20T04:00:00Z', decided_by: 'c_paris', internal_notes: 'We chose the Paris bag, with adaptors added for guests from India and the US.' }
  ];

  /* ---------- documents and links ---------- */
  var d = 0;
  function D(type, category, title, url, extra) {
    d++;
    return Object.assign({ id: 'pa-doc' + String(d).padStart(2, '0'), wedding_id: W, type: type, category: category, title: title, url: url,
      version: 1, status: 'signed', added_by: 'u_elena', added_at: '2027-03-31', client_visible: true }, extra || {});
  }
  var U = 'https://example.com/lumiere/';
  var documents = [
    D('contract', 'Contracts', 'Planning agreement with VKRI', U + 'planning-agreement.pdf', { added_at: '2026-07-15' }),
    D('contract', 'Contracts', 'Shangri-La Paris: salons and catering', U + 'venue-contract.pdf', { version: 2, added_at: '2026-09-18' }),
    D('contract', 'Contracts', 'Florals and sangeet styling, contract of 12 March', U + 'florals.pdf', { added_at: '2027-03-12' }),
    D('contract', 'Contracts', 'Florals: amendment for the new direction', U + 'florals-amendment-draft.pdf', { status: 'draft', client_visible: false, added_at: '2027-05-11' }),
    D('contract', 'Contracts', 'Production, lighting and mandap build', U + 'production.pdf', { version: 2 }),
    D('contract', 'Contracts', 'Band and ceremony musicians', U + 'music.pdf'),
    D('contract', 'Contracts', 'Sangeet DJ and dhol players', U + 'sangeet-music-draft.pdf', { status: 'draft', client_visible: false, added_by: 'u_camille', added_at: '2027-04-26' }),
    D('contract', 'Contracts', 'Photography and film', U + 'photo-film.pdf'),
    D('contract', 'Contracts', 'Transport, hair and make-up, stationery', U + 'other-suppliers.pdf', { version: 2 }),
    D('plan', 'Design', 'Design deck, version 3 (approved in March)', U + 'design-deck-v3.pdf', { version: 3, status: 'approved', added_by: 'u_riccardo', added_at: '2027-03-12' }),
    D('proof', 'Design', 'Floral directions: three options with prices', U + 'floral-directions.pdf', { status: 'awaiting approval', added_by: 'u_riccardo', added_at: '2027-05-10' }),
    D('plan', 'Design', 'Floor plan, version 2', U + 'floor-plan-v2.pdf', { version: 2, status: 'approved', added_by: 'u_matteo', added_at: '2027-04-02' }),
    D('link', 'Design', 'Moodboard: the new floral concept', 'https://example.com/boards/lumiere-v2', { status: 'shared', added_by: 'u_riccardo', added_at: '2027-05-03' }),
    D('plan', 'Design', 'Sangeet layout: stations or seated, two drawings', U + 'sangeet-layouts.pdf', { status: 'shared', added_by: 'u_matteo', added_at: '2027-05-12' }),
    D('plan', 'Guests & travel', 'Guest travel guide: Paris in late August', U + 'travel-guide.pdf', { status: 'shared', added_at: '2027-03-12' }),
    D('plan', 'Guests & travel', 'Rooming list by hotel', U + 'rooming-list.xlsx', { version: 3, status: 'shared', added_at: '2027-05-14' }),
    D('plan', 'Guests & travel', 'Invitation letters for visas: tracker', U + 'visa-letters.xlsx', { status: 'internal', client_visible: false, added_at: '2027-05-14' }),
    D('plan', 'Timeline', 'Weekend timeline, version 2', U + 'weekend-timeline-v2.pdf', { version: 2, status: 'shared', added_by: 'u_camille', added_at: '2027-04-09' }),
    D('plan', 'Timeline', 'Supplier contact sheet', U + 'contact-sheet.pdf', { status: 'internal', client_visible: false, added_by: 'u_matteo' }),
    D('legal', 'Legal paperwork', 'Passports: copies of both', U + 'paperwork', { status: 'done', due: '2026-10-01', owner_id: 'u_camille' }),
    D('legal', 'Legal paperwork', 'Guest data: consent for the travel desk to hold passport details', U + 'paperwork', { status: 'done', due: '2027-03-12', owner_id: 'u_elena' }),
    D('legal', 'Legal paperwork', 'Insurance certificates from every supplier', U + 'paperwork', { status: 'done', due: '2027-04-09', owner_id: 'u_elena' }),
    D('legal', 'Legal paperwork', 'Supplier NDAs: signed copies filed', U + 'paperwork', { status: 'done', due: '2027-04-16', owner_id: 'u_elena' }),
    D('legal', 'Legal paperwork', 'Ceremonial fire: written arrangement with the hotel', U + 'paperwork', { status: 'todo', due: '2027-05-31', owner_id: 'u_camille' }),
    D('legal', 'Legal paperwork', 'Event liability insurance for the weekend', U + 'paperwork', { status: 'todo', due: '2027-06-30', owner_id: 'u_elena' }),
    D('legal', 'Legal paperwork', 'Release forms for sangeet performers who appear in the film', U + 'paperwork', { status: 'todo', due: '2027-07-23', owner_id: 'u_camille' }),
    D('link', 'Links', 'Wedding website', 'https://example.com/priya-and-alexander', { status: 'shared', added_by: 'c_paris', added_at: '2027-02-20' }),
    D('link', 'Links', 'Shared photo album', 'https://example.com/albums/lumiere', { status: 'shared', added_by: 'c_paris', added_at: '2027-03-02' }),
    D('link', 'Links', 'Sangeet rehearsal videos', 'https://example.com/videos/sangeet', { status: 'shared', added_by: 'c_paris', added_at: '2027-04-30' }),
    D('link', 'Links', 'Outfit fittings calendar', 'https://example.com/calendar/fittings-lumiere', { status: 'shared', added_by: 'c_paris', added_at: '2027-03-18' })
  ];

  /* ---------- risks and Plan B ---------- */
  var risks = [
    { id: 'pa-r1', wedding_id: W, title: 'The florist releases our August slot', likelihood: 'Medium', impact: 'High', trigger: 'No floral decision by 24 May', plan_b: 'The approved concept can still be delivered as contracted; two other studios keep their January quotes', owner_id: 'u_camille', status: 'Open: decision with the couple', client_visible: true },
    { id: 'pa-r2', wedding_id: W, title: 'Suppliers away in mid-August', likelihood: 'Medium', impact: 'Medium', trigger: 'Any tasting, fitting or delivery falling between 3 and 23 August', plan_b: 'Every meeting booked before 31 July, balances due 30 July, and each supplier names someone who works in August. A planning assumption from past summers.', owner_id: 'u_matteo', status: 'Covered', client_visible: true },
    { id: 'pa-r3', wedding_id: W, title: 'Heat on Saturday', likelihood: 'Low', impact: 'Medium', trigger: 'Forecast above 30 C at 72 hours', plan_b: 'Room temperature agreed with the hotel in July; fans and chilled water at the ceremony; cocktails move to the foyer', owner_id: 'u_camille', status: 'Covered', client_visible: true },
    { id: 'pa-r4', wedding_id: W, title: 'Guests from India wait too long for visa appointments', likelihood: 'Medium', impact: 'Medium', trigger: 'Any invitation letter requested after 1 June', plan_b: 'Letters sent within two days of a request; the list of guests still waiting is reviewed every Friday', owner_id: 'u_elena', status: 'Open: 7 letters to send', client_visible: true },
    { id: 'pa-r5', wedding_id: W, title: 'A live flame is not possible at the ceremony', likelihood: 'Medium', impact: 'Medium', trigger: 'The hotel\'s written answer', plan_b: 'A brass lamp in place of the fire, already agreed with the priest', owner_id: 'u_camille', status: 'Open: waiting for the hotel', client_visible: false },
    { id: 'pa-r6', wedding_id: W, title: 'Forecast stays above the envelope', likelihood: 'High', impact: 'Medium', trigger: 'The floral change approved as proposed', plan_b: 'A lighter floral direction; a reserve review with Alexander before the second floral instalment', owner_id: 'u_elena', status: 'Open', client_visible: false }
  ];

  /* ---------- messages from the couple (reply-time trail) ---------- */
  var messages = [
    { id: 'pa-m1', wedding_id: W, from_user_id: 'c_paris', channel: 'email', subject: 'What exactly does the floral change include?', body: 'Before we decide: does the EUR 46,000 include the garlands and the flowers on the mandap, or are those extra? Alexander would also like to know what we give up with the new concept for the ceremony only.',
      received_at: '2027-05-15T04:20:00Z', due_by: '2027-05-16T04:20:00Z', acknowledged_at: '2027-05-15T07:45:00Z', answered_at: null, answer: '', answered_by: null, owner_id: 'u_camille', internal_notes: 'Needs the florist\'s line-by-line quote, promised for Saturday and not received. Answer today with what we know and send the detail after.' },
    { id: 'pa-m2', wedding_id: W, from_user_id: 'c_paris', channel: 'whatsapp', subject: 'Grandmother\'s flight from Chennai', body: 'My grandmother can fly into Paris on Wednesday 25 August. Can someone meet her at the plane with a wheelchair, and will her room be ready that morning?',
      received_at: '2027-05-17T05:10:00Z', due_by: '2027-05-18T05:10:00Z', acknowledged_at: null, answered_at: null, answer: '', answered_by: null, owner_id: null, internal_notes: '' },
    { id: 'pa-m3', wedding_id: W, from_user_id: 'c_paris', channel: 'email', subject: 'Paying the bar invoice in dollars', body: 'Alexander\'s father asks whether he can pay the bar deposit in dollars, and at which rate.',
      received_at: '2027-05-06T19:00:00Z', due_by: '2027-05-07T19:00:00Z', acknowledged_at: '2027-05-07T08:10:00Z', answered_at: '2027-05-08T10:30:00Z', answer: 'Yes. His bank converts on the day he sends it and the hotel receives euros. The deposit is EUR 26,000. Elena has sent him the wire details directly.', answered_by: 'u_elena', owner_id: 'u_elena', internal_notes: 'Answered 15 hours after the promise. Elena was covering the Como rooming lists and did not hand it over.' },
    { id: 'pa-m4', wedding_id: W, from_user_id: 'c_paris', channel: 'portal', subject: 'Jain meals for the Shah family', body: 'Our friends Nirav and Hetal Shah keep a Jain diet. Can they be looked after at every event, including the sangeet?',
      received_at: '2027-04-29T03:00:00Z', due_by: '2027-04-30T03:00:00Z', acknowledged_at: '2027-04-29T07:30:00Z', answered_at: '2027-04-29T15:40:00Z', answer: 'Yes. Jain meals for both at every event: vegetarian, no root vegetables, no eggs, prepared separately. At the sangeet their plates are brought to them rather than served from the stations. Hetal\'s sesame allergy is on the sheet too.', answered_by: 'u_camille', owner_id: 'u_camille', internal_notes: '' },
    { id: 'pa-m5', wedding_id: W, from_user_id: 'c_paris', channel: 'whatsapp', subject: 'Flowers, after the family visit', body: 'Having seen the salons with my parents, we would like the ceremony to feel more like home: jasmine, marigold, a mandap in flowers. Is it too late to change?',
      received_at: '2027-04-27T05:30:00Z', due_by: '2027-04-28T05:30:00Z', acknowledged_at: '2027-04-27T07:15:00Z', answered_at: '2027-04-28T16:20:00Z', answer: 'Not too late. We have reopened the florals and will send three priced directions by 7 May, from the full new concept to a lighter change. Nothing is ordered until you choose.', answered_by: 'u_camille', owner_id: 'u_camille', internal_notes: 'Answered 11 hours after the promise: we waited for the florist\'s first view before replying. Should have written the same day to say when the answer would come.' },
    { id: 'pa-m6', wedding_id: W, from_user_id: 'c_paris', channel: 'email', subject: 'Invitation letters for our guests in Chennai', body: 'Several relatives in Chennai need an invitation letter for their visa appointments. Who should they write to?',
      received_at: '2027-04-19T16:00:00Z', due_by: '2027-04-20T16:00:00Z', acknowledged_at: '2027-04-19T16:30:00Z', answered_at: '2027-04-20T09:15:00Z', answer: 'Elena prepares every letter. Guests can write to her directly or ask on the travel page of your website; she sends each one within two days.', answered_by: 'u_elena', owner_id: 'u_elena', internal_notes: '' }
  ];

  /* ---------- Friday letters (the 7 May letter went out three days late; the record says so) ---------- */
  var weekly_recaps = [
    { id: 'pa-w1', wedding_id: W, week_of: '2027-04-30', author_id: 'u_camille', status: 'sent', sent_at: '2027-04-30T15:30:00Z',
      done: ['Family visit to the salons with Priya\'s parents', 'Florals reopened at your request', 'Every invitation posted; the first replies are in'],
      in_motion: ['Three floral directions, priced, by 7 May', 'Invitation letters for guests applying for visas'],
      waiting_on: [{ item: 'Signed contract and revised rider', who: 'Sangeet DJ and dhol players', since: '2027-04-26' }],
      needs_you: [], budget_note: 'Forecast unchanged this week. The floral change will move it; you will see the numbers before anything is ordered.' },
    { id: 'pa-w2', wedding_id: W, week_of: '2027-05-07', author_id: 'u_camille', status: 'sent', sent_at: '2027-05-10T08:15:00Z',
      note: 'This letter is three days late. It should have reached you on Friday 7 May; we held it to include the floral prices, and should have written on time and said so.',
      done: ['Three floral directions priced and sent this morning', 'Sangeet stage position confirmed on the floor plan', 'Twenty invitation letters sent for visa appointments'],
      in_motion: ['Sangeet music contract', 'Ceremonial fire: written answer from the hotel', 'Travel desk: flights from the US and India'],
      waiting_on: [{ item: 'Signed contract and revised rider', who: 'Sangeet DJ and dhol players', since: '2027-04-26' }],
      needs_you: [{ text: 'Floral direction', due: '2027-05-21' }],
      budget_note: 'The full new floral concept adds EUR 46,000 and would take the forecast EUR 27,100 over your envelope. The new concept for the ceremony only adds EUR 20,000.' },
    { id: 'pa-w3', wedding_id: W, week_of: '2027-05-14', author_id: 'u_camille', status: 'sent', sent_at: '2027-05-14T15:45:00Z',
      done: ['99 of your 220 guests have replied; 91 are coming', '24 of 31 invitation letters sent for visa appointments', 'Jain meals for Nirav and Hetal Shah at every event'],
      in_motion: ['Sangeet music contract', 'Ceremonial fire: written answer from the hotel', 'First RSVP reminder, going out on 24 May'],
      waiting_on: [{ item: 'Line-by-line floral quote', who: 'Florist', since: '2027-05-12' }, { item: 'Signed contract and revised rider', who: 'Sangeet DJ and dhol players', since: '2027-04-26' }],
      needs_you: [{ text: 'Floral direction', due: '2027-05-21' }, { text: 'Room block at The Peninsula Paris', due: '2027-05-27' }, { text: 'Sangeet layout', due: '2027-05-28' }],
      budget_note: 'Without the floral change the forecast is EUR 18,900 inside your envelope. With it, as proposed, EUR 27,100 over.' },
    { id: 'pa-w4', wedding_id: W, week_of: '2027-05-21', author_id: 'u_camille', status: 'draft', sent_at: null,
      done: ['The lighting partner holds the rig for us until 4 June'],
      in_motion: ['What the floral change includes: the florist\'s line-by-line quote, then a full answer', 'Your grandmother\'s arrival on 25 August: car and wheelchair at CDG'],
      waiting_on: [{ item: 'Line-by-line floral quote', who: 'Florist', since: '2027-05-12' }, { item: 'Signed contract and revised rider', who: 'Sangeet DJ and dhol players', since: '2027-04-26' }],
      needs_you: [{ text: 'Floral direction, which settles the floral change', due: '2027-05-21' }, { text: 'Room block at The Peninsula Paris', due: '2027-05-27' }, { text: 'Sangeet layout', due: '2027-05-28' }],
      budget_note: 'Without the floral change the forecast is EUR 18,900 inside your envelope. With it, as proposed, EUR 27,100 over.' }
  ];

  var activity_log = [
    ['2027-05-16T16:10:00Z', 'u_matteo', 'marked "Lighting plot for the salons and the terrace" as blocked'],
    ['2027-05-15T07:45:00Z', 'u_camille', 'acknowledged "What exactly does the floral change include?"'],
    ['2027-05-14T15:45:00Z', 'u_camille', 'sent the Friday letter'],
    ['2027-05-14T10:20:00Z', 'u_elena', 'published the room block decision to the couple'],
    ['2027-05-14T09:30:00Z', 'u_matteo', 'marked "Mandap design and build drawings" as blocked'],
    ['2027-05-12T09:00:00Z', 'u_camille', 'published the sangeet layout decision to the couple'],
    ['2027-05-10T08:15:00Z', 'u_camille', 'sent the Friday letter for 7 May, three days late'],
    ['2027-05-10T08:00:00Z', 'u_riccardo', 'proposed a change: floral concept v2'],
    ['2027-05-08T10:30:00Z', 'u_elena', 'answered "Paying the bar invoice in dollars"'],
    ['2027-04-28T16:20:00Z', 'u_camille', 'set 1.3 Vendor Curation & Approvals to Awaiting client']
  ].map(function (a, i) { return { id: 'pa-a' + (i + 1), wedding_id: W, at: a[0], user_id: a[1], text: a[2] }; });

  S.add({ weddings: [wedding], phases: ph.phases, subphases: ph.subphases, tasks: tasks, comments: comments, events: events,
    accommodations: accommodations, guests: gen.guests, guest_event_rsvps: gen.guest_event_rsvps, vendors: vendors,
    budget_lines: budget_lines, change_orders: change_orders, invoices: invoices, decisions: decisions, documents: documents,
    risks: risks, messages: messages, weekly_recaps: weekly_recaps, activity_log: activity_log });
})(typeof window !== 'undefined' ? window : globalThis);
