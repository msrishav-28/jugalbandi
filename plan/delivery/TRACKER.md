# Delivery tracker

**Single status authority.** Updated 2026-10-02. Product phase: M0 baseline; no Jugalbandi analyzer milestone is verified. Hosted-task scheduling is conditional following the local-use clarification. Detailed acceptance and edit boundaries live in [work packages](WORK_PACKAGES.md), and source sections are inherited through [requirements](REQUIREMENTS.md). Do not copy live status into those documents.

## State and evidence rules

`NOT_STARTED → READY → IN_PROGRESS → IN_REVIEW → VERIFIED`.

Additional states: BLOCKED (named dependency/environment condition), AWAITING_APPROVAL (specific client action), REVALIDATION_REQUIRED (evidence/code changed), DEFERRED (later release), SUPERSEDED (linked replacement; retain history). VERIFIED means acceptance evidence, not deployed or client-approved release.

READY requires verified dependencies, mapped edit boundaries and approval coverage for the intended action. “G-*” names are unfulfilled gate categories until mapped to an APPROVED A-* record in a claim. An owner must not begin protected work simply because a gate appears in the table. The client authorized starting implementation and safe branch pushes, then renamed the product Jugalbandi on 2026-10-01. Protected actions still need scoped approval.

Before IN_PROGRESS record named owner, review responsibility, exact allowed paths, contract/spec revision, applicable A-* approvals and checkpoint time in a dated claim below. Active shared-file claims are serialized by integration owner. Before VERIFIED fill evidence/date/revision columns and acceptance review. An independent reviewer is mandatory for high-risk implementation; self-review is explicitly insufficient there. Revalidate dependent tasks when a prerequisite changes.

Initial “—” means not performed/not assigned, never success. Source files observed during survey do not complete product tasks. Evidence can document a blocker without verifying the task.

## Task ledger

