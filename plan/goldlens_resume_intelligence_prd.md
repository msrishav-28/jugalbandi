# GoldLens Resume Intelligence
## Product Requirements Document, UX Specification, and Technical Design

**Status:** Product blueprint  
**Product type:** Privacy-first, multimodal resume intelligence platform  
**Starting point:** Fork and substantially extend `srbhr/Resume-Matcher`  
**Primary users:** Students, early-career professionals, career switchers, experienced candidates, and career mentors  
**Document owner:** Product + Design  
**Last updated:** September 30, 2026

---

## 1. Product in one sentence

GoldLens helps a candidate understand, improve, and tailor a resume by analyzing **content, ATS parseability, visual design, layout geometry, spacing, hierarchy, framing, and role-specific evidence**—then compares it against a consented, curated reference library rather than making opaque generic recommendations.

---

## 2. Product vision

### Vision

Make high-quality resume feedback as rigorous as a hybrid review from:

- An ATS parser that sees extraction and reading-order problems.
- A hiring manager who looks for role-relevant evidence and credible impact.
- A professional editor who notices hierarchy, whitespace, pacing, framing, and scannability.
- A trusted peer benchmark that reveals what strong resumes in a target role commonly communicate.

### Product promise

**“Know exactly what your resume communicates, what it fails to communicate, and the smallest credible changes that make it clearer.”**

### Product principles

1. **Explain, do not mystify.** Every score must have visible evidence, confidence, impact, and a proposed remedy.
2. **Optimize for truthful representation.** Never invent employers, projects, metrics, dates, credentials, or skills.
3. **Separate quality from prestige.** A resume from a famous company may be a useful reference, but company name is never evidence of better content.
4. **Privacy by default.** Candidate files and the reference corpus are sensitive documents, not training fuel by default.
5. **Human curation before autonomous influence.** Publicly discovered material enters a review queue; it never automatically changes benchmarks.
6. **Avoid one “perfect” resume.** Guidance should adapt to candidate seniority, geography, role, industry, and career stage.
7. **Offer fixes at the right granularity.** Surface both macro problems (wrong narrative) and micro problems (6 pt gap inconsistency).
8. **ATS-safe and human-readable can coexist.** Use two distinct scores and make trade-offs explicit.

---

## 3. Problem statement

Candidates often receive resume advice that is generic, contradictory, or overly focused on keywords. Existing ATS matchers typically answer “does this contain the job-description language?” but fail to diagnose:

- Whether the document can be scanned in 15 seconds by a recruiter.
- Whether visual hierarchy tells a coherent career story.
- Whether skills are framed as evidence or dumped as a keyword list.
- Whether headings, columns, icons, tables, margins, and reading order survive parsing.
- Whether accomplishments sound credible, specific, and appropriately scoped.
- Whether dense, sparse, uneven, or unbalanced layout weakens perceived clarity.
- Whether a candidate’s resume resembles the *communication patterns* of credible reference resumes for a target role without copying them.

GoldLens solves this using a **multimodal review system**: document structure + visual geometry + content semantics + job fit + curated benchmark distributions.

---

## 4. Goals and non-goals

### Goals

- Analyze PDF and DOCX resumes at page, section, block, line, bullet, phrase, and token levels.
- Give transparent scores for ATS safety, content strength, visual hierarchy, layout discipline, job relevance, and benchmark alignment.
- Compare a user resume to a selected, consented **reference cohort** such as “India early-career backend engineers” rather than vague “top MNC resumes.”
- Identify layout details: margins, whitespace, alignment, columns, overlap, clipping, typography consistency, heading hierarchy, line density, page balance, and reading order.
- Identify content details: impact framing, evidence, quantification, ownership, scope, credibility, tense, repetition, role relevance, and keyword placement.
- Provide edits that preserve factual truth and explicitly require user confirmation for any changed claim.
- Build a trustworthy human-in-the-loop corpus workflow for public or manually uploaded reference resumes.
- Let users view an ATS extraction preview and a recruiter-scan preview.

### Non-goals for v1

