#!/usr/bin/env node
'use strict';

// Fault injection stays in memory: no files, services or product state are changed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, 'validate-docs.cjs'), 'utf8');

function run(changes = new Map()) {
  const output = [];
  const fakeProcess = { argv: ['node', 'validate-docs.cjs'], exitCode: 0,
    exit(code) { this.exitCode = code; throw new Error('validator-exit'); } };
  const proxyFs = Object.create(fs);
  proxyFs.readFileSync = (file, options) => {
    const value = fs.readFileSync(file, options);
    const mutate = changes.get(path.basename(String(file)));
    if (!mutate) return value;
    const modified = mutate(value.toString());
    return Buffer.isBuffer(value) ? Buffer.from(modified) : modified;
  };
  const context = { __dirname, require: name => name === 'node:fs' ? proxyFs : require(name),
    process: fakeProcess, console: { log: value => output.push(value), error: value => output.push(value) } };
  try { vm.runInNewContext(script, context, { timeout: 10000 }); }
  catch (error) { if (error.message !== 'validator-exit') throw error; }
  return { code: fakeProcess.exitCode, text: output.join('\n') };
}

const healthy = run();
assert.equal(healthy.code, 0, healthy.text);
console.log('PASS: healthy package validates');

const cases = [
  ['broken local link', 'README.md', s => s.replace('(PROJECT_MAP.md)', '(MISSING.md)'), /Broken link/],
  ['unknown requirement', 'WORK_PACKAGES.md', s => s.replace('GL-R-063', 'GL-R-999'), /unknown requirement/],
  ['dependency cycle', 'WORK_PACKAGES.md', s => s.replace('**Depends on:** None.', '**Depends on:** GL-BASE-001.'), /Dependency cycle/],
  ['missing source section', 'SOURCE_COVERAGE.csv', s => s.split('\n').filter((_, i) => i !== 1).join('\n'), /coverage missing/],
  ['revoked documentation approval', 'DECISIONS_AND_APPROVALS.md', s => s.replace('| APPROVED |', '| REQUESTED |'), /unapproved|lacks scoped approval/],
  ['unverified dependency marked ready', 'TRACKER.md', s => s.split('\n').map(line => line.startsWith('| [GL-IDENTITY-001]') ? line.replace('| NOT_STARTED |', '| READY |') : line).join('\n'), /unverified prerequisite/],
  ['unsupported completion claim', 'TRACKER.md', s => s.split('\n').map(line => line.startsWith('| [GL-DOCS-001]') ? line.replace(/\| (?:IN_REVIEW|VERIFIED|REVALIDATION_REQUIRED) \|/, '| VERIFIED |').replace(/EV-[A-Z]+-\d{3}(?:, EV-[A-Z]+-\d{3})*/g, 'missing-evidence') : line).join('\n'), /lacks verification|real evidence record/],
  ['unknown status', 'TRACKER.md', s => s.replace('| BLOCKED |', '| PROBABLY_DONE |'), /unknown state/],
];
for (const [name, file, mutate, expected] of cases) {
  const result = run(new Map([[file, mutate]]));
  assert.notEqual(result.code, 0, `${name} was incorrectly accepted`);
  assert.match(result.text, expected, `${name}: wrong failure: ${result.text}`);
  console.log(`PASS: rejects ${name}`);
}
console.log('PASS: 9 in-memory validation cases; no repository files mutated.');

for (const newline of ['\n', '\r\n']) {
  const changes = new Map();
  for (const dir of [__dirname, path.resolve(__dirname, '..')]) {
    for (const file of fs.readdirSync(dir)) {
      if (/\.(md|json|csv|cjs)$/.test(file)) changes.set(file, text => text.replace(/\r?\n/g, newline));
    }
  }
  changes.set('AGENTS.md', text => text.replace(/\r?\n/g, newline));
  const result = run(changes);
  assert.equal(result.code, 0, result.text);
}
console.log('PASS: LF and CRLF checkout fingerprints both validate.');
