# Verification and evidence standard

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

This file specifies checks. Actual execution results are in [EVIDENCE](EVIDENCE.md), and task progress is in [TRACKER](TRACKER.md). Historical counts in older docs are not current evidence.

## Existing commands and prerequisites

Run only in an isolated development environment with synthetic data. Inspect test fixtures/startup side effects first. Dependency installation, browser installation and service creation are separate setup actions; this documentation task does not perform them.

| Working directory | Existing command | What it establishes / limits |
|---|---|---|
| `apps/backend` | `uv run pytest -q` | Existing deterministic backend suite; project excludes eval marker by default; uv may resolve/install if environment missing, so setup first |
| `apps/frontend` | `npm run test` | Vitest behavior tests; does not prove live provider quality |
| `apps/frontend` | `npm run lint` | Existing ESLint rules; no automatic rewrite |
| `apps/frontend` | `npm run typecheck` | Strict TypeScript check including configured tests |
| `apps/frontend` | `npm run build` | Production build; may require network for font resolution, record exact environment |
| Repository root | `python scripts/check_locale_parity.py` | Translation key consistency; current launcher failure is recorded, not a pass |

Do not run `npm run format` over the repository for this package. Future changes format named changed files with the established formatter. Existing browser/PDF instructions are in [reliability map](../../docs/agent/architecture/reliability-map.md). Follow its owned-server and disposable-data setup; never reuse a server connected to real records. [AI evals](../../apps/backend/tests/evals/README.md) and [monitor](../../apps/backend/e2e_monitor/README.md) are explicitly opt-in and can call paid providers; they are not run as part of documentation validation.

Future PostgreSQL/queue/object-store integration, OpenAPI drift, accessibility/load/security and golden-document commands must be implemented and documented by their task owners. Do not cite nonexistent scripts as passing. Use actual task-specific commands once available.

## Product verification matrix

| Suite | Required scenarios | Gate |
|---|---|---|
| Baseline | Upload/wizard, master/default choice, edit/drafts, tailor preview/confirm, tracker, attachments, real PDF | Existing user behavior preserved |
| Identity | Invalid/expired/revoked/uninvited sessions; CSRF for chosen transport; sign-out/account switch; privileged reauth | Fail closed |
| Ownership | Two-account list/read/write/delete, foreign nested JD/resume IDs, print, file, export, events, worker jobs | Zero unauthorized outcomes |
| Storage | Private ACL, expired links, object overwrite, missing object, provider outage, abandoned upload | Safe lifecycle and truthful errors |
| Ingestion | Spoofed/corrupt/encrypted/oversized PDF/DOCX, archive bomb, dimensions, scan unavailable, scanner outage | Unsafe content never parsed outside isolation |
| Durable jobs | Crash before/after outbox send/claim/stage/commit; duplicate/out-of-order delivery; lease expiry; cancel | No lost accepted work, duplicate result or deletion resurrection |
| Geometry | Rotated/cropped/mixed-size pages, two-column order, decorations, clipping, date alignment, dense/sparse, fonts | Evidence coordinates/units correct and false positives reviewed |
| DOCX/OCR | Styles/tables/headers/numbering/page breaks, missing fonts, mixed scans and confidence | No unsupported exact visual claims |
| Semantics | Custom/unknown sections, negation, meaningful numbers, repeated bullets, weak/buried/missing job evidence | Source spans retained; no invented facts |
| Scores | No JD, no cohort, failed stage, partial coverage, duplicate root cause, incompatible historical versions | Availability/context honest |
| AI | Consent absent/withdrawn, malicious instructions, invalid output, timeout, budget exhaustion, false new claims | Deterministic path usable; unsupported changes rejected |
| UI | Pending/empty/denied/stale/error/cancelled, keyboard/screen reader, focus, zoom/rotation, reduced motion, narrow screens/locales | Full accessible path; no dead surface |
| Export | Correct immutable revision, nonblank file, long tokens, typography, multi-page/CJK baseline, inaccessible print URL | Safe download matches intended content |
| Deletion | During parse/AI/export, queue replay, object failure, account deletion, restore tombstones | Live data removed with accurate backup caveat |
| Corpus | No rights, rejected/pending source, self-review, redaction, small/overlapping filters, withdrawal during publication | No unapproved influence/exposure |
| Fairness | Synthetic name/institution/demographic changes with equal job evidence | No unjustified job-irrelevant score change |
| Operations | Restore, feature rollback, alert drill, load/soak, provider cost spike, dependency loss | Measured capacity and executable recovery |

Freeze numeric quality thresholds and sample sizes before held-out evaluation (GL-BASE-003/GL-QA-001). Track high-severity precision/recall, reading-order accuracy, section agreement, rewrite factual support and false-positive rates by rule/version. No observed unsupported-claim pass is acceptable in release adversarial tests; zero observations does not prove a universal zero error rate. Never weaken thresholds after seeing failures without a reviewed product decision and new independent evaluation.

