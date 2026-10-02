# Evidence record

Documentation assignment, 2026-09-30 (Asia/Calcutta). Verifier: Codex, author self-review. No independent review, deployment, product test pass or client beta acceptance is claimed.

## EV-SURVEY-001 — Repository baseline

Outcome: REVIEWED_WITH_LIMITS. Read-only inventory/manifests/entrypoints/storage/routes/shared helpers/tests/docs/container/publishing inspection was performed during planning and revalidated before writes. `git status --short` reports that this is not a Git repository. Current database code uses SQLAlchemy/SQLite; inspected account boundaries are insufficient for hosted multi-user release. See [Project Map](PROJECT_MAP.md) for evidence locations and limits.

Before documentation writes, a Node built-in fs/crypto walk recorded SHA-256 for 539 existing files. [SOURCE_BASELINE.json](SOURCE_BASELINE.json) contains paths and hashes only. Exclusions: .git, node_modules, .venv and data directories, plus .env-prefixed files. It is a preservation manifest, not a backup or a complete secret scan. This manifest does not prove runtime behavior or Git cleanliness.

## EV-ENV-001 — Environment blocker

Outcome: BLOCKED for application baseline. In planning, `python scripts/check_locale_parity.py` could not create a process for the referenced Python311 interpreter. Revalidation with `python --version` likewise failed. Node is available; project `apps/frontend/node_modules` and `apps/backend/.venv` were not present in inspected paths. No dependency or browser installation was attempted.

The backend requires Python >=3.13. GL-BASE-002 must locate/prepare a compatible isolated environment before invoking uv-managed tests, since uv may resolve/install missing dependencies. Frontend/backend tests, typecheck, lint, build, PDF/browser checks and provider evals are NOT_RUN for this documentation change.

## EV-DOC-001 — Documentation consistency

Outcome: PASS. Executed `node plan/delivery/validate-docs.cjs --preservation` and `node plan/delivery/validate-docs.test.cjs` from the repository root with Node v24.17.0 on Windows/PowerShell. The final validator reported 22 required artifacts, 68 requirements, 44 tasks, 120 source sections, 121 local links, an acyclic dependency graph and valid tracker/evidence rules. The fault-injection suite passed nine in-memory cases: healthy package plus rejection of broken link, unknown requirement, dependency cycle, missing coverage, revoked approval, premature readiness, unsupported verification and unknown state. No test mutates repository files.

Specification identity: DOCSET-2026-09-30-v1, with per-file SHA-256 in [DOCUMENT_FINGERPRINTS.json](DOCUMENT_FINGERPRINTS.json). Mutable tracker/evidence/handoff are excluded from that snapshot to permit normal status updates; stable input changes require revalidation. This evidence describes static documentation checks, not semantic completeness proof, product test results, security sign-off or deployment.

## EV-PRESERVE-001 — Existing-file preservation

Outcome: PASS. `node plan/delivery/validate-docs.cjs --preservation` checked all 539 original-file fingerprints. All originals were byte-identical except `.gitignore`; removing the exact root-only added comment/exception reproduces its original hash. The four source plans, applications, publishing/container configuration and old documentation are preserved. No existing file was deleted. Personal agent folders remain ignored. Newly created delivery files are intentional and are not expected in the pre-write manifest. Excluded live-data/environment directories are outside this preservation check and were not edited by this task.

## EV-RESTART-001 — Tabletop workflow review

Outcome: PASS for author-performed tabletop review of the ten scenarios in VERIFICATION. Fresh checkout routes to baseline; partial work is inspected/preserved; failing tests block verification; changed fingerprints require revalidation; absent Git keeps provenance unknown; abandoned claims require takeover review; missing tracker reconstructs unverified states; missing approval blocks only dependent action; changed requirements update affected tasks; conflicting agent contracts require integration-owner review and combined tests. Each path has a named next action and no implicit deletion/deployment permission.

Manual task-graph review also confirmed that GL-AI-003 and M9 corpus tasks are not release dependencies, M2 privacy/deletion precedes the first complete analysis journey, and the release task depends on quality and operational readiness. Early account work is explicitly local/synthetic until PostgreSQL and release gates are satisfied. This review checks handbook logic, not actual product recovery, and does not constitute independent security review or a real backup restoration.

