# GoldLens Resume Intelligence
## CTO Architecture, Engineering Strategy, Security, and Delivery Specification

**Status:** Technical master plan  
**Audience:** CTO, founding engineers, ML engineers, platform engineers, security reviewers, technical product leads  
**Product:** GoldLens — privacy-first multimodal resume intelligence  
**Base repository:** Fork of `srbhr/Resume-Matcher`  
**Last updated:** September 30, 2026

---

## 1. Technical executive summary

GoldLens is not primarily a resume generator. It is a **document-intelligence system** that evaluates a resume as both a machine-readable artifact and a human-scannable visual composition. The platform will inspect PDF/DOCX structure, geometry, typography, reading order, content semantics, job relevance, evidence quality, and controlled peer-reference patterns.

The engineering strategy is deliberately layered:

1. **Deterministic document extraction first** for accuracy, speed, cost control, and explainability.
2. **Rules and statistical heuristics second** for layout, ATS, and writing diagnostics.
3. **Embeddings and constrained LLMs third** for semantic interpretation and user-facing explanation.
4. **Human-curated, consented data governance throughout** for reference intelligence.
5. **No uncontrolled scraping, autonomous self-training, or unverified-source ingestion.**

We will fork Resume-Matcher because its current codebase already provides a modern Next.js/React frontend, FastAPI/Python backend, multi-provider LLM support through LiteLLM, resume building/tailoring, templates, PDF export, and Docker deployment. It currently uses TinyDB, so production GoldLens requires a deliberate migration to Postgres, private object storage, worker queues, and a versioned analysis data model. [page:3]

---

## 2. System goals

### Functional goals

- Ingest PDF and DOCX resumes safely.
- Produce a normalized document representation preserving page geometry and semantic content.
- Detect ATS extraction failure modes, including multi-column reading-order corruption.
- Analyze visual design: margin consistency, whitespace, alignment, typography, hierarchy, density, overflow, and spacing rhythm.
- Analyze language: section structure, bullet evidence, quantification, action, technical depth, claim support, and role fit.
- Compare a resume to a selected job description and a governed reference cohort.
- Provide source-grounded recommendations, optional tracked rewrites, and explainable scores.
- Protect candidate and reference-document privacy by default.

### Non-functional goals

- Explain every high-impact finding with local document evidence.
- Keep born-digital PDF analysis under 20 seconds at p95 for a two-page resume excluding optional LLM rewriting.
- Make all long-running work asynchronous and idempotent.
- Support horizontal scaling of CPU document workers independently from LLM/API workloads.
- Enable complete deletion of user documents and derived data.
- Ensure raw reference documents never become broadly accessible or visible to end users.

### Explicit non-goals

- Hiring decision automation.
- Candidate ranking for employers.
- Employment verification.
- Scraping LinkedIn, X, or websites that do not explicitly permit ingestion.
- “Guaranteed ATS pass” claims.
- Automatically adding claims, metrics, or skills not grounded in user-provided evidence.

---

## 3. Architectural principles

### 3.1 Geometry before vision

A born-digital PDF often contains text coordinates, font metadata, style information, and reading fragments. Use those native signals before applying OCR or image models. It is more accurate for margin, spacing, typography, alignment, and clipping analysis.

### 3.2 Evidence before generation

Generation is the final presentation layer. Each recommendation must be grounded in:

- Exact page/block/line coordinates;
- Extracted source text;
- A deterministic feature or model output;
- A policy/rule identifier;
- Analyzer and model versions.

### 3.3 Separate extraction from interpretation

Persist immutable normalized representations. Run new analyzer versions over the same source representation rather than re-parsing every document or rewriting history.

### 3.4 Async by default

Uploads, OCR, rendering, embeddings, cohort-stat computation, and LLM analysis are jobs. The API must return durable job identifiers and provide progress through polling or server-sent events.

### 3.5 Privacy is an architecture primitive

Resume files contain contact information, employment history, educational history, and potentially sensitive information. Store raw files separately from derived analytics; encrypt both; prevent logs, prompts, and observability traces from leaking PII.

### 3.6 Trust corpus is a governed dataset

A reference corpus is not “web data.” It is versioned, consented, reviewed, redacted, auditable data. Public source visibility never automatically authorizes reuse.

### 3.7 Modular monolith first

Launch as a modular monolith with independently deployable worker processes. Split into microservices only when scaling, ownership, or blast-radius evidence justifies it.

---

## 4. Baseline fork assessment

### What Resume-Matcher supplies

The current project describes a master-resume workflow, job-description tailoring, editing/reordering sections, templates, PDF export, scoring/keyword highlighting, cover-letter generation, interview preparation, and support for local or cloud LLM providers. Its stated stack is FastAPI/Python 3.13+, LiteLLM, Next.js 16/React 19/TypeScript, Tailwind CSS, TinyDB, and Playwright/Chromium PDF generation. [page:3]

### What GoldLens must replace or add

