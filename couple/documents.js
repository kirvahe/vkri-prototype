/* Couple portal: Documents (#/documents). Everything in one place, at least as a link:
   sections in the order of VKRI.enums.docCategories, legal paperwork as a checklist,
   "Add a link" (api.addLink), the scope of service as a checklist, photo consent (api.setPhotoConsent)
   and "Export everything" (one JSON file built from every table this couple can read, offered as a Blob URL). */
(function () {
  'use strict';
  var C = VKRI.couple, ui = VKRI.ui, fmt = VKRI.fmt, esc = ui.esc;
  var LEGAL = 'Legal paperwork';
  /* UI state that survives C.render() */
  var S = { linkError: '', draft: { title: '', url: '', cat: 'Links' }, exportUrl: '', exportName: '', exportSize: 0, exportWedding: '' };

  var CONSENT = [
    ['private', 'Private', 'Your photographs and film stay with you. Nobody else may publish them.'],
    ['editorial', 'Editorial', 'One publication may feature the wedding, using only images you approve.'],
    ['portfolio', 'Portfolio', 'VKRI and your photographers may show a selection you approve.']
  ];

  function secId(cat) { return 'docs-' + cat.toLowerCase().replace(/[^a-z]+/g, '-'); }
  function added(doc) {
    var who = C.userName(doc.added_by);
    return 'Version ' + (doc.version || 1) + (who ? ' · added by ' + esc(who) : '') + (doc.added_at ? ', ' + fmt.dateY(doc.added_at) : '');
  }
  function docRow(doc, openProofs) {
    var url = ui.docAttrs(doc, '../shared/'), proof = openProofs[doc.id];
    var inner = '<span class="di">' + ui.icon(doc.type === 'link' ? 'link' : 'doc') + '</span><span class="col gap-1 grow"><span class="small strong">' + esc(doc.title) + '</span>' +
      '<span class="xs muted">' + added(doc) + '</span></span>';
    return '<li class="doc">' + (url ? '<a class="doc-link"' + url + '>' + inner + '</a>' : '<div class="doc-link">' + inner + '</div>') +
      '<span class="col gap-2 lr">' + ui.pill('doc', doc.status) +
      (proof ? '<button class="btn sm" data-act="openDecision" data-id="' + esc(proof.id) + '">Review</button>' : '') + '</span></li>';
  }
  function legalList(docs) {
    var done = docs.filter(function (d) { return d.status === 'done'; }).length;
    return '<p class="small soft">' + done + ' of ' + docs.length + ' complete. Who is handling each item and by when. Illustrative list for this demo.</p>' +
      '<ul class="checklist">' + docs.slice().sort(function (a, b) { return (a.due || '') < (b.due || '') ? -1 : 1; }).map(function (d) {
        var isDone = d.status === 'done', owner = d.owner_id ? C.userName(d.owner_id) : '', due = d.due ? fmt.due(d.due) : null;
        var url = ''; // checklist steps are not documents: no link
        return '<li class="' + (isDone ? 'done' : '') + '"><span class="tick" aria-hidden="true">' + (isDone ? ui.icon('check') : '') + '</span>' +
          '<span class="col gap-1 grow"><span class="small strong">' + esc(d.title) + '</span>' +
          '<span class="xs ' + (!isDone && due && due.tone !== 'ok' ? 'tone-' + due.tone : 'muted') + '">' + (d.due ? (isDone ? 'Due ' + fmt.dateY(d.due) : 'Due ' + fmt.dateY(d.due) + ', ' + due.text) : 'No date yet') +
          (owner ? ' · ' + esc(owner) : '') + '</span></span>' + ui.pill('doc', d.status) + '</li>';
      }).join('') + '</ul>';
  }
  function addLinkForm() {
    var cats = VKRI.enums.docCategories.filter(function (c) { return c !== LEGAL; });
    return '<form class="col gap-3 addlink" data-form="addLink" novalidate><span class="strong small">Add a link</span>' +
      '<p class="xs muted">A shared album, a playlist, your wedding website. Everyone on your wedding can open it here.</p>' +
      '<label class="field"><span>Title</span><input class="input" name="title" id="link-title" required value="' + esc(S.draft.title) + '" placeholder="For example: our playlist"></label>' +
      '<label class="field"><span>Address</span><input class="input" name="url" id="link-url" type="url" inputmode="url" autocapitalize="off" required value="' + esc(S.draft.url) + '" placeholder="https://"></label>' +
      '<label class="field"><span>Section</span><select class="select" name="category" id="link-cat">' + cats.map(function (c) {
        return '<option' + (c === S.draft.cat ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></label>' +
      (S.linkError ? '<p class="small tone-crit" role="alert">' + esc(S.linkError) + '</p>' : '') +
      '<button class="btn primary" type="submit">Add the link</button></form>';
  }

  function scope(w) {
    var items = w.scope || [];
    if (!items.length) return '';
    var done = items.filter(function (s) { return s.status === 'done'; }).length, doing = items.filter(function (s) { return s.status === 'in_progress'; }).length;
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Scope of service</h2></div>' +
      '<p class="small"><span class="strong">' + fmt.plural(items.length, 'deliverable') + ', ' + done + ' complete</span>' + (doing ? '<span class="soft">, ' + doing + ' under way</span>' : '') + '.' +
      ' <span class="soft">What your planning agreement covers, in plain English.</span></p>' +
      '<ul class="checklist">' + items.map(function (s) {
        var isDone = s.status === 'done';
        return '<li class="' + (isDone ? 'done' : '') + '"><span class="tick" aria-hidden="true">' + (isDone ? ui.icon('check') : '') + '</span><span class="small grow">' + esc(s.name) + '</span>' + ui.pill('scope', s.status) + '</li>';
      }).join('') + '</ul></section>';
  }
  function privacy(w) {
    var val = w.photo_consent || 'private';
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Photographs and privacy</h2>' + ui.icon('shield') + '</div>' +
      '<p class="small">Nothing from your weekend is published anywhere without your written yes.</p>' +
      '<fieldset class="consent"><legend class="sr">Who may publish your photographs</legend>' + CONSENT.map(function (c) {
        return '<label class="consent-opt' + (val === c[0] ? ' on' : '') + '"><input type="radio" name="consent" id="consent-' + c[0] + '" value="' + c[0] + '" data-change="consent"' + (val === c[0] ? ' checked' : '') + '>' +
          '<span class="col gap-1"><span class="small strong">' + c[1] + (c[0] === 'private' ? ' <span class="xs muted" style="font-weight:400">(default)</span>' : '') + '</span><span class="xs soft">' + c[2] + '</span></span></label>';
      }).join('') + '</fieldset>' +
      (w.photo_consent_at ? '<p class="xs muted">Last changed ' + fmt.dateY(w.photo_consent_at.slice(0, 10)) + (w.photo_consent_at.slice(0, 10) === fmt.today() ? ', today' : '') + '.</p>' : '') + '</section>';
  }
  function exporter(w) {
    var ready = S.exportUrl && S.exportWedding === w.id;
    return '<section class="panel panel-pad col gap-3"><div class="sec-head"><h2 class="display d-sm">Export everything</h2></div>' +
      '<p class="small soft">Your wedding belongs to you. One file with every record you can see here: budget, invoices, guests, decisions, documents, letters and questions.</p>' +
      (ready ? '<a class="btn accent" href="' + esc(S.exportUrl) + '" download="' + esc(S.exportName) + '">' + ui.icon('out') + 'Download ' + esc(S.exportName) + '</a>' +
        '<p class="xs muted">' + Math.max(1, Math.round(S.exportSize / 1024)) + ' KB, JSON. Built ' + fmt.dateTimeIn(VKRI.now().toISOString(), w.home_tz) + ' your time.</p>'
        : '<button class="btn" data-act="exportAll">Prepare the file</button>') + '</section>';
  }

  C.screens.documents = function () {
    var w = C.w, docs = C.api.list('documents');
    var openProofs = {};
    C.api.list('decisions').forEach(function (d) { if (d.status === 'open' && d.document_id) openProofs[d.document_id] = d; });
    var jump = '<nav class="jump" aria-label="Sections">' + VKRI.enums.docCategories.map(function (cat) {
      var n = docs.filter(function (d) { return d.category === cat; }).length;
      return '<button class="chip" data-act="docJump" data-target="' + secId(cat) + '">' + esc(cat) + ' <span class="muted">' + n + '</span></button>';
    }).join('') + '<button class="chip" data-act="docJump" data-target="docs-yours">Scope and privacy</button></nav>';
    var sections = VKRI.enums.docCategories.map(function (cat) {
      var list = docs.filter(function (d) { return d.category === cat; })
        .sort(function (a, b) { return (a.added_at || '') < (b.added_at || '') ? 1 : -1; });
      var body = cat === LEGAL ? (list.length ? legalList(list) : '<p class="small muted">No paperwork is needed from you yet.</p>')
        : (list.length ? '<ul class="docs">' + list.map(function (d) { return docRow(d, openProofs); }).join('') + '</ul>' : '<p class="small muted">Nothing here yet.</p>');
      return '<section class="panel panel-pad col gap-3" id="' + secId(cat) + '"><div class="sec-head"><h2 class="display d-sm">' + esc(cat) + '</h2>' +
        '<span class="xs muted">' + (list.length ? fmt.plural(list.length, cat === LEGAL ? 'item' : cat === 'Links' ? 'link' : 'document') : '') + '</span></div>' + body +
        (cat === 'Links' ? '<hr class="rule">' + addLinkForm() : '') + '</section>';
    }).join('');
    return C.head('Documents and links', 'Everything in one place', fmt.plural(docs.length, 'document') + ' and links, newest first in each section. Tap one to open it.') +
      jump + '<div class="dgrid"><div class="col gap-5">' + sections + '</div><div class="col gap-5" id="docs-yours">' + scope(w) + privacy(w) + exporter(w) + '</div></div>';
  };

  C.actions.docJump = function (el) {
    var t = document.getElementById(el.getAttribute('data-target'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  C.forms.addLink = function (f) {
    var title = f.elements.title.value.trim(), url = f.elements.url.value.trim(), cat = f.elements.category.value;
    if (url && !/^[a-z][a-z0-9+.-]*:/i.test(url)) url = 'https://' + url;
    if (!title) S.linkError = 'Give the link a title.';
    else if (!C.safeUrl(url) || /\s/.test(url)) S.linkError = 'The address should start with https:// and have no spaces.';
    else S.linkError = '';
    S.draft = { title: title, url: f.elements.url.value.trim(), cat: cat };
    if (S.linkError) { C.render(); var el = document.getElementById(title ? 'link-url' : 'link-title'); if (el) el.focus(); return; }
    S.draft = { title: '', url: '', cat: 'Links' };
    C.api.addLink(title, url, cat);
    C.render(); ui.toast('Added to ' + cat + '.');
  };
  C.changes.consent = function (el) {
    C.api.setPhotoConsent(el.value);
    C.render(); ui.toast(el.value === 'private' ? 'Private. Nothing will be published.' : 'Saved. Only images you approve are shown.');
  };
  C.actions.exportAll = function () {
    var data = { exported_at: VKRI.now().toISOString(), wedding_id: C.w.id, note: 'Everything this couple can see in the VKRI portal. Demo data, illustrative.', tables: {} };
    VKRI.TABLES.forEach(function (t) { data.tables[t] = C.api.list(t); });
    var text = JSON.stringify(data, null, 2);
    if (S.exportUrl) { try { URL.revokeObjectURL(S.exportUrl); } catch (e) { /* already gone */ } }
    S.exportUrl = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    S.exportName = C.w.id + '-wedding-' + fmt.today() + '.json';
    S.exportSize = text.length; S.exportWedding = C.w.id;
    C.render();
  };
})();
