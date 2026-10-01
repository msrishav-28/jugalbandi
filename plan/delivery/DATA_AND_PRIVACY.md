# Data ownership, privacy and lifecycle

Target specification, 2026-09-30. No database or privacy behavior is changed by this document. G-DATA, G-AUTH and applicable provider approvals must precede implementation.

## Data dictionary and responsibility

| Resource | Ownership and relations | Sensitive contents | Retention / deletion |
|---|---|---|---|
| Identity/profile/preferences | Account; provider subject unique | Email, preferences, consent | Account lifecycle; provider-side deletion documented |
| Resume and immutable revisions | Account; parent revision/resume same owner | Original and edited career content | User retention choice; descendants handled by explicit policy |
| Pages/blocks/sections/IR artifacts | Revision; same owner | Full or partial resume text, images, geometry | Tied to source revision, not independently eternal |
| Job descriptions | Account; immutable revision | Pasted job text and optional context | Account-controlled; report dependencies tracked |
| Analysis runs/findings/feedback | Account + resume revision + optional JD/cohort version | Evidence snippets and private judgments | Tied to source; feedback notes treated as private content |
| Tailoring previews/improvements | Account + source/JD/result revisions | Proposed/accepted content, fingerprints | Short preview TTL; accepted results follow account retention |
| Applications/attachments | Account + resume/JD relationships | Notes, letters, outreach, interview preparation | Account/resume policy with explicit dependency behavior |
| Upload/storage manifest/export | Account + revision/operation | Object keys, checksums and rendered documents | Short temporary TTL; permanent files follow selected policy |
| Jobs/outbox/idempotency | Account/resource references | IDs and sanitized state, never raw text by default | Bounded operational retention; scrub/revoke on deletion |
| Platform/provider credentials | Service/admin scope; optional BYOK later | Encrypted credentials | Restricted secret store; no browser readback; separate replacement procedure |
| Reference documents/consents/tags/reviews | Restricted corpus domain, contributor rights | Raw documents, proof, review notes | Consent and removal policy; never coupled to normal user opt-in |
| Cohorts/versions/membership | Restricted provenance plus published aggregates | Membership restricted; statistics disclosure-checked | Revoke affected snapshots on withdrawal; recompute |
| Audit/security events | Authorized operations role | Minimal event identity, action, timestamps | Approved policy; no resume content or raw secrets |
| Backups/caches/logs/provider copies | Derived from above | Potential residual content | Explicit expiry and restore suppression; provider terms verified |

## Database design rules

Keep SQLAlchemy and review the complete existing facade before choosing tables. Use ordinary BIGINT GENERATED ALWAYS AS IDENTITY surrogate keys internally when suitable; use opaque external identifiers independently. UUIDv7 is appropriate only when verified version/library support and distributed/opaque IDs justify it. Preserve current external IDs through adapters; do not rewrite IDs merely for style.

Use TIMESTAMPTZ for instants, DATE for actual date-only values, INTERVAL for durations, TEXT for unconstrained strings, NUMERIC for exact money. Resume employment dates may be partial or textual and must preserve supplied precision; do not invent a day/month. Use JSONB for genuinely variable bounded document structures, not as a substitute for ownership and relational constraints.

Require primary/foreign keys, NOT NULL, CHECK and uniqueness by domain. Child relationships must prevent linking another account's parent: use composite ownership constraints or equivalent proven checks. Index referencing foreign keys for actual access/deletion paths; PostgreSQL does not create those indexes automatically. Default-master uniqueness becomes per account, with default implies master and the existing count/selection invariant preserved transactionally.

Document indexes for owner lists, revision/run lookup, pending outbox/job leases, deletion manifests and reference membership. Use representative query plans before accepting expensive lists/deletion. No partitioning/vector index by default without volume/query evidence. pgvector can support approved embeddings later; pin model/dimensions and deletion ownership before building indexes.

Database row policies must be tested with the actual application role and connection pooling. A table owner or privileged service may bypass policies; scoped transaction identity must not leak to the next pooled request. Application checks remain mandatory.

## Structural changes and recovery

Version every database structure change and test forward creation from empty plus supported prior states. Replace unreviewed startup DDL for hosted operation with controlled release steps. Review locking, timeouts, data volume, transaction boundary and rollback before applying. For populated shared systems, prefer additive changes, deferred validation and batched data updates where needed; approve separately. A code rollback must not require destructive reverse database changes.

