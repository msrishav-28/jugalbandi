# GoldLens Resume Intelligence
## Award-Winning Engineering Team Operating Manual

**Document type:** Engineering excellence, delivery, quality, and collaboration operating manual  
**Audience:** Founding engineers, senior/staff/principal engineers, frontend/backend/platform/ML engineers, QA/SDET, security, data/ML operations, engineering managers, and technical design partners  
**Product:** GoldLens — privacy-first multimodal resume intelligence platform  
**Status:** Team execution standard  
**Last updated:** September 30, 2026

---

# 1. Why this document exists

GoldLens is being built in a domain where users hand us highly personal documents and expect unusually high standards of accuracy, privacy, taste, and clarity. A technically working feature is not enough. The product must feel intelligent without being manipulative, detailed without being noisy, polished without hiding uncertainty, and useful without inventing facts.

This operating manual defines how an award-winning, highly accomplished product engineering team designs, ships, reviews, measures, secures, and evolves GoldLens.

The goal is not to imitate large-company process. The goal is to create a small team with unusually high craft density: people who understand the problem deeply, make careful trade-offs, move quickly with quality, write clear decisions, and own outcomes after launch.

---

# 2. Engineering mission

> Build the most trusted system for understanding how a resume communicates to software and humans: its content, evidence, layout, hierarchy, readability, framing, and role relevance.

Every implementation should make one of these outcomes better:

- A candidate understands what to fix and why.
- A candidate avoids making unsupported claims.
- A resume becomes more readable to an ATS and a recruiter.
- The system handles sensitive data more safely.
- Feedback becomes more accurate, specific, explainable, and context-aware.
- The product becomes more reliable, faster, and easier to evolve.

---

# 3. What excellence means here

## 3.1 Product excellence

A user should never receive generic advice when the system has enough evidence to be specific.

Weak:

> “Use stronger action verbs.”

Excellent:

> “The first three project bullets begin with ‘Worked on’ or ‘Responsible for.’ They describe technologies but not ownership or outcome. Your deployed project is already strong evidence—surface the user/problem and a confirmed result in the first bullet.”

## 3.2 Design excellence

The product should make complex analysis feel calm and legible. Findings must be visually anchored, prioritized, explainable, and reversible. The report should look like a thoughtful editorial review, not a gamified scorecard.

## 3.3 Engineering excellence

Every system must be:

- Observable in production.
- Secure by default.
- Versioned and reproducible.
- Tested against realistic resume documents.
- Resilient to malformed files and model failures.
- Designed for intentional evolution rather than one-off patches.

## 3.4 AI excellence

The AI must be grounded, constrained, and honest about uncertainty. The team must not ship a feature because an LLM can produce impressive prose. It must produce verifiable value and preserve candidate truth.

## 3.5 Operational excellence

The team owns the product after merge. It monitors features, responds to regressions, learns from user feedback, and improves the system deliberately.

---

# 4. Team culture: high standards without ego

## 4.1 Core behaviors

- **Be direct, not dismissive.** Say what is wrong, why it matters, and what you recommend.
- **Disagree with evidence.** Bring traces, screenshots, metrics, test cases, product principles, and user context.
- **Assume good intent.** Debate ideas rigorously; do not make disagreement personal.
- **Own the whole experience.** A frontend engineer notices broken API states; a backend engineer notices confusing UX; everyone cares about user impact.
- **Prefer durable clarity over impressive complexity.** A simple, well-tested geometry rule is often better than a vague “AI vision” pipeline.
- **Treat privacy and security as product quality.** A clever feature that leaks documents is not a feature.
- **Write down decisions.** Decisions that only live in chat are fragile.
- **Teach continuously.** The best teams multiply capability rather than becoming bottlenecks.

## 4.2 What we do not tolerate

- Shipping ungrounded LLM recommendations.
- Treating “publicly visible” resumes as permission to collect or train on them.
- Merging code without tests because “it works locally.”
- Hiding uncertainty in a single confident score.
- Using prestige, college, company names, follower counts, or demographic proxies as candidate-quality signals.
- Logging raw user resume text, access tokens, or signed URLs.
- Dismissing accessibility, performance, error states, or mobile behavior as “later.”
- Creating large rewrites without source traceability.