- Predict whether a person will get hired.
- Rank people as intrinsically “better” candidates.
- Claim compatibility with every commercial ATS.
- Automatically scrape LinkedIn, X, or any other platform.
- Use public social profiles as proof of employment without permission.
- Create “fake quantified achievement” bullets.
- Train a foundation model from user-uploaded resumes.
- Recommend discriminatory choices based on age, gender, race, caste, religion, disability, nationality, marital status, or other protected/sensitive attributes.

---

## 5. Users and jobs-to-be-done

### Persona A: Student / early-career builder

**Example:** An engineering student applying to internships, new-grad SDE roles, AI/ML roles, and hackathons.

**Primary jobs**

- “Help me show projects as credible engineering work.”
- “Tell me why my resume looks weaker than strong peer examples.”
- “Make this one page without making it cramped.”
- “Tailor this to an AI/ML internship without lying.”

**Pain points**

- Thin work history, heavy project dependence, unclear differentiation.
- Dense resumes due to many skills, projects, certifications, and hackathons.
- Uncertainty around whether visual polish or content is holding them back.

### Persona B: Experienced candidate

**Primary jobs**

- “Show business and technical impact at the level expected for this role.”
- “Reduce my two-page resume without losing evidence.”
- “Tailor my narrative from IC to staff/leadership expectations.”

### Persona C: Mentor / career coach

**Primary jobs**

- “Review several resumes consistently and explain feedback efficiently.”
- “Use a reference cohort without exposing private candidate information.”

### Persona D: Reference corpus curator

**Primary jobs**

- “Add a permissioned exemplar, tag it accurately, remove PII, and control whether it affects product benchmarks.”
- “Assess source credibility without confusing public visibility with permission or quality.”

---

## 6. Core product model

GoldLens produces a **Resume Intelligence Report** with six independent dimensions:

| Dimension | User question | Example outputs |
|---|---|---|
| ATS integrity | “Will systems read this correctly?” | reading order, broken columns, malformed headings, text extraction preview |
| Visual craft | “Does it look deliberate and easy to scan?” | alignment, margins, whitespace rhythm, typography hierarchy, density |
| Narrative & framing | “What story does it tell in the first 15 seconds?” | top-of-page signal, target-role clarity, evidence ordering, role identity |
| Evidence & impact | “Do bullets prove my claims?” | action, scope, method, outcome, credibility, quantification |
| Role fit | “How relevant is this to this specific job?” | hard skills, domain signals, responsibilities, missing evidence |
| Reference alignment | “What patterns do credible peer resumes use?” | cohort distributions, missing patterns, comparable strengths; never copied content |

### Principle: no universal “resume score” alone

A single headline score is useful for progress tracking, but it can mislead. Display a composite only with its components, confidence, and context:

```text
Overall readiness: 76 / 100
Confidence: Medium
Context: Early-career ML engineer, India, 1-page target, JD attached

ATS integrity:       92
Visual craft:        71
Narrative & framing: 65
Evidence & impact:   74
Role fit:            79
Reference alignment: 70
```

The product must state that reference alignment measures communication patterns within a chosen cohort—not competence, employability, or worth.

---

## 7. Product scope and milestones

### Phase 0: Foundation (2 weeks)

- Fork Resume-Matcher.
- Replace mocked analysis outputs with real analysis endpoints.
- Add Postgres, object storage, authentication, audit logs, and background jobs.
- Support PDF and DOCX upload, page rendering, text extraction, and normalized resume JSON.
- Create a privacy consent screen and data retention controls.

### Phase 1: Credible analyzer MVP (4–6 weeks)

- ATS extraction preview and structural checks.
- Content analysis: sections, skills, bullet quality, quantification, tense, repetition.
- Basic visual rules: margins, fonts, font sizes, overflow, columns, spacing, hierarchy.
- Resume report with evidence-linked findings.
- Manual reference-resume intake and curator review queue.

### Phase 2: Multimodal layout intelligence (4–6 weeks)

- PDF coordinate extraction, rendered-page analysis, document block segmentation, reading-order inference.
- Visual heatmap and issue pins on each page.
- White-space, alignment, density, and consistency metrics.
- Role-specific framing analysis and golden-cohort baselines.

### Phase 3: Trusted cohort intelligence (4–8 weeks)

- Cohort builder: role, seniority, geography, industry, date, source trust, format style.
- Benchmark distributions and evidence-pattern comparisons.
- Feedback calibration, curator analytics, reference versioning, removal workflow.
- Optional read-only discovery inbox from permitted public feeds/APIs; no scraping.