## Client acceptance walkthrough

Use synthetic resume and job data in an approved preview/staging environment:

1. Accept an invitation and sign in. An uninvited account cannot access private material.
2. Upload the synthetic sample PDF/DOCX and inspect the applicable retention policy (the conditional hosted profile is 30 days plus seven-day recovery). See real processing stages and actionable errors for a deliberately bad file.
3. Open the report, select a finding and confirm the highlighted page location matches its explanation.
4. Dismiss or mark it intentional; refresh and confirm the choice persists without altering original content.
5. Paste a job description and inspect demonstrated versus missing evidence.
6. Decline AI assistance and confirm basic analysis remains usable.
7. If AI is enabled, inspect supported proposed changes; reject one and accept another without invented facts.
8. Edit and export; inspect the downloaded PDF against the intended revision.
9. Delete the resume; confirm it becomes inaccessible and that completion/backup wording matches the actual lifecycle.
10. Sign into a second account; prior reports, downloads, drafts and tracker records are unavailable.

Record date, artifact version, tester, observed outcome and remaining issue IDs. A screenshot alone is not proof of ownership, persistence or erasure.

## Documentation validation

Run `node plan/delivery/validate-docs.cjs` from the repository root. It reads only documentation and source-plan files. It checks required deliverables, local links/anchors, requirement/task references, complete source-section coverage, source hashes, tracker/card correspondence, gate/evidence state rules and dependency cycles. It does not prove semantic completeness or runtime correctness. The script is part of this handbook, not a product test framework.

Additionally compare pre/post SHA-256 fingerprints of existing non-secret source files and inspect `.gitignore` for the root-only exception. Confirm all four original plans, all application files, container/publishing config and existing docs stayed unchanged. If Git exists later, inspect named-path diff/status too; current absence must not be reported as a clean Git diff.

For this documentation-only delivery, `node plan/delivery/validate-docs.cjs --preservation` repeats the original-file comparison; after authorized product implementation this historical comparison is expected to differ and is not a blanket prohibition on approved changes. `node plan/delivery/validate-docs.test.cjs` runs negative validator cases entirely in memory. When GL-DOCS-001 is VERIFIED, DOCUMENT_FINGERPRINTS.json binds its stable specification inputs. Tracker/evidence/handoff are intentionally mutable but their status rules are checked. A stable document change requires REVALIDATION_REQUIRED, review, fresh checks and updated fingerprints before reverification; never just regenerate hashes to hide unreviewed changes.

Manually review requirement coverage against source bullets/tables; section enumeration is a traceability aid, not a substitute for reading. Review the task graph for logical dependencies, not only cycles. Check that deferred features are not required by beta and that historical status cannot authorize new work.

## Restart exercises

| Scenario | Required action | Forbidden shortcut |
|---|---|---|
| Fresh checkout | Read root/index/map, inspect status, select first eligible baseline task | Start with first unchecked feature without dependencies |
| Partial implementation | Read owner handoff, inspect changed code and unmet acceptance, preserve existing work | Delete or duplicate it because task is not verified |
| Failed required tests | Record exact failure; separate baseline defect; block verification until resolved | Mark verified because most tests passed |
| Stale pass evidence | Compare revision/fingerprints; mark affected task REVALIDATION_REQUIRED and inspect dependents | Reuse historical green output |
| No Git history | Record unknown provenance, use safe inventory/fingerprints and recovery proposal | Invent commit or overwrite folder from upstream |
| Abandoned ownership | Inspect partial edits and evidence, coordinate takeover, record new owner | Concurrently edit same shared boundary |
| Missing tracker | Reconstruct from requirements/code/tests/history; all reconstructed completion unverified | Infer completion from filenames or PR titles |
| Missing approval | Prepare concrete proposal, keep task AWAITING_APPROVAL; continue independent work | Treat plan or prior unrelated YES as permission |
| Changed source requirement | Update reconciliation/requirement/tasks; revalidate affected artifacts | Keep old status while accepting new scope |
| Two agents changed contracts | Integration owner resolves contract and callers, reruns combined checks | Merge both independently passing branches without integration proof |

Exercise these against the prepared package and record actual review results in evidence. This is a tabletop workflow review, not a product test pass.

## Evidence format

Each record contains ID, task, timestamp/timezone, verifier/reviewer, exact command or manual procedure, scope, environment versions, code revision or file fingerprint, outcome, sanitized artifact link, and limitations. Use PASS, FAIL, BLOCKED, NOT_RUN, or REVIEWED_WITH_LIMITS honestly. Paid evaluation and independent review are explicit attributes, never assumed.

Keep private content outside committed evidence. Recheck logs/snapshots for synthetic canaries before publishing them. A task can be VERIFIED only when its actual acceptance evidence is current; deployment, client acceptance and independent security review are separate facts.
