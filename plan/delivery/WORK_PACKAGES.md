# Ordered work packages

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

Specification date: 2026-09-30. Status/assignment live only in [TRACKER](TRACKER.md). Requirements and source sections are in [REQUIREMENTS](REQUIREMENTS.md); each card's requirement references inherit those source citations. A phase indicates intended user delivery, not a rule to execute unrelated tasks in lockstep. The dependency graph is authoritative.

## Rules shared by every card

- Preconditions: read root instructions, local instructions, current map, linked contracts and decision/approval records; revalidate implementation, callers and twins. Dependencies must be VERIFIED, and a concrete execution assignment must exist. A listed gate is not approval.
- G-* gates apply where the action reaches that boundary. Read-only research remains allowed. New major dependencies always require G-DEPS even if a card's short gate list omits it. Every personal-data/auth/schema/shared-environment change requires its applicable gate.
- Every user-facing slice covers pending, empty, denied, cancelled, stale and recoverable/final failure states. No blank spinner, fake score or unwired button. A non-UI card must test the equivalent API/worker outcomes or explain non-applicability in evidence.
- Before writing: fill exact paths/edit ownership, contract revision, approved tool versions, selected tests and expected results in the claim. Do not guess vendor APIs. Proposed future APIs become code only after GL-CONTRACT-001.
- Completion: implementation + relevant tests + safe diagnostics + accessibility where applicable + contract/docs updates + recovery evidence + review. Record actual commands/results, not only a test name. Client acceptance and deployment remain separate.
- Update task status, evidence, requirements affected by changed scope, and HANDOFF at checkpoint. If a dependency changes, revalidate dependents. Stop conditions below are in addition to root consent rules.
- Time estimates are assigned after discovery: optimistic/likely/pessimistic engineering effort, reviewer availability and external waits. Source sprint lengths are not commitments. Never trade security/completeness for an invented deadline.

## Milestones and integration

M0 establishes facts; M1 secures accounts; M2 establishes durable lifecycle; M3 proves one complete finding; M4 broadens extraction; M5 adds semantics; M6 completes report/editor; M7 adds optional AI; M8 gates hosted beta; M9 adds governed corpus; M10 expands. Privacy/deletion is required before real data. Early M1 changes remain synthetic/local until M2 and release gates pass.

GL-QA-001 may proceed alongside baseline work. GL-STORAGE-001 and GL-JOBS-001 can be separated after database contracts stabilize. Corpus research can proceed independently of beta but publication cannot. GL-AI-003 is optional and is deliberately not a dependency of release. Report/editor changes sharing components are serialized by the integration owner. No task card authorizes agent spawning or external messaging by itself; follow the active execution environment's delegation rules.

## Task cards

<a id="gl-docs-001"></a>

### GL-DOCS-001 — Deliver a resumable handbook

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-063, GL-R-064; source sections follow those requirement rows.
- **Depends on:** None.
- **Approval references:** A-DOC-001.
- **Edit boundary and reuse:** Root instructions, plan/delivery and root ignore exception; later A-DOC-002 also permits targeted existing-guide additions/corrections, preserving original source plans and product behavior.
- **Behavior / interfaces:** Reconcile four plans, map source requirements, specify contracts/tasks/gates and initialize honest status. Preserve every original source plan and application file.
- **Acceptance:** All required docs exist; source coverage, links, IDs and dependency graph validate; restart exercises produce safe next actions; baseline hashes unchanged except approved ignore addition.
- **Verification / client proof:** Run documentation validator and pre/post file comparison; review inconsistent completion and approval claims.
- **Recovery:** Restore prior documentation from recorded baseline if necessary; do not delete original plans.
- **Observability:** Documentation validation findings and unresolved source decisions.
- **Stop / escalate:** Any unexpected application-file change or apparent secret in evidence.

<a id="gl-base-001"></a>

### GL-BASE-001 — Establish source provenance and recovery

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-002; source sections follow those requirement rows.
- **Depends on:** GL-DOCS-001.
- **Approval references:** G-BASE.
- **Edit boundary and reuse:** Repository metadata and documented recovery procedure; no overwrite.
- **Behavior / interfaces:** Identify whether this is an archive or checkout; compare local manifests/file hashes with a known source only when available. Record unknown fork point honestly. Prepare a source snapshot/version-control proposal preserving all existing files and notices.
- **Acceptance:** Recoverable baseline demonstrated before product writes; source origin and deviations recorded or explicitly unknown; upstream review responsibility assigned.
- **Verification / client proof:** Read-only inventory and recovery rehearsal on a separate disposable copy after approval.
- **Recovery:** Keep original folder untouched; never reset it to upstream.
- **Observability:** Provenance discrepancies and recovery verification result.
- **Stop / escalate:** Recovery cannot be demonstrated or newly discovered client work would be lost.

<a id="gl-base-002"></a>

### GL-BASE-002 — Establish isolated runnable development checks

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-003; source sections follow those requirement rows.
- **Depends on:** GL-DOCS-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Local tooling diagnosis, test-isolation fixture repairs with regression coverage, and setup documentation; manifests only with separate approval.
- **Behavior / interfaces:** Diagnose broken Python launcher; locate compatible Python >=3.13 without reusing unrelated virtual environments. Verify Node/npm/uv, registry origins, lock behavior and browser requirements. Propose reproducible installation before dependency changes.
- **Acceptance:** Fresh isolated setup reproduces declared versions; test commands use disposable data and blocked external AI; absent tools are explicit blockers.
- **Verification / client proof:** Version probes then approved isolated install; run baseline commands from VERIFICATION.
- **Recovery:** Keep existing environments and lockfiles; no machine-wide reset.
- **Observability:** Exact versions, dependency resolution and sanitized setup failures.
- **Stop / escalate:** Install would upgrade shared tooling, contact paid providers or touch real DATA_DIR without approval.

<a id="gl-base-003"></a>

### GL-BASE-003 — Resolve providers, tools and policy decisions

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-068; source sections follow those requirement rows.
- **Depends on:** GL-BASE-001, GL-BASE-002.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Decision dossier and concrete approval proposals only.
- **Behavior / interfaces:** Evaluate official docs for auth, PostgreSQL, storage, queue, parsers/converter/OCR, hosting and telemetry. Select compatible versions and one recommended stack; inspect licenses, regions, privacy terms, backup limits and costs. Use confirmed hosted-profile assumptions (50 invited users, about 5 simultaneous, 30 days from upload plus seven-day recovery) only if hosted work is separately resumed; determine local prerequisites first. Set remaining quotas and evaluation gates with named reviewers.
- **Acceptance:** No slash-separated tool choices left in ready implementation cards; dossiers identify evidence, cost assumptions, rollback, unsupported requirements and required approvals; zero purchases.
- **Verification / client proof:** Review selected versions against manifests and synthetic feasibility criteria; client sees business consequences, not framework choices.
- **Recovery:** Revise decision record with supersession; no service has been provisioned.
- **Observability:** Decision expiry dates, source links and unresolved provider constraints.
- **Stop / escalate:** Required privacy terms, license rights or operating envelope cannot be verified.

