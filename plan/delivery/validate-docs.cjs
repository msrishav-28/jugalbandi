#!/usr/bin/env node
'use strict';

// Read-only handbook checks. Product tests remain separate.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const delivery = __dirname;
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const hashText = (value) => hash(value.toString().replace(/\r\n/g, '\n'));
const required = ['README.md', 'PROJECT_MAP.md', 'SOURCE_RECONCILIATION.md',
  'REQUIREMENTS.md', 'ARCHITECTURE.md', 'CONTRACTS.md', 'DATA_AND_PRIVACY.md',
  'SECURITY.md', 'WORK_PACKAGES.md', 'TRACKER.md', 'DECISIONS_AND_APPROVALS.md',
  'VERIFICATION.md', 'OPERATIONS.md', 'AI_EVALUATION.md', 'HANDOFF.md',
  'EVIDENCE.md', 'SOURCE_COVERAGE.csv', 'SOURCE_BASELINE.json', 'validate-docs.cjs',
  'validate-docs.test.cjs', 'DOCUMENT_FINGERPRINTS.json'];
for (const file of required) check(fs.existsSync(path.join(delivery, file)), `Missing ${file}`);
check(fs.existsSync(path.join(root, 'AGENTS.md')), 'Missing root AGENTS.md');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

function tableRows(text) {
  return text.split(/\r?\n/).filter(line => line.startsWith('|')).map(line =>
    line.split('|').slice(1, -1).map(cell => cell.trim()));
}
function anchors(text) {
  const result = new Set();
  const seen = new Map();
  for (const match of text.matchAll(/<a\s+id="([^"]+)"/g)) result.add(match[1]);
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (!match) continue;
    const base = match[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');
    const count = seen.get(base) || 0;
    result.add(count ? `${base}-${count}` : base);
    seen.set(base, count + 1);
  }
  return result;
}
const markdown = [path.join(root, 'AGENTS.md'), ...fs.readdirSync(delivery)
  .filter(file => file.endsWith('.md')).map(file => path.join(delivery, file))];
let links = 0;
for (const file of markdown) {
  for (const match of read(file).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [target, fragment] = href.split('#');
    const resolved = target ? path.resolve(path.dirname(file), decodeURIComponent(target)) : file;
    check(fs.existsSync(resolved), `Broken link ${path.relative(root, file)} -> ${href}`);
    if (fs.existsSync(resolved) && fragment && resolved.endsWith('.md')) {
      check(anchors(read(resolved)).has(decodeURIComponent(fragment)), `Broken anchor ${href} in ${path.basename(file)}`);
    }
    links++;
  }
}