| Area | Fork baseline | GoldLens target |
|---|---|---|
| Persistence | TinyDB JSON storage | Postgres + migrations + row-level authorization |
| File storage | local/Docker volume-oriented | encrypted object storage + signed access |
| Analysis model | resume/JD tailoring | multimodal document intelligence pipeline |
| Background processing | limited/simple | robust queue, retries, idempotency, DLQ |
| Parsing | text/resume structured data | page geometry, style spans, reading order, OCR fallback |
| Layout analysis | template/render focus | explicit visual and ATS layout diagnostics |
| Reference data | none | consented, curated, versioned corpus |
| Security | local/self-hosted posture | tenant isolation, auditability, PII controls |
| Evaluation | generic product behavior | labeled document benchmark + regression suite |
| Deployment | Docker single-app | staged managed deployment with workers and observability |

### Fork discipline

- Preserve upstream attribution and Apache-2.0 license obligations.
- Keep a clear `UPSTREAM.md` documenting fork point, upstream patches, and local architectural deviations.
- Do not merge upstream blindly; establish a scheduled dependency/upstream review process.
- Isolate product-specific code behind packages/modules rather than rewriting the entire fork on day one.

---

## 5. Target architecture

```text
                         +-------------------------------+
                         |          Next.js Web App       |
                         | upload, report, editor, canvas |
                         +---------------+---------------+
                                         |
                                  HTTPS / REST / SSE
                                         |
                    +--------------------v--------------------+
                    |            FastAPI Application           |
                    | auth, authorization, orchestration, API  |
                    +-----+------------------+----------------+
                          |                  |
              +-----------v----+      +------v----------------+
              |   Postgres      |      |  Object Storage        |
              | metadata, RLS,  |      | encrypted originals,   |
              | findings, stats |      | renders, artifacts     |
              +----------------+      +------------------------+
                          |
                  +-------v--------+
                  | Redis / Queue  |
                  | jobs + events  |
                  +---+--------+---+
                      |        |
     +----------------v--+  +--v------------------------+
     | Document workers   |  | Analysis workers          |
     | parse/render/OCR   |  | layout/NLP/embed/LLM      |
     +-------------------+  +---------------------------+
                                      |
                      +---------------v--------------+
                      | Model Gateway / LiteLLM       |
                      | policy, routing, redaction    |
                      +------------------------------+
```

### Recommended deployment topology

**MVP / private beta**

- Vercel: Next.js frontend.
- Managed Postgres: Neon or Supabase Postgres.
- S3-compatible object storage: Cloudflare R2, S3, or Supabase Storage.
- Redis: Upstash/managed Redis.
- API + workers: Railway, Render, Fly.io, or a small Kubernetes-free container platform.
- Observability: Sentry + OpenTelemetry-compatible logs/metrics.

**Scale-up**

- API: containers behind load balancer, autoscaling.
- Workers: separate CPU, OCR/layout, and LLM job pools.
- GPU only for experiments or high-throughput layout models; do not provision by default.
- Isolated VPC/private networking for DB, Redis, workers, and storage where provider permits.

---

## 6. Domain-driven module design

```text
/apps
  /web                         # Next.js application
  /api                         # FastAPI HTTP application
/workers
  /ingestion                   # file validation, parser, renderer, OCR
  /analysis                    # features, scoring, findings, embeddings
  /curation                    # reference document redaction/review helpers
/packages
  /contracts                   # OpenAPI-generated TS + Pydantic contracts
  /document-core               # IR models, parser interfaces, geometry utilities
  /analysis-core               # analyzers, rule engine, finding contracts
  /policy-core                 # privacy, source, LLM, redaction policy
  /ui                          # shared design system
  /observability               # telemetry, correlation, safe logging
/ml
  /models                      # versioned model assets/metadata, not raw training data
  /evaluation                  # benchmark harness and golden fixtures
/docs
  /adr                         # architecture decision records
  /runbooks
  /security
  /data-governance
```

### Core bounded contexts

- **Identity & access:** users, organizations later, sessions, RBAC.
- **Resume lifecycle:** file/version management, document normalization, exports.
- **Analysis orchestration:** jobs, artifacts, analyzer versions, finding aggregation.
- **Job targeting:** job descriptions, matching, tailored versions.
- **Reference intelligence:** source consent, curation, cohort creation, aggregate statistics.
- **AI gateway:** prompt templates, provider routing, model metadata, output validation.
- **Governance:** audit trails, retention, deletion, security events.

---

## 7. Data architecture

### 7.1 Storage classification

| Data category | Examples | Storage | Encryption | Retention |
|---|---|---|---|---|
| Raw user document | PDF, DOCX | private object storage | SSE-KMS / provider-managed + restricted access | user-controlled |
| Derived document data | extracted text, blocks, styles | Postgres/object artifact | encrypted at rest | tied to user document |
| Rendered pages | PNG/WebP previews | private object storage | encrypted at rest | tied to user document |
| Analysis results | findings, scores, evidence refs | Postgres | encrypted at rest | tied to report/version |
| LLM prompts | minimized/redacted payloads | do not persist by default | provider transport encryption | short debug window only if opt-in |
| Reference documents | consented raw files | isolated object namespace | strongest controls | policy/consent controlled |
| Cohort statistics | de-identified aggregates | Postgres | encrypted at rest | versioned |
| Audit records | access/curation/deletion events | append-only table / archive | encrypted at rest | policy-controlled |

### 7.2 Canonical Document IR

Define a canonical intermediate representation (IR) independent of source format.