<a id="gl-base-004"></a>

### GL-BASE-004 — Baseline every existing user journey

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-001; source sections follow those requirement rows.
- **Depends on:** GL-BASE-002.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Current routes, clients, helpers and tests; synthetic data only.
- **Behavior / interfaces:** Trace upload/wizard, default-master choice, editor drafts, tailoring preview/confirm, tracker, attachments and PDF. Inventory all routes/callers, shared helpers, unfinished surfaces and twins. Do not remove anything found unused.
- **Acceptance:** Each current journey has observed expected behavior or a specific baseline defect; failure and recovery paths recorded; no inherited green claim.
- **Verification / client proof:** Run existing suites and owned browser/PDF checks; compare documented API behavior with callers.
- **Recovery:** Read-only observation; isolate all generated test artifacts.
- **Observability:** Baseline failure matrix separated from regressions introduced later.
- **Stop / escalate:** A command starts the app against unknown data or requires unapproved provider spend.

<a id="gl-qa-001"></a>

### GL-QA-001 — Build governed analysis fixtures and rubrics

- **Phase / priority:** M0 / P0.
- **Requirements:** GL-R-055; source sections follow those requirement rows.
- **Depends on:** GL-BASE-002.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Synthetic/permissioned fixtures and evaluation harness.
- **Behavior / interfaces:** Define single/two-column, scanned/mixed, rotated/cropped, DOCX style/table, font, clipping, alignment, dense/sparse and malicious fixtures. Separate tuning and held-out sets; two reviewers adjudicate subjective labels. Keep consent and fixture versions.
- **Acceptance:** Every analyzer requirement has positive, negative and intentional-design cases; no private resume copied from source examples; disagreement and fixture licenses recorded.
- **Verification / client proof:** Fixture manifest validation; repeat extraction and annotation review; baseline existing eval harness reuse.
- **Recovery:** Version fixtures and labels; never overwrite historical evidence.
- **Observability:** Coverage by format/defect/audience and inter-reviewer agreement.
- **Stop / escalate:** Rights missing, label disagreement hidden, or evaluation data leaks into tuning.

<a id="gl-contract-001"></a>

### GL-CONTRACT-001 — Freeze compatible contracts before feature writes

- **Phase / priority:** M1 / P0.
- **Requirements:** GL-R-052; source sections follow those requirement rows.
- **Depends on:** GL-BASE-003, GL-BASE-004.
- **Approval references:** G-AUTH, G-DATA.
- **Edit boundary and reuse:** Pydantic/OpenAPI/client types and contract tests.
- **Behavior / interfaces:** Turn CONTRACTS into concrete versioned wire schemas, selected auth transport, quotas, cursor/idempotency windows and event retention. Inventory old /api/v1 callers; retain legacy response behavior through adapters. Define state transitions and errors before worker/client integration.
- **Acceptance:** Each new route has input/output/access/failure schema and tests; existing callers remain compatible; examples are synthetic and typed.
- **Verification / client proof:** OpenAPI/client drift checks and old/new request contract tests.
- **Recovery:** Additive contract version/adapter rollback; never silently rename existing URLs.
- **Observability:** Contract mismatch/error-code counts without payload content.
- **Stop / escalate:** Compatibility would break without a separately approved caller transition.

<a id="gl-identity-001"></a>

### GL-IDENTITY-001 — Introduce invited verified accounts

- **Phase / priority:** M1 / P0.
- **Requirements:** GL-R-004; source sections follow those requirement rows.
- **Depends on:** GL-CONTRACT-001.
- **Approval references:** G-AUTH, G-DEPS, G-DATA.
- **Edit boundary and reuse:** Backend identity boundary, frontend account flow, owned account records.
- **Behavior / interfaces:** Implement chosen managed identity with invitation/verified identity, session expiry, sign-out and recovery. Verify issuer/audience/signature/expiry. Define CSRF/session storage for chosen transport. Use synthetic accounts; no hosted invite campaign.
- **Acceptance:** Invalid/expired/uninvited identities fail closed; sign-out and sensitive reauthentication work; no secrets in browser bundle.
- **Verification / client proof:** Provider contract mocks plus approved sandbox identity checks; session/CSRF negative tests.
- **Recovery:** Disable beta entry/invitations; preserve data; never remove auth from a populated hosted service.
- **Observability:** Sign-in/invite failures and safe security event IDs.
- **Stop / escalate:** Unexpected identity provider retention/cost or any access bypass.

<a id="gl-identity-002"></a>

### GL-IDENTITY-002 — Enforce ownership across all access paths

- **Phase / priority:** M1 / P0.
- **Requirements:** GL-R-005; source sections follow those requirement rows.
- **Depends on:** GL-IDENTITY-001.
- **Approval references:** G-AUTH, G-DATA.
- **Edit boundary and reuse:** All backend repositories/routes, artifacts, print paths and streams.
- **Behavior / interfaces:** Add owner-scoped access and parent-child checks to resumes/jobs/tracker/previews/attachments. Include service renderer and async work. Replace global default-master uniqueness with account scope under approved data change.
- **Acceptance:** Two users cannot read/write/list/export/subscribe to each other's resources; nested foreign IDs fail; print worker remains functional.
- **Verification / client proof:** Parameterized two-account tests across every route and indirect artifact path; actual database role tests later repeated on PostgreSQL.
- **Recovery:** Rollback application release only with access still enforced; close hosted ingress if isolation is uncertain.
- **Observability:** Denied access counts and role-scoped audit events.
- **Stop / escalate:** Any path cannot be mapped to an owner or existing data appears.

<a id="gl-identity-003"></a>

### GL-IDENTITY-003 — Separate personal preferences from platform administration

- **Phase / priority:** M1 / P0.
- **Requirements:** GL-R-006; source sections follow those requirement rows.
- **Depends on:** GL-IDENTITY-002.
- **Approval references:** G-AUTH, G-DATA, G-UX.
- **Edit boundary and reuse:** Settings APIs/UI, config/key store, browser draft utilities.
- **Behavior / interfaces:** Restrict keys/reset/provider destinations/global prompts to approved admins; move personal preferences to account scope. Namespace draft/recovery keys by account and clear/invalidate on sign-out/switch. Preserve recovery consent.
- **Acceptance:** Ordinary user cannot alter global configuration; masked key responses reveal no secret; account switch cannot show prior drafts or status caches.
- **Verification / client proof:** Settings privilege tests, browser account-switch/recovery tests and credential error scrubbing.
- **Recovery:** Preserve old local behavior in baseline; disable hosted admin surface rather than expose global defaults.
- **Observability:** Safe configuration-change audit with actor/purpose, no values containing secrets.
- **Stop / escalate:** Credential loss, provider URL egress risk or cross-account draft exposure.

<a id="gl-data-001"></a>

