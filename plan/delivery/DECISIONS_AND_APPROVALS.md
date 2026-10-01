# Decisions and approvals

Recorded 2026-09-30. A target architecture decision does not authorize its implementation. This register distinguishes client direction, engineering specifications and action approval.

## Confirmed client direction

| ID | Decision | Evidence and boundary |
|---|---|---|
| C-01 | Invited hosted beta first | Client selected private hosted beta during planning; no deployment/spend authorized |
| C-02 | Unused development copy | Client reported no existing users/records requiring transfer; reassess if data/users appear |
| C-03 | Early-career software candidates in India, global later | Explicit planning reply; global expansion needs broader evidence |
| C-04 | Optional cloud AI | Client selected consent-based minimized external AI; not permission for developer test traffic with real resumes |
| C-05 | No India-only storage/processing restriction | Explicit planning reply; disclose actual provider locations before launch |
| C-06 | Analyzer beta may precede peer comparisons | Explicit planning reply; do not invent reference data |
| C-07 | Assess Jev and Laya | Client supplied TypeSafe article and Laya repository; research only, no adoption or account purchase |
| C-08 | Preserve existing foundation and original source plans | Approved delivery plan; protected changes need their own informed authorization |

## Action approvals

| ID | Status | Authorized action | Evidence | Explicit boundary | Gate coverage |
|---|---|---|---|---|---|
| A-DOC-001 | APPROVED | Create root instructions and delivery package, validate links/coverage/status rules, add root-only ignore exception | Client: “PLEASE IMPLEMENT THIS PLAN”, followed by the complete documentation-only plan | No product, data, auth, dependency, infrastructure, CI, service spending or deployment changes | A-DOC-001 |

Additional client authorization recorded 2026-10-01: Reusable future approval IDs below are **not approvals**.

## Engineering decisions for the specification

| ID | Decision | Reason / consequence |
|---|---|---|
| D-01 | Extend current applications as a modular monolith with worker processes | Preserve existing boundaries and avoid broad restructuring |
| D-02 | PostgreSQL target via existing SQLAlchemy; reviewed structural change tooling | SQLite and process-local locks cannot simply be replicated across hosted workers |
| D-03 | Private artifact storage with authoritative database metadata | Files and ownership need explicit lifecycle and access policies |
| D-04 | Geometry-first, conditional OCR/model enrichment | Accurate measurements remain explainable and independently testable |
| D-05 | Versioned document/revision/run/finding contracts | Reanalysis cannot silently rewrite evidence |
| D-06 | Extend LiteLLM for generation; optional typed-decision adapter | Reuse existing integration, avoid assuming Jev is a drop-in LiteLLM provider |
| D-07 | No scraping; human-governed consented corpus; aggregates first | Public availability is not reuse permission |
| D-08 | App authorization plus tested database policies/constraints | Do not assume an admin connection automatically enforces row policies |
| D-09 | Durable work ownership and transactional outbox | Committed requests cannot silently lose required work |
| D-10 | English analysis beta, preserve existing localized UI | Translation availability is not analyzer calibration |
| D-11 | One tracker; evidence-bound completion and revalidation | Status cannot survive changed code by assertion alone |

These decisions capture the ten architecture-record topics requested by T23 without creating ten empty ADR files. When a material decision changes, append a dated record with alternatives, evidence, reviewer, consequences, related tasks and superseded decision ID; do not rewrite approval history.

## Gates requiring concrete proposals

| Gate | Required proposal / approver | Blocks |
|---|---|---|
| G-BASE | Provenance/recovery method if establishing Git or acquiring a baseline; no overwrite | GL-BASE-001 mutation only |
| G-AUTH | Exact invitation/sign-in model, account boundary, staff access and recovery; client + security reviewer | GL-IDENTITY-001/002/003 writes |
| G-DATA | Reviewed database changes, file lifecycle, deletion promises, preservation/recovery plan; client + data/privacy reviewer | GL-DATA-001, GL-STORAGE-001, GL-UPLOAD-001, GL-JOBS-001, GL-PRIVACY-001/002 |
| G-DEPS | Named new major dependencies, license/security findings and reason; client | New auth/queue/parser/OCR/database tooling installation |
| G-AI | Provider/model, actual processing terms/locations, consent UX, cost ceilings, payload/redaction evidence; client + privacy reviewer | External AI/OCR processing and provider adoption |
| G-UX | Concrete changed user flows and labels, preservation effects, rollback; client | Material report/editor/account experience changes |
| G-CI | Exact test/publish changes and credentials boundary; client | GL-DELIVERY-001 automation/configuration writes |
| G-HOST | Providers, regions, monthly envelope, quotas, backup/service limits and named operators; client | Shared/staging/production creation and commands |
| G-CORPUS | Consent/review/removal policy, cohort disclosure controls and staff authorization; client + privacy/reviewer | GL-CORPUS-001/002/003 |
| G-RELEASE | Test evidence, residual risks, recovery rehearsal, support coverage and client walkthrough; client | Any invitations to real users or public launch |
| G-EXPAND | Specific next audience/feature, privacy/access impact and evaluation; client | M10 execution |