| Task | Phase | Priority | Requirements | Dependencies | Gate categories | Owner | Reviewer | State | Evidence | Verified date | Revision/fingerprint | Next action or blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [GL-DOCS-001](WORK_PACKAGES.md#gl-docs-001) | M0 | P0 | GL-R-063, GL-R-064 | — | A-DOC-001 | Codex | Self-review only | VERIFIED | EV-DOC-004 | 2026-10-02 | DOCSET-2026-10-02-v6 | Markdown aligned for local use; hosted task sequence must be reconsidered before implementation |
| [GL-BASE-001](WORK_PACKAGES.md#gl-base-001) | M0 | P0 | GL-R-002 | GL-DOCS-001 | G-BASE | Unassigned | Unassigned | BLOCKED | — | — | — | Revalidate handbook; remote provenance inspected and separate clone acquired |
| [GL-BASE-002](WORK_PACKAGES.md#gl-base-002) | M0 | P0 | GL-R-003 | GL-DOCS-001 | — | Unassigned | Unassigned | BLOCKED | EV-BRAND-001 | — | — | Python/dependencies installed; native-library policy and production font fetch block full baseline |
| [GL-BASE-003](WORK_PACKAGES.md#gl-base-003) | M0 | P0 | GL-R-068 | GL-BASE-001, GL-BASE-002 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-BASE-004](WORK_PACKAGES.md#gl-base-004) | M0 | P0 | GL-R-001 | GL-BASE-002 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-QA-001](WORK_PACKAGES.md#gl-qa-001) | M0 | P0 | GL-R-055 | GL-BASE-002 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-CONTRACT-001](WORK_PACKAGES.md#gl-contract-001) | M1 | P0 | GL-R-052 | GL-BASE-003, GL-BASE-004 | G-AUTH, G-DATA | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-IDENTITY-001](WORK_PACKAGES.md#gl-identity-001) | M1 | P0 | GL-R-004 | GL-CONTRACT-001 | G-AUTH, G-DEPS, G-DATA | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-IDENTITY-002](WORK_PACKAGES.md#gl-identity-002) | M1 | P0 | GL-R-005 | GL-IDENTITY-001 | G-AUTH, G-DATA | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-IDENTITY-003](WORK_PACKAGES.md#gl-identity-003) | M1 | P0 | GL-R-006 | GL-IDENTITY-002 | G-AUTH, G-DATA, G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DATA-001](WORK_PACKAGES.md#gl-data-001) | M2 | P0 | GL-R-007 | GL-IDENTITY-003, GL-CONTRACT-001 | G-DATA, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-STORAGE-001](WORK_PACKAGES.md#gl-storage-001) | M2 | P0 | GL-R-008 | GL-DATA-001 | G-DATA, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-JOBS-001](WORK_PACKAGES.md#gl-jobs-001) | M2 | P0 | GL-R-011, GL-R-060 | GL-DATA-001 | G-DATA, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-UPLOAD-001](WORK_PACKAGES.md#gl-upload-001) | M2 | P0 | GL-R-009, GL-R-010 | GL-STORAGE-001, GL-JOBS-001 | G-DATA, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-PRIVACY-001](WORK_PACKAGES.md#gl-privacy-001) | M2 | P0 | GL-R-012 | GL-STORAGE-001, GL-IDENTITY-003 | G-DATA, G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-PRIVACY-002](WORK_PACKAGES.md#gl-privacy-002) | M2 | P0 | GL-R-013, GL-R-014 | GL-PRIVACY-001, GL-JOBS-001, GL-UPLOAD-001 | G-DATA, G-AUTH, G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DOC-001](WORK_PACKAGES.md#gl-doc-001) | M3 | P0 | GL-R-015, GL-R-016 | GL-CONTRACT-001, GL-QA-001, GL-DATA-001 | G-DATA | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DOC-002](WORK_PACKAGES.md#gl-doc-002) | M3 | P0 | GL-R-017 | GL-DOC-001, GL-UPLOAD-001, GL-PRIVACY-002 | G-DEPS, G-DATA | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-REPORT-001](WORK_PACKAGES.md#gl-report-001) | M3 | P0 | GL-R-018, GL-R-032, GL-R-035 | GL-DOC-002 | G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-ANALYSIS-001](WORK_PACKAGES.md#gl-analysis-001) | M4 | P0 | GL-R-019, GL-R-020 | GL-REPORT-001 | G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-ANALYSIS-002](WORK_PACKAGES.md#gl-analysis-002) | M4 | P0 | GL-R-021, GL-R-022, GL-R-023 | GL-ANALYSIS-001 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DOC-003](WORK_PACKAGES.md#gl-doc-003) | M4 | P0 | GL-R-024 | GL-ANALYSIS-002 | G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DOC-004](WORK_PACKAGES.md#gl-doc-004) | M4 | P1 | GL-R-025 | GL-DOC-003 | G-DEPS, G-AI | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-SEMANTIC-001](WORK_PACKAGES.md#gl-semantic-001) | M5 | P0 | GL-R-026, GL-R-027 | GL-DOC-004 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-SEMANTIC-002](WORK_PACKAGES.md#gl-semantic-002) | M5 | P0 | GL-R-028, GL-R-029 | GL-SEMANTIC-001 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-MATCH-001](WORK_PACKAGES.md#gl-match-001) | M5 | P0 | GL-R-030 | GL-SEMANTIC-002 | G-DEPS, G-AI | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-SCORE-001](WORK_PACKAGES.md#gl-score-001) | M5 | P0 | GL-R-031, GL-R-032, GL-R-051 | GL-MATCH-001 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-REPORT-002](WORK_PACKAGES.md#gl-report-002) | M6 | P1 | GL-R-029, GL-R-033, GL-R-034, GL-R-035 | GL-SCORE-001 | G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-REPORT-003](WORK_PACKAGES.md#gl-report-003) | M6 | P0 | GL-R-038, GL-R-039 | GL-REPORT-002 | G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-EDIT-001](WORK_PACKAGES.md#gl-edit-001) | M6 | P0 | GL-R-001, GL-R-037 | GL-REPORT-003, GL-IDENTITY-003 | G-UX, G-AUTH | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-AI-001](WORK_PACKAGES.md#gl-ai-001) | M7 | P1 | GL-R-040, GL-R-041 | GL-IDENTITY-003, GL-PRIVACY-002, GL-SCORE-001 | G-AI, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-AI-002](WORK_PACKAGES.md#gl-ai-002) | M7 | P1 | GL-R-036 | GL-AI-001, GL-EDIT-001 | G-AI, G-UX | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-AI-003](WORK_PACKAGES.md#gl-ai-003) | M7 | P2 | GL-R-042 | GL-QA-001, GL-SEMANTIC-002 | G-DEPS, G-AI | Unassigned | Unassigned | DEFERRED | — | — | — | Optional evaluation only; not a release dependency |
| [GL-OPS-001](WORK_PACKAGES.md#gl-ops-001) | M8 | P0 | GL-R-053, GL-R-061 | GL-JOBS-001, GL-PRIVACY-002, GL-SCORE-001 | G-DEPS, G-HOST | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-PERF-001](WORK_PACKAGES.md#gl-perf-001) | M8 | P0 | GL-R-059, GL-R-060 | GL-DOC-004, GL-SCORE-001, GL-OPS-001 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-DELIVERY-001](WORK_PACKAGES.md#gl-delivery-001) | M8 | P0 | GL-R-057, GL-R-058 | GL-BASE-003, GL-OPS-001 | G-CI, G-HOST, G-DEPS | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-OPS-002](WORK_PACKAGES.md#gl-ops-002) | M8 | P0 | GL-R-054, GL-R-063, GL-R-067 | GL-OPS-001, GL-DELIVERY-001 | G-HOST | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-QA-002](WORK_PACKAGES.md#gl-qa-002) | M8 | P0 | GL-R-051, GL-R-056 | GL-EDIT-001, GL-AI-002, GL-PERF-001, GL-DELIVERY-001 | — | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-RELEASE-001](WORK_PACKAGES.md#gl-release-001) | M8 | P0 | GL-R-049, GL-R-062 | GL-QA-002, GL-OPS-002 | G-RELEASE, G-HOST | Unassigned | Unassigned | NOT_STARTED | — | — | — | Verify dependencies and scope before claim |
| [GL-CORPUS-001](WORK_PACKAGES.md#gl-corpus-001) | M9 | P1 | GL-R-043, GL-R-044, GL-R-045 | GL-PRIVACY-002, GL-IDENTITY-003, GL-QA-001 | G-CORPUS, G-DATA, G-AUTH, G-UX | Unassigned | Unassigned | DEFERRED | — | — | — | Later corpus work; analyzer beta does not wait |
| [GL-CORPUS-002](WORK_PACKAGES.md#gl-corpus-002) | M9 | P1 | GL-R-046 | GL-CORPUS-001, GL-SCORE-001 | G-CORPUS, G-DATA, G-UX | Unassigned | Unassigned | DEFERRED | — | — | — | Later corpus work; analyzer beta does not wait |
| [GL-CORPUS-003](WORK_PACKAGES.md#gl-corpus-003) | M9 | P1 | GL-R-047, GL-R-048 | GL-CORPUS-002 | G-CORPUS, G-DATA | Unassigned | Unassigned | DEFERRED | — | — | — | Later corpus work; analyzer beta does not wait |
| [GL-EXPAND-001](WORK_PACKAGES.md#gl-expand-001) | M10 | P2 | GL-R-065 | GL-RELEASE-001 | G-EXPAND, G-AUTH, G-DATA | Unassigned | Unassigned | DEFERRED | — | — | — | Later expansion requires new scoped approval |
| [GL-EXPAND-002](WORK_PACKAGES.md#gl-expand-002) | M10 | P2 | GL-R-037, GL-R-041, GL-R-048, GL-R-050, GL-R-066 | GL-RELEASE-001 | G-EXPAND | Unassigned | Unassigned | DEFERRED | — | — | — | Later expansion requires new scoped approval |

| [GL-BRAND-001](WORK_PACKAGES.md#gl-brand-001) | M0 | P0 | GL-R-069 | — | A-BRAND-001 | Codex | Author self-review; bounded copy | IN_REVIEW | EV-BRAND-001 | — | — | Frontend passes; backend runtime and production font fetch remain blocked |

## Claim and checkpoint log

### 2026-09-30 — GL-DOCS-001

Owner: Codex. Reviewer: author self-review; no independent security/product review claimed. Approval: A-DOC-001. Allowed paths: root AGENTS.md, plan/delivery/**, additive root-only .gitignore exception. Existing plans and application/configuration files are preservation boundaries. Acceptance: documentation coverage, link/ID/dependency/state validation, restart tabletop review and pre/post source fingerprint comparison. Product tests are not part of this documentation claim.

## Updating this ledger

Keep IDs stable. Claim records carry exact approvals; table categories remain stable requirements. A blocked task states one concrete next action and blocking condition. For SUPERSEDED, link the replacement and preserve prior evidence. If reconstructing after loss, set completion to unverified until fresh checks. Do not compute a misleading project completion percentage from document count or equally weighted tasks.


### 2026-10-01 — GL-BRAND-001

Owner: Codex. Reviewer: author self-review (bounded brand copy only). Approval: A-BRAND-001. Allowed paths: frontend brand configuration, metadata, home/builder/settings brand labels, seven message dictionaries, brand tests; backend API display name and regression test; README product introduction; delivery records. No account, storage, public route, package identity, license or publishing changes. Prerequisite: repository baseline matches 539 original files except the approved ignore exception (text line endings normalized). This isolated rename does not depend on hosted identity/data work. Checkpoint: implement and run tests, lint, typecheck, build, locale parity and browser checks; record gaps honestly.

### 2026-10-01 — GL-DOCS-001

Owner: Codex. Reviewer: author self-review, documentation only. Approval: A-DOC-001, A-DOC-002. Allowed paths: existing root README/SETUP variants, existing agent index/quickstart/workflow/testing/architecture guides, existing CLAUDE guides, and delivery records. Preserve original four plans, attribution, application code and configuration. Client asks for surgical additions and corrections. Verify against manifests/callers, review every diff, check added local links and handbook consistency, then commit/push the existing non-publishing branch.

## Documentation alignment claim — 2026-10-02

GL-DOCS-001 owner: Codex; reviewer: self-review only. Approval: A-DOC-003. Edit boundary: tracked Markdown, documentation audit and fingerprints only. Reconcile local-use direction, current manifests and later client decisions; preserve original source plans and attribution. Checkpoint: documentation checks and branch push; no deployment or application changes.
