# Operations, release and recovery handbook

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

Target operating procedures, 2026-09-30. No hosted service, alert destination, on-call rota or recovery rehearsal is established by this document. GL-OPS-001/002 and GL-RELEASE-001 must supply evidence and named operators.

## Ownership and coordination

Before real users: assign named primary and backup for identity/storage, document workers, analysis, AI providers, frontend/export, reference governance and release operations. Assign a separate security/privacy reviewer. A person may cover several areas but must not fabricate independent review. The backup must rehearse the runbook without private knowledge.

The integration owner reviews task dependencies and shared-file changes. Daily async checkpoint: completed evidence, next outcome, blocker and risk. Weekly product review: user outcomes, quality, support, blockers and decisions. Weekly technical review: architecture/privacy changes, reliability/cost, upcoming releases and recovery. Design critique evaluates hierarchy, comprehension, accessibility and failure states. These are coordination practices, not meetings an agent may schedule or messages it may send without authorization.

Hiring and mentorship should favor demonstrated operation/debugging, document/ML evaluation, accessible UI craft and clear tradeoffs. Senior owners deliver complete slices and coach reviewers; architectural owners simplify cross-domain decisions. Do not turn source-plan hiring guidance into invented headcount, compensation, performance ratings or a code dependency.

## Required dashboards

| Dashboard | Signals | Response owner |
|---|---|---|
| User lifecycle | Upload acceptance/failure by format, first-report completion, export success | Application/ingestion |
| Workers | Depth, oldest job, stage duration, active leases, retries, dead letters, resource saturation | Platform/document |
| Quality | Finding coverage/precision samples, rule/model versions, accept/dismiss/intentional, unsupported claims | Analysis/quality |
| Privacy | Deletion age/stage failure, expiring temporary artifacts, failed consent checks | Privacy/platform |
| AI costs | Calls/tokens/actual versus estimated cost, timeouts, route errors, budget stops | AI/platform |
| Reference | Rights completeness, review backlog, publication eligibility, removal latency and drift | Corpus |

Carry request/trace/job/run/revision/version IDs across stages. Hash or minimize account identifiers according to policy. No raw source text, prompts, credentials or signed URLs. Metrics labels must be bounded: do not use every document ID as a time-series label. Secure diagnostic artifacts separately with expiry and audited access.

Verified-improvement rate: among consent-eligible users who edit and reanalyze comparable revisions with the same scoring context/version, fraction improving the intended measured dimension without an ATS-integrity regression. Report denominator, unavailable dimensions, version changes and sample size. It is not a hiring-success metric. Basic operational telemetry and optional behavioral analytics must have separately documented purposes.

## Service objectives and capacity

Retain the source target: p95 under 20 seconds for two-page born-digital deterministic analysis, excluding optional rewrite; report queue wait and total perceived latency separately. Freeze hardware, dataset mix and concurrency before testing. OCR/DOCX conversion, external AI and exports have separate budgets. Conditional hosted-beta load rehearsal: 5 simultaneous users within the 50-invited-user cap; any 10-analysis stress run is a separate overload scenario using synthetic data; it is a test profile, not a purchased capacity or verified service guarantee.

Before G-RELEASE, GL-BASE-003/GL-PERF-001 must set approved thresholds for availability, upload/export success, stage timeout, maximum queue age, deletion completion, quotas and monthly/daily/provider spend. Missing thresholds block release, not imply unlimited work. Alerts must correspond to a named action. Notify users of actionable failures without pretending background work completed.

When the agreed error budget is exhausted, stop expanding invitations/features and repair reliability. Any unauthorized access or known data-loss defect blocks release irrespective of averages. No percentage permits known private-data exposure.

## Incident procedure

1. Record discovery time, affected version, safe symptoms and incident owner. Never paste source documents into incident chat.
2. Classify impact: SEV-1 confirmed exposure; SEV-2 widespread service failure; SEV-3 incorrect subset findings; SEV-4 minor degradation.
3. Contain using approved capability switches, invitation pause or scoped queue pause. Never disable auth to restore availability.
4. Preserve minimal evidence and backups; identify affected accounts without exposing content.
5. Diagnose via stage/version/trace and reproduce with synthetic material where possible.
6. Recover using the appropriate runbook and verify user behavior plus privacy invariants.
7. Follow approved stakeholder/legal notification process. Do not invent reporting deadlines or send external messages without authorization.
8. Write a blame-free timeline, controls that failed/worked, and assigned follow-up tasks with evidence. Revalidate affected tracker items.

