# Jugalbandi requirements and acceptance register

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

Specification date: 2026-09-30. None of the product requirements below is a runtime completion claim. Live task status is only in [TRACKER](TRACKER.md).

Sources: U = unified plan, P = PRD, T = technical plan, O = operating manual; section numbers refer to the preserved originals linked in [README](README.md). C = recorded client decisions. A grouped row retains all enumerated subfeatures in the cited source unless [reconciliation](SOURCE_RECONCILIATION.md) explicitly narrows them. Section-level coverage is independently enumerated in [SOURCE_COVERAGE.csv](SOURCE_COVERAGE.csv).

Dispositions: **Retained** = target requirement; **Adapted** = explicit change to source prescription; **Present-unverified** = baseline code exists, must be tested; **Deferred** = later release; **Excluded** = prohibited or intentionally not built. These are scope dispositions, not task statuses.

| ID | Outcome and acceptance criterion | Sources | Disposition / phase | Delivery task |
|---|---|---|---|---|
| GL-R-001 | Preserve upload/create, multi-master/default selection, editor, tailoring, tracker, attachments, wizard and PDF journeys; record baseline and repeat affected regressions | T4; U9; C | Present-unverified / M0-M6 | GL-BASE-004, GL-EDIT-001 |
| GL-R-002 | Record source provenance and recovery point without overwriting local work; preserve license/notices and upstream review record | T4; U24 | Adapted / M0 | GL-BASE-001 |
| GL-R-003 | Fresh isolated setup has pinned/reviewed dependencies and runnable checks; no hidden prerequisite or live-data startup | U22; T19; O9 | Adapted / M0 | GL-BASE-002 |
| GL-R-004 | Hosted beta has invited verified identities, expiry/sign-out handling, restricted staff actions and no anonymous private access | U16; T13; C | Retained / M1 | GL-IDENTITY-001 |
| GL-R-005 | Every document, job, report, draft, artifact, stream and export enforces account ownership; foreign IDs reveal no private data | U16-18; O14 | Retained / M1 | GL-IDENTITY-002 |
| GL-R-006 | Ordinary users cannot modify platform keys, provider destinations, global prompts or reset other accounts; preferences are account-scoped | T11,13; C | Adapted / M1 | GL-IDENTITY-003 |
| GL-R-007 | PostgreSQL has explicit constraints, ownership, UTC instants, indexed access paths and tested changes; SQLite-specific invariants are preserved | U10; T7,19; P15 | Adapted / M2 | GL-DATA-001 |
| GL-R-008 | Files/renders/exports are private, encrypted, scoped and downloadable only after authorization with expiring access | U10,16; T13 | Retained / M2 | GL-STORAGE-001 |
| GL-R-009 | PDF/DOCX bytes are validated by signature, size, pages and expansion budget; unsafe/password-protected files receive safe actionable errors | U11; P10.1; T8 | Retained / M2 | GL-UPLOAD-001 |
| GL-R-010 | Quarantine and malware scanning precede parsing; parser containers have bounded resources and denied network; scanner outage fails closed | U11,16; T8,13 | Retained / M2 | GL-UPLOAD-001 |
| GL-R-011 | Durable jobs survive crashes, handle duplicate delivery, bound retries, expose honest progress and never resurrect deleted documents | U11,19; T16 | Retained / M2 | GL-JOBS-001 |
| GL-R-012 | For the conditional hosted profile: 30 days from original upload, then seven-day recovery for resume and revisions; opening/editing never extends the clock; telemetry/training remain separate default-off choices | P8,18; U17 | Retained / M2 | GL-PRIVACY-001 |
| GL-R-013 | Deletion revokes access, fences work, removes live artifacts and reports actual completion; backup expiry is explained | U17; T14 | Retained / M2 | GL-PRIVACY-002 |
| GL-R-014 | User can export their stored personal information and remove an account; sensitive confirmation and failures are explicit | P18 | Retained / M2 | GL-PRIVACY-002 |
| GL-R-015 | Immutable normalized document representation preserves pages, text, spans, styles, bounds, source links and extraction provenance | U10-11; T7-8; P15 | Retained / M3 | GL-DOC-001 |
| GL-R-016 | Every run records document/parser/rule/prompt/model/cohort versions and can be traced to an immutable revision | U10; T7.3 | Retained / M3 | GL-DOC-001 |
| GL-R-017 | Native PDF extraction/rendering respects crop, rotation and page units; one real measurement reaches a persisted evidence-linked finding | U11-12; T8-9 | Retained / M3 | GL-DOC-002 |
| GL-R-018 | A user can upload, see actual stages, open an evidence location and record feedback; empty/failed analysis remains honest | P8; U7,18; O8.2 | Retained / M3 | GL-REPORT-001 |
| GL-R-019 | ATS checks cover missing/selectable text, reading-order collisions, columns, tables, header/footer intrusion, icons, headings, contact extraction, ligatures and hidden/overlaid text | P10.2; U5.2,12 | Retained / M4 | GL-ANALYSIS-001 |
| GL-R-020 | Reading-order graph handles full-width headers, columns, title/date pairs and ambiguous regions; compare independent extraction signals and show uncertainty | T9.3; U12 | Retained / M4 | GL-ANALYSIS-001 |
| GL-R-021 | Measure margins, occupancy, density bands, balance, columns, overlap, clipping, orphan/widow and page-count context; ignore intentional decorations | P10.3,16; U12 | Retained / M4 | GL-ANALYSIS-002 |
| GL-R-022 | Measure anchors, dates, indentation, gaps, line/paragraph/section/bullet rhythm and heading proximity with units and tolerances | P10.3,16; U12 | Retained / M4 | GL-ANALYSIS-002 |
| GL-R-023 | Inspect font distributions, style hierarchy, contrast estimates, capitalization and visual noise; do not enforce one universal style | P10.3,16; T9 | Retained / M4 | GL-ANALYSIS-002 |
| GL-R-024 | DOCX preserves paragraphs/runs/styles/tables/headers/footers/numbering and page metadata; sandboxed conversion labels rendering estimates | U11; T8; P10.1 | Retained / M4 | GL-DOC-003 |
| GL-R-025 | Conditional OCR handles scan-only/mixed pages, retains token confidence and bounds, and suppresses unsupported precise typography claims | U11; T8; P10.1 | Retained / M4 | GL-DOC-004 |
| GL-R-026 | Plain text receives content-only analysis with visual dimensions unavailable; legacy DOC behavior is inventoried before changing support | P10.1; U5.1 | Adapted / M5 | GL-SEMANTIC-001 |
| GL-R-027 | Extract all defined resume sections and entities with source-span references; unknown/custom sections survive | U13; T10; P14 | Retained / M5 | GL-SEMANTIC-001 |
| GL-R-028 | Bullet feedback distinguishes action, ownership, method, scope, outcome, contextual numbers, repetition, tense and verbosity; no invented achievements | P10.5; U13 | Retained / M5 | GL-SEMANTIC-002 |
| GL-R-029 | Narrative feedback considers role/level, top-of-page proof, summary usefulness and ordering; labels inference and recruiter-scan simulation | P10.4,12; U5.4,7 | Retained / M5-M6 | GL-SEMANTIC-002, GL-REPORT-002 |
| GL-R-030 | Pasted jobs support lexical, semantic and evidence match; gaps distinguish demonstrated, buried, weakly evidenced and not demonstrated | P10.6; U13; T10 | Retained / M5 | GL-MATCH-001 |
| GL-R-031 | Six dimensions expose evidence, confidence, context and availability; missing job/cohort is unscored; no employability prediction | P6,13; U4,8 | Adapted / M5 | GL-SCORE-001 |
| GL-R-032 | Findings have category, severity, confidence, consequence, source evidence, action and version; clean documents need no invented issue quota | O6; P20; U18 | Adapted / M3-M5 | GL-REPORT-001, GL-SCORE-001 |
| GL-R-033 | Overview prioritizes three useful actions, shows privacy/context and provides all specified report lenses without dead navigation | P9,12; U7 | Retained / M6 | GL-REPORT-002 |
| GL-R-034 | Canvas has page thumbnails, zoom, filters, inspector and margin/alignment/whitespace/density/order/hierarchy/ATS overlays; default at most five pins | P12; U7 | Retained / M6 | GL-REPORT-002 |
| GL-R-035 | Accept/dismiss/intentional feedback is revision-scoped; raw measurement remains intact and suppressed issues can be reviewed | P8,12; T9.6 | Adapted / M3-M6 | GL-REPORT-001, GL-REPORT-002 |
| GL-R-036 | Side-by-side proposals preserve facts, require support and explicit acceptance, reject stale sources, and never export unresolved invented placeholders | P12,17; U29 | Retained / M7 | GL-AI-002 |
| GL-R-037 | Editing preserves styles/templates, original revisions and export correctness; automatic formatting repair must preview and preserve intent | P12,21; U7 | Adapted / M6-M10 | GL-EDIT-001, GL-EXPAND-002 |
| GL-R-038 | Semantic HTML, keyboard/pin list alternative, focus, contrast, reduced motion, reflow and mobile states work across report/editor journeys | O18; U31 | Retained / M6 | GL-REPORT-003 |
| GL-R-039 | Extend existing design system with calm editorial reports; no prestige/gamification, hiring guarantees or misleading score language | P2,12,25; O3,17 | Retained / M6 | GL-REPORT-003 |
| GL-R-040 | Model gateway enforces privacy mode, provider allowlist, minimization, structured output, prompt versions, budgets and safe fallbacks | U14; T11; O13 | Retained / M7 | GL-AI-001 |
| GL-R-041 | No-LLM analysis works; cloud AI is opt-in; BYOK is primary; optional platform-funded allowance stays disabled until budget approval; local processing and external processing are never assumed privacy equivalents | U14; T11.4; C | Adapted / M7-M10 | GL-AI-001, GL-EXPAND-002 |
| GL-R-042 | Evaluate Jev/Laya on reviewed held-out resume decisions against simple rules; no use as authority for access, consent or factual truth | C | Retained optional / M7 | GL-AI-003 |
| GL-R-043 | Curator intake records origin, consent scope, tags, redaction and decision; rejected/unapproved material never affects users | P11; U6,15; T12 | Deferred / M9 | GL-CORPUS-001 |
| GL-R-044 | Evidence tiers 0-4 and trust components are explicit; prestige contributes zero; unknown rights and leaked/paid packs are excluded | P11; U6; T12.4 | Deferred / M9 | GL-CORPUS-001 |
| GL-R-045 | Curator/reviewer actions require restricted access, independent publication review, safe PII handling and audit evidence | O20; U16,32 | Deferred / M9 | GL-CORPUS-001 |
| GL-R-046 | Versioned cohort distributions expose count/confidence/context; small or filter-reidentified groups are suppressed; raw examples absent by default | P10.7; U15; T12 | Deferred / M9 | GL-CORPUS-002 |
| GL-R-047 | Removal revokes source use and affected published artifacts, rebuilds safe aggregates and records minimal audit facts | P11; U15,32 | Deferred / M9 | GL-CORPUS-003 |
| GL-R-048 | Feedback informs reviewed calibration; narrow training requires separate consent, dataset manifest, model card and evaluation | P17; T12.6; U15 | Deferred / M9-M10 | GL-CORPUS-003, GL-EXPAND-002 |
| GL-R-049 | No scraping, autonomous ingestion/training, employment verification, candidate ranking or public leaderboards | P4,21; U2,6; T3 | Excluded / all | GL-RELEASE-001 |
| GL-R-050 | Permitted discovery saves a pending candidate/link; human checks precede fetch/use; no arbitrary URL fetch in beta | P21; U15 | Deferred / M10 | GL-EXPAND-002 |
| GL-R-051 | Protected traits and prestige do not drive scoring; synthetic counterfactual tests and reviewer checks expose proxy bias | P18; O12 | Retained / M5-M8 | GL-SCORE-001, GL-QA-002 |
| GL-R-052 | API contracts, typed clients, stable errors, ownership, bounded lists and idempotent durable creation are tested | U18; T15; O9 | Retained / M2-M8 | GL-CONTRACT-001 |
| GL-R-053 | Structured safe events correlate API/jobs/artifacts without raw content; dashboards cover success, latency, retries, deletion, quality and spend | U20; O16 | Retained / M2-M8 | GL-OPS-001 |
| GL-R-054 | Runbooks cover queues, parsers, OCR/AI/storage failures, database recovery, privacy exposure, takedown, quality regression and cost spikes | U20,30; T17; O15 | Retained / M8-M9 | GL-OPS-002 |
| GL-R-055 | Golden documents are synthetic/owned/permissioned; two reviewers annotate subjective cases, disagreements retained; held-out data is separated | P24; U21; O11-12 | Retained / M0-M8 | GL-QA-001 |
| GL-R-056 | Automated unit/integration/contract/security/visual/browser checks and human quality review gate release; negative paths included | U21; T18; O11 | Retained / M8 | GL-QA-002 |
| GL-R-057 | Reproducible checks precede publishing; secrets/dependencies/containers reviewed; preview/staging use synthetic data | U22; T19; O10 | Adapted / M8 | GL-DELIVERY-001 |
| GL-R-058 | Versioned feature switches permit safe analyzer rollback without disabling access protection; deployment and database recovery are tested separately | U22,35; O25 | Retained / M8 | GL-DELIVERY-001 |
| GL-R-059 | Two-page born-digital deterministic analysis targets p95 <20s; fixed workload/hardware/load reported; optional OCR/AI measured separately | T2; U23; O19 | Retained target / M8 | GL-PERF-001 |
| GL-R-060 | Per-file/user/provider limits, bounded resource pools, account-scoped artifact reuse, request coalescing and cost stop conditions work | U23; T20; O19 | Retained / M2-M8 | GL-JOBS-001, GL-PERF-001 |
| GL-R-061 | Verified-improvement, completion, latency, feedback, export, false-positive, trust and takedown metrics have definitions and privacy-safe collection | P19; U20; O12 | Retained / M8-M9 | GL-OPS-001 |
| GL-R-062 | Beta/public release requires security/privacy review, consent wording review, restore/deletion proof, support staffing and client walkthrough | T26; U35; O25 | Retained / M8 | GL-RELEASE-001 |
| GL-R-063 | Named primary/backup/reviewer responsibilities; small vertical slices, evidence-based PRs, incident learning and regular coordination | U25-30,33; O4-10,15,22 | Retained operating rule | GL-DOCS-001, GL-OPS-002 |
| GL-R-064 | Stable IDs, scope decisions, approvals, evidence and restart rules allow work from any partial project state without fake completion | C; U33; O21 | Retained documentation | GL-DOCS-001 |
| GL-R-065 | Broader geographies, seniorities, languages and mentor/org access need new evaluation and ownership contracts; no implicit language-quality claim | P5,21; T24; C | Deferred / M10 | GL-EXPAND-001 |
| GL-R-066 | Optional version comparison, template repair, discovery, portfolio extension, example display, expanded local-model modes and narrow models have separate complete slices | P21; U15; T24 | Deferred / M10 | GL-EXPAND-002 |
| GL-R-067 | Hiring/mentorship guidance informs role coverage and review capability, not a code dependency or invented staffing commitment | U34,36; O23-24,27-28 | Adapted operating rule | GL-OPS-002 |
| GL-R-068 | Provider, legal, license, capacity, retention and spend decisions have evidence and explicit launch gates; no unverified vendor promises | P26; T23,26; C | Retained / M0-M8 | GL-BASE-003 |

## Release interpretation

M8 can launch without M9 or optional GL-AI-003. The basic analyzer must work without generative AI. Any optional capability not meeting its tests stays unavailable with an honest explanation and no active purchase/export promise. Deferred requirements are real backlog, not permission to add dead buttons.

Beta scope supports English analysis first, PDF/DOCX with explicit OCR limitations, existing creation/edit/export workflows after isolation, and pasted job descriptions. Existing localized UI remains. Global analysis, arbitrary remote imports, fine-tuning and organization sharing do not silently enter beta.

Every new requirement needs a measurable test and owner. If a source section contains a missed obligation, amend this register and the task before implementing; do not claim the crosswalk is proof of runtime completeness.

## Client execution additions — 2026-10-01

| ID | Required outcome | Source / disposition | Acceptance / phase | Delivery tasks |
|---|---|---|---|---|
| GL-R-069 | Product display name is Jugalbandi; preserve existing records and upstream credit | Client rename 2026-10-01; retained | Visible name and API display metadata agree across languages; M0 | GL-BRAND-001 |