C-02 removes the need for a customer import project now. It does not authorize deleting any local SQLite file, legacy importer, uploads or backups. If real data is discovered, stop that assumption and issue a specific preservation plan.

## Consent and retention

Four independent purposes: one-time analysis/private storage; optional external AI processing; optional de-identified improvement telemetry; optional training/reference contribution. Never make training consent a prerequisite for analysis. A retained user resume is not a reference contribution. Explain what leaves the service, for what purpose, and which approved provider handles it.

Development proposal for policy review: temporary analysis accessible for 24 hours after completion with a maximum 48 hours from upload; private storage until deletion; temporary failed/quarantined artifacts purged within 24 hours unless an approved incident hold applies. These are proposed targets, not live promises. GL-BASE-003 must approve exact retention values, audit retention and backup expiry before real uploads. Missing approved policy blocks hosted ingestion; it must not mean unlimited retention.

Record consent version, purpose, time and withdrawal. Check consent at scheduling and immediately before provider dispatch. Withdrawal fences queued calls. An already transmitted call cannot be recalled; record/disclose the provider's actual retention/deletion limitations. Do not promise cloud-private processing solely from an SDK setting.

## Deletion procedure

1. Reauthenticate where appropriate; atomically mark deletion pending, revoke new access and advance a generation/fence token.
2. Enumerate an authoritative manifest: originals, revisions, IR, pages, thumbnails, embeddings, findings, attachments, exports, caches, previews and in-flight work.
3. Cancel/fence jobs and dispatch; prevent late artifact commits. Short-lived download URLs have bounded residual life, disclosed in policy; remove objects as soon as possible.
4. Delete live objects and rows in repeat-safe batches. Treat object-not-found as already removed; a provider outage remains pending, not successful.
5. Remove or minimize operational payloads while retaining only approved non-content audit facts and a minimal restore-suppression tombstone.
6. Verify object inventory and relationship counts. Record independent stage results and retries. Confirm live-system deletion only after all required stages succeed.
7. State backup expiry separately. On restore, apply deletion tombstones before restoring user access; expired consent/reference publication must not reappear.

Account deletion includes user-owned jobs, settings, provider BYOK if later enabled, browser account caches on next session and identity-provider action. Do not claim remote browsers can be wiped while offline. User-facing wording must explain what the service can revoke versus previously downloaded files.

## Reference governance

Canonical states: DRAFT → PENDING_PROVENANCE → PENDING_CONSENT → PENDING_REVIEW → APPROVED_STATS_ONLY or APPROVED_ANONYMIZED_EXAMPLE. Rejection records minimal rationale. REMOVAL_REQUESTED revokes influence promptly; REMOVED is terminal for that consent/version. Reintake needs new evidence and a new review, not resurrection.

Tier 0 unknown origin: reject. Tier 1 public but no reuse permission: do not ingest; a permitted link-only record may be held. Tier 2 explicit author permission: review for statistics. Tier 3 direct consented contribution: statistics and only separately permitted examples. Tier 4 verified partner: same curation controls; not inherently ideal.

Trust rubric totals 100: consent 30, provenance 20, identity/role context evidence 15, internal consistency 15, metadata 10, independent review 10. Record reasons. Prestige, fame and follower count add zero. No score overrides missing rights or exposed sensitive content. Review may label a claim uncertain; it does not verify employment.

Cohorts are role/level/geography/language/vintage/context groups. Start with statistics only. GL-CORPUS-002 must set and validate a minimum approved sample policy before publication; development proposal is at least 30 independently reviewed documents and suppression of any disclosed subgroup under 10. These thresholds are conservative starting points, not guarantees of anonymity or statistical validity. Test overlapping filters/differencing, outliers and membership inference; restrict filters where necessary. Present count ranges/confidence and inclusion criteria.

Store section-order frequencies, counts, geometry quantiles, evidence-pattern distributions and skill clusters only as needed. Never expose individual source wording or IDs to normal users. Separate example-display permission is a later feature. Removal revokes impacted published snapshots, recomputes eligible aggregates and marks existing affected reports' cohort capability unavailable until safe recalculation. Retain minimal lineage without private source content for audit.