### GL-DATA-001 — Introduce reviewed PostgreSQL persistence

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-007; source sections follow those requirement rows.
- **Depends on:** GL-IDENTITY-003, GL-CONTRACT-001.
- **Approval references:** G-DATA, G-DEPS.
- **Edit boundary and reuse:** SQLAlchemy facade, models, versioned database change files and isolated tests.
- **Behavior / interfaces:** Implement selected driver/change tooling; map owner/revision relationships, per-account master invariant, previews and tracker transactions. Replace SQLite-specific claims with PostgreSQL transactions; preserve public IDs/semantics. Test actual application role/pool isolation.
- **Acceptance:** Fresh database and supported upgrade path pass integrity/concurrency tests; no silent startup schema mutation; query plans cover owner lists and deletion.
- **Verification / client proof:** Real PostgreSQL integration tests for master limits, confirm replay, duplicate tracker creation, FK ownership and pooled identity reset.
- **Recovery:** Additive changes and tested previous-code compatibility; backup before shared changes; no automatic destructive down migration.
- **Observability:** Transaction failures, lock duration, connection saturation and safe migration version.
- **Stop / escalate:** Unexpected populated database, long blocking operation or missing approval.

<a id="gl-storage-001"></a>

### GL-STORAGE-001 — Store files privately with explicit manifests

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-008; source sections follow those requirement rows.
- **Depends on:** GL-DATA-001.
- **Approval references:** G-DATA, G-DEPS.
- **Edit boundary and reuse:** Storage abstraction, artifact metadata and authorization endpoint.
- **Behavior / interfaces:** Create local-test adapter and approved private provider adapter; separate quarantine/user-renders/originals/exports/reference scopes. Bind every object to owner/revision, encryption and expiry. Generate signed access only after current permission check.
- **Acceptance:** Public/foreign downloads fail; expired access fails; upload object cannot overwrite another revision; manifest supports complete deletion.
- **Verification / client proof:** Adapter integration tests and approved provider sandbox ACL/access-expiry checks.
- **Recovery:** Stop new ingestion, retain known objects, restore adapter configuration; never bulk purge to fix mismatch.
- **Observability:** Storage errors, orphan manifests and expiration failures.
- **Stop / escalate:** Provider cannot meet private access/encryption/retention requirements.

<a id="gl-jobs-001"></a>

### GL-JOBS-001 — Make long-running work durable and bounded

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-011, GL-R-060; source sections follow those requirement rows.
- **Depends on:** GL-DATA-001.
- **Approval references:** G-DATA, G-DEPS.
- **Edit boundary and reuse:** Job/outbox tables, dispatcher, worker claims and event endpoints.
- **Behavior / interfaces:** Commit job/outbox atomically; deliver IDs only; use leases/fences and repeat-safe stages. Define retries, deadlines, cancellation, progress, dead-letter replay and account budgets. Keep PostgreSQL authoritative even if queue loses messages.
- **Acceptance:** Crash between commit/send or stage/result cannot lose request or duplicate result; progress survives restart; deleted resource cannot be recreated.
- **Verification / client proof:** Fault injection at every boundary, duplicate/out-of-order delivery, cancellation and quota tests.
- **Recovery:** Pause dispatcher/queues, preserve pending jobs, replay only after owner/deletion checks.
- **Observability:** Queue age/depth, leases, retries, terminal failures and stage latency.
- **Stop / escalate:** Unbounded work, duplicate provider charge path or job ownership ambiguity.

<a id="gl-upload-001"></a>

### GL-UPLOAD-001 — Validate and quarantine uploaded documents

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-009, GL-R-010; source sections follow those requirement rows.
- **Depends on:** GL-STORAGE-001, GL-JOBS-001.
- **Approval references:** G-DATA, G-DEPS.
- **Edit boundary and reuse:** Upload routes, validation service, scanner and parser sandbox.
- **Behavior / interfaces:** Enforce signature/type/size/pages/expansion limits and password-protection errors. Scan before parsing, isolate non-root parsing with denied egress and CPU/memory/temp/time caps. Bound direct-upload completion and abandoned objects.
- **Acceptance:** Spoofed/unsafe/oversized files never reach normal parsing; scanner unavailable remains pending/failed; safe retry does not create duplicate documents.
- **Verification / client proof:** Malicious/corrupt fixtures and scanner outage; orphan-upload TTL and replay tests.
- **Recovery:** Disable new uploads; preserve quarantine and cleanup under approved retention.
- **Observability:** Rejection reason classes, scan age/failure, sandbox limit hits.
- **Stop / escalate:** Scan bypass, unexpected file access/network or uncontrolled decompression.

<a id="gl-privacy-001"></a>

### GL-PRIVACY-001 — Implement distinct privacy choices

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-012; source sections follow those requirement rows.
- **Depends on:** GL-STORAGE-001, GL-IDENTITY-003.
- **Approval references:** G-DATA, G-UX.
- **Edit boundary and reuse:** Consent/retention records and user controls.
- **Behavior / interfaces:** For the conditional hosted profile apply upload-based 30-day retention and seven-day recovery; separate cloud AI, telemetry and training choices. Version consent; require approved exact TTLs and purpose copy. Expire abandoned/temporary artifacts; no inferred corpus contribution.
- **Acceptance:** No bundled opt-in; lack of policy blocks real ingestion; withdrawal affects future processing; retention runs include derived content.
- **Verification / client proof:** Consent matrix and expiry-clock tests; client reads actual data-flow explanation.
- **Recovery:** Stop optional processing; preserve required deletion jobs and recorded consent history.
- **Observability:** Expiry/deletion backlog and consent-policy mismatch.
- **Stop / escalate:** Undefined retention, retroactive consent or externally transmitted content without approved purpose.

<a id="gl-privacy-002"></a>

### GL-PRIVACY-002 — Deliver deletion and personal-data export

- **Phase / priority:** M2 / P0.
- **Requirements:** GL-R-013, GL-R-014; source sections follow those requirement rows.
- **Depends on:** GL-PRIVACY-001, GL-JOBS-001, GL-UPLOAD-001.
- **Approval references:** G-DATA, G-AUTH, G-UX.
- **Edit boundary and reuse:** Deletion/export jobs, manifests, account lifecycle and UI.
- **Behavior / interfaces:** Revoke access first; fence workers; erase live artifacts/rows/embeddings/caches and minimize operational records. Reconcile backup tombstones on restore. Export owned personal data; account deletion includes identity provider actions.
- **Acceptance:** Delete during parse/AI/export never resurrects material; failed storage cleanup remains pending; export contains own records only; backup wording is accurate.
- **Verification / client proof:** Full artifact inventory before/after; retry/restore tests; two-account archive inspection.
- **Recovery:** Deletion cannot be undone after erasure; rehearse with synthetic data; pause failing batches without restoring access.
- **Observability:** Deletion age and stage failures, export audit and restore suppression result.
- **Stop / escalate:** Unknown artifact class, false completion or missing approved irreversible-action policy.

<a id="gl-doc-001"></a>

### GL-DOC-001 — Define immutable document evidence