---

# 5. Team topology and ownership

## 5.1 Recommended early team shape

| Role | Primary ownership | Secondary ownership |
|---|---|---|
| CTO / founding engineer | architecture, data/security, technical strategy, delivery quality | backend, platform, ML evaluation |
| Product-minded frontend engineer | report UX, analysis canvas, editor, design system | performance, accessibility |
| Backend/platform engineer | API, storage, queues, auth, observability, deployments | data lifecycle, exports |
| Applied ML/document engineer | document parsing, layout analysis, semantic signals, evaluation | data quality, model operations |
| Product designer | flows, report comprehension, visual hierarchy, user research | design QA, content design |
| Quality/security contributor | test strategy, regression suite, threat modeling | release readiness |

At a very small stage, one person may cover multiple areas. Ownership must still be explicit.

## 5.2 Ownership rule

Every significant system has:

- A **Directly Responsible Individual (DRI)** who makes day-to-day decisions and owns reliability.
- A **backup owner** who can operate it during absence.
- An **architectural reviewer** for high-risk changes.
- A documented runbook.

No critical component should depend on one person’s private knowledge.

## 5.3 Core domains

| Domain | DRI responsibilities |
|---|---|
| Document ingestion | upload safety, parsing, OCR, rendering, file lifecycle |
| Layout intelligence | geometry extraction, reading order, visual rules, feature calibration |
| Semantic intelligence | sections, bullets, evidence signals, JD matching, structured outputs |
| AI platform | provider routing, prompt versions, JSON validation, cost and privacy controls |
| Web experience | upload, reports, canvas, editor, accessibility, performance |
| Data governance | consent, curation, corpus review, deletion, auditability |
| Platform & security | auth, authorization, storage, queue, observability, incident response |
| Quality & evaluation | golden corpus, regression tests, expert review, release gates |

---

# 6. Product quality bar

## 6.1 The “would a great reviewer say this?” test

Before a finding or recommendation reaches a user, ask:

1. Is it factually supported by the document or selected job description?
2. Is it specific enough to act on without interpretation?
3. Does it explain why the issue matters?
4. Does it identify the exact location or evidence?
5. Is the recommended change safe and reversible?
6. Would a strong resume reviewer agree that this is worth the user’s attention?
7. Is the language non-judgmental and free of hiring guarantees?

## 6.2 Finding quality contract

Every user-visible finding must contain:

```text
- Category
- Severity
- Confidence
- Plain-language title
- Why it matters
- Document evidence: page, section, block, line, or text span
- Suggested next action
- Analyzer/rule version
- Optional “mark intentional” or dismiss path
```

## 6.3 No generic-score rule

The product may show scores only as a summary of inspectable components. A score without evidence is not insight. A composite score must never imply employability, intelligence, or hiring probability.

---

# 7. Engineering lifecycle

## 7.1 Discovery before implementation

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

## 7.2 RFC threshold

Write an RFC when a change:

- Creates or changes a persistent data model.
- Adds a third-party AI, OCR, analytics, or storage provider.
- Sends user content externally.
- Affects authorization, privacy, deletion, or billing.
- Changes the canonical Document IR.
- Introduces a new model or changes scoring logic materially.
- Requires a migration or cannot be trivially rolled back.
- Adds a new worker, queue, service, or major dependency.

## 7.3 ADR threshold

Write an Architecture Decision Record when the decision is expected to survive multiple quarters, affects system boundaries, or would be expensive to reverse.

Examples:

- Postgres vs a document database.
- Which object storage and encryption pattern to use.
- Geometry-first extraction vs image-first extraction.
- LLM provider and privacy routing model.
- Reference-corpus governance approach.

---

# 8. Feature delivery process

## 8.1 Standard feature sequence

1. **Problem framing:** Product/design/engineering agree on outcome and non-goals.
2. **Technical spike:** Validate unknowns using synthetic or consented test data.
3. **Design review:** Confirm primary flow, empty/loading/error states, evidence presentation, and accessibility.
4. **Implementation plan:** Split into small vertical slices with clear acceptance criteria.
5. **Build:** Prefer feature flag and incremental rollout.
6. **Automated test coverage:** Unit, integration, contract, and regression tests as relevant.
7. **Dogfood:** Internal team uses real or safe synthetic documents.
8. **Release review:** Validate performance, security, data handling, monitoring, rollback.
9. **Observe:** Watch live metrics and qualitative feedback.
10. **Iterate or revert:** Improvement is measured, not assumed.