### Phase 4: Assisted refinement (later)

- Claim-preserving bullet rewrite assistant.
- Design-safe template migration and controlled formatting repair.
- Experimentation loop using user acceptance and dismissal feedback.

---

## 8. User journeys

### Journey 1: First resume analysis

1. User lands on “Analyze my resume.”
2. User sees a short privacy explanation and chooses retention: delete after analysis, keep privately, or allow anonymized product-improvement feedback (opt-in only).
3. User uploads PDF/DOCX and optionally pastes a job description.
4. System validates file, extracts text, renders pages, parses structure, and creates a document map.
5. User sees a processing state that names what is happening: “Checking reading order,” “Measuring layout rhythm,” “Reviewing bullet evidence,” “Comparing against selected target.”
6. Report opens at an executive overview: 3 highest-impact fixes, score breakdown, and confidence.
7. User opens a page canvas with issue pins and toggles between visual, ATS, and narrative lenses.
8. User accepts, dismisses, or marks an issue as intentional; this is recorded as feedback.

### Journey 2: Tailor to a job

1. User opens a saved master resume.
2. User pastes a job description or adds it from a URL/manual text.
3. User chooses target role level and preferred resume length.
4. GoldLens identifies exact missing evidence, not merely missing keywords.
5. User views “Use / add / do not add” distinctions:
   - **Use now:** Existing experience that should be surfaced.
   - **Add only if true:** Skill/metric that must be verified by the user.
   - **Do not claim:** Requirement absent from the source resume.
6. User applies edits in a tracked-change editor and exports a tailored version.

### Journey 3: Compare to a reference cohort

1. User chooses a cohort, e.g., “Early-career software engineers, product companies, India, 2024–2026.”
2. Product explains cohort count, inclusion criteria, and data-quality confidence.
3. User sees distributions—not individual private resumes—by default.
4. GoldLens reports patterns: “Your project evidence is strong; your top third lacks an immediate target-role signal; 0 of 6 technical bullets explain scale or user impact.”
5. User can open anonymized pattern examples only when the exemplar has explicit sharing permission.

### Journey 4: Curate a reference resume

1. Curator selects “Add reference.”
2. Curator uploads a document or adds a permitted source link.
3. System creates a private draft, extracts PII, and asks for consent proof / source basis.
4. Curator tags target role, seniority, geography, company type, document year, and confidence.
5. System runs integrity checks and flags uncertain claims; it does not silently verify employment.
6. Curator reviews the rendered resume, metadata, PII redactions, source conditions, and inclusion decision.
7. Resume enters one of: `private`, `pending_review`, `approved_for_pattern_stats`, `approved_for_example_display`, `rejected`, `removed`.

---

## 9. Information architecture

### Primary navigation

- Dashboard
- Analyze
- Resume Library
- Job Targets
- Insights
- Reference Cohorts
- Curator Console (restricted)
- Settings

### Analysis report navigation

- Overview
- Visual & Layout
- ATS Readability
- Narrative
- Evidence & Impact
- Job Match
- Cohort Patterns
- Edit & Export

### Report hierarchy

```text
Resume
├── Report summary
├── Page 1
│   ├── Header
│   ├── Experience section
│   │   ├── Experience item
│   │   │   ├── Bullet
│   │   │   │   └── Phrase/token evidence
│   └── Projects section
└── Page 2 (if applicable)
```

Every finding must map to one or more nodes in this hierarchy.

---

## 10. Detailed feature requirements

### 10.1 Upload and document normalization

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

**Acceptance criteria**

- User can upload a normal one- or two-page PDF/DOCX and receive a report without manual conversion.
- System explicitly flags when visual measurements are estimated rather than extracted.
- User can delete the original and derived data from settings.

### 10.2 ATS integrity analysis

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

**User-facing output format**

```text
Issue: Two-column reading-order collision
Severity: High
Why it matters: A text parser reads your skills between work-experience bullets.
Evidence: Page 1, x=318–545, y=212–642
Suggested fix: Use a single-column layout for essential content, or move skills after experience.
Confidence: High
```

### 10.3 Visual layout analysis

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

