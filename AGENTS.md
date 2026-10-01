# Jugalbandi engineering instructions

These instructions apply to humans and AI agents working in this repository. Read [the delivery index](plan/delivery/README.md) first. The client authorized implementation and renamed the product **Jugalbandi** on 2026-10-01. Follow the tracker and scoped approvals; implementation permission is not permission to deploy, rewrite history, remove attribution, or change protected data/account behavior. Historical GoldLens plans and GL-* IDs remain stable.

## Start or resume

1. Identify the working directory and inspect local changes. If Git is absent, report it; do not invent a commit, assume a clean checkout, initialize history, or replace this directory from upstream.
2. Read [tracker](plan/delivery/TRACKER.md), [decisions and approvals](plan/delivery/DECISIONS_AND_APPROVALS.md), and [handoff](plan/delivery/HANDOFF.md).
3. Revalidate [project map](plan/delivery/PROJECT_MAP.md). Before material code work, survey every top-level application and supporting infrastructure. For later tasks inspect the target, callers, dependents, tests, and equivalent patterns elsewhere.
4. Read the applicable application `CLAUDE.md`, [existing agent index](docs/agent/README.md), and relevant design/architecture references. These describe the existing product; verify their factual claims against code.
5. Select a task whose dependencies are verified and approvals cover the exact action. Inspect implementation and evidence before trusting status. Claim it in the tracker with owner, reviewer, edit boundary, and next checkpoint.
6. Explain the user-visible result and material risks in plain language before changing anything.
7. Implement the smallest complete approved slice. Re-read subtle changes, run the relevant checks, and attach sanitized evidence.
8. Update the tracker and handoff before ending. Name incomplete acceptance criteria and the next safe action.

## Authority and facts

Explicit client decisions and consent restrictions take precedence over repository defaults. Follow higher-priority platform instructions. Code/runtime evidence establishes current behavior; approved requirements establish intended behavior. Conflicts between source plans are resolved in [source reconciliation](plan/delivery/SOURCE_RECONCILIATION.md), not silently by an implementer. Historical docs and comments are not proof that a feature works.

Preserve existing conventions: `apps/frontend`, `apps/backend`, `/api/v1`, strict TypeScript, typed Python, pytest/Vitest, existing API clients, source-preservation logic, and the Swiss design system. No framework experiments or broad cleanup as a side effect. Format only changed files, even where an older guide recommends whole-project formatting.

## Consent and non-destruction

Read-only inspection, truthful documentation, and authorized small reversible work may proceed. A plan is not blanket execution consent. Obtain informed approval before deleting features/files/dependencies, changing account access or personal-data handling, changing database structure, installing major dependencies, changing publishing/hosting/CI, or running shared-environment commands. Use the exact [Change Request process](plan/delivery/DECISIONS_AND_APPROVALS.md#change-request-template).

Never discard client changes, reset a shared database, overwrite a backup, rewrite Git history, disable access protection, expose secrets, or incur service spend on a casual instruction. Approval must describe the concrete consequence and recovery route. Silence is not approval. Do not ask again for an action already covered by a valid scoped approval.

## Engineering invariants

- Account authorization is enforced server-side for every resource and artifact; hidden UI is not protection.
- Validate untrusted inputs and AI outputs. Fail closed. No fake success, fabricated records, empty catches, or validation removal to silence errors.
- Preserve candidate facts. AI edits are proposals until accepted. Missing facts remain unconfirmed; unresolved placeholders cannot be exported as completed claims.
- Never log raw resumes, prompts, credentials, signed URLs, or unnecessary personal data. Use synthetic or explicitly permissioned fixtures. External processing requires the appropriate consent and provider approval.
- Reuse existing implementations; search for twins before adding helpers. Do not delete apparently unused code based only on search results.
- New routes, buttons, jobs, settings, and fields need complete behavior, error/empty/denied states, tests, monitoring where applicable, and honest documentation.
- Keep bounded work, explicit timeouts, durable retry ownership, UTC instants, and versioned analysis evidence.
- No unsupported type escapes or suppression directives. An unavoidable exception needs a reason and removal condition.
- Preserve accessible semantic structure, visible focus, keyboard use, non-color status cues, responsive behavior, and reduced motion.
- Regression tests must prove the broken behavior, not mirror implementation. Never weaken a test to unblock delivery.

## Verification and completion

Follow [verification](plan/delivery/VERIFICATION.md). Record exact commands, environment, date, revision/fingerprints, result, and gaps. Missing tools, skipped checks, historical passes, generated code, and another agent's statement are not passes. `VERIFIED` is task evidence, not deployment or release approval. Changed evidence invalidates affected completion claims.

Do not leave product stubs, unwired controls, or unsupported completion claims. If a slice cannot be completed, record its boundary and blocker without calling it shipped. Preserve existing features unless removal has explicit approval.

## Working alone or in a team

One implementation owner per task. One integration owner serializes shared contracts, database definitions, dependencies, and tracker merges. Parallel work needs verified dependencies and disjoint edit boundaries; ownership notes do not replace conflict detection. Shared-worktree agents must not overwrite each other's files.

Assign an independent reviewer to high-risk work. A solo agent's second pass is self-review, not independent review. Reclaim abandoned tasks only after inspecting partial work and recording the takeover. Never assume work is absent because its owner stopped responding. Handoffs include changed areas, test evidence, outstanding criteria, approvals, and next action. Verify the combined result after integration.

If the tracker is missing, reconstruct it from requirements, code, tests, and history; reconstructed tasks remain unverified. See [restart exercises](plan/delivery/VERIFICATION.md#restart-exercises).

## Client communication

Explain outcomes, risks, costs, and recovery in everyday language. Engineering choices with equal business outcomes belong to engineers. Decisions for the client have at most two options and a recommendation. Report what changed, what was inspected, how the client can check, verification gaps, remaining risks, and whether anything was deleted or permanently altered.