- **Phase / priority:** M3 / P0.
- **Requirements:** GL-R-015, GL-R-016; source sections follow those requirement rows.
- **Depends on:** GL-CONTRACT-001, GL-QA-001, GL-DATA-001.
- **Approval references:** G-DATA.
- **Edit boundary and reuse:** IR/revision schemas, evidence references and validation.
- **Behavior / interfaces:** Implement versioned pages/blocks/lines/spans/styles/sections with top-left point coordinates, crop/rotation transform and text-offset provenance. Preserve unknown content and extraction diagnostics.
- **Acceptance:** Mixed-size/rotated pages map correctly; evidence resolves to exact revision; invalid/nonfinite geometry rejected safely; absent OCR styles remain unknown.
- **Verification / client proof:** Roundtrip/schema and Unicode/ligature/coordinate fixtures; version compatibility tests.
- **Recovery:** New IR version alongside old; no rewriting previous reports.
- **Observability:** Invalid IR diagnostics by version, no text payloads.
- **Stop / escalate:** Source text lost or evidence cannot be mapped deterministically.

<a id="gl-doc-002"></a>

### GL-DOC-002 — Extract one real PDF measurement end to end

- **Phase / priority:** M3 / P0.
- **Requirements:** GL-R-017; source sections follow those requirement rows.
- **Depends on:** GL-DOC-001, GL-UPLOAD-001, GL-PRIVACY-002.
- **Approval references:** G-DEPS, G-DATA.
- **Edit boundary and reuse:** Native parser/render worker and one pure rule.
- **Behavior / interfaces:** Use approved native PDF extraction; render authorized page artifact; measure content boundary/near-edge condition excluding decorations. Persist one versioned finding with exact box/units.
- **Acceptance:** Safe sample yields expected measurement and render; clean negative fixture yields no invented finding; original PDF is preserved under retention.
- **Verification / client proof:** Golden geometry values with documented tolerances plus pipeline integration and malformed input tests.
- **Recovery:** Flag rule off and preserve immutable artifacts; switch parser version only through tested adapter.
- **Observability:** Extraction/render duration and failure provenance.
- **Stop / escalate:** Unapproved parser license or measured box disagrees with source/render transform.

<a id="gl-report-001"></a>

### GL-REPORT-001 — Show the first complete analysis journey

- **Phase / priority:** M3 / P0.
- **Requirements:** GL-R-018, GL-R-032, GL-R-035; source sections follow those requirement rows.
- **Depends on:** GL-DOC-002.
- **Approval references:** G-UX.
- **Edit boundary and reuse:** Upload/status/report view and feedback API/client.
- **Behavior / interfaces:** Display real progress, result/empty/error states, first evidence-linked finding and accessible page location. Persist dismiss/intentional/clear actions by revision without altering measurements.
- **Acceptance:** User uploads, opens real evidence and records feedback; refresh retains it; failure is not a score; no placeholder report.
- **Verification / client proof:** Owned browser journey, API feedback replay/authorization and loading/error/empty tests.
- **Recovery:** Hide unfinished analysis entry under server capability; keep existing editor paths.
- **Observability:** Report completion/open/feedback events without content.
- **Stop / escalate:** UI implies success before durable completion or feedback mutates source.

<a id="gl-analysis-001"></a>

### GL-ANALYSIS-001 — Diagnose ATS extraction risks

- **Phase / priority:** M4 / P0.
- **Requirements:** GL-R-019, GL-R-020; source sections follow those requirement rows.
- **Depends on:** GL-REPORT-001.
- **Approval references:** G-DEPS.
- **Edit boundary and reuse:** Reading-order graph, independent extraction adapter and ATS rules.
- **Behavior / interfaces:** Cover text layers, columns, tables, icons, header/footer intrusion, headings/contact extraction, ligatures/overlays. Compare extraction order to inferred visual order; flag ambiguity instead of asserting universal ATS compatibility.
- **Acceptance:** Known good/bad two-column cases separated; extracted preview shows actual order; each severe issue cites measured evidence.
- **Verification / client proof:** Golden ATS suite with reviewed precision/recall and ambiguous negative examples.
- **Recovery:** Disable individual versioned rules; keep extracted preview and uncertainty.
- **Observability:** Risk counts/false-positive reviews by rule/version.
- **Stop / escalate:** Insufficient independent evidence for high-confidence warnings.

<a id="gl-analysis-002"></a>

### GL-ANALYSIS-002 — Measure layout and typography consistently

- **Phase / priority:** M4 / P0.
- **Requirements:** GL-R-021, GL-R-022, GL-R-023; source sections follow those requirement rows.
- **Depends on:** GL-ANALYSIS-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Pure geometry features, declarative rules and evidence aggregation.
- **Behavior / interfaces:** Implement all retained page/block/span/rhythm features; parameterize by document/context. Cluster date/body anchors, distinguish decorations, group shared root causes and avoid double penalties.
- **Acceptance:** At least ten meaningful finding types across fixtures; deliberate variations not mechanically penalized; measurements have units/confidence.
- **Verification / client proof:** Synthetic perturbations for gaps/alignment/overflow/fonts/density plus clean/intentionally asymmetric negatives.
- **Recovery:** Version rule packs; disable faulty rule while retaining measurement artifacts.
- **Observability:** Per-rule precision, false positives, coverage and duration.
- **Stop / escalate:** Hardcoded universal beauty rule or unsupported pixel-to-point assumption.

<a id="gl-doc-003"></a>

### GL-DOC-003 — Add DOCX style and rendered-layout analysis

- **Phase / priority:** M4 / P0.
- **Requirements:** GL-R-024; source sections follow those requirement rows.
- **Depends on:** GL-ANALYSIS-002.
- **Approval references:** G-DEPS.
- **Edit boundary and reuse:** DOCX extraction/conversion worker and IR adapter.
- **Behavior / interfaces:** Reuse python-docx where applicable; inspect required XML styles/tables/numbering/headers. Evaluate sandboxed office conversion with controlled fonts; distinguish original style evidence from estimated pagination.
- **Acceptance:** Normal one/two-page DOCX reaches report; unsupported features produce limitation, not false geometry; conversion is bounded.
- **Verification / client proof:** DOCX fixtures with tables/headers/page breaks/fonts; rendered comparison and failure recovery.
- **Recovery:** Disable DOCX visual capability explicitly while preserving supported content extraction.
- **Observability:** Conversion failures, missing font/feature warnings and timing.
- **Stop / escalate:** Untrusted embedded links trigger fetch, or conversion silently drops content.

<a id="gl-doc-004"></a>

### GL-DOC-004 — Handle scans with conditional OCR