#### User-visible categories

| Category | Example finding | Desired feedback style |
|---|---|---|
| Margin | “Left margin differs by 7 mm from right margin” | factual, measurable |
| Density | “The lower third of page 1 is 2.1x denser than the upper third” | explain scan burden |
| Hierarchy | “Project names visually compete with section headings” | show hierarchy repair |
| Alignment | “Three date ranges do not share an alignment edge” | point to anchors |
| Spacing | “Experience items use four different gap values” | recommend a consistent system |
| Overflow | “Last bullet is within 3 px of page boundary” | high severity |
| Columns | “Visual two-column layout has parser-order risk” | separate ATS and visual trade-off |

### 10.4 Narrative and framing analysis

The goal is to infer what the resume *communicates*, while presenting inference as a hypothesis rather than fact.

**Questions to answer**

- In the first screenful, can a recruiter infer target role, level, domain, and strongest proof?
- Is the summary redundant, generic, or evidence-led?
- Is the best evidence in the top half of page 1?
- Are projects appropriately emphasized for an early-career candidate?
- Does a senior candidate foreground scale, ownership, leadership, and outcomes?
- Do section order and visual weight support the chosen goal?
- Is the document framed as “skills list” instead of “proof of capability”?

**Framing heuristic examples**

- **Student / new graduate:** education, relevant projects, internships, technical depth, and proof of shipping can reasonably appear high on page 1.
- **Experienced IC:** experience should normally lead; projects move down unless strategically differentiating.
- **Career switcher:** transferable evidence and a concise positioning statement may be useful, but generic objective statements are low value.
- **Research / ML candidate:** publications, experiments, model performance, datasets, and reproducibility can be relevant evidence when truthful.

**Output language rules**

Use: “This layout currently *signals*…” or “A reviewer may infer…”

Avoid: “Recruiters will reject…” or “This guarantees interviews.”

### 10.5 Evidence and impact analysis

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

#### Example feedback

```text
Current bullet:
“Worked on a chatbot using Python.”

Finding:
Low evidence density. The line names a technology but not ownership, scope, or result.

Truth-preserving rewrite scaffold:
“Built a Python-based chatbot for [user/problem], using [method/API], and validated it with [test/demo/metric].”

Required confirmation:
Fill the bracketed facts only if true. GoldLens will not invent them.
```

### 10.6 Job-description match

**Inputs**

- Pasted job description.
- Optional role title, location, and job level.
- User’s target constraints: one page/two pages, role family, visa/location constraints if voluntarily supplied.

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

### 10.7 Reference cohort intelligence

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

- Other people’s raw resumes.
- Identifying contact information.
- Individual-company or individual-person “rankings.”
- Exact wording that encourages copying.

#### Language for cohort insights

Good: “Within this cohort, 68% of resumes lead with experience or internships; your strongest project appears below less relevant coursework.”

Bad: “Top-company resumes always do X, so you should copy X.”

---

## 11. Trust, source reliability, and corpus governance

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
| Tier 4 | Verified partner / career-community contribution | Eligible after curator QA; still not treated as automatically “ideal” |

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

- “Guaranteed FAANG template” reposts without author attribution.
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

## 12. UX and visual design specification

### Design tone

Calm, editorial, rigorous, and non-judgmental. The product should feel like a sophisticated design review, not an exam dashboard.

### Design system principles

- One primary action per screen.
- Use severity sparingly; reserve red for data-loss/ATS-breaking issues.
- Avoid gamification language such as “beat other candidates.”
- Use evidence snippets and visual pins, not generic cards full of advice.
- Let users switch modes: **Fast Review**, **Deep Review**, **ATS Lens**, **Design Lens**, **Target Role Lens**.
- Always preserve user agency: accept, dismiss, mark intentional, edit manually.

### Main dashboard

**Header**

- Resume title, target role, last analysis time, privacy state.
- Actions: Reanalyze, Compare to Job, Export, Delete.

**Top panel**

- Readiness score and confidence.
- “Your three highest-impact changes.”
- A short framing statement: “Your document currently reads as a project-heavy early-career backend profile; strongest proof is not visible until mid-page.”

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

**Issue pin behavior**