## Recording future evidence

Append task/date/environment/command-or-procedure/revision/result/artifact/limits. Preserve prior records as dated facts. Move a task to REVALIDATION_REQUIRED if its evidence inputs change. Never edit a failed historical result into a pass; add the new run. Do not store source resumes or credentials in this file.

## EV-BASE-002 — Client repository and recoverable starting point

Outcome: PASS for provenance/recovery checks only, 2026-10-01. Remote main: 9c05e423dfde44a5b4bb398d2dc7507194252ded; git rev-list --count HEAD returned 1654 before edits. Separate clone under .worktrees/jugalbandi. Node fs comparison of all 539 git ls-files entries against the original surveyed folder, normalizing CRLF/LF, found only the approved .gitignore difference. No application divergence was found before writes.

Commands: git ls-remote https://github.com/msrishav-28/jugalbandi.git; git clone --no-checkout; git switch -c goldlens/baseline-and-first-checks; git restore --source=HEAD --staged --worktree . (populated the empty newly cloned checkout, not existing client files); git bundle create ../../.recovery/jugalbandi-before-implementation-9c05e42.bundle --all; git bundle verify ../../.recovery/jugalbandi-before-implementation-9c05e42.bundle. Bundle verification reports complete history, no prerequisites. SHA-256: bcdb50c1fcd8742a9b1c96dbc3eba748cd99ccfac31041027421a63c30e4f377. Backup is local outside the working checkout; never overwrite it. No restore rehearsal into a third checkout or remote history replacement occurred.

## EV-BRAND-001 — Jugalbandi rename checks

Outcome: PARTIAL; task remains IN_REVIEW. Date: 2026-10-01, Asia/Calcutta. Baseline code 9c05e423dfde44a5b4bb398d2dc7507194252ded plus this branch's bounded rename changes; use the containing commit for exact file identity. Windows, Node v24.17.0, npm 12.0.2, Python 3.13.14, uv 0.11.28. Dependencies installed locally from existing manifests; no manifest/lock version changes staged. Backend resolution has no committed lock, so reproducibility remains open.

- npm ci --ignore-scripts --no-audit --no-fund: installed 532 frontend packages from existing lock; install scripts disabled.
- npm run test -- tests/product-brand.test.tsx: PASS, 9 tests.
- npm run test: 671 passed, 6 timeouts in 3 files under default parallelism. No assertions/timeouts were modified.
- npm run test -- --maxWorkers=2: PASS, all 70 files / 677 tests in 98.45 seconds. One earlier interrupted session result was unavailable and is not counted.
- npm run lint: PASS. npm run typecheck: PASS.
- npm run build: BLOCKED by Google Fonts network fetch. Network-enabled retry also failed downloading CJK font assets from fonts.gstatic.com. Production build is not verified; no fonts were removed or substituted in source.
- Backend .venv/Scripts/python.exe -m pytest tests/integration/test_product_identity.py tests/unit/test_check_locale_parity.py -q: BLOCKED during collection; Windows Application Control rejected tiktoken native library. Separate locale unit run also hit shared-fixture errors (8 errors); not a pass. No security control was disabled. API regression remains unexecuted.
- Backend .venv/Scripts/python.exe ../../scripts/check_locale_parity.py: PASS for all seven current locale files.
- git diff --check: PASS. Impeccable mechanical detector on home/layout targets returned no findings; this does not prove accessibility.
- Browser: npm run dev -- --hostname 127.0.0.1 --port 3107, BACKEND_ORIGIN=http://127.0.0.1:9. In-app browser showed JUGALBANDI and matching tab title at desktop (819x668) and mobile (375x812), with no heading clipping. Temporary viewport reset. Repository link points to msrishav-28/jugalbandi. Launch App reaches /dashboard and shows the existing unable-to-load/retry state with backend intentionally absent. Font fallback warnings remain; no full live resume workflow or production-font visual check is claimed.

Reviewer: author self-review. No deployment, sign-in, stored-data, workflow, license or contributor-history changes. Client check after runtime blockers resolve: welcome name, Launch App, settings version footer, upload guidance, API docs title. Existing upstream documentation links intentionally remain upstream references.

