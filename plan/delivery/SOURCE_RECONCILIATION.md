# Source reconciliation and coverage

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

Date: 2026-09-30. The four source files remain unchanged. This document resolves their conflicts for the approved delivery handbook. [Requirements](REQUIREMENTS.md) retains substantive behavior; [section coverage](SOURCE_COVERAGE.csv) enumerates source headings, line ranges, dispositions and requirement references.

## Authority

Client decisions and consent restrictions govern scope. Verified code establishes the current state. The unified plan supplies overall direction; PRD, technical plan and operating manual add detail. Examples, illustrative folder trees, source citation tokens such as `[page:3]`, and aspirational sprint dates are not verified implementation evidence. No inaccessible historical citation is treated as researched fact.

## Resolutions

| Conflict | Resolution | Consequence / requirement |
|---|---|---|
| Plans say TinyDB is the primary store | Current code uses SQLAlchemy/SQLite and legacy TinyDB import | Start from actual facade/invariants; GL-R-007 |
| `/apps/web`, `/apps/api` versus current paths | Preserve `apps/frontend` and `apps/backend` | No directory rewrite; GL-R-001 |
| Illustrative `/v1` versus existing `/api/v1` | Keep existing prefix and compatible callers | GL-R-052 |
| Foundation sketches include stubs | Internal scaffolding must reach a complete vertical slice before release | GL-R-018, GL-R-056 |
| PRD defers geometry while technical plan starts with it | One native geometry-to-finding journey in M3, broaden in M4 | GL-R-015-025 |
| Privacy appears late in one roadmap | Access control, retention and deletion precede real beta data | GL-R-004-014 |
| Corpus is P0 in PRD | Client approved analyzer-first beta; corpus governance remains M9, unavailable until qualified | GL-R-043-048 |
| Different sprint/90-day estimates | Dependency and acceptance gates govern; estimates after baseline and staffing | GL-R-063 |
| Ten findings per report | At least ten supported finding types across fixtures; zero is valid on a clean document | GL-R-032 |
| Six scores without all inputs | Independent availability; missing job/cohort or failed analysis is not a score | GL-R-031 |
| Dismissal lowers sensitivity | Feedback may suppress repeated presentation; raw results and safety measurements remain unchanged | GL-R-035 |
| Different reference approval state names | Canonical lifecycle in DATA_AND_PRIVACY; translate UI labels without duplicate state machines | GL-R-043-047 |
| Trust 0.80 versus 0-100 components | Store/display one 0-100 rubric; example 0.80 means 80, not calibrated probability | GL-R-044 |
| One or two curator approvals | Require uploader/curator plus independent publisher for user-visible cohort release | GL-R-045 |
| Formatting-quality threshold example | Not a hard universal admissibility rule; calibrate contextual usefulness and record exclusions | GL-R-023, GL-R-046 |
| No raw external prompts versus cloud assistance | No external content by default; explicit consent and approved minimized task payloads | GL-R-040-041 |
| Retention and training mixed in journey copy | Retention, product telemetry and training are independent purposes, each explicit | GL-R-012 |
| User-fill rewrite placeholders versus no stubs | Placeholders are pending user facts, never fabricated completed prose; block unresolved claim acceptance/export | GL-R-036 |
| Plain text and historical DOC support | Content-only plain text is retained; beta upload targets PDF/DOCX; inventory legacy DOC before any removal | GL-R-009, GL-R-026 |
| DOCX converted through Chromium | Chromium remains HTML export renderer; native DOCX pagination needs separately evaluated office conversion | GL-R-024 |
| PyMuPDF proposed as default | Geometry-first is the decision; specific parser adoption needs license/security/compatibility evidence | GL-R-017, GL-R-068 |
| Hash-only idempotency examples | Scope by account, immutable revision, operation and versions | GL-R-011, GL-R-060 |
| Immutable cohort snapshots versus consent withdrawal | Revoke access to impacted snapshots and rebuild; reproducibility cannot override removal obligations | GL-R-047 |
| Current local-only global reset/settings | Never expose globally to ordinary hosted users; approved access redesign required | GL-R-006 |
| Old docs show five locales and historical test passes | Code config shows seven; old counts are not current results | GL-R-001, GL-R-003 |
| Existing local hooks versus proposed hosted CI | Preserve now; separately approve required hosted pre-merge checks | GL-R-057 |
| Current root instruction ignore | Root-only exception retains shared AGENTS.md without publishing personal agent directories | GL-R-064 |
| Jev/Laya absent from original plans | Optional measured research, not mandatory architecture or a truth/security authority | GL-R-042 |
| Training, discovery and collaboration described as future growth | Explicit M10 tasks with their own readiness/consent gates | GL-R-048-050, GL-R-065-066 |
| Non-goals sometimes labelled merely deferred | No scraping, ranking or employment verification under this engagement; changing this requires a new product decision | GL-R-049 |

## Coverage procedure

`SOURCE_COVERAGE.csv` lists every major numbered source section and PRD appendix with its original line span. The associated requirement rows enumerate capabilities and point to tasks. Repeated requirements are consolidated, not removed. Cultural and hiring sections map to operating rules; executive summaries and examples map to the requirements they illustrate.

On source edits: compare stored source hashes in [evidence](EVIDENCE.md), re-enumerate sections, update line spans and dispositions, inspect newly added bullets/tables, and revalidate linked tasks. A section mapping alone cannot excuse a missed subrequirement; reviewers must compare the entire cited span against the requirement's stated retained scope.

The source examples' person names and resume text are not copied into new test fixtures. Use synthetic examples. Company prestige, identity and demographic attributes never become quality labels.

## Local slice scheduling — 2026-10-02

GL-LOCAL-001 contributes to GL-R-026/032 through a bounded read-only check on already-loaded resume data. It does not complete either broader requirement. It requires no hosted identity, PostgreSQL, durable worker, upload or external processing change, so it proceeds independently of those conditional task chains. Existing editor/navigation/data behavior is reused. Original-document geometry, versioned persisted findings and full report contracts remain owned by the original tasks.