- Pin opens title, severity, why, evidence, likely impact, suggested fix, confidence, and “mark intentional.”
- Issue pin groups when several issues share a root cause.
- Never show more than 5 pins by default; users can expand all.

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
- “Evidence required” state for any new metric or claim.
- Style lock controls for typography, margins, spacing, and template.
- Re-run analysis only on changed sections when possible.

---

## 13. Scoring system

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

Weights vary by use case. Without a job description, set \(J\) to “not scored” rather than quietly substituting another value.

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

## 14. Technical architecture

### Starting codebase

Fork `srbhr/Resume-Matcher` for its existing master-resume, tailoring, editing, template, PDF export, and FastAPI/Next.js foundations. The fork already describes PDF/DOCX upload to structured resume data, LLM-based tailoring, a rich editor, templates, formatting controls, and browser-rendered PDF export. [page:49][page:48]

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

### Analysis services

- `DocumentIngestionService`
- `PdfGeometryService`
- `DocxStyleService`
- `OcrService`
- `LayoutSegmentationService`
- `ReadingOrderService`
- `ResumeSemanticParser`
- `AtsIntegrityService`
- `VisualCraftService`
- `NarrativeFramingService`
- `BulletEvidenceService`
- `JobMatchService`
- `CohortBenchmarkService`
- `TrustAndConsentService`
- `FindingAggregationService`
- `RewriteGuardrailService`

### Why geometry-first matters

For born-digital PDFs, the product should prefer native coordinates, font metadata, and text spans over image-only AI. This is faster, cheaper, more explainable, and more accurate for margins, font sizes, alignments, and spacing. Use visual/layout models for scans, complex templates, ambiguous regions, and robustness—not as the default for every document.

---

## 15. Data model

### Core tables

```sql
users
- id
- email
- created_at
- deletion_requested_at

resumes
- id
- user_id
- parent_resume_id
- title
- source_type                 -- upload, editor, import
- original_file_key
- normalized_document_key
- retention_policy
- processing_status
- created_at
- updated_at

resume_pages
- id
- resume_id
- page_number
- width_pt
- height_pt
- rendered_image_key
- extracted_text
- ocr_confidence

layout_blocks
- id
- resume_page_id
- block_type                  -- heading, paragraph, bullet, table, icon, image
- x0, y0, x1, y1
- reading_order
- text
- style_json
- confidence

resume_sections
- id
- resume_id
- section_type                -- summary, experience, projects, education, skills
- ordinal
- title
- bounding_box_json
- content_json
- confidence

analysis_runs
- id
- resume_id
- jd_id
- cohort_version_id
- analyzer_version
- status
- started_at
- completed_at

findings
- id
- analysis_run_id
- category
- subcategory
- severity
- confidence
- score_impact
- title
- explanation
- evidence_json
- recommended_action_json
- user_feedback_status

job_descriptions
- id
- user_id
- title
- company_name
- raw_text
- parsed_json

reference_documents
- id
- raw_file_key
- source_url
- source_type
- author_consent_status
- source_trust_score
- curation_status
- pii_redaction_status
- metadata_json
- created_at
- removed_at

reference_document_tags
- reference_document_id
- role_family
- seniority_band
- geography
- industry
- language
- document_year

cohorts
- id
- name
- inclusion_rules_json
- visibility

cohort_versions
- id
- cohort_id
- version_number
- statistics_json
- created_at

curation_reviews
- id
- reference_document_id
- curator_id
- decision
- rationale
- checklist_json
- created_at

audit_events
- id
- actor_id
- entity_type
- entity_id
- action
- metadata_json
- created_at
```

### Finding object

```json
{
  "id": "finding_01",
  "category": "visual_layout",
  "subcategory": "section_spacing_consistency",
  "severity": "medium",
  "confidence": "high",
  "scoreImpact": -4,
  "title": "Section spacing is inconsistent",
  "explanation": "Gaps between primary sections range from 8 pt to 23 pt. This makes the document feel assembled rather than systematic.",
  "evidence": {
    "page": 1,
    "anchors": [
      {"section": "Experience", "gapPt": 8},
      {"section": "Projects", "gapPt": 23}
    ]
  },
  "suggestedFix": {
    "type": "format_rule",
    "recommendedValue": "12 pt",
    "previewAvailable": true
  }
}
```