## EV-DOC-002 — Execution checkpoint handbook revalidation

Outcome: PASS. 2026-10-01, Node v24.17.0 / Windows. Static review of naming/execution records, task/card/requirement/approval updates and original-source preservation. Commands: node plan/delivery/validate-docs.cjs; node plan/delivery/validate-docs.test.cjs. Snapshot DOCSET-2026-10-01-v2 records reviewed stable document inputs. Original four plans unchanged; historical full-product preservation mode is not applicable after the authorized rename. No product completion is implied.

Revalidation detail: the negative test for missing evidence initially failed because its mutation hard-coded the old EV-DOC-001 identifier and made no change after the evidence revision. Updated fault injection to replace evidence IDs generically; acceptance assertions remain unchanged. Re-ran all nine cases after the fix.

Portability correction: Git normalizes line endings across Windows/Linux. Stable document and original-plan content checks now use LF-normalized fingerprints, while original raw preservation hashes remain untouched. Added both LF and CRLF in-memory checkout cases. Product-code staged whitespace check passes; full staged check reports existing Markdown hard-break whitespace in preserved source plans and the historical CSV trailing blank line, intentionally unchanged.

## EV-PUSH-001 — Initial implementation checkpoint

Outcome: PASS. 2026-10-01. Commit 23dc696 (Introduce Jugalbandi branding and resumable delivery handbook) pushed with git push -u origin goldlens/baseline-and-first-checks to https://github.com/msrishav-28/jugalbandi.git. Git confirmed new remote branch and tracking setup; working tree clean afterward. Main, tags, existing history and attribution untouched. Brand task remains IN_REVIEW because runtime/build gaps persist.

## EV-DOC-003 — Surgical existing-guide refresh

Outcome: PASS. 2026-10-01, Node v24.17.0 / Windows; baseline dff1585 plus this documentation commit. Re-read frontend/backend manifests, Docker/Compose, API entrypoints, provider config, current localized state/branding, affected old guides and twin translations. Added current-stack table and handbook pointers; corrected Next 15/TinyDB claims and setup repository/lockfile commands. Existing architecture/history, license, credit and four source plans preserved. Validation: documentation validator; eleven validator cases including LF/CRLF; new local Markdown target/anchor checks; git diff --check; git diff path review restricted to Markdown and fingerprint JSON. No application checks rerun for documentation-only edits. Earlier runtime outcomes remain dated EV-BRAND-001, not fresh passes. Author self-review only.

## EV-DECISIONS-001 — Questionnaire record

Outcome: REVIEWED_WITH_LIMITS. 2026-10-01. Recorded client answers without changing product behavior. Static search for next-auth/NextAuth, Google sign-in/OAuth, authlib, Clerk and Supabase across manifests/frontend app/components/backend app found no Google sign-in integration; this is not a full security audit. Documentation consistency and validator cases rerun for the updated decision record; product tests not rerun.

## EV-DECISIONS-002 — Retention and invitation confirmation

Outcome: REVIEWED_WITH_LIMITS. 2026-10-01. Recorded client “1 A, 2 A, 3A” and reconciled the privacy specification with upload-based 30-day retention plus seven-day recovery and three invitations per user / 50-user cap. Documentation consistency and validator cases checked. No runtime policy implementation or test pass claimed.

## EV-DOC-004 — Project-wide Markdown alignment

Outcome: PASS. 2026-10-02; Windows, Node v24.17.0; starting revision 74778a5, reviewed document identity DOCSET-2026-10-02-v6. Documentation-only self-review; all 106 starting tracked Markdown files enumerated, with dispositions in MARKDOWN_AUDIT.csv. Local file-target scan checked 626 starting-document targets outside fenced examples, no missing targets. Exact repeatable checks: `node plan/delivery/validate-docs.cjs`, `node plan/delivery/validate-docs.test.cjs`, `git diff --check`. Final result: handbook validation, all eleven validator cases and whitespace checks passed. During REVALIDATION_REQUIRED state, the negative approval test reported a different expected failure; the final verified snapshot is checked again without changing the test. Four source plans remain unchanged. No runtime checks, hosting, product behavior, Git history or deployment configuration changed. External URLs and every historical code example were not revalidated. Existing EV-BRAND-001 limitations remain.

