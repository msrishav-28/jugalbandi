# Markdown alignment audit

Date: 2026-10-02. Starting code identity: 74778a5. Scope: all 106 tracked project Markdown files, excluding installed dependencies, runtime output and the preserved outer directory. The [file register](MARKDOWN_AUDIT.csv) records each starting file, its disposition and LF-normalized content fingerprint at review. Mutable tracker/handoff/evidence entries may change afterward; the document fingerprint manifest is the completion snapshot. This audit document is the one new Markdown file.

## What changed

Local installation is the default. No hosting services, deployment, spending or publication were performed. Root README now opens with local use, current features, setup, evidence and handbook links; upstream credits, images, sponsors and history remain visibly attributed. Existing guides receive bounded corrections for setup, formatting scope and seven UI locales. Historical design documents retain their bodies with an authority note. The four original source plans remain unchanged; source reconciliation and latest client decisions override outdated hosted/TinyDB assumptions.

Confirmed hosted-profile rules are kept conditional: BYOK primary, no support content access, 30 days from upload plus seven-day recovery and invitation limits. These are not silently applied to local users. Product task dependencies must be reconsidered for local delivery before implementation; this pass does not invent a replacement architecture.

## Review method and limits

Enumerated files with `git ls-files "*.md"`; read text for scope, stack, commands, authority conflicts and links. Compared targeted statements against frontend/package.json, backend/pyproject.toml, locale configuration and recorded client decisions. The register means documentation alignment review, not line-by-line recertification of every historical code example or a new whole-codebase runtime audit. Unchanged reusable reference material does not need cosmetic rebranding.

Checked local Markdown file targets outside fenced examples across all starting files; no missing targets. Handbook validation also checks its heading anchors, requirement/task coverage and dependency cycles. External sites were not checked; linked model versions, prices and historical APIs are not newly endorsed. Product tests were not rerun for documentation-only edits. Existing backend and production-build blockers remain in EVIDENCE.md.

## Next safe work

Revalidate the checkout and baseline blockers, then reconcile the analyzer task dependency chain for local installation while preserving existing workflows. Hosted identity, infrastructure and release tasks cannot be selected merely because an older milestone listed them first. No broad deletion, framework replacement or history rewrite is authorized by this audit.
