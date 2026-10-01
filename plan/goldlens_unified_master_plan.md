# GoldLens Resume Intelligence
## Unified Master Plan — Product, Technical Architecture, and Team Operating Manual

**Status:** Canonical blueprint  
**Product:** GoldLens — privacy-first multimodal resume intelligence platform  
**Base repository:** Fork of `srbhr/Resume-Matcher`  
**Last updated:** September 30, 2026

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision and Scope](#2-product-vision-and-scope)
3. [Users and Jobs-to-be-Done](#3-users-and-jobs-to-be-done)
4. [Core Product Model](#4-core-product-model)
5. [Feature Requirements](#5-feature-requirements)
6. [Trust, Source Reliability, and Corpus Governance](#6-trust-source-reliability-and-corpus-governance)
7. [UX and Visual Design Specification](#7-ux-and-visual-design-specification)
8. [Scoring System](#8-scoring-system)
9. [Technical Architecture](#9-technical-architecture)
10. [Data Architecture](#10-data-architecture)
11. [Document Ingestion Pipeline](#11-document-ingestion-pipeline)
12. [Layout Analysis Engine](#12-layout-analysis-engine)
13. [Semantic Analysis Engine](#13-semantic-analysis-engine)
14. [LLM Platform Design](#14-llm-platform-design)
15. [Reference Corpus and Continual Intelligence](#15-reference-corpus-and-continual-intelligence)
16. [Security Architecture](#16-security-architecture)
17. [Privacy and Deletion Architecture](#17-privacy-and-deletion-architecture)
18. [API Design](#18-api-design)
19. [Queue and Worker Design](#19-queue-and-worker-design)
20. [Observability and Operations](#20-observability-and-operations)
21. [Testing and Evaluation](#21-testing-and-evaluation)
22. [CI/CD and Developer Experience](#22-cicd-and-developer-experience)
23. [Performance and Cost Strategy](#23-performance-and-cost-strategy)
24. [Delivery Roadmap](#24-delivery-roadmap)
25. [Engineering Staffing Plan](#25-engineering-staffing-plan)
26. [Team Culture and Operating Standards](#26-team-culture-and-operating-standards)
27. [Engineering Lifecycle and Feature Delivery](#27-engineering-lifecycle-and-feature-delivery)
28. [Code Quality and Pull Request Standards](#28-code-quality-and-pull-request-standards)
29. [AI Development Standards](#29-ai-development-standards)
30. [Operational Discipline and Incident Response](#30-operational-discipline-and-incident-response)
31. [Design-Engineering Collaboration and Accessibility](#31-design-engineering-collaboration-and-accessibility)
32. [Data and Corpus Operating Standard](#32-data-and-corpus-operating-standard)
33. [Documentation and Meeting System](#33-documentation-and-meeting-system)
34. [Hiring Bar and Career Growth](#34-hiring-bar-and-career-growth)
35. [Release Checklist and First 90 Days](#35-release-checklist-and-first-90-days)
36. [Operating Mantras and Team Pledge](#36-operating-mantras-and-team-pledge)

---

## Executive Summary

GoldLens is a privacy-first multimodal resume intelligence platform that analyzes resumes as both machine-readable documents and human-scannable visual compositions. The system evaluates content, ATS parseability, visual design, layout geometry, spacing, hierarchy, framing, role-specific evidence, and alignment with consented peer-reference patterns.

**Strategic approach:**

- Fork `srbhr/Resume-Matcher` for its modern Next.js/React frontend, FastAPI/Python backend, multi-LLM support, resume tailoring, templates, and PDF export capabilities.
- Replace TinyDB with Postgres, add encrypted object storage, worker queues, and a versioned analysis data model.
- Implement geometry-first document analysis using native PDF/DOCX metadata before applying OCR or vision models.
- Build a governed reference corpus with explicit consent, curation workflow, and aggregate-only cohort insights.
- Ship a modular monolith with independently scalable CPU document workers and LLM/API orchestration.

**Key differentiators:**

1. Multimodal analysis tying document geometry to actionable UX.
2. Evidence-grounded findings with confidence and severity.
3. Truth-preserving edits with explicit user confirmation.
4. Cohort-based patterns instead of prestige copying.
5. Transparent, inspectable reasoning for every recommendation.

---

## 2. Product Vision and Scope

### Vision

Make high-quality resume feedback as rigorous as a hybrid review from an ATS parser, a hiring manager, a professional editor, and a trusted peer benchmark.

### Product promise

"Know exactly what your resume communicates, what it fails to communicate, and the smallest credible changes that make it clearer."

### Product principles

1. **Explain, do not mystify.** Every score must have visible evidence, confidence, impact, and a proposed remedy.
2. **Optimize for truthful representation.** Never invent employers, projects, metrics, dates, credentials, or skills.
3. **Separate quality from prestige.** A resume from a famous company may be a useful reference, but company name is never evidence of better content.
4. **Privacy by default.** Candidate files and the reference corpus are sensitive documents, not training fuel by default.
5. **Human curation before autonomous influence.** Publicly discovered material enters a review queue; it never automatically changes benchmarks.
6. **Avoid one "perfect" resume.** Guidance should adapt to candidate seniority, geography, role, industry, and career stage.
7. **Offer fixes at the right granularity.** Surface both macro problems (wrong narrative) and micro problems (6 pt gap inconsistency).
8. **ATS-safe and human-readable can coexist.** Use two distinct scores and make trade-offs explicit.

### Goals

- Analyze PDF and DOCX resumes at page, section, block, line, bullet, phrase, and token levels.
- Give transparent scores for ATS safety, content strength, visual hierarchy, layout discipline, job relevance, and benchmark alignment.
- Compare a user resume to a selected, consented reference cohort rather than vague "top MNC resumes."
- Identify layout details: margins, whitespace, alignment, columns, overlap, clipping, typography consistency, heading hierarchy, line density, page balance, and reading order.
- Identify content details: impact framing, evidence, quantification, ownership, scope, credibility, tense, repetition, role relevance, and keyword placement.
- Provide edits that preserve factual truth and explicitly require user confirmation for any changed claim.
- Build a trustworthy human-in-the-loop corpus workflow for public or manually uploaded reference resumes.
- Let users view an ATS extraction preview and a recruiter-scan preview.

### Non-goals for v1

- Predict whether a person will get hired.
- Rank people as intrinsically "better" candidates.
- Claim compatibility with every commercial ATS.
- Automatically scrape LinkedIn, X, or any other platform.
- Use public social profiles as proof of employment without permission.
- Create "fake quantified achievement" bullets.
- Train a foundation model from user-uploaded resumes.
- Recommend discriminatory choices based on age, gender, race, caste, religion, disability, nationality, marital status, or other protected/sensitive attributes.

---

## 3. Users and Jobs-to-be-Done

### Persona A: Student / early-career builder

**Example:** An engineering student applying to internships, new-grad SDE roles, AI/ML roles, and hackathons.

**Primary jobs**

- "Help me show projects as credible engineering work."
- "Tell me why my resume looks weaker than strong peer examples."
- "Make this one page without making it cramped."
- "Tailor this to an AI/ML internship without lying."

**Pain points**

- Thin work history, heavy project dependence, unclear differentiation.
- Dense resumes due to many skills, projects, certifications, and hackathons.
- Uncertainty around whether visual polish or content is holding them back.

### Persona B: Experienced candidate

**Primary jobs**

- "Show business and technical impact at the level expected for this role."
- "Reduce my two-page resume without losing evidence."
- "Tailor my narrative from IC to staff/leadership expectations."

### Persona C: Mentor / career coach

**Primary jobs**

- "Review several resumes consistently and explain feedback efficiently."
- "Use a reference cohort without exposing private candidate information."

### Persona D: Reference corpus curator

**Primary jobs**

- "Add a permissioned exemplar, tag it accurately, remove PII, and control whether it affects product benchmarks."
- "Assess source credibility without confusing public visibility with permission or quality."

---

## 4. Core Product Model

GoldLens produces a **Resume Intelligence Report** with six independent dimensions:

| Dimension | User question | Example outputs |
|---|---|---|
| ATS integrity | "Will systems read this correctly?" | reading order, broken columns, malformed headings, text extraction preview |
| Visual craft | "Does it look deliberate and easy to scan?" | alignment, margins, whitespace rhythm, typography hierarchy, density |
| Narrative & framing | "What story does it tell in the first 15 seconds?" | top-of-page signal, target-role clarity, evidence ordering, role identity |
| Evidence & impact | "Do bullets prove my claims?" | action, scope, method, outcome, credibility, quantification |
| Role fit | "How relevant is this to this specific job?" | hard skills, domain signals, responsibilities, missing evidence |
| Reference alignment | "What patterns do credible peer resumes use?" | cohort distributions, missing patterns, comparable strengths; never copied content |

### Principle: no universal "resume score" alone

A single headline score is useful for progress tracking, but it can mislead. Display a composite only with its components, confidence, and context.

The product must state that reference alignment measures communication patterns within a chosen cohort—not competence, employability, or worth.

---

## 5. Feature Requirements

### 5.1 Upload and document normalization

**Supported inputs**

- PDF: digitally generated PDFs first; scanned PDFs supported with lower confidence and OCR notice.
- DOCX: preserve paragraphs, tables, styles, margins, runs, page breaks, and metadata where available.
- Plain text: supported for content-only analysis; explicitly mark visual analysis unavailable.

**System requirements**

- Virus/malware scan before processing.
- File size and page limits with clear error messages.
- Preserve original as encrypted private object when user elects to retain it.
- Generate a normalized internal format: document metadata, pages, blocks, lines, spans, coordinates, styles, reading order, and semantic sections.
- Render each page to a high-resolution image for visual inspection.

### 5.2 ATS integrity analysis

**Checks**

- Is selectable text available, or is the page image-only?
- Does extracted text follow the visual reading order?
- Are columns interleaved by extraction?
- Are tables used for core content?
- Are headers/footers parsed in unexpected positions?
- Do icons replace meaningful text (phone/email/location)?
- Are section headings recognized consistently?
- Is critical contact data extractable?
- Are special characters, ligatures, hidden layers, or text overlays damaging extraction?

### 5.3 Visual layout analysis

The analyzer must operate on **geometry**, not just text.

#### Page-level measurements

- Page size and orientation.
- Outer margins: top, bottom, left, right.
- Usable-content rectangle.
- Top-heavy / bottom-heavy / balanced distribution.
- Content density per vertical band.
- Orphan/widow conditions.
- Near-overflow and clipped content detection.
- Page-count appropriateness relative to user-selected target.

#### Block-level measurements

- Bounding box, alignment axis, width, height.
- Horizontal and vertical gap to neighboring blocks.
- Overlap/collision risk.
- Indentation and bullet alignment.
- Column membership and gutter width.
- Repeated alignment anchors.
- Heading-to-content proximity.

#### Typography measurements

- Font family, size, weight, italic/underline, color, capitalization.
- Body text size distribution and outliers.
- Header scale and consistency.
- Contrast warning for low-contrast grey / accent text.
- Excessive typeface diversity.
- All-caps overuse.
- Underline/italic overuse.

#### Rhythm measurements

- Line-height consistency.
- Paragraph spacing consistency.
- Section gap consistency.
- Bullet gap consistency.
- Left-edge alignment consistency.
- Baseline consistency where extractable.
- Visual noise from inconsistent separators, bullets, icons, rules, or accent colors.

### 5.4 Narrative and framing analysis

The goal is to infer what the resume *communicates*, while presenting inference as a hypothesis rather than fact.

**Questions to answer**

- In the first screenful, can a recruiter infer target role, level, domain, and strongest proof?
- Is the summary redundant, generic, or evidence-led?
- Is the best evidence in the top half of page 1?
- Are projects appropriately emphasized for an early-career candidate?
- Does a senior candidate foreground scale, ownership, leadership, and outcomes?
- Do section order and visual weight support the chosen goal?
- Is the document framed as "skills list" instead of "proof of capability"?

### 5.5 Evidence and impact analysis

Each bullet is evaluated with a transparent rubric.

#### Bullet anatomy model

```text
[Action] + [What was built/changed] + [How / technical method] + [Scope] + [Outcome] + [Evidence]
```

Not every bullet needs every component. For students and early-career candidates, ownership, technical depth, and demo/deployment evidence can be valid substitutes when business metrics are unavailable.

#### Bullet signals

- Strong action verb.
- Clear object of action.
- Ownership vs vague participation.
- Technical method or decision.
- Scope: users, team, system, dataset, requests, timeline, module, scale.
- Outcome: performance, quality, cost, speed, reliability, adoption, learning outcome.
- Quantification quality: relevant numbers with context, not decorative metrics.
- Credibility risk: extraordinary claims, ambiguous metrics, repeated identical percentages.
- Redundancy with adjacent bullets.
- Role relevance.
- Grammar, tense, parallelism, and verbosity.

### 5.6 Job-description match

**Inputs**

- Pasted job description.
- Optional role title, location, and job level.
- User's target constraints: one page/two pages, role family, visa/location constraints if voluntarily supplied.

**Analysis layers**

- Lexical match: exact keywords, tools, technologies.
- Semantic match: equivalent concepts and related responsibilities.
- Evidence match: whether claimed requirements are demonstrated in project/work bullets.
- Placement: whether high-priority evidence appears early enough.
- Gap classification:
  - Already present but buried.
  - Present but weakly evidenced.
  - Absent but plausibly addable if true.
  - Absent and should not be claimed.

### 5.7 Reference cohort intelligence

#### Cohort model

A cohort is a versioned, permissioned collection described by:

```text
Role family: Software engineering
Seniority: Intern / new graduate / 0–2 years
Geography: India (optional)
Company type: Product companies (not a prestige ranking)
Document vintage: 2024–2026
Language: English
Minimum trust threshold: 0.80
Minimum formatting quality threshold: 0.70
Minimum curator approvals: 1 or 2
```

#### What users can compare

- Section order frequencies.
- Top-of-page content patterns.
- Median project count and project evidence density.
- Skill presentation patterns.
- Quantification and scope-evidence distributions.
- Visual density range, margin range, heading scale range, and single vs multi-column frequency.
- Common role-relevant skill clusters.

#### What users must not see by default

- Other people's raw resumes.
- Identifying contact information.
- Individual-company or individual-person "rankings."
- Exact wording that encourages copying.

---

## 6. Trust, Source Reliability, and Corpus Governance

### Key distinction

**Publicly visible is not the same as reliable, permissioned, representative, or safe to train on.**

### Ingestion policy

No automated scraping. Discovery can be supported only via:

- Official APIs or explicit permissions.
- User-submitted source URLs.
- Curator-uploaded documents.
- Websites that explicitly permit access and reuse under terms compatible with the product.
- Author-provided submission forms.

Every discovered item enters a **pending state** and cannot influence user recommendations until approved.

### Reference evidence ladder

| Tier | Source situation | Product handling |
|---|---|---|
| Tier 0 | Unknown origin, reposted image, unverifiable claims | Reject; do not store beyond minimal review log |
| Tier 1 | Publicly shared document but no reuse permission | Do not ingest into corpus; optionally save a link only if policy permits |
| Tier 2 | Public document with clear author permission | Curator review, PII minimization, eligible for pattern statistics |
| Tier 3 | Direct author contribution with consent | Eligible for approved statistics and optionally anonymized examples |
| Tier 4 | Verified partner / career-community contribution | Eligible after curator QA; still not treated as automatically "ideal" |

### Trust score: source credibility, not resume quality

Use a 0–100 score with components:

```text
Consent clarity                 30 points
Source provenance               20 points
Identity / role verification    15 points
Document-to-claim consistency   15 points
Metadata completeness           10 points
Independent curator review      10 points
```

**Hard rule:** Company prestige, follower count, virality, or blue-check status contribute **zero** points.

### Reliability signals

- Explicit author authorization for analysis/reuse.
- Original source rather than a repost.
- Document date and author-supplied role context.
- Public portfolio/GitHub/website consistency where the author supplied links.
- Internal consistency: dates, titles, graduation timeline, skills and bullets.
- Curator annotations and audit history.

### Red flags

- "Guaranteed FAANG template" reposts without author attribution.
- Resume screenshots with no provenance.
- Implausible, unverifiable claims or mismatched timelines.
- Exposed personal contact data of someone who did not submit it.
- Copyrighted/paid resume packs or data-broker datasets.
- Manipulated images or duplicate documents.

### Human review protocol

1. Verify origin and permission.
2. Verify minimum metadata.
3. Check for PII and redact/remove unnecessary information.
4. Evaluate internal consistency; label uncertainty instead of pretending verification.
5. Tag role, level, year, language, geography, and document style.
6. Review quality for analysis value; do not use popularity as proxy.
7. Approve, reject, or hold.
8. Record decision, curator, timestamp, and rationale.

### Corpus safety controls

- Raw reference files encrypted at rest.
- PII redaction before any cohort statistic generation.
- Separate data access roles: user, analyst, curator, admin.
- Immutable audit records for ingest, review, consent, status transitions, and deletion.
- Author/copyright removal workflow with SLA target.
- Cohort versioning: analyses identify the cohort version used.
- Opt-in only for any model training; default is analysis-only storage.

---

## 7. UX and Visual Design Specification

### Design tone

Calm, editorial, rigorous, and non-judgmental. The product should feel like a sophisticated design review, not an exam dashboard.

### Design system principles

- One primary action per screen.
- Use severity sparingly; reserve red for data-loss/ATS-breaking issues.
- Avoid gamification language such as "beat other candidates."
- Use evidence snippets and visual pins, not generic cards full of advice.
- Let users switch modes: **Fast Review**, **Deep Review**, **ATS Lens**, **Design Lens**, **Target Role Lens**.
- Always preserve user agency: accept, dismiss, mark intentional, edit manually.

### Main dashboard

**Header**

- Resume title, target role, last analysis time, privacy state.
- Actions: Reanalyze, Compare to Job, Export, Delete.

**Top panel**

- Readiness score and confidence.
- "Your three highest-impact changes."
- A short framing statement: "Your document currently reads as a project-heavy early-career backend profile; strongest proof is not visible until mid-page."

**Score grid**

- Six independent dimensions with plain-language labels.
- No single color-only communication; icon and label always accompany colors.

**Next steps**

- Fix ATS risk.
- Improve first-15-second framing.
- Strengthen weak bullets.
- Review layout consistency.

### Visual & Layout canvas

**Layout**

- Left: page thumbnails.
- Center: interactive rendered resume canvas.
- Right: issue inspector.
- Top controls: visual overlays, filter by severity, page zoom, compare before/after.

**Overlay modes**

- Margins and content boundary.
- Alignment anchors.
- Whitespace heatmap.
- Reading order arrows.
- Text density heatmap.
- Hierarchy labels.
- ATS risk blocks.

### Recruiter scan simulation

A 15-second mode shows the visual path likely available to a human reviewer:

1. Name and target signal.
2. First prominent role/project.
3. Evidence-rich bullets.
4. Skills and keywords.
5. Education / credentials.

This is a heuristic visualization, not eye-tracking truth. Label it accordingly.

### Editing experience

- Side-by-side original and proposed text.
- Every AI proposal is a tracked change.
- "Evidence required" state for any new metric or claim.
- Style lock controls for typography, margins, spacing, and template.
- Re-run analysis only on changed sections when possible.

---

## 8. Scoring System

### Score philosophy

Scores are diagnostic estimates, not objective measures of candidate quality. Avoid false precision by rounding and exposing confidence.

### Composite score

For a selected context:

\[
R = w_a A + w_v V + w_n N + w_e E + w_j J + w_c C
\]

Where:

- \(A\) = ATS integrity
- \(V\) = visual craft
- \(N\) = narrative and framing
- \(E\) = evidence and impact
- \(J\) = job relevance
- \(C\) = cohort-pattern alignment

Weights vary by use case. Without a job description, set \(J\) to "not scored" rather than quietly substituting another value.

### Severity model

| Severity | Meaning | Example |
|---|---|---|
| Blocker | Likely damages parsing or makes content inaccessible | text layers reversed, content clipped |
| High | Materially weakens clarity or role fit | strongest project buried, no target-role proof |
| Medium | Noticeable quality issue | inconsistent section spacing |
| Low | Polish issue | one date column misaligned by a few pixels |
| Informational | Contextual observation | two-page layout is acceptable for this level |

### Confidence model

Confidence depends on source quality and detection robustness:

- High: direct geometric evidence or exact document style metadata.
- Medium: several corroborating signals.
- Low: OCR-dependent or inference-heavy observation.

A low-confidence issue must say what makes it uncertain.

---

## 9. Technical Architecture

### Starting codebase

Fork `srbhr/Resume-Matcher` for its existing master-resume, tailoring, editing, template, PDF export, and FastAPI/Next.js foundations. The fork already describes PDF/DOCX upload to structured resume data, LLM-based tailoring, a rich editor, templates, formatting controls, and browser-rendered PDF export.

### Target stack

| Layer | Recommendation |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind, component library, PDF/image canvas viewer |
| API | FastAPI, Pydantic, async job orchestration |
| Primary DB | Postgres (Supabase or Neon) |
| Vector retrieval | pgvector initially; dedicated vector store only if needed |
| Object storage | S3-compatible private bucket / Supabase Storage |
| Queue | Redis + Celery/RQ/Arq, or managed queue |
| Document parsing | PyMuPDF/pdfplumber/pdfminer for PDFs; python-docx for DOCX; OCR fallback |
| Layout extraction | PDF coordinates first; LayoutLMv3/DocLayNet-style detector only where needed |
| NLP | spaCy/rules + embedding model + LLM with structured output |
| Observability | OpenTelemetry, structured logs, Sentry, metrics dashboard |

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

### Processing pipeline

```text
Upload
  -> malware scan
  -> encrypted object storage
  -> document type detector
  -> PDF/DOCX parser
  -> OCR fallback if required
  -> page renderer
  -> layout block extraction
  -> reading-order inference
  -> typography/geometry feature extraction
  -> semantic resume parser
  -> content and ATS analyzers
  -> optional JD matcher
  -> optional cohort comparator
  -> findings aggregator
  -> report persistence
  -> UI notification
```

---

## 10. Data Architecture

### Storage classification

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

### Canonical Document IR

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

### Versioning strategy

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

## 11. Document Ingestion Pipeline

### State machine

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

### Upload validation

1. Validate MIME type using file signature, not filename only.
2. Enforce allowlist: PDF and DOCX in MVP.
3. Enforce configurable file/page/size limits.
4. Antivirus/malware scan.
5. Reject encrypted/password-protected files with instructions to upload an unlocked copy.
6. Generate SHA-256 for deduplication and integrity.
7. Assign a correlation ID and immutable upload ID.
8. Store object with no public ACL.

### PDF pipeline

1. Use PyMuPDF/MuPDF or equivalent to obtain pages, text spans, vector/annotation metadata, blocks, fonts, and coordinates.
2. Use `pdfplumber`/`pdfminer` as fallbacks or comparison extractors for parser robustness.
3. Detect scan likelihood using text coverage, image area, embedded fonts, and extraction entropy.
4. Render page at 150–200 DPI for UI; optionally 300 DPI for OCR/layout model.
5. Identify text lines, blocks, bullet markers, tables, separators, icons, and image regions.
6. Normalize coordinates to a documented top-left origin.
7. Infer reading order using a deterministic graph before invoking a model.

### DOCX pipeline

1. Extract paragraphs, runs, styles, tables, headers, footers, margins, sections, page breaks, and numbering via `python-docx` plus XML inspection where needed.
2. Convert to PDF in a sandboxed headless office/Chromium pipeline for rendered-layout analysis.
3. Retain original semantic style information as higher-confidence style evidence than PDF inference.
4. Handle unsupported Office features by producing an explicit "visual measurement estimated" notice.

### OCR pipeline

Use only when digital text coverage is insufficient:

- OCR engine: PaddleOCR/Tesseract/cloud OCR depending on privacy tier.
- Maintain per-token confidence and bounding boxes.
- Do not give high-confidence typography/spacing conclusions from low-quality OCR.
- Distinguish OCR-derived findings visually in the UI.

### Idempotency and retries

- Jobs use deterministic idempotency keys: `sha256 + parser_version + pipeline_stage`.
- Retry transient provider/network failures with exponential backoff.
- Cap retries and route terminal failures to dead-letter queue.
- Preserve partial artifacts for debugging only under strict access controls.

---

## 12. Layout Analysis Engine

### Architecture

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

### Geometry features

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

### Deterministic reading-order algorithm

1. Partition blocks into columns using x-coordinate clustering and whitespace gutters.
2. Detect full-width blocks (e.g., name header, section headers) separately.
3. Build precedence edges using vertical ordering within columns.
4. Add constraints for heading → subsequent content, title → date pairs, and bullet grouping.
5. Detect ambiguous cases: overlapping columns, tables, floating sidebars, visual separators.
6. Compare inferred visual order with text extraction order from at least two parsers.
7. Raise ATS risk when order disagreement exceeds threshold.

### Optional ML enrichment

Use LayoutLMv3/DocLayNet-like models only for ambiguous pages, scanned documents, icons, tables, unusual templates, and section segmentation weaknesses. Model output must be treated as an enriched signal, not a replacement for exact PDF geometry.

### Rules engine design

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

### Layout scoring philosophy

No isolated heuristic can determine good design. Combine:

- Hard failures: overlap, clipping, unreadable text, parser breakage.
- Consistency: deviation across repeated structures.
- Context: candidate level, page target, resume type, intentional visual system.
- User intent: a dismissed/intentional finding should lower recurrence sensitivity.
- Cohort distribution: used as a soft contextual signal, never a mandatory template.

---

## 13. Semantic Analysis Engine

### Resume schema extraction

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

### Bullet analyzer

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

### Claim safety

- Any rewrite must be traceable to source language or use explicit user-fill placeholders.
- Metrics without a nearby object/context are tagged as weak quantification, not automatically praised.
- Outlier claims trigger "verify before using" instead of accusations.
- The system must not infer employer, role, seniority, graduation year, or identity from weak signals.

### JD matching

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

## 14. LLM Platform Design

### Model gateway responsibilities

- Provider abstraction (via LiteLLM or equivalent).
- Model allowlist by task and privacy tier.
- Per-user/provider key handling if users bring their own keys.
- Prompt template registry and versioning.
- PII minimization/redaction before external calls where possible.
- JSON schema enforcement and retry-on-invalid-output.
- Token, latency, cost, and error instrumentation.
- Circuit breakers, rate limits, and fallback models.

### LLM task allocation

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

### Prompt contract example

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

### Data handling modes

- **Local mode:** Ollama/self-hosted model; user text stays in environment under configured policy.
- **Cloud private mode:** send minimized text to approved provider under DPA/enterprise controls.
- **BYOK mode:** user chooses provider/key; clearly disclose data flow.
- **No-LLM mode:** deterministic analysis remains fully usable.

---

## 15. Reference Corpus and Continual Intelligence

### Corpus architecture

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

### Consent and provenance states

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

### No autonomous web ingestion policy

The product may support a **discovery inbox** only where an official API, explicit source permission, and a documented legal basis exist. Discovery creates a candidate record, not a corpus record. A human curator must verify provenance/consent before download, storage, or use.

### Trust scoring

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

### Cohort statistics

Store only aggregate distributions needed for recommendations:

- section ordering frequencies;
- count distributions (projects, bullets, sections);
- visual feature quantiles (margins, density, header scale);
- evidence pattern distributions (quantification, scope, action patterns);
- role-skill clusters;
- confidence/sample-size metadata.

Apply k-anonymity-style thresholds: do not expose cohort-derived metrics below a minimum number of approved documents. Display sample count range and confidence rather than implying universal norms.

### Continual learning plan

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

**Never:** silently fine-tune a general-purpose model on users' documents.

---

## 16. Security Architecture

### Threat model

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

### Authentication and authorization

- Use managed auth initially (Supabase Auth, Clerk, Auth.js, etc.) with verified email.
- APIs validate JWT/session server-side.
- Enforce ownership in application layer and Postgres RLS where appropriate.
- Roles: `user`, `curator`, `reviewer`, `admin`, `service_worker`.
- Curator/admin actions require step-up authentication and audit logging.
- Never expose reference raw document IDs in public APIs.

### Object-storage controls

- Separate buckets/prefixes: `user-originals`, `user-renders`, `reference-restricted`, `quarantine`, `exports`.
- No public bucket ACLs.
- Short-lived signed URLs generated after authorization.
- Object keys non-enumerable and tenant-scoped.
- Lifecycle rules for quarantine, temporary renders, and deleted data.

### Parser sandboxing

- Run ingestion workers in isolated containers with non-root user.
- No outbound network by default.
- CPU/memory/time limits per file.
- Read-only filesystem except temporary work directory.
- Archive-bomb, decompression, recursion, and page-count controls.
- Keep parsers patched; monitor CVEs.

### Prompt-injection defense

Treat resume text, JD text, and web content as untrusted data:

- Delimit untrusted text in prompts.
- Do not allow document content to set system behavior.
- Require structured outputs validated against schemas.
- Reject unexpected tool instructions in document content.
- Never allow LLM output to trigger file/network actions without server-side policy.

---

## 17. Privacy and Deletion Architecture

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

## 18. API Design

### API conventions

- REST + OpenAPI for core resources.
- Async jobs return `202 Accepted` and a job resource.
- Server-sent events for progress; polling fallback.
- Resource IDs use opaque ULIDs/UUIDv7.
- Idempotency keys required for create/upload/export operations.
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

## 19. Queue and Worker Design

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

## 20. Observability and Operations

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

## 21. Testing and Evaluation

### Test pyramid

| Test type | Purpose | Examples |
|---|---|---|
| Unit | deterministic domain behavior | margin calculation, bullet scoring, consent state transition |
| Integration | components work together | upload → parse → analyze → report |
| Contract | API/job payload stability | OpenAPI, Pydantic schemas, event contracts |
| Golden document | document analysis regression | known PDF produces expected blocks/findings |
| Visual regression | UI/canvas stability | report card, overlay alignment, responsive layout |
| End-to-end | user workflow confidence | upload, analyze, act on finding, export |
| Security | access-control and abuse defense | IDOR, SSRF, malicious file, prompt injection |
| Load/soak | capacity and resilience | concurrent uploads/jobs, queue backlogs |
| Human evaluation | usefulness and correctness | expert review agreement |

### Golden-document test suite

The most valuable asset for GoldLens quality is a carefully governed fixture corpus. It should contain only synthetic, personally owned, or explicitly consented documents.

Coverage must include:

- Clean single-column resumes.
- Two-column resumes with correct and broken extraction order.
- Dense resumes and sparse resumes.
- PDFs with embedded fonts and PDFs that are scans.
- DOCX styles, tables, headers, icons, hyperlinks, and page breaks.
- Intentionally inconsistent spacing/alignment.
- Clipped content and near-page-edge content.
- Student, new-grad, experienced IC, research, product, design, and ML-focused structures.
- Different paper sizes and typography systems.

### Quality expectations for AI features

Every AI-assisted feature needs:

- Test prompts/fixtures.
- Structured output schema.
- Positive and adversarial cases.
- Unsupported-claim red-team tests.
- Evaluation rubric.
- Version identifier.
- Rollback mechanism.

### Model evaluation

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

## 22. CI/CD and Developer Experience

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

## 23. Performance and Cost Strategy

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

## 24. Delivery Roadmap

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

## 25. Engineering Staffing Plan

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

## 26. Team Culture and Operating Standards

### Core behaviors

- **Be direct, not dismissive.** Say what is wrong, why it matters, and what you recommend.
- **Disagree with evidence.** Bring traces, screenshots, metrics, test cases, product principles, and user context.
- **Assume good intent.** Debate ideas rigorously; do not make disagreement personal.
- **Own the whole experience.** A frontend engineer notices broken API states; a backend engineer notices confusing UX; everyone cares about user impact.
- **Prefer durable clarity over impressive complexity.** A simple, well-tested geometry rule is often better than a vague "AI vision" pipeline.
- **Treat privacy and security as product quality.** A clever feature that leaks documents is not a feature.
- **Write down decisions.** Decisions that only live in chat are fragile.
- **Teach continuously.** The best teams multiply capability rather than becoming bottlenecks.

### What we do not tolerate

- Shipping ungrounded LLM recommendations.
- Treating "publicly visible" resumes as permission to collect or train on them.
- Merging code without tests because "it works locally."
- Hiding uncertainty in a single confident score.
- Using prestige, college, company names, follower counts, or demographic proxies as candidate-quality signals.
- Logging raw user resume text, access tokens, or signed URLs.
- Dismissing accessibility, performance, error states, or mobile behavior as "later."
- Creating large rewrites without source traceability.

---

## 27. Engineering Lifecycle and Feature Delivery

### Discovery before implementation

Every meaningful feature starts with a short discovery brief. It does not need to be bureaucratic, but it must answer:

- What user problem is being solved?
- Which user segment and workflow are affected?
- What does success look like?
- What could go wrong?
- What data is required and where does it come from?
- Is the feature deterministic, ML-assisted, LLM-assisted, or all three?
- What privacy/security implications exist?
- How will quality be measured before and after release?
- What is the simplest viable implementation?

### RFC threshold

Write an RFC when a change:

- Creates or changes a persistent data model.
- Adds a third-party AI, OCR, analytics, or storage provider.
- Sends user content externally.
- Affects authorization, privacy, deletion, or billing.
- Changes the canonical Document IR.
- Introduces a new model or changes scoring logic materially.
- Requires a migration or cannot be trivially rolled back.
- Adds a new worker, queue, service, or major dependency.

### Definition of ready

A story is ready when:

- Outcome and user are clear.
- Acceptance criteria exist.
- Designs cover primary, empty, loading, error, and permission-denied states.
- Data classification and privacy implications are known.
- Dependencies and unknowns are visible.
- The team knows how success will be measured.

### Definition of done

A story is done only when:

- The expected user behavior works in a production-like environment.
- Tests cover meaningful paths and failures.
- Observability exists.
- Authorization and input validation are implemented.
- Accessibility has been checked.
- Documentation/runbook changes are complete where needed.
- Feature flag/rollback path exists for meaningful-risk features.
- The product owner verifies acceptance criteria.

---

## 28. Code Quality and Pull Request Standards

### General principles

- Optimize for readability and change safety.
- Use explicit names for domain concepts.
- Keep functions small enough that their intent is obvious.
- Separate pure domain logic from I/O and framework glue.
- Avoid premature abstraction; extract only after genuine repetition or a stable concept emerges.
- Prefer typed contracts over unstructured dictionaries.
- Use comments to explain non-obvious constraints and trade-offs, not to narrate obvious code.

### PR size and intent

A PR should generally do one coherent thing. Huge PRs are difficult to review, hard to rollback, and often conceal quality issues.

### PR checklist

```text
[ ] Product behavior and acceptance criteria are met.
[ ] Tests cover success and failure paths.
[ ] New API contracts are typed and documented.
[ ] Inputs are validated and authorization is enforced.
[ ] No PII/secrets are logged.
[ ] Error messages are actionable but safe.
[ ] Metrics/tracing are added where required.
[ ] Migration is safe and tested, if relevant.
[ ] Feature is behind a flag if risk or uncertainty is material.
[ ] Accessibility and responsive behavior were checked.
[ ] Screenshots/video attached for visual changes.
[ ] Documentation/ADR/runbook updated when needed.
```

### Review expectations

Reviewers should assess:

- Correctness and edge cases.
- Product behavior, not just code style.
- Data lifecycle and privacy.
- Security/authorization boundaries.
- Test adequacy.
- Performance and operational impact.
- Naming, maintainability, and architectural fit.
- Accessibility and UX quality for user-facing changes.

---

## 29. AI Development Standards

### Deterministic-first implementation

Before adding an LLM, ask:

- Can PDF/DOCX metadata answer this exactly?
- Can a rule or classifier solve this reliably?
- Is an LLM required for explanation rather than detection?
- What is the failure mode if the model is wrong?

Use LLMs when they add genuine semantic value. Do not use them as a substitute for basic document engineering.

### Grounding requirements

Any user-visible LLM result must be grounded in a constrained source set:

- Resume text selected for the task.
- Parsed features and findings.
- User-supplied job description.
- Approved aggregate cohort statistics.

The model must not receive raw reference documents unless the data policy explicitly permits it.

### Rewrite contract

A rewrite proposal must:

- Preserve meaning.
- Not add metrics, outcomes, skills, employers, titles, scope, or credentials without evidence.
- Use explicit placeholders when facts are missing.
- Link each claim to a source phrase or user confirmation requirement.
- Be presented as a suggestion, never silently applied.

### Prompt hygiene

- Prompts are versioned assets, not random strings in code.
- Untrusted content is clearly delimited.
- System instructions explicitly override document content.
- Responses are schema-validated.
- Prompt and response logging is minimized/redacted.
- Prompt changes require evaluation before rollout.

---

## 30. Operational Discipline and Incident Response

### Production ownership

The feature DRI owns:

- Dashboards and alerts.
- Error budget impact.
- Initial on-call response for feature-specific failures.
- Post-launch quality sampling.
- Follow-up fixes or feature rollback.

### Incident severity

| Severity | Example | Response expectation |
|---|---|---|
| SEV-1 | confirmed unauthorized resume/reference data exposure | immediate incident command, stop exposure, notify leadership/legal/security |
| SEV-2 | uploads broadly fail; analysis unavailable for most users | active response, mitigation same day |
| SEV-3 | a feature produces incorrect findings for a subset | flag off or fix quickly; document impact |
| SEV-4 | minor UI defect or low-impact degradation | prioritize in normal planning |

### Blameless incident review

An incident review asks:

- What happened?
- What impact occurred?
- Which controls worked?
- Which assumptions failed?
- How do we prevent recurrence?
- Which owners and dates are assigned to follow-up actions?

It does not ask, "Who should be blamed?" Accountability means fixing the system, documentation, tests, and decision process.

---

## 31. Design-Engineering Collaboration and Accessibility

### The analysis report is a product surface, not a data dump

Engineering and design jointly own:

- Information hierarchy.
- Finding prioritization.
- Severity vocabulary.
- Confidence communication.
- Evidence visualization.
- Loading/progress behavior.
- Empty and error states.
- Accessibility.

### Accessibility standard

GoldLens must be usable without precise mouse input, color perception, or perfect vision.

Required baseline:

- Keyboard navigation for all report, canvas, dialog, and editor interactions.
- Visible focus indicators.
- Semantic headings and landmarks.
- No color-only severity communication.
- Sufficient contrast.
- Screen-reader labels for issue pins and chart summaries.
- Reduced-motion support.
- Zoom/reflow support.
- Clear errors and form validation.

The document canvas may be visually complex, but every finding must also be accessible in a structured list view.

---

## 32. Data and Corpus Operating Standard

### Reference data is not a growth hack

The team will not scrape, bulk-copy, or quietly train on resumes from social platforms. The reference corpus is a high-trust dataset and must be built slowly.

### Curator workflow requirements

Every reference document has:

- Source/provenance record.
- Permission/consent basis.
- Author and document context only where justified.
- PII status.
- Trust score rationale.
- Curation decision.
- Reviewer identity and timestamp.
- Removal path.
- Cohort eligibility state.

### Aggregation-first insight

Default user-facing cohort insights should be statistical and de-identified. Raw examples require a higher consent tier and must never expose private personal data.

---

## 33. Documentation and Meeting System

### Documents we maintain

| Document | Purpose | Owner |
|---|---|---|
| PRD | product intent and requirements | product/design + engineering |
| Technical master plan | system architecture and constraints | CTO |
| ADRs | durable technical decisions | relevant DRI |
| API reference | contracts and examples | backend owner |
| Data dictionary | schema, ownership, retention | data/platform owner |
| Model cards | model purpose, evaluation, limitations | applied ML owner |
| Runbooks | operating and incident response | service DRI |
| Threat model | security risks and controls | CTO/security owner |
| Evaluation report | quality evidence and regressions | QA/ML owner |
| Curation handbook | corpus intake and review | corpus owner |

### Meeting system

**Weekly product-engineering review (45 minutes)**

- What changed for users?
- Which quality metrics moved?
- Top user feedback and support signals.
- Cross-functional blockers.
- Decisions needed this week.

**Weekly technical review (45–60 minutes)**

- Architecture changes/RFCs.
- Reliability and cost dashboard.
- Security/privacy changes.
- Analysis quality regressions.
- Upcoming risky launches.

**Daily async update**

Each engineer posts:

```text
Yesterday: shipped/learned
Today: intended outcome
Blocked by: specific decision/dependency
Risk: quality/security/performance concern if any
```

---

## 34. Hiring Bar and Career Growth

### What we look for

- Strong fundamentals in their discipline.
- Product judgment and empathy for users.
- Evidence of shipping and owning work in production.
- Clear written communication.
- Curiosity and willingness to challenge assumptions.
- Respect for privacy, security, and quality.
- Ability to simplify complex systems.
- Collaborative behavior under disagreement.

### Senior engineer expectations

- Delivers ambiguous projects end-to-end.
- Improves system quality beyond assigned tickets.
- Writes useful RFCs and reviews.
- Coaches others through technical decisions.
- Anticipates operational and privacy risks.

### Staff-level expectations

- Creates leverage across domains.
- Resolves architectural ambiguity.
- Establishes engineering standards and reusable systems.
- Connects technical decisions to product strategy.
- Raises the quality bar through mentorship and decision-making.

---

## 35. Release Checklist and First 90 Days

### Release checklist

**Product readiness**

```text
[ ] User problem and success metric are clear.
[ ] Primary, empty, loading, and failure states are complete.
[ ] Copy explains confidence and limitations.
[ ] Findings are evidence-linked.
[ ] No claim implies guaranteed hiring outcome.
```

**Technical readiness**

```text
[ ] Feature flag and rollback plan exist if risk is material.
[ ] Tests and regression fixtures pass.
[ ] API and database migrations are deployed safely.
[ ] Observability dashboard and alerts exist.
[ ] Performance budget is met.
[ ] Error handling is user-safe and developer-actionable.
```

**Security and privacy readiness**

```text
[ ] Authorization paths tested.
[ ] Inputs validated.
[ ] No raw PII in logs/analytics.
[ ] External data sharing has explicit privacy path.
[ ] Retention/deletion behavior is defined.
[ ] Threat model reviewed where applicable.
```

**AI readiness**

```text
[ ] Prompt/model/rule versions recorded.
[ ] Structured output validation enabled.
[ ] Groundedness tests pass.
[ ] Unsupported claim behavior is safe.
[ ] Cost/rate limits set.
[ ] User can decline/dismiss AI suggestion.
```

### First 90-day execution plan

**Days 1–30: build the trustworthy core**

- Establish repository structure, coding standards, CI, environments, and ownership map.
- Migrate persistence to Postgres and private object storage.
- Build secure PDF/DOCX upload pipeline and canonical Document IR.
- Create initial golden-document fixtures and analysis harness.
- Ship basic analysis report shell with meaningful loading/error states.
- Establish threat model and deletion policy before storing real user documents.

**Days 31–60: prove the analysis advantage**

- Implement ATS extraction preview and deterministic reading-order diagnostics.
- Implement geometry-based checks: margin, clipping, spacing, alignment, type hierarchy.
- Implement semantic sections, bullet evidence features, and job-description match.
- Build evidence-linked report cards and visual canvas overlays.
- Conduct internal dogfood with a curated set of safe resumes.

**Days 61–90: add governed intelligence**

- Ship curator intake, consent/provenance states, audit records, and removal workflow.
- Build first narrow cohort with aggregate-only insights.
- Add constrained LLM rewrite scaffolds with support mapping.
- Run expert-review evaluation and tune rules based on false positives.
- Prepare private beta readiness review with reliability, privacy, cost, and UX metrics.

---

## 36. Operating Mantras and Team Pledge

### Operating mantras

- **A finding without evidence is an opinion.**
- **A rewrite without support is a hallucination risk.**
- **A public document is not automatically reusable data.**
- **A score is a summary, not a verdict.**
- **A resume is a person's story; treat it with care.**
- **If we cannot explain a system, we do not yet control it.**
- **If a feature cannot be evaluated, it is an experiment—not intelligence.**
- **Fast is valuable only when safe, understandable, and reversible.**
- **Taste is implemented through details.**
- **The user should always remain the author of their own resume.**

### Team pledge

We will build GoldLens with the standard expected of a team whose work may influence how people represent their careers.

We will be ambitious about intelligence and conservative about truth. We will obsess over details—from a one-pixel alignment error to a flawed data-consent pathway—because both can damage trust. We will write systems that are inspectable, secure, resilient, and humane. We will measure quality, listen to users, learn quickly, and never sacrifice long-term credibility for a flashy demo.

That is how GoldLens becomes not merely feature-rich, but genuinely exceptional.
