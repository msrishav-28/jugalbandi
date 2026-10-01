# Contract specification

Target only, 2026-09-30. These additions are not implemented endpoints. GL-CONTRACT-001 turns this behavioral specification into Pydantic/OpenAPI and generated client contracts after baseline/provider review. Existing APIs remain compatible unless a separately approved change is recorded.

## Common rules

Use `/api/v1`. Identity is derived from a verified server session/token, never a caller-supplied owner field. Private resource lookups are account-scoped; inaccessible foreign resources return the same safe not-found response as nonexistent ones. Public liveness exposes no private service/configuration detail. Privileged settings and operational status require authorization.

New JSON contracts use snake_case. Adapters preserve existing camelCase editor data and legacy fields. Treat IDs as opaque strings at the client. Use UTC RFC3339 timestamps, nullable values only where absence has meaning, explicit enums, and bounded collections. Maximum new list page size 100; default 25; opaque account-scoped cursor ordered by creation time and stable ID. These are proposed development defaults, not deployed configuration.

New error body: `error` contains `code`, safe `message`, `request_id`, `retryable`, and optional field errors without submitted private values. Use 401 for missing/expired identity, 403 for a forbidden role action, 404 for inaccessible private resource, 409 for stale revision/state/idempotency conflict, 413 for size limits, 422 for validly encoded but invalid input, 429 for quota, and 503 for temporary dependency unavailability. Retry advice must reflect actual operation safety.

Durable creates require an idempotency key scoped to account + operation + request fingerprint. Same key/same request replays the stored result; same key/different request returns conflict. Record key expiry and retry window in OpenAPI before implementation; do not use a global document hash as identity. Validation failures create no durable resource. Replayed requests cannot reset retention or issue a second provider charge.

## Endpoint family acceptance

All paths below include the `/api/v1` prefix. `revision_id` binds mutable editor content to immutable analysis input.

| Method and proposed path | Input / identity | Success and failure semantics |
|---|---|---|
| POST `/resumes/uploads/initiate` | User; file metadata, declared type/size, retention choice, idempotency key | 201 upload identity and expiring private upload instructions; enforce quota before authorization; bytes untrusted |
| POST `/resumes/uploads/{upload_id}/complete` | Owner; uploaded-object identity/integrity metadata | 202 durable validation job; server verifies object/size/hash; duplicate completion replays; expired/mismatched object rejected |
| GET `/resumes/{resume_id}` | Owner | Existing compatible resume response plus explicit revision/capabilities; no raw storage credentials |
| POST `/resumes/{resume_id}/analysis-runs` | Owner; revision, profile, optional JD revision/cohort version, privacy mode | 202 run/job IDs and actual queued state; reject deleted/stale/unready source or incompatible consent |
| GET `/analysis-runs/{run_id}` | Owner | Durable status, stages, bounded summary, availability and errors; never fake percent complete |
| POST `/analysis-runs/{run_id}/cancel` | Owner | 202 cancellation requested, repeat-safe; completed work remains completed; no promise an already sent provider request is recalled |
| GET `/analysis-runs/{run_id}/events` | Owner | Authenticated progress stream with monotonically ordered event IDs and resume cursor; polling status remains authoritative |
| GET `/analysis-runs/{run_id}/findings` | Owner; cursor, category/severity filters | Paginated findings for that immutable run; safe empty result distinct from failed analysis |
| POST `/findings/{finding_id}/feedback` | Owner; action accept/dismiss/intentional/clear, optional bounded note | Persist revision-scoped feedback, duplicate safe; does not change measurement or silently apply text |
| POST `/job-descriptions` | User; pasted text, optional context, idempotency key | 201 owned JD revision; no automatic fetching of a pasted URL |
| POST `/resumes/{resume_id}/match` | Owner of both resume and JD; revisions | 202 analysis run with match capability; foreign/stale IDs rejected |
| POST `/resumes/{resume_id}/rewrite-proposals` | Owner; source span IDs/revision, selected task, AI consent | 202 proposal job; unsupported or unconsented route rejected; returns no fabricated completed edit |
| POST `/rewrite-proposals/{proposal_id}/accept` | Owner; expected revision and selected supported changes | Atomic new revision or existing replay; 409 if source changed; unresolved claims rejected |
| POST `/resumes/{resume_id}/exports` | Owner; revision, supported format/template/settings | 202 export job; bind exact content; initially PDF, no DOCX-output claim until implemented |
| GET `/exports/{export_id}` | Owner | Status and authorized expiring download when complete; partial render is not success |
| DELETE `/resumes/{resume_id}` | Owner; confirmation in UI; request ID | 202 deletion operation; repeat-safe; access blocked immediately, actual erasure tracked |
| GET `/deletions/{deletion_id}` | Owner or approved privacy operator | Stage/completion and backup-expiry explanation, no erased document content |
| POST `/account/data-exports` | Reauthenticated account owner | 202 portable personal-data package job; short-lived download; covers stored application data, not other users |
| DELETE `/account` | Reauthenticated owner | 202 account deletion; revoke sessions and fence child work; recovery wording consistent with retention policy |
| POST `/curation/reference-documents` | Curator; permission evidence, metadata and private file | M9 only; private intake state, never immediate corpus publication |
| POST `/curation/reference-documents/{id}/review` | Authorized reviewer; expected state, decision, rationale | Validated audited state transition; reject self-publication and missing rights |
| POST `/curation/reference-documents/{id}/remove` | Authorized reviewer/privacy operator | 202 removal job with affected publication revocation |
| POST `/curation/cohorts` | Curator; bounded inclusion rules | Private cohort definition; no live inference until publication |
| POST `/curation/cohorts/{id}/publish-version` | Independent publisher with step-up identity | 202 aggregate build/review workflow; eligibility and disclosure thresholds enforced |
| GET `/cohorts/{id}/insights` | Authorized user; approved supported filters | Published aggregates only, or explicit unavailable reason; never raw reference IDs/text |

