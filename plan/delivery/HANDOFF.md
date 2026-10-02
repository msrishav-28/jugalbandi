# Jugalbandi handoff checkpoint

## Latest checkpoint — 2026-10-02

Documentation alignment is complete (EV-DOC-004). The first code checkpoint repairs Windows test setup; 54 targeted backend tests pass (EV-LOCAL-001). Full application imports remain blocked by Windows Application Control; do not bypass it. Local installation is the default; no hosting is being set up. Earlier hosted-beta task dependencies require applicability review before product implementation. Prior dated sections below are history, not permission to deploy. Read the live tracker, [audit register](MARKDOWN_AUDIT.md) and latest decisions first.

Dated 2026-10-01 (Asia/Calcutta). Live status belongs to [TRACKER](TRACKER.md). Owner: Codex; bounded rename author self-review only.

## Current working copy

Use the Git checkout at .worktrees/jugalbandi under the original unpacked folder, branch goldlens/baseline-and-first-checks. Once cloned elsewhere, this handbook applies at that checkout root. The original outer folder is a preserved pre-implementation copy; do not edit two product copies or run its historical tracker as current status. Remote: https://github.com/msrishav-28/jugalbandi. Starting revision: 9c05e423dfde44a5b4bb398d2dc7507194252ded.

## Work completed and boundary

Client authorized starting code and safe branch pushes; renamed product Jugalbandi. Existing APP_NAME, browser metadata, welcome screen, footer labels, seven locale dictionaries and API display metadata updated; targeted regressions added. Handbook and original source plans brought into the actual Git checkout. Historical GoldLens names and GL-* IDs stay stable. License, credits, stored keys, routes, account behavior and publishing workflow remain unchanged. No history rewrite is approved or performed.

## Evidence and gaps

[Evidence](EVIDENCE.md) records 677 passing frontend tests with two workers, lint/typecheck/locale pass, desktop/mobile heading inspection and a verified Git history bundle. Production build blocked by remote font downloads. Backend tests blocked by Windows Application Control and shared fixture errors. Full user-flow baseline, private accounts, durable jobs and analyzer remain unverified/unimplemented. The new brand task is IN_REVIEW, not release-ready.

## Next safe action

First obtain an authorized development environment in which the existing tiktoken dependency can load, then rerun the recorded application checks. The test-loop startup bug is fixed; do not repeat that diagnosis. Reconcile the existing analyzer task dependencies for local installation. Do not start hosted-account or infrastructure work from the older milestone sequence. The following baseline checks still apply.


Inspect Git status and latest branch commit; run node plan/delivery/validate-docs.cjs. Resolve GL-BASE-002's native-library policy with an authorized development environment; do not bypass OS protection. Re-run the backend identity regression and existing baseline suites. Retry production build once fonts are reachable, then verify actual-font browser rendering. Continue GL-BASE-003/004; present concrete account/data proposals before their protected changes. Do not mistake implementation assignment or name change for deployment permission.

## Recovery and pushes

Local full-history bundle is outside checkout at ../../.recovery/jugalbandi-before-implementation-9c05e42.bundle; verification and hash in EV-BASE-002. Do not overwrite it. Revert bounded commits to undo this work. Feature-branch pushes are authorized; main/tag pushes may publish images and remain gated. History replacement still needs exact consequences, tested recovery, and informed YES. Check remote equality after each push; failed authentication is not a successful push.

## Published checkpoint

Commit 23dc696 is pushed to origin/goldlens/baseline-and-first-checks. It contains the actual rename, regression tests and handbook. This branch is a review checkpoint, not a deployed release. Subsequent evidence-only checkpoint commits may follow it; inspect git log rather than treating this short ID as the newest head forever.

## Existing documentation refresh — 2026-10-01

Client requested surgical additions. Existing README/SETUP variants now identify Jugalbandi, correct primary storage to SQLite, and point to the handbook. Existing architecture, quickstart, workflow, testing and CLAUDE guides link to current facts and approval boundaries. README owns the current stack table. No product/configuration change or test rerun is implied by this documentation pass; previous runtime blockers remain.

## Questionnaire checkpoint — 2026-10-01

Client answers are recorded in DECISIONS_AND_APPROVALS.md. Product remains an extension, not a rewrite. Email-link sign-in, user invitations, no support content access, per-resume external-AI consent, BYOK plus optional disabled-until-funded shared allowance, 30-day retention and seven-day recovery, evidence-first reports and separate edit revisions are selected. Clarify retention clock/recovery interaction and invitation limits before implementation. Single-baseline history request still requires a concrete recovery/publication-safe proposal and informed approval; no history was replaced.

## Confirmed follow-up — 2026-10-01

Retention clock, automatic-expiry recovery and invitation limits are now resolved: original upload +30 days active, +7 days recovery for resume/revisions; opening/editing does not extend the deadline; three invitations per user with overall 50-user cap. This supersedes the earlier request to clarify those choices. DATA_AND_PRIVACY.md now reflects the selected policy. Implementation still needs concrete lifecycle/account contracts, including restoration after active expiry, and existing scoped approvals. No data was deleted or application behavior changed.