A gate is satisfied only by a scoped A-* record with exact approved action, date, client wording, environment, recovery route and linked specification revision. Scope changes invalidate only affected approval coverage; do not repeatedly ask for already approved unchanged actions.

For an active task claim, list `Approval: A-...` references to those records. If a gate category does not apply to the concrete action (for example G-AI for wholly local OCR), record `Not applicable gates: G-AI` with the evidence and reviewer rationale in that claim. This is not an exemption for a required client approval; no category may be marked inapplicable merely to pass validation. Read-only discovery may use `Action class: READ_ONLY` and must not mutate files or resources. The validator checks record references; a human reviewer still checks the actual scope.

## Decision dossier before implementation

GL-BASE-003 owns provider/tool decisions. Research official current documentation for managed identity, PostgreSQL, private storage, queue delivery, parser/render licenses, OCR, optional models, observability and container hosting. Compare at most two engineering finalists per domain internally. Select one recommendation; bring the client only the business consequences and approval request. Record version compatibility, API evidence, support limits, data handling, operating cost assumptions, failure/recovery behavior and exit strategy. Do not leave “Celery/RQ/Arq” as an implementer lottery.

A research result may be “no safe provider established.” That blocks dependent implementation, not documentation or unrelated tests. Never fabricate contract/privacy guarantees or a fixed monthly bill. No runtime provider or spend ceiling has yet been approved.

## Change Request template

Use this verbatim structure, filled with concrete facts:

> What I want to do: one plain sentence describing the exact action.
>
> What you will notice: the user/staff effect.
>
> What could go wrong: the worst realistic consequence.
>
> What is hard to undo: affected records, history or connected tools.
>
> What I will not touch: explicit boundaries.
>
> How we can undo if you hate it: tested recovery, or why full undo is impossible.
>
> Time / disruption: honest estimate and affected availability.
>
> My recommendation: proceed, do not proceed, or a smaller safe step.
>
> Please reply YES to this exact action, or tell me what to change.

Prepare the concrete reviewable specification and reversible/read-only evidence first. Explain why approval is required. Never request approval for an unexplored broad deletion. “Look into it” authorizes investigation, not execution. Silence is not approval.

## 2026-10-01 execution and naming direction

Client: “start with actual code”, “keep pushing to repo at appropriate moments”, and “continue exactly from where we left also we are renaming the product to jugalbandi”. Product name is **Jugalbandi**; historical GoldLens source plans and stable GL-* IDs remain unchanged for traceability.

| ID | Status | Authorized action | Evidence | Explicit boundary | Gate coverage |
|---|---|---|---|---|---|
| A-START-001 | APPROVED | Separate clone, isolated local runtime setup, small reversible implementation and ordinary commits/pushes to a non-publishing feature branch | Client implementation and push request, reaffirmed 2026-10-01 | No main push, history rewrite, attribution removal, deployment, data/auth changes or new major dependencies | G-BASE |
| A-BRAND-001 | APPROVED | Rename current product display text to Jugalbandi, with regression checks and delivery-record update | Client explicit rename, 2026-10-01 | Preserve saved keys, public API routes, upstream credits, license, original plans and deployment identifiers; recover by reverting the bounded commit | G-UX |

History replacement is requested but not informed-approved. The inspected main history contains 1,654 commits at 9c05e423dfde44a5b4bb398d2dc7507194252ded. No remote history or contributor record was changed. Before any replacement: verified recovery bundle, precise affected references, publishing consequences, required attribution and a separate informed YES.

## Existing-guide maintenance — 2026-10-01

| ID | Status | Authorized action | Evidence | Explicit boundary | Gate coverage |
|---|---|---|---|---|---|
| A-DOC-002 | APPROVED | Add current Jugalbandi context and surgically correct outdated stack/setup statements in existing project guides | Client: “update the old docs ... surgically as addition modifying only what is needed” | Documentation only; preserve historical plans, credits, application code, settings and deployment behavior | A-DOC-001 |