const requirements = new Map();
for (const cells of tableRows(read(path.join(delivery, 'REQUIREMENTS.md')))) {
  if (!/^GL-R-\d{3}$/.test(cells[0])) continue;
  check(!requirements.has(cells[0]), `Duplicate requirement ${cells[0]}`);
  check(cells.length === 5 && cells.slice(1).every(Boolean), `Incomplete requirement ${cells[0]}`);
  requirements.set(cells[0], cells);
}
const cards = new Map();
const work = read(path.join(delivery, 'WORK_PACKAGES.md'));
for (const match of work.matchAll(/^### (GL-[A-Z]+-\d{3}) — (.+)\n([\s\S]*?)(?=^<a id=|(?![\s\S]))/gm)) {
  check(!cards.has(match[1]), `Duplicate task ${match[1]}`);
  cards.set(match[1], { title: match[2], body: match[3] });
}
const fields = ['Phase / priority', 'Requirements', 'Depends on', 'Approval references',
  'Edit boundary and reuse', 'Behavior / interfaces', 'Acceptance',
  'Verification / client proof', 'Recovery', 'Observability', 'Stop / escalate'];
for (const [id, card] of cards) {
  for (const field of fields) check(card.body.includes(`**${field}:**`), `${id} missing ${field}`);
  card.reqs = [...card.body.match(/^\- \*\*Requirements:\*\* (.+)$/m)?.[1].matchAll(/GL-R-\d{3}/g) || []].map(m => m[0]);
  const deps = card.body.match(/^\- \*\*Depends on:\*\* (.+)$/m)?.[1] || '';
  card.deps = [...deps.matchAll(/GL-[A-Z]+-\d{3}/g)].map(m => m[0]);
  card.gates = [...(card.body.match(/^\- \*\*Approval references:\*\* (.+)$/m)?.[1] || '').matchAll(/(?:G-[A-Z]+|A-DOC-001)/g)].map(m => m[0]);
  for (const req of card.reqs) check(requirements.has(req), `${id} unknown requirement ${req}`);
  for (const dep of card.deps) check(cards.has(dep), `${id} unknown dependency ${dep}`);
}
for (const [id, cells] of requirements) {
  const taskRefs = [...cells[4].matchAll(/GL-[A-Z]+-\d{3}/g)].map(m => m[0]);
  check(taskRefs.length > 0, `${id} has no task`);
  for (const task of taskRefs) {
    check(cards.has(task), `${id} unknown task ${task}`);
    if (cards.has(task)) check(cards.get(task).reqs.includes(id), `${id}/${task} traceability is not reciprocal`);
  }
}
const visited = new Set(), active = new Set();
function visit(id, trail = []) {
  if (active.has(id)) { errors.push(`Dependency cycle: ${[...trail, id].join(' -> ')}`); return; }
  if (visited.has(id) || !cards.has(id)) return;
  active.add(id);
  for (const dep of cards.get(id).deps) visit(dep, [...trail, id]);
  active.delete(id); visited.add(id);
}
for (const id of cards.keys()) visit(id);

const decisions = read(path.join(delivery, 'DECISIONS_AND_APPROVALS.md'));
const knownGates = new Set(tableRows(decisions).map(row => row[0]).filter(id => /^G-/.test(id)));
const approved = new Set(tableRows(decisions).filter(row => row[1] === 'APPROVED').map(row => row[0]));
const approvalCoverage = new Map(tableRows(decisions).filter(row => row[1] === 'APPROVED')
  .map(row => [row[0], new Set((row[5] || '').match(/(?:G-[A-Z]+|A-[A-Z]+-\d{3})/g) || [])]));
const evidence = read(path.join(delivery, 'EVIDENCE.md'));
const trackerText = read(path.join(delivery, 'TRACKER.md'));
const states = new Set(['NOT_STARTED','READY','IN_PROGRESS','IN_REVIEW','VERIFIED','BLOCKED',
  'AWAITING_APPROVAL','REVALIDATION_REQUIRED','DEFERRED','SUPERSEDED']);
const ledger = new Map();
for (const row of tableRows(trackerText)) {
  const id = row[0].match(/^\[(GL-[A-Z]+-\d{3})\]/)?.[1];
  if (!id) continue;
  check(!ledger.has(id), `Duplicate tracker task ${id}`);
  check(row.length === 13, `Tracker ${id} must have 13 fields`);
  check(cards.has(id), `Tracker has unknown task ${id}`);
  check(states.has(row[8]), `${id} unknown state ${row[8]}`);
  check(Boolean(row[12]) && row[12] !== '—', `${id} needs next action`);
  const card = cards.get(id);
  if (card) {
    check(row[3] === card.reqs.join(', '), `${id} requirements differ between card and ledger`);
    check(row[4] === (card.deps.join(', ') || '—'), `${id} dependencies differ between card and ledger`);
    for (const gate of card.gates) check(knownGates.has(gate) || approved.has(gate), `${id} unknown gate ${gate}`);
  }
  if (['IN_PROGRESS','IN_REVIEW','VERIFIED'].includes(row[8])) {
    check(row[6] !== 'Unassigned' && row[7] !== 'Unassigned', `${id} lacks owner/review assignment`);
    const claims = [...trackerText.matchAll(new RegExp(`^### [^\\n]*${id}[^\\n]*\\n([\\s\\S]*?)(?=^###? |(?![\\s\\S]))`, 'gm'))];
    const claim = claims.at(-1)?.[1] || '';
    check(Boolean(claim), `${id} lacks dated claim record`);
    const referencedApprovals = claim.match(/A-[A-Z]+-\d{3}/g) || [];
    for (const approval of referencedApprovals) check(approved.has(approval), `${id} references unapproved ${approval}`);
    const inapplicable = (claim.match(/Not applicable gates: ([^\n]+)/)?.[1] || '').match(/G-[A-Z]+/g) || [];
    if (!claim.includes('Action class: READ_ONLY')) {
      for (const gate of card?.gates || []) {
        check(inapplicable.includes(gate) || referencedApprovals.some(a => approvalCoverage.get(a)?.has(gate)), `${id} gate ${gate} lacks scoped approval or reviewed non-applicability`);
      }
    }
  }
  if (row[8] === 'VERIFIED') {
    check(row[9] !== '—' && row[10] !== '—' && row[11] !== '—', `${id} lacks verification evidence/date/revision`);
    const evidenceIds = row[9].match(/EV-[A-Z]+-\d{3}/g) || [];
    check(evidenceIds.length > 0, `${id} needs a real evidence record ID`);
    for (const ev of evidenceIds) {
      const record = evidence.split(new RegExp(`^## ${ev}[^\n]*\n`, 'm'))[1]?.split(/^## /m)[0];
      check(Boolean(record) && /Outcome: PASS/.test(record), `${id} evidence ${ev} is not a recorded PASS`);
    }
    if (id !== 'GL-DOCS-001' && card?.gates.length) {
      check(!/Self-review/.test(row[7]), `${id} high-risk completion lacks independent reviewer`);
    }
  }
  ledger.set(id, row);
}
for (const id of cards.keys()) check(ledger.has(id), `Missing tracker task ${id}`);
for (const [id, row] of ledger) {
  if (['READY','IN_PROGRESS','IN_REVIEW','VERIFIED'].includes(row[8])) {
    for (const dep of cards.get(id)?.deps || []) check(ledger.get(dep)?.[8] === 'VERIFIED', `${id} has unverified prerequisite ${dep}`);
  }
}

if (ledger.get('GL-DOCS-001')?.[8] === 'VERIFIED') {
  const fingerprints = JSON.parse(read(path.join(delivery, 'DOCUMENT_FINGERPRINTS.json')));
  check(fingerprints.id === ledger.get('GL-DOCS-001')[11], 'Documentation evidence snapshot does not match tracker');
  for (const [file, expected] of Object.entries(fingerprints.files)) {
    const full = path.join(root, file);
    check(fs.existsSync(full) && hashText(fs.readFileSync(full)) === expected, `Stale documentation evidence: ${file}; revalidation required`);
  }
}

function parseCsv(text) {
  return text.trim().split(/\r?\n/).map(line => {
    const cells = []; let value = '', quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { if (quoted && line[i+1] === '"') { value += '"'; i++; } else quoted = !quoted; }
      else if (ch === ',' && !quoted) { cells.push(value); value = ''; }
      else value += ch;
    }
    cells.push(value); return cells;
  });
}
const coverage = parseCsv(read(path.join(delivery, 'SOURCE_COVERAGE.csv'))).slice(1);
const coverageKeys = new Set();
const baselineRecord = JSON.parse(read(path.join(delivery, 'SOURCE_BASELINE.json')));
const baseline = baselineRecord.files;
let sectionCount = 0;
for (const file of fs.readdirSync(path.join(root, 'plan')).filter(f => f.endsWith('.md'))) {
  const relative = `plan/${file}`, data = read(path.join(root, relative));
  check(hashText(fs.readFileSync(path.join(root, relative))) === baselineRecord.source_plan_lf_hashes[relative], `Source plan changed: update reviewed coverage/baseline for ${file}`);
  const lines = data.split(/\r?\n/), sections = [];
  const rx = file.includes('operating_manual') ? /^# (\d+)\.\s/ : /^## (?:(\d+)\.\s|Executive Summary|Appendix ([AB]):)/;
  lines.forEach((line, i) => { const m = line.match(rx); if (m) sections.push({key:m[1]||m[2]||'1',start:i+1,heading:line.replace(/^#+ /,'')}); });
  sections.forEach((section, i) => {
    const matches = coverage.filter(row => row[0] === relative && row[1] === section.key);
    check(matches.length === 1, `Source section coverage missing/duplicate: ${relative}:${section.key}`);
    const row = matches[0];
    if (row) {
      check(Number(row[2]) === section.start && Number(row[3]) === (sections[i+1]?.start - 1 || lines.length), `Stale source range ${relative}:${section.key}`);
      check(row[4] === section.heading && Boolean(row[5]), `Stale heading/disposition ${relative}:${section.key}`);
      for (const req of row[6].split(';')) check(requirements.has(req), `Source coverage unknown requirement ${req}`);
      coverageKeys.add(`${relative}:${section.key}`);
    }
    sectionCount++;
  });
}
check(coverage.length === coverageKeys.size, 'Extra/duplicate source coverage records');

let preserved = 0;
if (process.argv.includes('--preservation')) {
  for (const [file, expected] of Object.entries(baseline)) {
    const full = path.join(root, file);
    check(fs.existsSync(full), `Original file missing ${file}`);
    if (!fs.existsSync(full)) continue;
    let actual = fs.readFileSync(full);
    if (file === '.gitignore') {
      const text = actual.toString('utf8');
      const addition = /\r?\n# Shared GoldLens delivery instructions must travel with the source\.\r?\n!\/AGENTS\.md\r?\n?$/;
      check(addition.test(text), 'Missing exact root-only instruction ignore exception');
      const original = text.replace(addition, '');
      const candidates = [original, original+'\n', original+'\r\n', original.replace(/\r?\n/g,'\r\n'), original.replace(/\r\n/g,'\n')];
      check(candidates.some(candidate => hash(candidate) === expected), 'Unexpected original .gitignore changes');
    } else check(hash(actual) === expected, `Original file changed ${file}`);
    preserved++;
  }
}
if (errors.length) {
  console.error(`FAIL: ${errors.length} documentation issues\n${errors.map(e => '- '+e).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${required.length + 1} required artifacts; ${requirements.size} requirements; ${cards.size} tasks; ${sectionCount} source sections; ${links} local links; acyclic dependencies and valid tracker/evidence states.`);
  if (process.argv.includes('--preservation')) console.log(`PASS: ${preserved} original files checked; only the exact root AGENTS.md ignore exception is allowed.`);
  console.log('Limit: static handbook checks; no product tests, security sign-off, deployment or semantic completeness claim.');
}