- **Phase / priority:** M4 / P1.
- **Requirements:** GL-R-025; source sections follow those requirement rows.
- **Depends on:** GL-DOC-003.
- **Approval references:** G-DEPS, G-AI.
- **Edit boundary and reuse:** OCR adapter and mixed-page normalization.
- **Behavior / interfaces:** Detect insufficient native text per page, invoke approved OCR only as needed, retain token boxes/confidence and language limitations. Local OCR needs no cloud consent; external OCR requires approved explicit data flow.
- **Acceptance:** Scan/mixed PDF obtains usable text or explicit inability; weak OCR cannot create high-confidence font/spacing claims.
- **Verification / client proof:** Blur/noise/rotation/mixed/native fixtures; verify no duplicate OCR on native pages and bounded retries.
- **Recovery:** Turn off OCR capability with clear unsupported-scan response; no fake completion.
- **Observability:** OCR use rate, confidence/quality and cost/time.
- **Stop / escalate:** Unexpected external processing or unreliable text presented as exact.

<a id="gl-semantic-001"></a>

### GL-SEMANTIC-001 — Map content to source-backed sections

- **Phase / priority:** M5 / P0.
- **Requirements:** GL-R-026, GL-R-027; source sections follow those requirement rows.
- **Depends on:** GL-DOC-004.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Semantic parser, custom section handling and text-only input.
- **Behavior / interfaces:** Preserve all known/custom sections and map entities to source spans; provide content-only analysis for pasted text with visual dimensions unavailable. Inventory legacy DOC before altering supported formats.
- **Acceptance:** Unknown headings/content survive; source ranges resolve; text-only user sees no fabricated layout report.
- **Verification / client proof:** Section/offset fixtures, missing/duplicate sections, long Unicode inputs and existing preservation regression tests.
- **Recovery:** Keep original text and prior IR; disable classifier independently.
- **Observability:** Unclassified section rate, source coverage and parser errors.
- **Stop / escalate:** Any content is silently discarded or format support removed without approval.

<a id="gl-semantic-002"></a>

### GL-SEMANTIC-002 — Explain bullet evidence and narrative

- **Phase / priority:** M5 / P0.
- **Requirements:** GL-R-028, GL-R-029; source sections follow those requirement rows.
- **Depends on:** GL-SEMANTIC-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Evidence features and contextual framing rules.
- **Behavior / interfaces:** Assess action/object/method/scope/outcome, meaningful quantification, ownership, repetition/tense and top-of-page proof. Student project evidence can substitute for unavailable commercial metrics; label inference.
- **Acceptance:** Examples cite exact phrases; missing outcomes lead to questions, not invented numbers; contradictory/extraordinary claims invite verification, not accusation.
- **Verification / client proof:** Reviewed student/career-switch/experienced controls; keyword-only and inflated-number negatives.
- **Recovery:** Disable narrative rule and retain measured evidence features.
- **Observability:** Reviewer agreement, severity calibration and dismissal patterns.
- **Stop / escalate:** Demographic/prestige proxies or unsupported truth claims enter scoring.

<a id="gl-match-001"></a>

### GL-MATCH-001 — Match jobs to demonstrated evidence

- **Phase / priority:** M5 / P0.
- **Requirements:** GL-R-030; source sections follow those requirement rows.
- **Depends on:** GL-SEMANTIC-002.
- **Approval references:** G-DEPS, G-AI.
- **Edit boundary and reuse:** Existing job/keyword helpers plus versioned matching service.
- **Behavior / interfaces:** Use pasted JD revision; lexical aliases then approved embeddings where beneficial; map each requirement to source evidence and four gap states. Do not fetch arbitrary job URLs.
- **Acceptance:** Skills list mention differs from demonstrated experience; absent requirements never become candidate claims; foreign JD rejected.
- **Verification / client proof:** Exact/alias/negation/weak-evidence fixtures, ownership and no-JD cases; compare embedding benefit to lexical baseline.
- **Recovery:** Disable semantic enrichment, show lexical coverage with honest limitations.
- **Observability:** Match coverage, unresolved requirements and retrieval latency/cost.
- **Stop / escalate:** External embedding data flow unapproved or false certainty from similarity alone.

<a id="gl-score-001"></a>

### GL-SCORE-001 — Publish explainable contextual dimensions

- **Phase / priority:** M5 / P0.
- **Requirements:** GL-R-031, GL-R-032, GL-R-051; source sections follow those requirement rows.
- **Depends on:** GL-MATCH-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Versioned scoring policy, aggregation and fairness tests.
- **Behavior / interfaces:** Expose six availability-aware dimensions, severity/confidence and ranked useful actions. Approve calibrated weights only after reviewer evidence; prevent duplicate penalties and missing-input inflation. Preserve raw measurements on dismissal.
- **Acceptance:** No JD/cohort yields unscored; failed stage is not zero; only compatible context/version compared over time; identity/prestige counterfactuals do not change job-irrelevant results.
- **Verification / client proof:** Score invariants, empty/partial cases, duplicate-root-cause cases and protected-attribute counterfactual fixtures.
- **Recovery:** Disable composite; retain evidence dimensions and old run versions.
- **Observability:** Score availability/coverage, rule disagreement and fairness drift.
- **Stop / escalate:** Headline score implies hiring probability or weights lack reviewed rationale.

<a id="gl-report-002"></a>

### GL-REPORT-002 — Deliver report lenses and evidence canvas

- **Phase / priority:** M6 / P1.
- **Requirements:** GL-R-029, GL-R-033, GL-R-034, GL-R-035; source sections follow those requirement rows.
- **Depends on:** GL-SCORE-001.
- **Approval references:** G-UX.
- **Edit boundary and reuse:** Report navigation, page viewer, overlays, filters and history.
- **Behavior / interfaces:** Add overview/ATS/layout/narrative/evidence/job/cohort states, privacy context, three useful actions and at most five default pins. Support zoom/page selection/inspector/filters and accessible finding list; scan preview labelled heuristic.
- **Acceptance:** Every available lens is wired to real data; cohort-unavailable state is honest; pins align after zoom/rotation; feedback/history bound to revision.
- **Verification / client proof:** Browser/visual tests across screen sizes, mixed page sizes, long lists, stale run and missing capability.
- **Recovery:** Capability flags return to simple report; preserve history and feedback.
- **Observability:** Canvas/render failures and interaction timing.
- **Stop / escalate:** Evidence displays against wrong revision or hidden navigation goes nowhere.

<a id="gl-report-003"></a>

### GL-REPORT-003 — Verify accessible calm report design

- **Phase / priority:** M6 / P0.
- **Requirements:** GL-R-038, GL-R-039; source sections follow those requirement rows.
- **Depends on:** GL-REPORT-002.
- **Approval references:** G-UX.
- **Edit boundary and reuse:** Report/editor interactions, copy and existing design tokens.
- **Behavior / interfaces:** Apply Swiss/editorial hierarchy; semantic landmarks, keyboard pin alternatives, focus restoration, contrast, text labels and reduced motion. Preserve locale key parity and existing UI languages; analysis limits visible.
- **Acceptance:** Keyboard-only user completes report and feedback; screen reader has structured findings; reflow and dialogs work; no hiring guarantees or prestige language.
- **Verification / client proof:** Automated accessibility checks plus manual keyboard/screen-reader/zoom/reduced-motion walkthrough and localized layout checks.
- **Recovery:** Revert presentation changes without erasing data or restoring inaccessible interaction.
- **Observability:** Accessibility defects by journey; no content analytics.
- **Stop / escalate:** Essential information only available by color, mouse or animation.