## 8.2 Vertical-slice rule

Do not create weeks of disconnected backend work followed by a giant UI merge. Ship end-to-end slices:

```text
Upload one PDF
-> extract one layout metric
-> persist one finding
-> show one evidence-linked card
-> capture one user feedback event
```

This exposes integration and usability problems early.

## 8.3 Definition of ready

A story is ready when:

- Outcome and user are clear.
- Acceptance criteria exist.
- Designs cover primary, empty, loading, error, and permission-denied states.
- Data classification and privacy implications are known.
- Dependencies and unknowns are visible.
- The team knows how success will be measured.

## 8.4 Definition of done

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

# 9. Code quality standards

## 9.1 General principles

- Optimize for readability and change safety.
- Use explicit names for domain concepts.
- Keep functions small enough that their intent is obvious.
- Separate pure domain logic from I/O and framework glue.
- Avoid premature abstraction; extract only after genuine repetition or a stable concept emerges.
- Prefer typed contracts over unstructured dictionaries.
- Use comments to explain non-obvious constraints and trade-offs, not to narrate obvious code.

## 9.2 Backend standards

- Use strict Pydantic request/response contracts.
- Validate all external inputs at boundaries.
- Make jobs idempotent.
- Include timeouts and retries for all network calls.
- Use explicit transaction boundaries for multi-step state changes.
- Never return internal stack traces, infrastructure details, or sensitive data to clients.
- Treat all document content and remote URLs as untrusted.

## 9.3 Frontend standards

- TypeScript strict mode.
- Accessible semantic HTML first; ARIA only when necessary.
- Every async screen has loading, retry, and recoverable error states.
- Avoid rendering huge document payloads in a single pass.
- Preserve report state in URLs where useful for shareability and navigation.
- Never encode sensitive raw resume content into public URLs or analytics events.

## 9.4 Database standards

- Migrations are reviewable, reversible where practical, and tested on a production-like copy.
- Index queries deliberately; inspect query plans for high-volume paths.
- Enforce tenant ownership using database constraints and row-level security where appropriate.
- Soft deletes are not a substitute for actual deletion where user privacy requires erasure.
- Every table has clear ownership, retention, and data-classification documentation.

## 9.5 API standards

- Version external APIs.
- Use opaque resource IDs.
- Require authorization on every resource access.
- Return consistent error shape and stable machine-readable codes.
- Use idempotency keys for create/upload/export operations.
- Avoid breaking changes; deprecate explicitly.

---

# 10. Pull request operating standard

## 10.1 PR size and intent

A PR should generally do one coherent thing. Huge PRs are difficult to review, hard to rollback, and often conceal quality issues.

Preferred PR structure:

```text
Title: feat(layout): detect inconsistent primary section spacing

Why:
Users cannot see why a resume feels visually uneven.

What:
- Extract inter-section vertical gaps from canonical Document IR.
- Apply configurable consistency rule.
- Persist evidence-linked finding.
- Show report card and page pin.

Not included:
- Automatic formatting repair.
- Cohort-calibrated thresholds.

Risk:
Medium false-positive risk; feature-flagged.

Testing:
- Unit tests for gap extraction and rule thresholds.
- Golden PDFs: consistent / inconsistent / intentional variation.
- UI snapshot for evidence card.
```

## 10.2 PR checklist

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

## 10.3 Review expectations

Reviewers should assess:

- Correctness and edge cases.
- Product behavior, not just code style.
- Data lifecycle and privacy.
- Security/authorization boundaries.
- Test adequacy.
- Performance and operational impact.
- Naming, maintainability, and architectural fit.
- Accessibility and UX quality for user-facing changes.

Reviewers should not block on personal style preferences covered by formatters/linters.

## 10.4 Author responsibilities

- Explain the why, not just the diff.
- Respond to every substantive comment.
- Break apart a PR if review complexity becomes too high.
- Add examples/screenshots/logs needed to verify behavior.
- Own follow-up monitoring after merge.