## Runbook action matrix

| Symptom | Safe diagnosis | Containment / recovery | Completion proof |
|---|---|---|---|
| Queue backlog | Oldest age, lease expiry, queue/provider saturation | Pause new expensive work; restore healthy workers; replay IDs with current ownership checks | Age drains, no duplicate outcomes, quotas enforced |
| Malformed parser crash loop | File hash/type, parser version, resource counters | Quarantine offending job; disable affected parser version; never log file body | Synthetic reproduction bounded, other files progress |
| OCR unavailable | Provider/local engine health, scan route, consent | Keep native analysis available; retry boundedly or mark scan analysis unavailable | No fabricated OCR completion, retries stop at budget |
| AI provider outage | Route error class, timeout/rate limit, budget | Disable route or approved compatible fallback; preserve deterministic report | Safe partial capability and no double billing |
| Storage outage | Provider status, manifest stage, permission failures | Stop accepting unsafe uploads; retain pending deletion; retry scoped manifest operations | Object/manifest consistency and deletion backlog verified |
| Database degradation | Pool/locks, migrations, disk/capacity, safe query plans | Stop failing writes; use approved restore/failover procedure; do not reset records | Transactions/integrity, replay and access policies verified |
| Suspected private-data exposure | Access/audit IDs and affected release | Revoke compromised paths/sessions, preserve safe evidence, incident escalation | Negative access tests, scoped impact analysis, approved notification |
| Corpus takedown | Consent/member/version lineage | Revoke affected insight versions, remove files and rebuild only eligible aggregates | Removed source absent in live/restored results |
| Model/rule regression | Compare frozen fixtures and version metrics | Switch off faulty version; eligible prior version only; no silent history rewrite | Quality baseline restored with version visible |
| Unexpected cost spike | Per-route calls, retries, quota enforcement | Halt optional provider dispatch; reduce invitations/concurrency | Spend stops and retry bypass fixed |
| Export failure | Revision, renderer readiness/fonts, worker resources | Retry boundedly against same immutable snapshot; do not export stale data | Real nonblank PDF with correct text/layout |
| Deletion stalled | Manifest stages, fences, provider object errors | Keep access revoked; retry scoped erasure and alert operator | Live erasure verified, backup status accurately stated |

These procedures become executable environment-specific runbooks in GL-OPS-002: add actual dashboards, approved commands, resource identifiers, contacts and screenshots using synthetic data. No fabricated resource names or executable production commands belong here before provisioning is approved.

## Release checklist

- Source recovery point, upstream attribution and dependency/license review established.
- Current required tests, contract checks, security review and held-out analysis results attached to exact artifact version.
- Real upload → evidence → feedback → edit → export → delete walkthrough completed; no-LLM mode also works.
- Account/print/storage/worker isolation and deletion races tested.
- Provider agreements/locations, consent and privacy copy reviewed by qualified responsible parties.
- Exact retention, backup expiry, quotas, cost envelope, support coverage and alert recipients approved.
- Feature switches tested; risky optional capabilities disabled until verified; no dead navigation/purchase promise.
- Backup restoration rehearsed with deletion/consent tombstones applied before access resumes.
- Database changes compatible with previous application release or explicit non-reversible consequence approved.
- Client release approval recorded separately from implementation approval.

Roll out invitations in bounded batches within measured capacity. Observe upload/report/export/deletion and safety signals before expanding. Public release additionally needs broader independent security/accessibility review, corpus consent audit if enabled, published analyzer/model limitations and staffed support/takedown handling.

## Recovery boundaries

Code rollback restores a previous compatible application artifact; it does not restore erased user data. Database restore uses a separate copy first and never overwrites the only backup. Apply deletion/withdrawal records before reopening access. Never restore expired reference permission to recover a convenient cohort version. Suspend affected features when safe recovery cannot be established.