<a id="gl-edit-001"></a>

### GL-EDIT-001 — Preserve editing, tracking and export integration

- **Phase / priority:** M6 / P0.
- **Requirements:** GL-R-001, GL-R-037; source sections follow those requirement rows.
- **Depends on:** GL-REPORT-003, GL-IDENTITY-003.
- **Approval references:** G-UX, G-AUTH.
- **Edit boundary and reuse:** Builder, wizard, tailoring, tracker, attachments and PDF print snapshot.
- **Behavior / interfaces:** Connect analysis to existing editable revisions; preserve dates/contact/custom sections and style controls. Save exact intended revision before export; secure internal rendering and local recovery. Do not promise lossless editing of arbitrary uploaded PDF layout.
- **Acceptance:** Existing journeys pass with private accounts; edit/reanalyze/export use matching revisions; optional attachment failure does not undo successful resume save.
- **Verification / client proof:** Baseline regression suite plus real Chromium PDF text/geometry checks, multi-master and draft/confirmation replay tests.
- **Recovery:** Return to previous frontend/API release with compatible storage and access checks intact.
- **Observability:** Save/export failures and recovery confirmations.
- **Stop / escalate:** Content loss, leaked print access or irreversible template conversion without preview.

<a id="gl-ai-001"></a>

### GL-AI-001 — Add consent-aware optional AI gateway

- **Phase / priority:** M7 / P1.
- **Requirements:** GL-R-040, GL-R-041; source sections follow those requirement rows.
- **Depends on:** GL-IDENTITY-003, GL-PRIVACY-002, GL-SCORE-001.
- **Approval references:** G-AI, G-DEPS.
- **Edit boundary and reuse:** LiteLLM, task policy, prompt registry and budgets.
- **Behavior / interfaces:** Minimize/redact payloads, allowlist approved provider/model by purpose/privacy, validate output and propagate versions. Check consent at dispatch; distinguish network retries from output-quality retries; no default external calls.
- **Acceptance:** No-LLM analysis complete; unconsented/unapproved route denied; timeout/budget/provider failure leaves deterministic report usable.
- **Verification / client proof:** Transport-mocked routing/redaction/prompt-injection/invalid-output/cost tests; approved paid evaluation separate.
- **Recovery:** Disable optional provider route; preserve deterministic results and deletion processing.
- **Observability:** Tokens/estimated actual cost distinction, provider errors/latency, no prompts.
- **Stop / escalate:** Provider terms or payload scope differs from consent.

<a id="gl-ai-002"></a>

### GL-AI-002 — Offer source-supported tracked rewrites

- **Phase / priority:** M7 / P1.
- **Requirements:** GL-R-036; source sections follow those requirement rows.
- **Depends on:** GL-AI-001, GL-EDIT-001.
- **Approval references:** G-AI, G-UX.
- **Edit boundary and reuse:** Proposal schemas, verifier, diff UI and atomic accept.
- **Behavior / interfaces:** Generate bounded proposals with source support for each claim; collect missing facts separately; prevent unresolved placeholder export. Show original/proposed text, allow rejection and enforce source revision on acceptance.
- **Acceptance:** Unsupported employer/metric/date/skill cannot silently enter accepted result; stale proposal conflicts; duplicate acceptance replays.
- **Verification / client proof:** Adversarial factual-support suite, consent and stale/replay integration tests; independent held-out reviewer audit.
- **Recovery:** Disable proposals/accept entry while preserving accepted revisions and evidence.
- **Observability:** Unsupported-claim rejection, acceptance failures and version IDs.
- **Stop / escalate:** Any unsupported claim passes as verified or user edits overwritten.

<a id="gl-ai-003"></a>

### GL-AI-003 — Evaluate Jev and Laya without release dependency

- **Phase / priority:** M7 / P2.
- **Requirements:** GL-R-042; source sections follow those requirement rows.
- **Depends on:** GL-QA-001, GL-SEMANTIC-002.
- **Approval references:** G-DEPS, G-AI.
- **Edit boundary and reuse:** Isolated decision-model benchmark and evaluation record.
- **Behavior / interfaces:** Compare rules/current baseline/Laya/Jev on section and evidence decisions; pin sources/checkpoints, enforce context limits and abstention. No integration until held-out quality, privacy and cost evidence passes AI_EVALUATION.
- **Acceptance:** Reproducible benchmark reports per-task benefit or rejection; valid type is never treated as factual proof; unavailable Jev access does not block beta.
- **Verification / client proof:** Held-out confusion/calibration/latency/memory/cost tests, long-input and prompt perturbation stress cases.
- **Recovery:** Remove experimental route from enabled config; preserve benchmark evidence; dependency removal separately approved.
- **Observability:** Benchmark failures and input truncation/abstention counts.
- **Stop / escalate:** Private data sent without approval or model becomes security/consent authority.

<a id="gl-ops-001"></a>

### GL-OPS-001 — Instrument safe operational and quality signals

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-053, GL-R-061; source sections follow those requirement rows.
- **Depends on:** GL-JOBS-001, GL-PRIVACY-002, GL-SCORE-001.
- **Approval references:** G-DEPS, G-HOST.
- **Edit boundary and reuse:** Structured events, correlation, metrics and dashboards.
- **Behavior / interfaces:** Instrument API/job stages, uploads, export, retry/deletion backlog, AI spend, report completion and verified-improvement definitions. Scrub content before telemetry; trace IDs join stages. Implement alert routes only after approved recipients/services.
- **Acceptance:** Operators can identify failing stage without raw resume text; alerts fire in synthetic drills; optional analytics honors consent.
- **Verification / client proof:** Canary secret/PII scans of logs/traces, missing-dependency drill, dashboard query and alert test.
- **Recovery:** Disable optional telemetry export without disabling local safe diagnostics.
- **Observability:** Dashboard/alert health and data freshness themselves monitored.
- **Stop / escalate:** Telemetry reveals private payloads or sends unapproved messages.

<a id="gl-perf-001"></a>

### GL-PERF-001 — Verify capacity and operating cost limits

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-059, GL-R-060; source sections follow those requirement rows.
- **Depends on:** GL-DOC-004, GL-SCORE-001, GL-OPS-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Synthetic load harness, budgets and capacity report.
- **Behavior / interfaces:** Use approved beta capacity profile; measure p95 two-page native analysis target under 20s, queue wait separately, OCR/AI/export separately. Test overload rejection, fair per-account quotas, repeated request coalescing and bounded memory.
- **Acceptance:** Results report hardware/concurrency/document mix; no unbounded backlog or cross-account reuse; cost projection distinguishes idle hosting and marginal analysis.
- **Verification / client proof:** Load/soak and dependency slowdown tests; resource and cost measurements with no unapproved paid traffic.
- **Recovery:** Reduce invitations/concurrency or disable expensive optional analysis; retain durable queued state.
- **Observability:** Latency, queue age, memory, quotas, throughput and cost per successful run.
- **Stop / escalate:** Target missed without honest limit/release decision or spend guard bypass.