---

# 11. Testing strategy

## 11.1 Test pyramid

| Test type | Purpose | Examples |
|---|---|---|
| Unit | deterministic domain behavior | margin calculation, bullet scoring, consent state transition |
| Integration | components work together | upload → parse → persist → analyze |
| Contract | API/job payload stability | OpenAPI, Pydantic schemas, event contracts |
| Golden document | document analysis regression | known PDF produces expected blocks/findings |
| Visual regression | UI/canvas stability | report card, overlay alignment, responsive layout |
| End-to-end | user workflow confidence | upload, analyze, act on finding, export |
| Security | access-control and abuse defense | IDOR, SSRF, malicious file, prompt injection |
| Load/soak | capacity and resilience | concurrent uploads/jobs, queue backlogs |
| Human evaluation | usefulness and correctness | expert review agreement |

## 11.2 Golden-document test suite

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

## 11.3 Quality expectations for AI features

Every AI-assisted feature needs:

- Test prompts/fixtures.
- Structured output schema.
- Positive and adversarial cases.
- Unsupported-claim red-team tests.
- Evaluation rubric.
- Version identifier.
- Rollback mechanism.

## 11.4 Test naming

Tests should describe user-observable behavior:

```text
test_marks_multicolumn_resume_as_high_ats_risk_when_extracted_order_interleaves_columns

test_does_not_flag_intentional_header_separator_as_margin_overflow

test_rewrite_uses_placeholder_when_metric_is_not_supported_by_source_bullet
```

---

# 12. Evaluation culture

## 12.1 We evaluate systems, not vibes

A feature is not “good” because it seems smart in a demo. It is good when it is reliably useful on representative inputs.

For each analyzer, maintain:

- Target behavior.
- Labeled examples.
- Precision/recall or agreement metric where applicable.
- Known limitations.
- Regression threshold.
- Owner.

## 12.2 Human-review loop

For findings that involve judgment—framing, clarity, bullet strength, visual craft—sample outputs for review by qualified resume reviewers, designers, and hiring-adjacent professionals.

Measure:

- Whether reviewers agree the finding is real.
- Whether severity is appropriate.
- Whether recommended action is safe and useful.
- Whether language is fair and non-overclaiming.

## 12.3 Avoid the “top company resume” trap

High-profile examples are not a universal ground truth. Evaluation must cover diverse, legitimate styles and contexts. The system should learn robust communication patterns, not fashionable templates or prestige signaling.

---

# 13. AI development standards

## 13.1 Deterministic-first implementation

Before adding an LLM, ask:

- Can PDF/DOCX metadata answer this exactly?
- Can a rule or classifier solve this reliably?
- Is an LLM required for explanation rather than detection?
- What is the failure mode if the model is wrong?

Use LLMs when they add genuine semantic value. Do not use them as a substitute for basic document engineering.

## 13.2 Grounding requirements

Any user-visible LLM result must be grounded in a constrained source set:

- Resume text selected for the task.
- Parsed features and findings.
- User-supplied job description.
- Approved aggregate cohort statistics.

The model must not receive raw reference documents unless the data policy explicitly permits it.

## 13.3 Rewrite contract

A rewrite proposal must:

- Preserve meaning.
- Not add metrics, outcomes, skills, employers, titles, scope, or credentials without evidence.
- Use explicit placeholders when facts are missing.
- Link each claim to a source phrase or user confirmation requirement.
- Be presented as a suggestion, never silently applied.

## 13.4 Prompt hygiene

- Prompts are versioned assets, not random strings in code.
- Untrusted content is clearly delimited.
- System instructions explicitly override document content.
- Responses are schema-validated.
- Prompt and response logging is minimized/redacted.
- Prompt changes require evaluation before rollout.

## 13.5 Model selection rubric

Evaluate models on:

- Structured-output reliability.
- Groundedness/factual support.
- Latency and cost.
- Privacy/data-processing terms.
- Context handling.
- Safety behavior under prompt-injection tests.
- Deployment flexibility (cloud, BYOK, local).

---

# 14. Privacy, security, and trust standards

## 14.1 Security is part of feature design

Every feature brief answers:

- What data is created, read, updated, and deleted?
- Which user/role can access it?
- Is data sent to an external provider?
- What prevents cross-tenant leakage?
- What happens if a job fails midway?
- What is retained after user deletion?
- What appears in logs, analytics, caches, and error reports?

## 14.2 High-risk data handling

Resumes may contain personal email addresses, phone numbers, addresses, education/employment histories, links, and sometimes sensitive personal disclosures. Treat all raw resume data as high-sensitivity user content.

Rules:

- No public object URLs.
- No raw resume text in application logs.
- No production documents in local developer environments.
- No production documents in screenshots, tickets, demos, or tests without explicit permission.
- No external AI call without declared privacy mode and approved provider path.
- No reference-corpus use without consent/provenance review.

## 14.3 Security review triggers

Security review is mandatory for:

- Upload/import flows.
- Remote URL fetching.
- Auth/role changes.
- Object storage changes.
- New third-party SDKs handling data.
- New LLM/OCR provider.
- Curation/reference corpus features.
- Export/share functionality.
- Browser extension or desktop integration.

---

# 15. Operational discipline

## 15.1 Production ownership

The feature DRI owns:

- Dashboards and alerts.
- Error budget impact.
- Initial on-call response for feature-specific failures.
- Post-launch quality sampling.
- Follow-up fixes or feature rollback.

## 15.2 Incident severity

| Severity | Example | Response expectation |
|---|---|---|
| SEV-1 | confirmed unauthorized resume/reference data exposure | immediate incident command, stop exposure, notify leadership/legal/security |
| SEV-2 | uploads broadly fail; analysis unavailable for most users | active response, mitigation same day |
| SEV-3 | a feature produces incorrect findings for a subset | flag off or fix quickly; document impact |
| SEV-4 | minor UI defect or low-impact degradation | prioritize in normal planning |

## 15.3 Blameless incident review

An incident review asks:

- What happened?
- What impact occurred?
- Which controls worked?
- Which assumptions failed?
- How do we prevent recurrence?
- Which owners and dates are assigned to follow-up actions?

It does not ask, “Who should be blamed?” Accountability means fixing the system, documentation, tests, and decision process.

## 15.4 Error budgets

Set service-level objectives for critical paths:

- Upload success rate.
- Analysis completion rate.
- p95 report generation latency.
- Export success rate.
- Data-deletion completion time.
- Unauthorized-access test pass rate: must be zero failures.

If error budget is exhausted, pause feature expansion and prioritize reliability.

---

# 16. Observability standard

## 16.1 Every workflow is traceable

A user action should be traceable from browser to API to queue to worker to final report without exposing content.

Correlation fields:

```text
trace_id
request_id
user_id_hash
resume_id
analysis_run_id
job_id
parser_version
rule_pack_version
model_route
cohort_version_id
```

## 16.2 Required dashboards

- User funnel: upload → processing → report → action → export.
- Pipeline: queue depth, job duration, retries, failures by stage.
- Quality: finding volume/severity, dismiss rates, reanalysis improvements.
- AI: provider latency, errors, token cost, invalid-schema rate.
- Security: authorization failures, signed-URL usage, deletion jobs, suspicious upload patterns.
- Corpus: consent states, curation backlog, removal SLA, cohort sample sizes.

## 16.3 Alert philosophy

Alert on user impact and urgent security signals, not every noisy metric. Every alert must link to a runbook and name an owner.

---

# 17. Design-engineering collaboration

## 17.1 The analysis report is a product surface, not a data dump

Engineering and design jointly own:

- Information hierarchy.
- Finding prioritization.
- Severity vocabulary.
- Confidence communication.
- Evidence visualization.
- Loading/progress behavior.
- Empty and error states.
- Accessibility.

## 17.2 Design QA workflow

Before merging significant UI work:

1. Compare implementation to approved design in target breakpoints.
2. Verify typography, spacing, colors, interaction states, and motion.
3. Test keyboard navigation and screen reader semantics.
4. Test with long text, short text, unusual page sizes, and error states.
5. Record deviations explicitly; do not silently accept “close enough.”

## 17.3 Visual craft applies to our product too

A product that critiques alignment and spacing must be unusually disciplined about its own spacing, typography, and visual clarity.

---

# 18. Accessibility standard

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