```json
{
  "document_id": "doc_01J...",
  "source": {
    "format": "pdf",
    "sha256": "...",
    "page_count": 1,
    "page_size_pt": {"width": 595.28, "height": 841.89},
    "is_scanned": false
  },
  "pages": [
    {
      "page_number": 1,
      "coordinate_system": "pdf_points_top_left",
      "blocks": [
        {
          "id": "blk_01",
          "kind": "text",
          "bbox": {"x0": 44, "y0": 48, "x1": 552, "y1": 77},
          "reading_order": 1,
          "text": "M S Rishav Subhin",
          "spans": [
            {
              "text": "M S Rishav Subhin",
              "font_family": "Inter",
              "font_size_pt": 21,
              "font_weight": 700,
              "color": "#111111",
              "bbox": {"x0": 44, "y0": 48, "x1": 320, "y1": 77}
            }
          ]
        }
      ]
    }
  ],
  "semantic": {
    "sections": [],
    "entities": [],
    "parse_confidence": 0.94
  }
}
```

### 7.3 Versioning strategy

Every important result must include:

- `document_ir_version`
- `parser_version`
- `layout_engine_version`
- `semantic_engine_version`
- `embedding_model_version`
- `llm_provider/model/version`
- `prompt_template_version`
- `rule_pack_version`
- `cohort_version_id`
- `analysis_run_id`

This enables reproducibility, rollback, A/B testing, and reliable debugging.

---

## 8. Document ingestion pipeline

### 8.1 State machine

```text
UPLOADED
  -> VALIDATING
  -> QUARANTINED (if unsafe)
  -> STORED
  -> PARSING
  -> RENDERING
  -> OCR_REQUIRED (conditional)
  -> NORMALIZED
  -> ANALYZING
  -> COMPLETE
  -> FAILED_RETRYABLE | FAILED_FINAL | DELETED
```

### 8.2 Upload validation

1. Validate MIME type using file signature, not filename only.
2. Enforce allowlist: PDF and DOCX in MVP.
3. Enforce configurable file/page/size limits.
4. Antivirus/malware scan.
5. Reject encrypted/password-protected files with instructions to upload an unlocked copy.
6. Generate SHA-256 for deduplication and integrity.
7. Assign a correlation ID and immutable upload ID.
8. Store object with no public ACL.

### 8.3 PDF pipeline

1. Use PyMuPDF/MuPDF or equivalent to obtain pages, text spans, vector/annotation metadata, blocks, fonts, and coordinates.
2. Use `pdfplumber`/`pdfminer` as fallbacks or comparison extractors for parser robustness.
3. Detect scan likelihood using text coverage, image area, embedded fonts, and extraction entropy.
4. Render page at 150–200 DPI for UI; optionally 300 DPI for OCR/layout model.
5. Identify text lines, blocks, bullet markers, tables, separators, icons, and image regions.
6. Normalize coordinates to a documented top-left origin.
7. Infer reading order using a deterministic graph before invoking a model.

### 8.4 DOCX pipeline

1. Extract paragraphs, runs, styles, tables, headers, footers, margins, sections, page breaks, and numbering via `python-docx` plus XML inspection where needed.
2. Convert to PDF in a sandboxed headless office/Chromium pipeline for rendered-layout analysis.
3. Retain original semantic style information as higher-confidence style evidence than PDF inference.
4. Handle unsupported Office features by producing an explicit “visual measurement estimated” notice.

### 8.5 OCR pipeline

Use only when digital text coverage is insufficient:

- OCR engine: PaddleOCR/Tesseract/cloud OCR depending on privacy tier.
- Maintain per-token confidence and bounding boxes.
- Do not give high-confidence typography/spacing conclusions from low-quality OCR.
- Distinguish OCR-derived findings visually in the UI.

### 8.6 Idempotency and retries

- Jobs use deterministic idempotency keys: `sha256 + parser_version + pipeline_stage`.
- Retry transient provider/network failures with exponential backoff.
- Cap retries and route terminal failures to dead-letter queue.
- Preserve partial artifacts for debugging only under strict access controls.

---

## 9. Layout analysis engine

### 9.1 Architecture

```text
Canonical Document IR
  -> Page feature extractor
  -> Block/line graph builder
  -> Style normalizer
  -> Layout rules
  -> Optional layout-model enrichment
  -> Feature vector
  -> Context-aware scoring
  -> Finding generator
  -> Evidence linker
```

### 9.2 Geometry features

#### Page-level

- page width, height, orientation, size class;
- usable-content rectangle;
- left/right/top/bottom margins;
- content occupancy ratio;
- density by top/middle/bottom bands;
- clipped/near-edge blocks;
- page-balance score;
- columns and gutter width;
- header/footer intrusion.

#### Block-level

- bounding boxes, text direction, z-order where available;
- nearest neighbor gaps;
- overlap area;
- alignment anchor clusters;
- indentation depth;
- column assignment;
- repeated card/table structures;
- heading-to-body proximity.

#### Line and span-level

- font family/size/weight/color;
- line height and baseline estimates;
- word spacing;
- bullet marker geometry;
- dates/right-aligned metadata relationship;
- capitalization and style patterns.

### 9.3 Deterministic reading-order algorithm

1. Partition blocks into columns using x-coordinate clustering and whitespace gutters.
2. Detect full-width blocks (e.g., name header, section headers) separately.
3. Build precedence edges using vertical ordering within columns.
4. Add constraints for heading → subsequent content, title → date pairs, and bullet grouping.
5. Detect ambiguous cases: overlapping columns, tables, floating sidebars, visual separators.
6. Compare inferred visual order with text extraction order from at least two parsers.
7. Raise ATS risk when order disagreement exceeds threshold.

