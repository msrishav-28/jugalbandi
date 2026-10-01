# Jugalbandi delivery handbook

Prepared 2026-09-30; execution and product-name update 2026-10-01. Audience: the client, human developers, individual AI agents, and coordinated teams. **The handbook describes the target; the tracker records actual implementation. GoldLens is the historical planning name for Jugalbandi.**

GoldLens extends the existing resume editor and tailoring product with evidence-backed document analysis. First release: invited, private accounts for early-career software candidates in India. Global expansion follows separate evaluation. Optional cloud AI requires consent. Peer comparisons do not block the analyzer beta.

## Start here

1. Read [root instructions](../../AGENTS.md).
2. Read [Project Map](PROJECT_MAP.md) for what exists and what remains unknown.
3. Check [Tracker](TRACKER.md), the only task-status authority, and [Handoff](HANDOFF.md) for the next safe action.
4. Read [Decisions and Approvals](DECISIONS_AND_APPROVALS.md) before protected work.
5. Select a [Work Package](WORK_PACKAGES.md); follow its requirements, dependencies, and acceptance tests.

Current product milestone: **M0, establish the verified baseline**. This is a roadmap position, not a completion claim. Live progress belongs only in the tracker.

## Document ownership

| Document | Source of truth for | Maintainer role |
|---|---|---|
| [Project Map](PROJECT_MAP.md) | Observed implementation, survey limits, current boundaries | Integration lead |
| [Source Reconciliation](SOURCE_RECONCILIATION.md) | Resolutions and complete source-section coverage | Product + technical lead |
| [Requirements](REQUIREMENTS.md) | Required outcomes, disposition, source and task traceability | Product + quality lead |
| [Architecture](ARCHITECTURE.md) | Target boundaries and incremental transition | Technical lead |
| [Contracts](CONTRACTS.md) | API, job, document and finding behavior | Backend owner |
| [Data and Privacy](DATA_AND_PRIVACY.md) | Ownership, lifecycle, consent, deletion, data dictionary | Data/privacy owner |
| [Security](SECURITY.md) | Threats, access matrix, security gates | Security reviewer |
| [Work Packages](WORK_PACKAGES.md) | Implementation sequence and task acceptance | Integration lead |
| [Tracker](TRACKER.md) | Status, assignment, evidence and next actions | Integration lead |
| [Decisions and Approvals](DECISIONS_AND_APPROVALS.md) | Decision history and scope of authorization | Technical lead + client |
| [Verification](VERIFICATION.md) | Commands, test scenarios and evidence requirements | Quality lead |
| [Operations](OPERATIONS.md) | Release, incidents, recovery and support | Operations owner |
| [AI Evaluation](AI_EVALUATION.md) | Model evaluation and adoption gates | Applied ML owner |
| [Handoff](HANDOFF.md) | Latest dated checkpoint and next action | Last session owner |
| [Source coverage](SOURCE_COVERAGE.csv) | Section-by-section crosswalk of all four source plans | Product + quality lead |
| [Evidence](EVIDENCE.md) | Checks actually performed for this package | Verifier |
| [Read-only validator](validate-docs.cjs) | Repeatable document consistency and optional preservation check | Quality lead |
| [Source baseline](SOURCE_BASELINE.json) | Pre-write hashes of 539 existing non-secret files | Verifier |
| [Validator checks](validate-docs.test.cjs) | In-memory negative cases for handbook validation | Quality lead |
| [Document fingerprints](DOCUMENT_FINGERPRINTS.json) | Verified specification inputs; excludes mutable status/evidence/handoff | Verifier |

Role names assign responsibility, not imaginary staff. Named people must be assigned before production work. One person can hold several roles; independent review must still be genuinely independent.

## Scope of this package

Adds instructions and delivery records; leaves the four original plans intact. A root-only ignore exception makes `AGENTS.md` eligible for future version control. Delivery of this package alone grants no execution permission. Later client authorization permits bounded implementation and the Jugalbandi rename; see the approval register. Real-data, account, publishing and deployment gates still apply.

Existing code is present but runtime-unverified. Read the evidence gaps before estimating delivery. Source-plan sprint durations and the approximate engagement value are not promises or spending approval. Estimate each ready task after baseline checks, identify the critical dependency chain, and report ranges with staffing assumptions.

## Maintaining the package

Requirements describe what must be true; work packages describe how to achieve it; tracker records progress; evidence proves checks; decisions explain choices; approvals authorize actions. Do not duplicate completion lists in other docs. Handoff entries are dated snapshots and must explicitly defer to the live tracker.

For a new requirement, assign a stable `GL-R-NNN` ID and source, add a task and tests, assess approval and dependency effects, then update coverage. For a changed interface, update contracts and both callers and servers in the same reviewed slice. Never reuse retired IDs.

## Source documents

- [Unified master plan](../goldlens_unified_master_plan.md) — U in traceability tables.
- [Product requirements](../goldlens_resume_intelligence_prd.md) — P.
- [Technical master plan](../goldlens_cto_technical_master_plan.md) — T.
- [Team operating manual](../goldlens_award_winning_dev_team_operating_manual.md) — O.

The approved client delivery plan and answers from this engagement are recorded as C in the decision register. This package can be understood without access to that chat.