# 19. Performance standard

## 19.1 Perceived performance

Users should understand progress. Avoid blank screens and indefinite spinners.

Show stages such as:

```text
Validating file
Extracting document structure
Checking ATS reading order
Measuring spacing and hierarchy
Reviewing content evidence
Preparing your report
```

Never claim a step is complete until it is actually complete.

## 19.2 Performance budgets

Set and track budgets for:

- Frontend initial route load.
- Report interaction latency.
- Canvas zoom/pan responsiveness.
- Upload-to-first-result time.
- Deterministic analysis stage duration.
- LLM optional enhancement duration.
- Export completion time.

## 19.3 Optimization order

1. Remove unnecessary work.
2. Cache immutable extraction artifacts.
3. Parallelize independent stages.
4. Move expensive work to workers.
5. Optimize data transfer and rendering.
6. Only then consider model/hardware complexity.

---

# 20. Data and corpus operating standard

## 20.1 Reference data is not a growth hack

The team will not scrape, bulk-copy, or quietly train on resumes from social platforms. The reference corpus is a high-trust dataset and must be built slowly.

## 20.2 Curator workflow requirements

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

## 20.3 Aggregation-first insight

Default user-facing cohort insights should be statistical and de-identified. Raw examples require a higher consent tier and must never expose private personal data.

## 20.4 Dataset change control

Before a document affects cohort recommendations:

- It passes curation.
- It is redacted/minimized as required.
- Its metadata is reviewed.
- It is added through a versioned cohort build.
- Statistical impact is evaluated.
- The cohort version is publishable and reversible.

---

# 21. Documentation standards

## 21.1 Documents we maintain

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

## 21.2 Writing quality

Good technical docs state:

- Context.
- Decision/problem.
- Constraints.
- Alternatives considered.
- Consequences.
- Owner and revision date.
- How to validate the decision.

Avoid aspirational documents that have no operational consequence.

---

# 22. Meeting system

## 22.1 Weekly product-engineering review (45 minutes)

Agenda:

- What changed for users?
- Which quality metrics moved?
- Top user feedback and support signals.
- Cross-functional blockers.
- Decisions needed this week.

## 22.2 Weekly technical review (45–60 minutes)

Agenda:

- Architecture changes/RFCs.
- Reliability and cost dashboard.
- Security/privacy changes.
- Analysis quality regressions.
- Upcoming risky launches.

## 22.3 Daily async update

Each engineer posts:

```text
Yesterday: shipped/learned
Today: intended outcome
Blocked by: specific decision/dependency
Risk: quality/security/performance concern if any
```

Avoid performative status reports. The purpose is coordination and early risk detection.

## 22.4 Design critique

Use critique to improve work, not approve taste. Discuss user goal, hierarchy, clarity, edge cases, accessibility, and interaction behavior.

---

# 23. Hiring bar

## 23.1 What we look for

- Strong fundamentals in their discipline.
- Product judgment and empathy for users.
- Evidence of shipping and owning work in production.
- Clear written communication.
- Curiosity and willingness to challenge assumptions.
- Respect for privacy, security, and quality.
- Ability to simplify complex systems.
- Collaborative behavior under disagreement.

## 23.2 Interview signals by discipline

### Full-stack/backend

- Can design reliable async workflows.
- Understands data lifecycle and authorization.
- Writes clear APIs and handles failure modes.
- Can debug production behavior using evidence.

### Frontend

- Demonstrates visual and interaction craft.
- Understands accessibility and performance.
- Can turn complex data into clear information hierarchy.
- Treats states beyond the happy path as first-class.

### Applied ML/document intelligence

- Can distinguish extraction, classification, ranking, and generation tasks.
- Understands evaluation beyond benchmark theater.
- Knows when rules are better than models.
- Takes privacy/data provenance seriously.

### Product/design

- Can turn vague user pain into a clear workflow.
- Understands information density and decision-making.
- Uses research without outsourcing judgment to it.

## 23.3 Hiring anti-signals

- Treats LLM output as truth.
- Chases novelty without measurement.
- Cannot explain trade-offs in writing.
- Dismisses testing/security/design as someone else’s problem.
- Values speed over user trust in sensitive domains.

---

# 24. Career growth and mentorship