### 9.4 Optional ML enrichment

Use LayoutLMv3/DocLayNet-like models only for ambiguous pages, scanned documents, icons, tables, unusual templates, and section segmentation weaknesses. Model output must be treated as an enriched signal, not a replacement for exact PDF geometry.

### 9.5 Rules engine design

Rules are declarative, parameterized, versioned, testable, and context-aware.

```yaml
id: layout.section_spacing.inconsistent
version: 1.0.0
scope: page
requires:
  - section_boundaries
  - vertical_gaps
parameters:
  min_samples: 3
  coefficient_variation_threshold: 0.35
  minimum_gap_delta_pt: 8
severity:
  default: medium
  override:
    if: "max_gap_pt > 28 && min_gap_pt < 6"
    then: high
message_template: "Primary section gaps range from {min_gap_pt} pt to {max_gap_pt} pt."
recommendation: "Use one consistent primary section gap, adjusted to your chosen template."
```

### 9.6 Layout scoring philosophy

No isolated heuristic can determine good design. Combine:

- Hard failures: overlap, clipping, unreadable text, parser breakage.
- Consistency: deviation across repeated structures.
- Context: candidate level, page target, resume type, intentional visual system.
- User intent: a dismissed/intentional finding should lower recurrence sensitivity.
- Cohort distribution: used as a soft contextual signal, never a mandatory template.

---

## 10. Semantic analysis engine

### 10.1 Resume schema extraction

Map content to structured sections:

- Header/contact;
- Summary/objective;
- Experience;
- Projects;
- Education;
- Skills;
- Certifications;
- Publications;
- Awards;
- Leadership/volunteering.

Each entity must retain source span and layout block references.

### 10.2 Bullet analyzer

For each bullet, extract:

```json
{
  "action": {"text": "Built", "strength": 0.86},
  "object": "real-time monitoring pipeline",
  "method": ["Python", "FastAPI", "PostgreSQL"],
  "scope": ["12 internal users", "10k events/day"],
  "outcome": ["reduced manual triage time"],
  "quantification": [{"value": "35%", "context": "triage time"}],
  "ownership": "direct",
  "role_relevance": 0.78,
  "credibility_flags": [],
  "source_spans": []
}
```

### 10.3 Claim safety

- Any rewrite must be traceable to source language or use explicit user-fill placeholders.
- Metrics without a nearby object/context are tagged as weak quantification, not automatically praised.
- Outlier claims trigger “verify before using” instead of accusations.
- The system must not infer employer, role, seniority, graduation year, or identity from weak signals.

### 10.4 JD matching

Implement three layers:

1. Exact lexical extraction: skills, tools, titles, credential terms.
2. Semantic retrieval: embeddings with role-specific taxonomy/aliases.
3. Evidence matching: compare each JD requirement to experience/project evidence, not just skills section text.

Return four gap states:

- `demonstrated`
- `present_but_buried`
- `present_but_weakly_evidenced`
- `not_demonstrated_do_not_claim`

---

## 11. LLM platform design

### 11.1 Model gateway responsibilities

- Provider abstraction (via LiteLLM or equivalent).
- Model allowlist by task and privacy tier.
- Per-user/provider key handling if users bring their own keys.
- Prompt template registry and versioning.
- PII minimization/redaction before external calls where possible.
- JSON schema enforcement and retry-on-invalid-output.
- Token, latency, cost, and error instrumentation.
- Circuit breakers, rate limits, and fallback models.

### 11.2 LLM task allocation

| Task | LLM needed? | Output constraints |
|---|---:|---|
| PDF geometry | No | deterministic extraction |
| Margins/spacing/alignment | No | rules + features |
| Section classification | Sometimes | strict JSON + evidence spans |
| Bullet diagnosis | Helpful | source-grounded JSON |
| Rewrite proposal | Yes | tracked rewrite + support mapping |
| JD explanation | Helpful | cite matching evidence |
| Cohort narrative | Optional | aggregate stats only, no raw exemplars |
| Source trust | No final decision | rule/curator workflow only |

### 11.3 Prompt contract example

```text
SYSTEM:
You are a resume editor. You may only propose wording supported by SOURCE_TEXT.
Never add metrics, employers, responsibilities, technologies, results, or credentials.
If a stronger claim requires missing evidence, use [confirm: ...] placeholders.
Return valid JSON matching the supplied schema.

SOURCE_TEXT:
{bullet_text}

DETECTED_SIGNALS:
{bullet_features}

TASK:
Provide one concise rewrite scaffold and explain which source phrases support each non-placeholder claim.
```

### 11.4 Data handling modes

- **Local mode:** Ollama/self-hosted model; user text stays in environment under configured policy.
- **Cloud private mode:** send minimized text to approved provider under DPA/enterprise controls.
- **BYOK mode:** user chooses provider/key; clearly disclose data flow.
- **No-LLM mode:** deterministic analysis remains fully usable.

---

## 12. Reference corpus and continual intelligence

### 12.1 Corpus architecture

Separate raw reference data from user-facing aggregate data:

