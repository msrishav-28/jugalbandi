# Project Map

Survey date: 2026-09-30. Method: static repository inspection in this engagement, followed by a revalidation before documentation writes. No application correctness, penetration test, or production-readiness claim is made.

## Client summary

The existing product lets a candidate create or upload a resume, tailor it to a job, edit its content and appearance, generate supporting application material, track applications, and export PDFs. GoldLens adds measurable feedback about the actual document, evidence in its writing, and relevance to a job. It must preserve the existing editor and recovery behavior while adding private accounts suitable for an online service.

The most important transition is from one locally operated installation to separate private accounts. Existing records are not known to have account ownership. Hosting this copy unchanged is therefore not an acceptable beta shortcut.

## Technical detail (optional)

| Surface | Evidence / entrypoints | Findings and dependencies |
|---|---|---|
| Root | README/SETUP in four languages; LICENSE; `.claude/CLAUDE.md` | Product v1.3 documentation; historical and current facts coexist |
| Frontend | [manifest](../../apps/frontend/package.json), [layout](../../apps/frontend/app/layout.tsx), [config](../../apps/frontend/next.config.ts) | Next 16 range, React 19, TypeScript strict, Tailwind 4, npm lockfile; Next proxy forwards `/api` to FastAPI |
| User journeys | `apps/frontend/app/(default)` and `components` | Dashboard, tailor, builder, resume viewer, tracker, settings, wizard; print routes outside default layout |
| Client state | `lib/api`, `lib/context`, `lib/utils`, `hooks` | Shared HTTP client, cancellation/operation ownership, local recovery drafts, preview state, translation handling |
| Backend | [manifest](../../apps/backend/pyproject.toml), [entry](../../apps/backend/app/main.py), `app/routers` | Python >=3.13, FastAPI/Pydantic; health, config, resumes, jobs, enrichment, applications, wizard under `/api/v1` |
| Storage | [models](../../apps/backend/app/models.py), [engine](../../apps/backend/app/db_engine.py), `app/database.py` | Async/sync SQLAlchemy + SQLite, startup structural updates, facade returns dictionaries; not PostgreSQL |
| Legacy import | `app/scripts/migrate_tinydb_to_sqlite.py` | TinyDB is a legacy input; startup import can mutate data; do not boot against unknown real storage |
| Configuration | `app/config.py`, `config_cache.py`, `crypto.py`; env sample names inspected | DATA_DIR owns database, settings and encryption material; global settings/key behavior requires account separation |
| AI | `app/llm.py`, `ai_budget.py`, `ai_limits.py`, `services`, `prompts`, `schemas` | LiteLLM, time/cost-related work boundaries, structured parsing, source preservation, preview/confirm semantics |
| Documents | `services/parser.py`, `app/pdf.py`, frontend print/template code | Bounded text extraction; Chromium exports depend on frontend and fonts; source geometry analysis is a new capability |
| Backend tests | `tests/unit`, `service`, `integration`, `evals`, `tests/conftest.py` | pytest/httpx; data isolation before imports; network denied by default; real provider evals separate |
| Frontend tests | `tests`, `vitest.config.ts`, `tests/browser/reliability_flow.py` | Vitest + browser reliability harness; existing regression coverage to preserve |
| Monitoring harness | `apps/backend/e2e_monitor` | Explicit opt-in, can incur provider calls; reporting harness is not a release gate |
| Container | [Dockerfile](../../Dockerfile), [compose](../../docker-compose.yml), `docker/start.sh` | Single packaged app, internal backend, persistent local volume, browser/font dependencies; no hosted worker topology established |
| Automation | `.github/workflows/docker-publish.yml`, `.githooks` | Publishing workflow plus optional local checks; no evidence of complete mandatory hosted PR gates |
| Scripts | `scripts/check_locale_parity.py` | Checks translation keys; launch attempt failed in local Python environment |
| Assets | `assets`, `apps/frontend/public`, `assets/pdf-templates` | Brand/demo/template assets; preserve attribution; visual inventory is not a license audit of every asset |
| Docs | `docs/agent`, `docs/portable`, `docs/superpowers` | Current reliability map, API/feature guides, Swiss design system, historical implementation plans |
| Plans | Four original files under `plan` | Aspirational GoldLens requirements; crosswalk in source reconciliation |