## 24.1 Growth expectations

Engineers grow by increasing:

- Scope of ownership.
- Technical judgment.
- Product impact.
- Ability to make others more effective.
- Reliability and quality of decisions.
- Communication clarity.

## 24.2 Senior engineer expectations

- Delivers ambiguous projects end-to-end.
- Improves system quality beyond assigned tickets.
- Writes useful RFCs and reviews.
- Coaches others through technical decisions.
- Anticipates operational and privacy risks.

## 24.3 Staff-level expectations

- Creates leverage across domains.
- Resolves architectural ambiguity.
- Establishes engineering standards and reusable systems.
- Connects technical decisions to product strategy.
- Raises the quality bar through mentorship and decision-making.

---

# 25. Release checklist

## 25.1 Product readiness

```text
[ ] User problem and success metric are clear.
[ ] Primary, empty, loading, and failure states are complete.
[ ] Copy explains confidence and limitations.
[ ] Findings are evidence-linked.
[ ] No claim implies guaranteed hiring outcome.
```

## 25.2 Technical readiness

```text
[ ] Feature flag and rollback plan exist if risk is material.
[ ] Tests and regression fixtures pass.
[ ] API and database migrations are deployed safely.
[ ] Observability dashboard and alerts exist.
[ ] Performance budget is met.
[ ] Error handling is user-safe and developer-actionable.
```

## 25.3 Security and privacy readiness

```text
[ ] Authorization paths tested.
[ ] Inputs validated.
[ ] No raw PII in logs/analytics.
[ ] External data sharing has explicit privacy path.
[ ] Retention/deletion behavior is defined.
[ ] Threat model reviewed where applicable.
```

## 25.4 AI readiness

```text
[ ] Prompt/model/rule versions recorded.
[ ] Structured output validation enabled.
[ ] Groundedness tests pass.
[ ] Unsupported claim behavior is safe.
[ ] Cost/rate limits set.
[ ] User can decline/dismiss AI suggestion.
```

---

# 26. First 90-day execution plan

## Days 1–30: build the trustworthy core

- Establish repository structure, coding standards, CI, environments, and ownership map.
- Migrate persistence to Postgres and private object storage.
- Build secure PDF/DOCX upload pipeline and canonical Document IR.
- Create initial golden-document fixtures and analysis harness.
- Ship basic analysis report shell with meaningful loading/error states.
- Establish threat model and deletion policy before storing real user documents.

## Days 31–60: prove the analysis advantage

- Implement ATS extraction preview and deterministic reading-order diagnostics.
- Implement geometry-based checks: margin, clipping, spacing, alignment, type hierarchy.
- Implement semantic sections, bullet evidence features, and job-description match.
- Build evidence-linked report cards and visual canvas overlays.
- Conduct internal dogfood with a curated set of safe resumes.

## Days 61–90: add governed intelligence

- Ship curator intake, consent/provenance states, audit records, and removal workflow.
- Build first narrow cohort with aggregate-only insights.
- Add constrained LLM rewrite scaffolds with support mapping.
- Run expert-review evaluation and tune rules based on false positives.
- Prepare private beta readiness review with reliability, privacy, cost, and UX metrics.

---

# 27. Operating mantras

- **A finding without evidence is an opinion.**
- **A rewrite without support is a hallucination risk.**
- **A public document is not automatically reusable data.**
- **A score is a summary, not a verdict.**
- **A resume is a person’s story; treat it with care.**
- **If we cannot explain a system, we do not yet control it.**
- **If a feature cannot be evaluated, it is an experiment—not intelligence.**
- **Fast is valuable only when safe, understandable, and reversible.**
- **Taste is implemented through details.**
- **The user should always remain the author of their own resume.**

---

# 28. Team pledge

We will build GoldLens with the standard expected of a team whose work may influence how people represent their careers.

We will be ambitious about intelligence and conservative about truth. We will obsess over details—from a one-pixel alignment error to a flawed data-consent pathway—because both can damage trust. We will write systems that are inspectable, secure, resilient, and humane. We will measure quality, listen to users, learn quickly, and never sacrifice long-term credibility for a flashy demo.

That is how GoldLens becomes not merely feature-rich, but genuinely exceptional.