```text
Reference file (restricted)
  -> PII scan/redaction
  -> curator review
  -> canonical IR
  -> approved feature extraction
  -> de-identified aggregates
  -> cohort-version statistics
  -> user-facing pattern insights
```

### 12.2 Consent and provenance states

```text
DRAFT
PENDING_PROVENANCE
PENDING_CONSENT
PENDING_REVIEW
APPROVED_STATS_ONLY
APPROVED_ANONYMIZED_EXAMPLE
REJECTED
REMOVAL_REQUESTED
REMOVED
```

### 12.3 No autonomous web ingestion policy

The product may support a **discovery inbox** only where an official API, explicit source permission, and a documented legal basis exist. Discovery creates a candidate record, not a corpus record. A human curator must verify provenance/consent before download, storage, or use.

### 12.4 Trust scoring

Trust score measures corpus admissibility, not candidate quality or personal truth.

```text
consent_clarity                 0..30
provenance_quality              0..20
identity_context_evidence       0..15
internal_document_consistency   0..15
metadata_completeness           0..10
independent_curation            0..10
```

Hard exclusions:

- no consent/reuse basis;
- leaked documents;
- unknown reposts;
- copyright-restricted paid packs;
- exposed sensitive PII;
- suspected manipulation with insufficient provenance.

### 12.5 Cohort statistics

Store only aggregate distributions needed for recommendations:

- section ordering frequencies;
- count distributions (projects, bullets, sections);
- visual feature quantiles (margins, density, header scale);
- evidence pattern distributions (quantification, scope, action patterns);
- role-skill clusters;
- confidence/sample-size metadata.

Apply k-anonymity-style thresholds: do not expose cohort-derived metrics below a minimum number of approved documents. Display sample count range and confidence rather than implying universal norms.

### 12.6 Continual learning plan

Do not directly train on every newly ingested resume.

**Stage 1: Statistics and retrieval**

- Incrementally compute de-identified feature aggregates.
- Version cohort snapshots.
- Use retrieval of approved pattern snippets only where permission allows.

**Stage 2: Human feedback calibration**

- Capture accept/dismiss/intentional feedback.
- Review a sample with expert annotators.
- Calibrate deterministic thresholds and ranking weights.

**Stage 3: Narrow supervised models**

- Train only on consented/de-identified labeled examples.
- Train narrowly scoped classifiers (e.g., section detector, bullet-evidence signal classifier).
- Maintain model cards, dataset manifests, evaluation reports, rollback plan.

**Never:** silently fine-tune a general-purpose model on users’ documents.

---

## 13. Security architecture

### 13.1 Threat model

| Threat | Example | Primary controls |
|---|---|---|
| Unauthorized file access | guessing object URL | private buckets, signed URLs, authorization checks |
| Cross-user data leakage | IDOR on report endpoint | opaque IDs, RLS, ownership checks, authorization tests |
| Malware upload | malicious PDF/DOCX | AV scan, sandboxing, file allowlist, quotas |
| Prompt injection | hidden PDF text manipulates LLM | untrusted-content delimiters, instruction hierarchy, schema validation |
| PII in logs | resume text in exception trace | structured safe logging, redaction, no raw payload logging |
| SSRF/URL abuse | importing remote file | URL allowlists, egress controls, fetch proxy, DNS/IP validation |
| Worker RCE | exploit in parser | sandboxed workers, patched dependencies, least privilege |
| Corpus exfiltration | curator or app bug | data segregation, RBAC, audit logs, no raw user exposure |
| Model data leakage | sending raw docs externally | privacy modes, minimization, provider allowlists, DPA |

### 13.2 Authentication and authorization

- Use managed auth initially (Supabase Auth, Clerk, Auth.js, etc.) with verified email.
- APIs validate JWT/session server-side.
- Enforce ownership in application layer and Postgres RLS where appropriate.
- Roles: `user`, `curator`, `reviewer`, `admin`, `service_worker`.
- Curator/admin actions require step-up authentication and audit logging.
- Never expose reference raw document IDs in public APIs.

### 13.3 Object-storage controls

- Separate buckets/prefixes: `user-originals`, `user-renders`, `reference-restricted`, `quarantine`, `exports`.
- No public bucket ACLs.
- Short-lived signed URLs generated after authorization.
- Object keys non-enumerable and tenant-scoped.
- Lifecycle rules for quarantine, temporary renders, and deleted data.

### 13.4 Parser sandboxing

- Run ingestion workers in isolated containers with non-root user.
- No outbound network by default.
- CPU/memory/time limits per file.
- Read-only filesystem except temporary work directory.
- Archive-bomb, decompression, recursion, and page-count controls.
- Keep parsers patched; monitor CVEs.

### 13.5 Prompt-injection defense

Treat resume text, JD text, and web content as untrusted data:

- Delimit untrusted text in prompts.
- Do not allow document content to set system behavior.
- Require structured outputs validated against schemas.
- Reject unexpected tool instructions in document content.
- Never allow LLM output to trigger file/network actions without server-side policy.

---

## 14. Privacy and deletion architecture

### Data retention modes

| Mode | Raw file | Derived data | Analysis report |
|---|---|---|---|
| One-time analysis | delete after configured short period | delete with source | available briefly/downloadable |
| Private account storage | retain until user deletes | retain until user deletes | retain until user deletes |
| Improvement telemetry opt-in | no raw file by default | de-identified outcome/event data | anonymized metrics only |
| Training opt-in | explicit separate consent | curated/de-identified subset only | policy-defined |