---

## 16. Layout analytics specification

### Metrics to calculate

#### Margin metrics

```text
left_margin_pt = min(block.x0) - page.left_boundary
right_margin_pt = page.right_boundary - max(block.x1)
top_margin_pt = min(block.y0)
bottom_margin_pt = page.height - max(block.y1)
margin_asymmetry = abs(left_margin_pt - right_margin_pt)
```

Exclude intentional full-width rules/backgrounds and page decorations via block classification.

#### Whitespace metrics

- Total blank area ratio.
- Whitespace by horizontal bands: top, middle, bottom.
- Whitespace variance between sections.
- Minimum inter-block gap.
- Maximum unexplained gap.
- Gutter size in multi-column layouts.

#### Density metrics

- Characters per usable square inch.
- Lines per inch.
- Bullet count per vertical inch.
- Font-size-weighted density.
- Local density variance.

Do not punish dense resumes mechanically; compare density to context and readability signals.

#### Alignment metrics

- Cluster left/right/center anchors.
- Measure deviations from dominant alignments.
- Detect date-column alignment separately from body text.
- Detect ragged title/date pairs and inconsistent indent depth.

#### Hierarchy metrics

- Font-size deltas between H1/H2/body.
- Font-weight and capitalization contrast.
- Spacing-before and spacing-after heading.
- Heading uniqueness and repeated style consistency.
- Whether a heading is visually closer to preceding or succeeding content.

#### Readability metrics

- Average bullet length and variance.
- Line wrap count per bullet.
- Minimum font size.
- Contrast estimate.
- Too many visual elements competing in same area.
- Single-column parsing safety.

### Layout finding rules

Rules must be parameterized by page size, font metrics, candidate stage, and chosen template. Never hard-code a universal “perfect” margin/spacing value as an absolute rule.

---

## 17. AI and model strategy

### Principle: use deterministic systems where possible

| Problem | First choice | Escalation |
|---|---|---|
| Margins, font sizes, x/y positions | native PDF/DOCX properties | image analysis if unavailable |
| Section headers | style/rules + classifier | LLM structured classification |
| Resume-to-JD concepts | embeddings + controlled taxonomy | LLM explanation |
| Bullet improvement | rule-based diagnosis | constrained LLM rewrite |
| Scanned document structure | OCR + layout model | manual user correction |
| Source reliability | policy + curator workflow | no automated “truth” claim |

### LLM guardrails

- All outputs must be schema validated.
- Prompt includes source text and instructions not to add facts.
- Rewrites can use placeholders for missing facts.
- Proposals must list source evidence that supports each phrase.
- Unsupported additions are blocked or labeled “needs user confirmation.”
- Do not send raw reference resumes to third-party LLM providers without explicit permission and a compatible data-processing agreement.

### Learning loop

The system should initially “grow intelligent” through **retrieval, cohort-statistics recalculation, feedback calibration, and curated labels**—not uncontrolled autonomous retraining.

Safe progression:

1. Add approved reference documents.
2. Recompute aggregated, de-identified cohort statistics.
3. Track whether users accept/dismiss recommendations.
4. Use curator-reviewed labels to calibrate thresholds.
5. Train narrow models only on authorized, de-identified datasets with documented purpose and evaluation.
6. Version every model, feature set, cohort, and prompt.

---

## 18. Safety, privacy, and fairness

### User controls

- Analyze once and delete automatically.
- Private storage with delete/export controls.
- Separate explicit opt-in for anonymized quality-improvement telemetry.
- Separate explicit opt-in for model-training contribution.
- Download all personal data.
- View analysis history and delete individual versions.

### Fairness requirements

- Remove protected/sensitive attribute signals from scoring where feasible.
- Do not infer demographic traits from name, photo, location, institution, or writing style.
- Avoid prestige proxies in candidate scoring.
- Test score differences across synthetic counterfactual resumes differing only in non-job-relevant identity signals.
- Display role-context limitations and uncertainty.

### Security requirements

- Encrypt files and sensitive fields at rest.
- Signed, short-lived download URLs.
- Access control on every resume and reference document.
- PII redaction pipeline and secret scanning.
- Data retention limits and deletion jobs.
- Audit log for curator and admin actions.