## EV-LOCAL-001 — Windows test-loop startup repair

Outcome: PASS_WITH_LIMITS. 2026-10-02; starting commit c20e186; Windows, Python 3.13.14, pytest 9.1.1, pytest-asyncio 1.4.0. Existing synchronous network guard denied the event loop's internal socket pair: `apps/backend/.venv/Scripts/python.exe -m pytest tests/unit/test_check_locale_parity.py -q --tb=short` (run with the executable relative to backend) produced eight setup errors before the fix. The first discovery command used a nonexistent test_locale_parity.py path and collected no tests; corrected to the actual filename before diagnosis.

Changed only the guard fixture to async so the existing runner initializes before socket monkeypatching. No allowlist, network exception, database isolation removal or dependency change. Added six tests proving async scheduling works and create_connection/connect/connect_ex still reject both external and loopback destinations. From apps/backend: `.venv/Scripts/python.exe -m pytest tests/unit/test_network_guard.py tests/unit/test_check_locale_parity.py -q --tb=short`: 14 passed. `.venv/Scripts/python.exe -m pytest tests/unit/test_database.py -q --tb=short`: 40 passed. Synthetic/temporary data only; author self-review.

`.venv/Scripts/python.exe -m pytest tests/integration/test_backend_isolation.py tests/integration/test_product_identity.py -q --tb=short`: two collection errors, zero tests executed; Windows Application Control rejects the installed tiktoken DLL. No security-policy bypass attempted. LiteLLM also attempted to fetch public model metadata during collection, before function fixtures run; the environment denied the connection. The fixture repair guarantees test-execution blocking, not import-time network isolation. Paid eval behavior remains unchanged and was not exercised. Linux/macOS were not tested. Product code, frontend, saved data, service configuration and hosting remain unchanged; full baseline remains BLOCKED.

## EV-LOCAL-002 — Local repeated-bullet review

Outcome: PASS_WITH_LIMITS. 2026-10-02; baseline 8b300c7 plus this feature; Node 24.17.0, Windows, existing Vitest and Playwright 1.58. Local scope revalidation: resume viewer loading/error/ready branches and edit navigation, ResumeData types, API response envelope, section helpers, existing enrichment lifecycle tests, translation hooks/config, Swiss tokens and comparable components. No equivalent repeated-text rule found in frontend utilities/components. Existing backend/infra map remains as revalidated in EV-LOCAL-001; no backend changes.

Commands from apps/frontend: `npm run test -- --maxWorkers=1` — 72 files / 694 tests passed; `npm run lint` and `npm run typecheck` passed. Targeted three-file run passed 33 tests; earlier two-worker run had two existing enrichment lifecycle timeouts (30 passed / 2 timed out), resolved with one worker without changing timeouts. Named changed files formatted with installed Prettier. From root: `apps/backend/.venv/Scripts/python.exe scripts/check_locale_parity.py` passed. Impeccable detector on the new panel returned no findings.

Browser procedure: run frontend on 127.0.0.1:3107, backend origin set to closed local port 9; Playwright headless Edge intercepts every API response with synthetic resume/status records and denies non-loopback browser requests. Open /resumes/local-review-sample, focus summary and press Enter, verify one repeated passage and three locations, capture panel at 1280x900 and 375x812, emulate print and assert panel hidden, return to screen and click Review in editor; /builder navigation confirmed and no enrichment request recorded. First harness attempt used the wrong mocked response shape and timed out; corrected to the existing /resumes?resume_id=... data envelope, then all checks passed. Screenshots inspected at ../../.runtime-cache/local-review-preview/{desktop,mobile}.png outside checkout; synthetic data only. Dev server stopped. Removed only the Next-generated CLAUDE append introduced by that run.

Limits: browser used fallback fonts after existing Google font downloads failed. Production build was not rerun; known font blocker persists. Actual backend/browser integration remains blocked by the existing native-library restriction; user requested proceeding with code and deferring that environment fix. No production, full ATS/PDF analysis, original-document evidence, saved feedback, external AI, or account isolation completion claim. This slice remains IN_REVIEW.