### Deletion flow

1. User requests deletion.
2. API marks document as `DELETION_PENDING` and blocks new analysis.
3. Worker deletes object-store originals/renders/exports.
4. Worker deletes derived rows, embeddings, caches, and job artifacts.
5. Audit record retains only minimal non-content compliance metadata.
6. User receives completion confirmation.

### PII minimization

- Do not use name/email/phone/address in quality scoring.
- Hash/detach contact data when possible for reference-corpus aggregation.
- Redact contact data from LLM prompts unless task absolutely requires it.

---

## 15. API design

### API conventions

- REST + OpenAPI for core resources.
- Async jobs return `202 Accepted` and a job resource.
- Server-sent events for progress; polling fallback.
- Resource IDs use opaque ULIDs/UUIDv7.
- Idempotency keys required for uploads/actions that create durable resources.
- Standard error format with non-sensitive human and machine codes.

### Core endpoints

```text
POST   /v1/resumes/uploads/initiate
POST   /v1/resumes/uploads/{upload_id}/complete
GET    /v1/resumes/{resume_id}
DELETE /v1/resumes/{resume_id}
POST   /v1/resumes/{resume_id}/analysis-runs
GET    /v1/analysis-runs/{run_id}
GET    /v1/analysis-runs/{run_id}/events
GET    /v1/analysis-runs/{run_id}/findings
POST   /v1/findings/{finding_id}/feedback
POST   /v1/job-descriptions
POST   /v1/resumes/{resume_id}/match
POST   /v1/resumes/{resume_id}/rewrite-proposals
POST   /v1/resumes/{resume_id}/exports

POST   /v1/curation/reference-documents
POST   /v1/curation/reference-documents/{id}/review
POST   /v1/curation/reference-documents/{id}/remove
POST   /v1/curation/cohorts
POST   /v1/curation/cohorts/{id}/publish-version
GET    /v1/cohorts/{id}/insights
```

### Example: create analysis run

```json
POST /v1/resumes/res_01/analysis-runs
{
  "job_description_id": "jd_01",
  "cohort_id": "cohort_early_career_swe_india",
  "analysis_profile": "deep",
  "privacy_mode": "cloud_private"
}
```

```json
202 Accepted
{
  "analysis_run_id": "run_01",
  "status": "queued",
  "estimated_stages": [
    "document_validation",
    "layout_extraction",
    "semantic_analysis",
    "job_matching",
    "finding_generation"
  ]
}
```

### Finding response contract

```json
{
  "id": "fnd_01",
  "category": "ats_integrity",
  "severity": "high",
  "confidence": "high",
  "title": "Two-column text may be read in the wrong order",
  "why_it_matters": "The extracted text inserts the side column into experience bullets.",
  "evidence": {
    "page": 1,
    "blocks": ["blk_21", "blk_43"],
    "bbox": {"x0": 310, "y0": 190, "x1": 560, "y1": 640},
    "extracted_order_preview": ["Experience bullet 1", "Skills: Python...", "Experience bullet 2"]
  },
  "recommendation": {
    "kind": "manual_layout_change",
    "summary": "Use a single-column layout for essential content."
  },
  "rule_version": "ats.reading_order.2.1.0"
}
```

---

## 16. Queue and worker design

### Queues

```text
ingestion.high          # file validation, priority uploads
ingestion.default       # normal parsing/rendering
analysis.default        # deterministic feature extraction
analysis.llm            # LLM tasks with token/cost controls
curation.default        # PII scans, corpus tasks
exports.default         # PDF/DOCX rendering
maintenance.low         # cleanup, reindex, cohort recompute
```

### Worker classes

| Worker | CPU | Memory | Network | Notes |
|---|---:|---:|---|---|
| Ingestion | medium | medium/high | denied by default | PDF/DOCX parsers, rendering |
| OCR/layout | high | high | denied by default | optional model assets local |
| Analysis | medium | medium | model gateway only | rules, embeddings |
| LLM orchestration | low | low | allowlisted providers | no file-system access beyond sanitized payload |
| Curation | medium | medium | restricted | redaction, cohort aggregation |
| Export | medium | medium | denied | headless Chromium / office conversion |

### Job payload rules

Jobs contain IDs and storage references, never raw document text where avoidable. Workers fetch only authorized objects using service credentials scoped to their queue responsibility.

---

## 17. Observability and operations

### Telemetry model

Every request/job propagates:

```text
trace_id
request_id
user_id_hash
resume_id
analysis_run_id
job_id
analyzer_version
model_route
cohort_version_id
```

### Metrics

- Upload success/failure by file type.
- Parser/OCR fallback rate.
- Time per pipeline stage.
- Queue depth, job age, retry count, DLQ count.
- Finding count by analyzer and severity.
- LLM token/cost/latency/error rate by task/provider.
- Cache hit rate for document IR/artifacts.
- Export failure rate.
- User action feedback (accepted/dismissed/intentional).
- Deletion completion latency.

### Logging rules

- No raw resume text in logs.
- No signed URLs in logs.
- Redact email, phone, address, API keys, access tokens.
- Keep structured events short and refer to IDs.
- Secure debug artifact access behind time-limited internal permissions.