Before implementation resolve exact auth transport, idempotency retention, quotas, and event retention through GL-CONTRACT-001 and GL-BASE-003. Publish concrete schemas and examples there; no guessed SDK calls or duplicate parallel routes.

## Canonical document representation

Required objects: document/revision identity, source format/hash/page count, pages, blocks, lines, spans, semantic sections/entities, extraction diagnostics, version manifest.

- Units: PDF points (1/72 inch), top-left origin on the normalized displayed page. Store original crop/rotation and transform so every extraction box can map to displayed coordinates. Pages may differ in size.
- Box: finite x0/y0/x1/y1 with ordered edges; retain out-of-page source bounds for clipping evidence rather than silently clamping the measurement. Display clips safely.
- Block/span IDs are stable within the immutable revision and representation version; do not promise stability across reparse versions.
- Text offsets refer to a specified normalized string with preserved mapping to original source; Unicode/ligature normalization cannot silently invalidate evidence offsets.
- Style fields unavailable from OCR remain absent/unknown, not invented font sizes. Confidence includes basis: native, converted, OCR, inferred.
- Sections retain unknown/custom types and multiple page/block references. Never lose source content simply because classification fails.
- Version manifest includes IR, parser, layout/semantic/rule pack, embedding model, optional provider/model/prompt and cohort versions. Non-used components are explicitly absent.

## Findings and scores

Finding: ID, run/revision ID, category, rule ID/version, severity (`blocker`, `high`, `medium`, `low`, `informational`), confidence (`high`, `medium`, `low`) with reason, title, why it matters, source evidence references, measured values/units and recommended action. A finding can reference several pages; evidence is never just ungrounded prose.

Dimension result: `availability` (`scored`, `not_applicable`, `unavailable`, `failed`), nullable score, reason code, coverage/confidence and supporting finding IDs. Six stable dimensions: ATS integrity, visual craft, narrative/framing, evidence/impact, job relevance, reference alignment. Display rounded diagnostic estimates. Do not silently renormalize a composite when dimensions disappear: show its included dimensions/context and compare history only for compatible scoring versions. Until a calibrated composite policy is approved, display dimensions without a headline total.

Match requirement states: `demonstrated`, `present_but_buried`, `present_but_weakly_evidenced`, `not_demonstrated_do_not_claim`. “Add only if true” is a user fact-collection action, not an inferred qualification.

Proposal: source revision/spans, proposed diff, support mapping for each factual claim, unresolved evidence requests, prompt/model version and status. Acceptance cannot convert a placeholder into fact without explicit new user-provided evidence, separately recorded. Preserve existing preview fingerprints and atomic confirmation replay.

## State machines

Document lifecycle: upload pending → validating → quarantined OR stored → parsing → rendering → optional OCR → normalized → ready. Stage failures are retryable or final with safe reason. Deletion pending is reachable from every non-deleted state and fences all work; deleted is terminal. Scan failure is not permission to parse.

Job lifecycle: queued → running → succeeded OR failed_retryable → queued OR failed_final. Cancellation requested → cancelled only after commit/worker fencing; a terminal completed job is not relabelled cancelled. Retry attempts, lease expiry and last heartbeat persist. Terminal/dead-letter jobs have a bounded operator replay procedure.

Analysis can expose completed deterministic stages while optional AI fails, but its capability status must show the failure. Progress events contain only stage, safe status/error, sequence, timestamps and IDs. Reconnection or event expiry falls back to a fresh authorized status read. Signed access URLs and resume text do not appear in events.