---

## 19. Metrics and measurement

### North-star metric

**Verified improvement rate:** percentage of users who make a change, reanalyze, and see an improvement in the intended dimension without a regression in ATS integrity.

### Product metrics

- Upload-to-first-report completion rate.
- Median time to report.
- Finding open rate and issue-resolution rate.
- Accepted vs dismissed recommendations by category.
- Reanalysis rate after edits.
- Export rate.
- JD-tailoring completion rate.
- Cohort insight engagement rate.

### Quality metrics

- Precision of high-severity ATS findings, assessed with labeled test documents.
- Agreement with expert reviewers on layout issues.
- Reading-order extraction accuracy.
- Unsupported-claim rewrite rate (target: near zero).
- False-positive rate for layout warnings.
- Cohort drift and statistical confidence coverage.

### Trust metrics

- Share of reference corpus with explicit consent.
- Median curation review time.
- Takedown SLA adherence.
- Percent of cohort entries meeting high trust threshold.

---

## 20. Acceptance criteria by release

### MVP exit criteria

- PDF/DOCX upload works for target test set.
- ATS extraction preview identifies common single/multi-column ordering errors.
- Report produces at least 10 concrete, evidence-backed findings across content and layout.
- Each finding maps to a page location or text snippet.
- User can dismiss an issue and state it is intentional.
- No AI rewrite adds unsupported facts in red-team test cases.
- Manual reference intake requires consent status, source, tags, and curator decision.

### Multimodal release exit criteria

- Margin, alignment, spacing, and typography checks operate on document coordinates for born-digital PDFs.
- Visual overlay accurately pinpoints issue locations on test documents.
- Reading-order model meets defined accuracy threshold on multi-column test suite.
- Cohort comparisons display aggregate patterns only by default.

---

## 21. Prioritized backlog

### P0: Must have

- Upload, parse, render, and secure storage.
- Resume JSON schema and semantic extraction.
- ATS extraction preview.
- Rule-based layout diagnostics.
- Evidence-backed findings system.
- Job description matching.
- Manual reference ingestion with consent, review, and removal controls.
- Clear privacy controls.

### P1: Should have

- Interactive visual canvas and overlays.
- Cohort statistics and role/level filters.
- LLM-assisted, truth-preserving rewrites.
- DOCX style inspection.
- Template-aware style repair preview.
- Feedback calibration dashboard.

### P2: Could have

- Official-API discovery inbox for permitted sources.
- Mentor collaboration mode.
- A/B comparison across resume versions.
- Multi-language layout/narrative support.
- Browser extension for importing a user’s own public portfolio material.

### Explicitly deferred

- Autonomous web crawling.
- Automated employment verification.
- Candidate ranking for employers.
- Public leaderboards.
- “Guaranteed interview” claims.

---

## 22. Risks and mitigations

| Risk | Why it matters | Mitigation |
|---|---|---|
| Scraping / platform ToS violation | legal and account risk | no scraping; API/permission-only discovery |
| Consent ambiguity | public files may still be private in intent | require explicit reuse basis; reject uncertainty |
| PII exposure | resumes contain contact and identity data | encryption, redaction, RBAC, deletion, aggregate-only cohort views |
| Hallucinated rewrites | could harm candidates | source-grounded edits, placeholders, human confirmation |
| Prestige bias | “top MNC” label may distort recommendations | cohort criteria focus on role/context; prestige excluded from scoring |
| False layout flags | users lose trust | confidence, explainability, dismiss/intentional controls, test corpus |
| Expensive multimodal analysis | poor unit economics | geometry-first pipeline; async jobs; cache/render reuse |
| Overfitting to one resume style | bad advice across candidates | cohort segmentation, diverse curated examples, context controls |
| Copyright concerns | copying exemplar language | aggregate patterns, paraphrased examples, consented examples only |

---

## 23. Suggested repository plan

```text
/apps
  /frontend                 # Next.js fork extension
  /backend                  # FastAPI fork extension
/packages
  /schemas                  # shared Pydantic/TypeScript schemas
  /design-tokens
/services
  /document-worker
  /analysis-worker
  /curation-worker
/ml
  /layout
  /semantic
  /evaluation
/docs
  /prd
  /privacy
  /curation-playbook
  /evaluation
```