### Runbooks

Create operational runbooks for:

- queue backlog;
- OCR provider failure;
- LLM provider outage;
- malformed PDF crash loop;
- object storage outage;
- Postgres failover/migration rollback;
- suspected PII exposure;
- corpus takedown request;
- model regression;
- unexpected cost spike.

---

## 18. Testing and evaluation

### 18.1 Test pyramid

- Unit tests: geometry utilities, rules, parsers, PII redaction, scoring.
- Contract tests: API schemas, worker payloads, LLM structured outputs.
- Integration tests: upload → parse → analyze → report lifecycle.
- Golden-document tests: fixed PDFs/DOCX with expected normalized structure/findings.
- Visual regression tests: page overlay and report UI screenshots.
- Security tests: authorization, file validation, prompt injection, SSRF.
- Load tests: concurrent upload/analysis workloads.
- Human evaluation: expert review agreement.

### 18.2 Golden corpus

Build a private, permissioned evaluation corpus with:

- one/two-column PDF resumes;
- table-heavy documents;
- scanned PDFs;
- DOCX with clean and messy styles;
- different page sizes and fonts;
- intentional layout defects;
- early-career and experienced resume patterns;
- multilingual future test cases.

Each document gets annotations for:

- section bounds;
- reading order;
- typography and geometry facts;
- expected ATS risks;
- expected high-confidence findings;
- explicitly intentional design variations.

### 18.3 Quality gates

No release if:

- parser crashes on baseline corpus;
- high-severity ATS finding precision regresses past threshold;
- raw text leaks in logs/test snapshots;
- unauthorized cross-user access test passes incorrectly;
- LLM rewrite test produces unsupported claim;
- deletion test leaves known storage/DB artifacts.

### 18.4 Model evaluation

Track separately:

- layout segmentation F1;
- section classification F1;
- reading-order accuracy;
- bullet feature extraction agreement;
- rewrite factual-support rate;
- expert agreement on finding relevance;
- user accept/dismiss calibration.

Do not optimize solely for user acceptance; users may prefer flattering but inaccurate feedback.

---

## 19. CI/CD and developer experience

### CI pipeline

```text
lint + format
  -> type check
  -> unit tests
  -> API contract tests
  -> security/dependency scan
  -> container build
  -> integration tests with ephemeral services
  -> golden-document tests
  -> visual regression tests (protected branch)
  -> deploy preview/staging
```

### Required tooling

- Python: `uv`, Ruff, mypy/pyright, pytest, Pydantic.
- TypeScript: pnpm/npm, ESLint, Prettier, TypeScript strict mode, Playwright.
- DB: SQLAlchemy/SQLModel + Alembic migrations or equivalent.
- Infra: Docker, Compose for local stack, IaC once deployment stabilizes.
- Git hooks: formatting, type checks, secret scanning.

### Environments

| Environment | Purpose | Data policy |
|---|---|---|
| Local | development | synthetic fixtures only |
| Preview | PR verification | synthetic/anonymized fixtures only |
| Staging | integration/performance | consented test set, restricted |
| Production | user traffic | strict tenant isolation |

### Feature flags

Use server-side flags for:

- new layout rule packs;
- new OCR provider;
- layout model rollout;
- cohort insight availability;
- LLM rewrite experiments;
- per-provider routing;
- UI overlays.

---

## 20. Performance and cost strategy

### Cost hierarchy

1. Native PDF/DOCX extraction: cheapest.
2. Rules/statistics: cheap.
3. Embeddings: moderate and cacheable.
4. OCR/layout model: costly; run conditionally.
5. LLM calls: highest variable cost; run on user demand where possible.

### Caching

Cache by content hash and analyzer version:

- normalized IR;
- rendered page images;
- extracted layout features;
- embeddings;
- deterministic findings;
- cohort snapshot stats.

Never reuse cached analysis across different users in a way that leaks ownership or private content.

### Budgets and limits

- File/page limits by plan.
- LLM token budget per analysis and per user/month.
- Timeouts per parser/model/export operation.
- Circuit breaker on provider failure/cost anomalies.
- Request coalescing for duplicate analyze clicks.

---

## 21. Delivery roadmap

### Sprint 0: Technical foundation (1–2 weeks)

- Fork, license notices, upstream tracking.
- Establish monorepo/module layout.
- Implement managed Postgres, object storage, auth, Redis, worker skeleton.
- Define OpenAPI, document IR, analysis-run, and finding schemas.
- Set up CI, secret scanning, basic telemetry.

### Sprint 1: Secure ingestion and normalized document model (2 weeks)

- Upload lifecycle, validation, hashing, object storage.
- PDF extraction, rendering, canonical IR.
- DOCX semantic extraction; PDF conversion proof of concept.
- Analysis jobs, event stream, report stub.
- Golden fixture framework.

### Sprint 2: ATS and geometry analyzer v1 (2 weeks)

- Reading-order comparison.
- Column/table/icon risks.
- Margins, overlap, clipping, font range, alignment, spacing features.
- Rule engine and evidence-linked findings.
- Initial canvas overlay UI.

### Sprint 3: Semantic analyzer v1 (2 weeks)

- Section/entity extraction.
- Bullet anatomy/evidence features.
- Role/JD match using lexical + embeddings.
- Deterministic score breakdown.
- No LLM rewrite required yet.