No separate mobile application, mail service, scheduled worker deployment, or infrastructure-as-code project was found in the enumerated top-level layout. Future invitation email and workers are requirements, not existing systems.

## Existing data and behavior to preserve

Models include resumes, jobs, improvements, tailoring previews, applications and encrypted API keys. Existing resume IDs and string timestamp compatibility cannot be changed by blind global replacement. Master/default-master selection, transaction boundaries, preview fingerprints, confirmation replay, processing tokens and draft recovery have dedicated code/tests.

PDF generation opens frontend print routes. New sign-in controls must not break rendering or leave print endpoints public. Browser drafts need account-aware scope and sign-out handling. Existing ATS scoring is keyword/section based; do not rebrand it as proof of visual parsing quality.

The configured UI languages are en, es, zh, ja, pt, fr and ko. Older guides list fewer. Preserve configured translations; new analysis language support requires separate evidence.

## Risk register at survey

| ID | Finding | Required disposition |
|---|---|---|
| MAP-01 | No Git repository detected in this folder | GL-BASE-001 establishes provenance/recovery without overwriting it |
| MAP-02 | No account ownership enforcement found in inspected routes/models | GL-IDENTITY-001/002; no multi-user exposure before isolation proof |
| MAP-03 | Process-local coordination and SQLite-specific writes | GL-DATA-001 and GL-JOBS-001 before horizontal scaling |
| MAP-04 | Global settings and provider credentials | GL-IDENTITY-003 separates privileged and personal controls |
| MAP-05 | Plans assume TinyDB and alternate directory trees | Reconciled; preserve current application layout |
| MAP-06 | Historical docs/test counts conflict with current code | Runtime baseline is mandatory; never copy old pass counts |
| MAP-07 | Root instructions ignored; Python lock ignored | Root instruction exception included; reproducible dependencies remain GL-BASE-002/003 |
| MAP-08 | No runtime baseline; Python launcher failed; project dependencies absent in inspected locations | Do not claim tests/build pass; repair isolated development environment under GL-BASE-002 |
| MAP-09 | Dead/hanging surface search is only static | Search found ordinary placeholders and exception handling, not proof of a removable feature; finish route/caller walkthrough before removals |
| MAP-10 | No commercial provider/privacy/cost commitments verified | GL-BASE-003 dossier and approval gates before real content or paid resources |

## Survey limits and revalidation

The survey covered each top-level application/support area, entrypoints, manifests, instructions, env sample names, storage definitions, account patterns, shared helpers, tests, container/publishing setup and searches for unfinished surfaces. It was not a line-by-line audit of all files or a live user-flow test. Live secret values were not printed. No private registry requirement was established; confirm all registry origins and locks during baseline setup.

Before each material code session: list the layout, inspect instruction changes, manifest/lock diffs, storage and endpoint changes, affected tests and duplicate patterns. Before the first product write, complete GL-BASE-001 through GL-BASE-004. If new users or records appear, stop the unused-copy assumption and obtain a preservation/transfer plan.

This documentation step does not change application behavior, stored records, credentials, sign-in, deployment or original plans. Future permissions are scoped in [decisions](DECISIONS_AND_APPROVALS.md).

## 2026-10-01 repository revalidation

Client repository: https://github.com/msrishav-28/jugalbandi at 9c05e423dfde44a5b4bb398d2dc7507194252ded (main; 1,654 commits). Separate working checkout: `.worktrees/jugalbandi` under the original unpacked folder, branch `goldlens/baseline-and-first-checks`. All 539 tracked files were compared against the original surveyed copy with text line endings normalized; only the previously approved .gitignore exception differed. Re-read root/application instructions, manifests, test isolation, entrypoints, frontend brand callers and localized twins, publishing trigger and design references. Existing whole-project map therefore carries forward with the same static-survey limits. No new top-level application found. Current name: Jugalbandi. No history rewrite. Publishing workflow still targets upstream image names; main/tag pushes remain gated.