<a id="gl-delivery-001"></a>

### GL-DELIVERY-001 — Make release checks reproducible and reversible

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-057, GL-R-058; source sections follow those requirement rows.
- **Depends on:** GL-BASE-003, GL-OPS-001.
- **Approval references:** G-CI, G-HOST, G-DEPS.
- **Edit boundary and reuse:** Approved CI/container/deployment configuration only.
- **Behavior / interfaces:** Add required pre-merge checks and protected publishing separation; secret/dependency scans, contract/golden/visual checks and isolated integration services. Record artifact versions and server feature switches; rehearse compatible rollback.
- **Acceptance:** No deploy on skipped/failed required checks; previews use synthetic data; no fork can access publishing secrets; rollback retains access protection.
- **Verification / client proof:** Pipeline dry-run, image startup/readiness, failure gate and prior-version recovery rehearsal in approved environment.
- **Recovery:** Restore previous artifact/config; database rollback follows reviewed compatibility plan.
- **Observability:** Release identifiers, readiness, deployment/rollback events.
- **Stop / escalate:** Shared command or credential exposure exceeds scoped approval.

<a id="gl-ops-002"></a>

### GL-OPS-002 — Assign operators and rehearse recovery

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-054, GL-R-063, GL-R-067; source sections follow those requirement rows.
- **Depends on:** GL-OPS-001, GL-DELIVERY-001.
- **Approval references:** G-HOST.
- **Edit boundary and reuse:** Runbooks, ownership assignments and approved drills.
- **Behavior / interfaces:** Name primary/backup/security/privacy owners; exercise queues, parser/OCR/provider/storage failure, database restore, privacy exposure, model regression and cost spike. Keep incident learning, review cadence and handover training.
- **Acceptance:** Backup owner can execute a safe drill using docs alone; alert contact and recovery evidence exist; no fabricated staff assignment.
- **Verification / client proof:** Tabletop and synthetic staging drills; restore/deletion-tombstone verification.
- **Recovery:** Abort drill and restore known service state; never overwrite only backup.
- **Observability:** Acknowledgement/recovery times and follow-up actions.
- **Stop / escalate:** No qualified operator or recovery path for a release-critical service.

<a id="gl-qa-002"></a>

### GL-QA-002 — Independently verify beta readiness

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-051, GL-R-056; source sections follow those requirement rows.
- **Depends on:** GL-EDIT-001, GL-AI-002, GL-PERF-001, GL-DELIVERY-001.
- **Approval references:** No additional gate for read-only/synthetic work; root approval rules still apply.
- **Edit boundary and reuse:** Cross-system tests, security/accessibility review and quality evidence.
- **Behavior / interfaces:** Run VERIFICATION matrix, regression/contract/security/golden/browser/visual checks and held-out review. Examine fairness, deletion, access isolation, truthful rewrites and no-LLM behavior. Distinguish disabled optional features from incomplete advertised ones.
- **Acceptance:** Zero unresolved release-blocking access/data-loss/claim defects; quality thresholds frozen before held-out run; failures cannot be waived by changing tests.
- **Verification / client proof:** Independent reviewer sign-off with exact artifacts/revisions and residual gaps; no historical pass substitution.
- **Recovery:** Keep beta closed; disable optional failing capability only with approved scope/copy adjustment.
- **Observability:** Defect severity/closure evidence and coverage gaps.
- **Stop / escalate:** Missing independent reviewer, fabricated fixture labels or silent gate weakening.

<a id="gl-release-001"></a>

### GL-RELEASE-001 — Approve and launch the invited beta

- **Phase / priority:** M8 / P0.
- **Requirements:** GL-R-049, GL-R-062; source sections follow those requirement rows.
- **Depends on:** GL-QA-002, GL-OPS-002.
- **Approval references:** G-RELEASE, G-HOST.
- **Edit boundary and reuse:** Readiness packet, client walkthrough and approved release execution.
- **Behavior / interfaces:** Compile approvals, privacy/consent review, provider terms, cost cap, known limits, ownership, restore proof and user acceptance. Execute ten-step walkthrough in VERIFICATION. Invite bounded audience only after explicit release approval.
- **Acceptance:** Client can complete workflow; no unapproved corpus/AI feature exposed; support and stop conditions active; all required evidence current.
- **Verification / client proof:** Approved staging walkthrough then controlled smoke checks after release; record release artifact and approver.
- **Recovery:** Stop invitations, switch off affected capability or restore prior artifact while preserving access/privacy protections.
- **Observability:** Post-release upload/report/export/deletion success and incident trigger thresholds.
- **Stop / escalate:** Any missing launch approval or critical security/privacy/recovery evidence.

<a id="gl-corpus-001"></a>

### GL-CORPUS-001 — Deliver consented reference intake and review

- **Phase / priority:** M9 / P1.
- **Requirements:** GL-R-043, GL-R-044, GL-R-045; source sections follow those requirement rows.
- **Depends on:** GL-PRIVACY-002, GL-IDENTITY-003, GL-QA-001.
- **Approval references:** G-CORPUS, G-DATA, G-AUTH, G-UX.
- **Edit boundary and reuse:** Restricted corpus records, storage, curation screens and audit.
- **Behavior / interfaces:** Implement tier/consent/provenance lifecycle and 100-point source-trust rubric. Redact/minimize, tag context, require independent publication review and record uncertainty. Pending material cannot influence reports.
- **Acceptance:** No rights means no ingestion/use; unapproved source excluded; raw reference inaccessible to users; curator decision traceable.
- **Verification / client proof:** Role/state-transition, missing consent, redaction, duplicate source and self-approval tests.
- **Recovery:** Disable intake/publication; preserve or erase restricted records according to approved policy.
- **Observability:** Review age, consent completeness, redaction errors and restricted access events.
- **Stop / escalate:** Rights ambiguity, exposed PII or unsupported employment verification.

<a id="gl-corpus-002"></a>

### GL-CORPUS-002 — Publish safe contextual cohort statistics

- **Phase / priority:** M9 / P1.
- **Requirements:** GL-R-046; source sections follow those requirement rows.
- **Depends on:** GL-CORPUS-001, GL-SCORE-001.
- **Approval references:** G-CORPUS, G-DATA, G-UX.
- **Edit boundary and reuse:** Aggregate builder, immutable membership/version lineage and insights UI.
- **Behavior / interfaces:** Calculate approved feature distributions; enforce reviewed minimum samples and anti-differencing/filter policy. Publish only after independent review; show count range/context/confidence and no individual wording.
- **Acceptance:** Small/unsafe cohorts stay unavailable; publication reproducible from approved members; normal response has no raw IDs/snippets.
- **Verification / client proof:** Sample-boundary, overlapping-filter, outlier/reidentification and revoked-member tests; reviewer statistical assessment.
- **Recovery:** Revoke snapshot/capability; previous version only if still consent-eligible.
- **Observability:** Sample sizes, publication eligibility, distribution drift and suppressed query counts.
- **Stop / escalate:** Privacy threshold treated as automatic anonymity guarantee or unapproved member affects output.