### Sprint 4: Privacy, curation, and cohort v1 (2 weeks)

- Reference document intake.
- Consent/provenance states, reviewer workflow, audit logging.
- PII scans/redaction workflow.
- Cohort aggregate statistics with minimum sample thresholds.

### Sprint 5: Constrained LLM assistance (2 weeks)

- Model gateway, privacy modes, prompt registry.
- Structured bullet diagnosis and rewrite scaffold.
- Citation/support mapping and unsupported-claim tests.

### Sprint 6+: Hardening and beta

- Load testing, security review, UX performance work.
- Evaluation with career reviewers.
- Feature flags, cost controls, deletion verification.
- Narrow cohort launch.

---

## 22. Engineering staffing plan

### Lean founding team

- CTO/founding engineer: architecture, platform, pipeline, security, technical product.
- Full-stack engineer: frontend report/canvas/editor, API integration.
- Applied ML/document engineer: parsing, layout, NLP evaluation.
- Design/product: report comprehensibility, visual system, research/feedback loops.

### First specialist additions

- Platform/security engineer once production data volume or enterprise requirements increase.
- Data curator/ops reviewer before scaling reference corpus.
- QA/evaluation engineer once analyzer rule/model matrix grows.

---

## 23. Architecture decision records to write immediately

1. **ADR-001:** Modular monolith + worker architecture.
2. **ADR-002:** Postgres over TinyDB for GoldLens production state.
3. **ADR-003:** S3-compatible private object storage for document files.
4. **ADR-004:** Geometry-first PDF analysis with conditional OCR/model enrichment.
5. **ADR-005:** Canonical document IR and versioning contract.
6. **ADR-006:** LLM gateway, privacy modes, and structured-output requirement.
7. **ADR-007:** No automated scraping; corpus consent and curator policy.
8. **ADR-008:** Cohort aggregates over raw exemplar exposure by default.
9. **ADR-009:** RLS/authorization model and deletion guarantees.
10. **ADR-010:** Test corpus governance and evaluation gates.

---

## 24. Initial technical backlog

### P0

- [ ] Postgres schema and migration framework.
- [ ] Private object storage abstraction.
- [ ] Signed-upload and signed-download flow.
- [ ] Upload validation, AV scan interface, quarantine state.
- [ ] Async job framework, retries, DLQ.
- [ ] Canonical document IR contracts.
- [ ] PDF coordinate/text/style extraction.
- [ ] Page rendering pipeline.
- [ ] Analysis-run and finding persistence.
- [ ] Basic access control and audit events.
- [ ] Golden-document test harness.

### P1

- [ ] Deterministic reading-order engine.
- [ ] Layout feature extractor and declarative rules engine.
- [ ] Semantic section parser with source-span retention.
- [ ] Bullet evidence feature extractor.
- [ ] Job-description parser/matcher.
- [ ] Interactive document canvas with issue overlays.
- [ ] Curation queue and consent workflow.
- [ ] Cohort aggregate calculator.

### P2

- [ ] OCR fallback and confidence management.
- [ ] Layout-model enrichment worker.
- [ ] LLM gateway with structured rewrite proposals.
- [ ] Export correction preview.
- [ ] Feedback calibration dashboard.
- [ ] Multi-tenant organization support.

---

## 25. Definition of done

A feature is not “done” until it has:

- Product acceptance criteria.
- API contract and typed client coverage.
- Authorization checks.
- Unit and integration tests.
- Structured telemetry.
- Error states and retries if asynchronous.
- Privacy classification and retention behavior.
- Accessibility review for UI features.
- Documentation or an ADR when architecture changes.
- Rollback/feature-flag path if it affects production analysis quality.

---

## 26. CTO launch checklist

### Before private beta

- [ ] Threat model reviewed.
- [ ] Privacy policy and consent language reviewed by qualified counsel.
- [ ] Raw documents never publicly accessible.
- [ ] Deletion workflow tested end-to-end.
- [ ] Corpus ingestion disabled until curation controls exist.
- [ ] No raw user resume is included in external LLM prompts by default.
- [ ] Golden corpus establishes baseline parser/layout quality.
- [ ] Error monitoring, alerts, and incident response contact path active.
- [ ] Cost guardrails active for LLM and OCR providers.
- [ ] High-severity findings display evidence and confidence.

### Before public launch

- [ ] Penetration/security review completed.
- [ ] RLS/IDOR tests automated.
- [ ] Performance/load test passed at target concurrency.
- [ ] Accessibility audit of report and canvas flows complete.
- [ ] Reference corpus consent/provenance audit complete.
- [ ] Model card and analyzer limitations published.
- [ ] Support/takedown process documented and staffed.

---

## 27. Final technical stance

GoldLens should win through **trustworthy document intelligence**, not maximal automation. The core moat is a versioned multimodal analysis engine—native document geometry, explainable rules, semantic evidence models, safe LLM assistance, and a governed reference corpus.

The implementation should resist two tempting shortcuts:

1. Treating an LLM as the parser, designer, editor, fact-checker, and judge.
2. Treating public social posts as free, reliable training data.

Instead, build a system in which every visual observation is measurable, every semantic recommendation is grounded, every reference pattern is consented and contextualized, and every automated edit remains under the candidate’s control.
