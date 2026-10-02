# Security specification and review gates

**Scope update — 2026-10-02:** Local installation is the current default. Hosted accounts, invitation limits, managed infrastructure and release operations below describe a conditional future hosted profile, not local-run prerequisites or execution approval. Reconcile the implementation sequence before starting those tasks. See [decisions](DECISIONS_AND_APPROVALS.md#local-use-and-full-documentation-alignment--2026-10-02); preserve existing local behavior.

Target controls, not a completed security assessment. No real-user beta until GL-QA-002 and GL-RELEASE-001 evidence is accepted.

## Access matrix

| Actor | Own user records | Other user records | Restricted references | Publish cohorts | Platform settings |
|---|---|---|---|---|---|
| Anonymous | None | None | None | No | No |
| Invited verified user | Authorized read/write/delete/export | None | Published aggregate insights only | No | Own approved preferences only |
| Curator | Own account if separately granted | None by default | Assigned intake/review scope | No self-publication | No |
| Reviewer/publisher | Own account if granted | None by default | Assigned review, redaction and publication | Step-up + independent review | No |
| Administrator | No support content browsing | No support access, including owner-operated support | Explicit role, not implicit | Explicit role | Step-up restricted operations |
| Document worker | Job-scoped artifacts only | None outside authorized job | Only assigned corpus job if role permits | No | No interactive credentials |
| AI worker | Minimized consented task payload | None outside job | Aggregate-only unless separately authorized | No | Approved provider credential access only |
| Privacy/operator role | Lifecycle metadata only; no support content browsing | No support content access | Takedown/removal scope | Revoke unsafe publication | No blanket secret access |

Identity/role checks run on every HTTP route, stream, object authorization and worker fetch/commit. Reauthenticate sensitive account deletion and staff actions. Test invalid signature, issuer, audience, expiry, revoked session and missing claims against the chosen identity provider. Session transport, CSRF protection and rate limits must be specified with that provider before coding; CORS is not authentication.

## Threat and acceptance matrix

| Threat | Required prevention | Required proof |
|---|---|---|
| Cross-account object access | Account-scoped queries, relationship checks and private storage | Two-account read/write/list/download/export/job/event tests; foreign nested IDs rejected |
| Privilege escalation | Server roles, restricted settings, step-up, audited break-glass | User cannot call reset/key/provider/curation/admin endpoints or modify role fields |
| Shared browser exposure | Account-scoped storage, sign-out invalidation, no global resume draft | Switch accounts with unsaved drafts and open tabs; no prior account content |
| Malicious upload | Signature checks, bounded archive/PDF decoding, malware scan, quarantine | Spoofed extension, encrypted PDF, archive bomb, oversized dimensions, malformed content; scanner outage blocks parsing |
| Parser execution exploit | Non-root isolated process/container, no outbound network, read-only root, temp quotas/timeouts | Kill runaway parser; verify other jobs remain healthy and outputs cannot escape workspace |
| Remote URL abuse | Beta pasted text only; later allowlisted fetch with redirect/DNS/IP/size/time validation | Private/link-local/loopback/redirect and DNS-change attacks rejected before fetch |
| Prompt injection | Untrusted content boundaries, no model tool execution, structured validation | Hidden document instructions cannot access files, change policy, reveal prompts or create unsupported claims |
| Script injection | Preserve existing sanitizer; escape titles/notes; no untrusted raw HTML | Resume/feedback/JD markup cannot execute scripts in report, editor or print |
| Secret/personal-data leakage | Safe structured telemetry, scrub errors, no request-body capture | Canary fixtures absent in logs/traces/events/browser bundles; keys never returned |
| Queue replay/race | Database lease/fence, idempotency and deletion generation | Duplicate/out-of-order jobs and delete-during-processing cannot create extra results or restore erased files |
| Export bypass | Authorized immutable snapshot, scoped internal renderer, restricted egress | Direct print URL and forged render token cannot expose another user's content |
| Corpus poisoning/exfiltration | Human rights/review gate, isolated namespace, aggregate-only publication | Pending/rejected references excluded; no raw IDs/text through normal APIs |
| Cost abuse | File/account/provider limits, bounded retries, concurrency and spend stops | Repeated analyze/export requests cannot bypass budgets via duplicates |
| Unsafe restore | Encrypted restricted backups, tested restore suppression | Deleted accounts/references remain inaccessible after restoration |
| Dependency compromise | Pin/review artifacts, license/security assessment, restricted build credentials | Record component inventory and unresolved advisories; no new major unreviewed dependency |

## Fail-closed boundaries

Missing identity, policy, consent, scan result, permission evidence or storage authorization means deny/pending, not allow. An AI classifier is never an authorization or malware engine. A service credential cannot turn arbitrary queue input into trusted ownership.

Queue messages and signed links are capabilities: bound them by purpose, scope and expiry. Do not persist signed URLs in logs. Apply resource quotas before expensive conversion/model calls. Keep workers' allowed network destinations separate from user-configured provider URLs; beta ordinary users cannot create arbitrary destinations.

## Review procedure

For upload, identity, storage, external provider, corpus, export/share and later extension changes: document data flow, entrypoints, privileged operations, failure paths and abuse cases; assign an independent security reviewer; run the corresponding negative tests; record residual risks and explicit launch blockers. An agent may prepare this packet but cannot invent reviewer sign-off.

Before public launch repeat a broader independent security assessment, disclosure/consent review and access-policy audit. Incident procedure is in [Operations](OPERATIONS.md). Legal review is a required external approval task, not a claim that this document provides legal compliance.