### First pull requests

1. `feat: postgres persistence and secure file storage`
2. `feat: normalized document and layout block schema`
3. `feat: document ingestion worker with PDF/DOCX extraction`
4. `feat: ATS extraction preview and reading-order checks`
5. `feat: layout findings engine v1`
6. `feat: report UI with evidence-linked issue cards`
7. `feat: reference corpus intake and curator review workflow`
8. `feat: cohort statistics v1`

---

## 24. Evaluation dataset plan

Create a private, consented test suite that includes:

- Single-column ATS-safe PDFs.
- Two-column resumes with known correct and incorrect reading orders.
- DOCX resumes with style metadata.
- Scanned resumes with OCR noise.
- Dense and sparse resumes.
- Different page sizes and fonts.
- Early-career, mid-career, research, design, product, software, data, and ML resume structures.
- Known formatting defects: clipping, wrong dates alignment, uneven gaps, tiny body fonts, malformed bullets, table-based layouts.

For each document, gather annotations from at least two competent reviewers for:

- Section boundaries.
- Reading order.
- Layout issues and severity.
- Top-of-page narrative.
- Bullet evidence strength.

Measure agreement before treating labels as ground truth.

---

## 25. Launch positioning

### Positioning statement

GoldLens is a privacy-first resume intelligence tool that reviews the document the way both software and humans do: text, ATS extraction, visual hierarchy, layout rhythm, and evidence—not just keywords.

### What makes it defensible

- Multimodal analysis that ties geometry to actionable UX.
- A governed reference-corpus system rather than uncontrolled scraped data.
- Truth-preserving edits with evidence citations.
- Cohort-based patterns instead of prestige-copying.
- Transparent, inspectable reasoning for every recommendation.

---

## 26. Open questions

- Which initial cohort gives the strongest focused launch: Indian early-career software engineers, global new-grad SWE, or AI/ML student roles?
- Will v1 use Supabase or Neon + S3-compatible object storage?
- Which LLM providers meet privacy, cost, and quality needs for structured analysis?
- What consent wording qualifies a public resume for aggregate-pattern analysis?
- What expert reviewers can help label a first 50–100 document evaluation set?
- What is the minimum number of approved documents before a cohort can surface statistics without being misleading?
- Which recommendations can be applied automatically to a template without damaging user intent?

---

## 27. Immediate next actions

1. Fork Resume-Matcher and run its frontend/backend locally.
2. Create Postgres schema and private object-storage bucket.
3. Implement `normalized_document`, `resume_pages`, and `layout_blocks` first.
4. Build an analysis fixture suite from your own documents and explicitly consented samples.
5. Ship the geometry-first layout analyzer before adding heavy layout ML.
6. Build curator intake and policy screens before any public-source discovery work.
7. Launch with one narrow cohort and measure quality before expanding.

---

## Appendix A: Analysis report example

```text
Target: New-grad backend engineer
Document: 1 page, A4
Confidence: High

Highest impact
1. ATS blocker: second column is extracted between experience bullets.
2. Narrative: your best production project is below coursework and becomes visible late.
3. Evidence: 5 of 7 project bullets name technologies but do not state the problem or outcome.

Visual craft
- Left/right margins: 17 mm / 10 mm (inconsistent)
- Section spacing: 8–22 pt (recommended system: one primary interval)
- Body font range: 8.5–11 pt (8.5 pt may reduce readability)
- Heading hierarchy: Projects and Education use visually identical styling, despite different priority.

Truth-preserving next edit
Move “Built and deployed…” project above coursework. Rewrite only the first bullet using confirmed scope and outcome.
```

## Appendix B: Curator checklist

```text
[ ] I have a documented source URL or direct author submission.
[ ] I confirmed whether the author permits analysis and aggregate reuse.
[ ] I removed/unavailable-marked phone, email, address, and unnecessary identifiers.
[ ] I recorded the document year and role context.
[ ] I did not infer a company, job level, or identity without evidence.
[ ] I checked internal date/title consistency.
[ ] I assigned trust evidence and confidence.
[ ] I selected whether this can affect aggregate statistics, be used as a private evaluator, or be displayed as an anonymized example.
[ ] I recorded an audit rationale.
```
