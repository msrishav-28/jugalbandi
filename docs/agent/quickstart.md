# Quickstart Guide

> **Jugalbandi:** Use the client repository and branch recorded in the [handoff](../../plan/delivery/HANDOFF.md). These are local development commands, not deployment approval. Preserve existing environment files; copy samples only if the destination does not exist. Use synthetic resumes for development.


> Essential commands to build, run, and test Jugalbandi, built on Resume Matcher.

## Prerequisites

- Node.js 22+
- Python 3.13+
- [uv](https://docs.astral.sh/uv/) (Python package manager)

## Installation

```bash
# Backend (from repo root)
cd apps/backend
uv sync --extra dev

# Frontend (from repo root)
cd apps/frontend
npm ci
```

## Development

```bash
# Backend (Terminal 1, from repo root)
cd apps/backend
uv run uvicorn app.main:app --reload --port 8000

# Frontend (Terminal 2, from repo root)
cd apps/frontend
npm run dev
```

## Quality Checks

```bash
# From apps/frontend
npm run lint     # Lint frontend
npm run typecheck
npm run test -- --maxWorkers=2
npm run build
npm exec -- prettier --check path/to/changed-file.tsx  # Use actual changed paths only
```

## Backend Commands

```bash
cd apps/backend
uv run uvicorn app.main:app --reload --port 8000
uv run pytest
```

## Environment Setup

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend
cp apps/frontend/.env.sample apps/frontend/.env.local
```

## First-Time Setup

1. Open http://localhost:3000/settings
2. Select AI provider + enter API key
3. Click "Test Connection"
4. Upload your first resume!

## Jugalbandi verification and known setup limits

From the repository root:

```bash
node plan/delivery/validate-docs.cjs
node plan/delivery/validate-docs.test.cjs
```

From apps/backend after installing dependencies:

```bash
uv run python ../../scripts/check_locale_parity.py
```

Two frontend workers avoid the timeouts observed under default parallelism on this Windows machine; assertions and time limits were not relaxed. Backend tests need the dev extra above. Real-provider evaluations require separate authorization.

The 2026-10-01 checkpoint passed frontend tests, lint, typecheck and locale parity. Production build was blocked by Google Fonts downloads; backend tests by Windows Application Control rejecting a native dependency. Use an authorized compatible environment; do not disable protection or count unavailable checks as passes. Exact results remain in [evidence](../../plan/delivery/EVIDENCE.md).

Records/settings are currently installation-wide. Do not expose this as a private-account service before account isolation and release gates are implemented. Main/tag publishing still uses upstream image identifiers.