<a id="gl-corpus-003"></a>

### GL-CORPUS-003 — Remove references and calibrate responsibly

- **Phase / priority:** M9 / P1.
- **Requirements:** GL-R-047, GL-R-048; source sections follow those requirement rows.
- **Depends on:** GL-CORPUS-002.
- **Approval references:** G-CORPUS, G-DATA.
- **Edit boundary and reuse:** Takedown workflow, snapshot revocation/rebuild and feedback review.
- **Behavior / interfaces:** Accept removal case, revoke affected influence, erase private artifacts, rebuild eligible aggregates and invalidate affected report capability. Review feedback before rule changes; no autonomous training.
- **Acceptance:** Removed contributor cannot reappear after restore/rebuild; version lineage remains minimally auditable; calibration changes separately versioned/evaluated.
- **Verification / client proof:** Removal during build/publication, restore, stale report and duplicate request tests.
- **Recovery:** Keep cohort capability off until safe rebuild; withdrawal cannot be rolled back by software release.
- **Observability:** Takedown age, impacted versions and rebuild errors.
- **Stop / escalate:** Removal incomplete but reported done, or feedback reused beyond consent.

<a id="gl-expand-001"></a>

### GL-EXPAND-001 — Expand audiences only with new evidence

- **Phase / priority:** M10 / P2.
- **Requirements:** GL-R-065; source sections follow those requirement rows.
- **Depends on:** GL-RELEASE-001.
- **Approval references:** G-EXPAND, G-AUTH, G-DATA.
- **Edit boundary and reuse:** Regional/seniority/language evaluations and later mentor/org design.
- **Behavior / interfaces:** Add representative consented documents and reviewer rubrics before audience claims. Organization/mentor sharing needs explicit membership, revocation and record-level access; no implicit access based on email domain.
- **Acceptance:** Each newly advertised audience has held-out results and honest limitations; sharing/revocation tested; existing locales preserved.
- **Verification / client proof:** Audience-specific quality/fairness and cross-organization negative tests.
- **Recovery:** Withdraw new-audience capability/claim without disturbing existing beta accounts.
- **Observability:** Quality gaps and access events per approved cohort, no sensitive demographic inference.
- **Stop / escalate:** New audience unsupported by data or organization boundaries unresolved.

<a id="gl-expand-002"></a>

### GL-EXPAND-002 — Specify optional features as separate complete slices

- **Phase / priority:** M10 / P2.
- **Requirements:** GL-R-037, GL-R-041, GL-R-048, GL-R-050, GL-R-066; source sections follow those requirement rows.
- **Depends on:** GL-RELEASE-001.
- **Approval references:** G-EXPAND.
- **Edit boundary and reuse:** Version comparison, style repair, discovery, example display, expanded local-model and narrow-model proposals; BYOK belongs to GL-AI-001.
- **Behavior / interfaces:** Before coding split each selected feature into its own stable task with contracts, consent, tests and recovery. Permitted discovery requires provenance checks before download; example display separate rights; training separate dataset consent; template repair preview; local/BYOK truthful network policy.
- **Acceptance:** Each selected child task is decision-complete and approved; unselected features remain deferred without dead UI; no autonomous scraping/training.
- **Verification / client proof:** Specification/coverage review first; subsequent feature-specific integration/security/quality tests required.
- **Recovery:** Disable selected optional capability with data/privacy consequences reviewed individually.
- **Observability:** Per-feature success, privacy and cost criteria defined before readiness.
- **Stop / escalate:** Umbrella task used as blanket permission or unsupported optional feature advertised.



<a id="gl-brand-001"></a>

### GL-BRAND-001 — Show the Jugalbandi product name

- **Phase / priority:** M0 / P0; bounded client-requested identity change, independent of hosted-service milestones.
- **Requirements:** GL-R-069; client rename on 2026-10-01.
- **Depends on:** None. Repository provenance was compared before edits; this task does not waive hosted implementation prerequisites.
- **Approval references:** A-BRAND-001 (explicit product-name instruction).
- **Edit boundary and reuse:** Existing APP_NAME/version helper, frontend metadata, home/builder/settings labels, all seven message files, backend display metadata, README introduction, targeted regression tests. Existing logo/design remains.
- **Behavior / interfaces:** Display Jugalbandi consistently and link the welcome page to the client repository. Preserve routes, package names, environment/storage keys and user documents. API root name/title changes only. No data lifecycle, ownership or authorization change. Loading/empty/denied/cancelled/error flows retain their existing behavior because this task adds no asynchronous operation.
- **Acceptance:** Welcome heading and version show Jugalbandi, localized upload guidance uses that name, API docs/root identify the product, dashboard remains reachable, heading fits mobile/desktop, upstream attribution remains. Historical plans retain GoldLens and stable GL IDs.
- **Verification / client proof:** Frontend regression tests, lint, typecheck, build; backend metadata regression and locale checks; desktop/mobile welcome inspection. Open the welcome page, check the name, launch dashboard, inspect settings footer and upload guidance.
- **Recovery:** Revert only this task's bounded commit; no stored-record conversion or external service needed.
- **Observability:** Existing diagnostics unchanged; record exact test/build/browser outcomes in evidence. No new telemetry for a name change.
- **Stop / escalate:** Any proposed storage-key/route/database change, missing attribution, publishing trigger, or unrelated test failure; do not silently expand scope.

<a id="gl-local-001"></a>

### GL-LOCAL-001 — Review repeated bullets locally

- **Phase / priority:** M3 / P1.
- **Requirements:** GL-R-026, GL-R-032; source sections follow those requirement rows.
- **Depends on:** GL-DOCS-001.
- **Approval references:** No additional gate for additive read-only local review; A-START-001 applies.
- **Edit boundary and reuse:** Existing resume viewer, standalone pure frontend rule, translated panel, Vitest coverage; reuse viewer data and edit action.
- **Behavior / interfaces:** Case-sensitive exact comparison after whitespace normalization of stored work/project bullets, including hidden sections. Show original excerpt and every entry/bullet location. No network, persistence, edits, scores or PDF-layout claims. Bound input; unsupported data produces unavailable, never a clean result.
- **Acceptance:** Repeats across and within sections found; unique/empty, malformed and oversized inputs handled; no mutation; report follows latest resume data; editor action works and panel is excluded from print.
- **Verification / client proof:** Unit/component/viewer regression checks, lint/typecheck/locales; open an existing resume with repeated bullets, expand the local review and follow Edit.
- **Recovery:** Revert bounded feature commit; no stored records changed.
- **Observability:** Explicit local unavailable/empty/result states; no resume logs or telemetry.
- **Stop / escalate:** New data transmission, storage or backend change required.
