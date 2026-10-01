# AI evaluation and adoption policy

Specification date: 2026-09-30. No model benchmark, provider purchase or real-document transmission has been performed for this package.

## Client explanation

GoldLens should measure what the file itself can tell us before asking a model to interpret writing. Optional AI can help explain evidence or propose clearer wording. It must not invent career facts or become necessary to open a basic report.

Jev and Laya are possible helpers for small classification decisions, such as whether a sentence states an outcome. Neither is selected for production. A well-formed answer can still be incorrect.

## Technical detail (optional)

The client identified [TypeSafe's Jev introduction](https://typesafe.ai/blog/introducing-system-one-models-and-jev) and [NandhaKishorM's Laya repository](https://github.com/NandhaKishorM/laya). These sources were inspected during planning on 2026-09-30. Jev describes typed probabilistic decisions rather than free-form prose. Laya describes self-hostable choice/score/yes-no decisions and documents checkpoint/input-length limits. These are supplier descriptions, not GoldLens performance evidence. Revalidate exact releases, licenses, API availability and terms before installing or transmitting content.

## Capability allocation

| Need | First implementation | Model candidate / boundary |
|---|---|---|
| Margins, positions, clipping, font metadata | Native PDF/DOCX extraction and rules | No generative substitute for measured geometry |
| Scanned text | Approved OCR with token confidence | Conditional OCR; no precise font claims from weak scans |
| Sections | Styles/known headings/rules with source spans | Optional section classifier when ambiguous |
| Bullet anatomy | Exact source features and reviewed rules | Laya/Jev may classify outcome/ownership signals |
| Job relevance | Lexical aliases then evaluated embeddings | Classifier may assess evidence match; similarity is not proof |
| Narrative interpretation | Contextual evidence rules | Optional explanation labelled inference |
| Rewrite | Existing LiteLLM integration, constrained schema and support checks | Generative model required for prose; decision models cannot replace it |
| Consent, authorization, source admissibility | Deterministic policy + authorized human review | Models never grant permissions or verify employment |
| Cohort explanation | Published eligible aggregates | Optional generation receives aggregate data, not raw reference documents |

## Dataset and rubric

GL-QA-001 supplies versioned synthetic/owned/consented fixtures. Keep training/tuning, calibration and held-out evaluation partitions separate by source document and near-duplicate family. Label leakage includes rewriting the same resume into both partitions. Record document languages, format, audience, permission, labelers, ambiguity and adjudication.

For typed decisions start with: section category; explicit outcome present; source passage supports named job requirement; should abstain/escalate due to ambiguity. Each task has an explicit allowed label set and evidence definition. “Truth of the career claim” is not a label the model can know from text alone. Allow unknown/abstain rather than forcing a yes.

At least two competent reviewers label subjective examples independently. Preserve disagreements and adjudication rationale; do not use another LLM's majority vote as ground truth. Review fair counterfactuals with changed names/institutions/demographic hints and unchanged job-relevant evidence.

## Reproducible comparison

1. Freeze task definitions, held-out set and evaluation metrics before scoring.
2. Compare simple rules, existing application methods, Laya and Jev only where authorized access exists. Missing access is a limitation, not a fake score.
3. Record code revision, input transformations, model/checkpoint digest, precision/runtime/device, context limits, batching, questions, thresholds and output schema.
4. Measure per-class precision/recall, confusion matrix, abstention/coverage and accuracy at retained coverage. For probability outputs measure calibration, Brier score and reliability bins with sample counts.
5. Measure cold start separately from warm p50/p95 latency; include real input lengths, memory, throughput and total cost of hosting/requests/operation. Supplier speed claims are not targets achieved here.
6. Test long resumes with evidence at beginning/middle/end, truncated input detection, multilingual text, negation, ambiguous wording and repeated/paraphrased questions.
7. Test hidden instructions, malicious markup, out-of-label responses, timeouts, rate limits and unavailable checkpoints. No benchmark runs arbitrary document instructions.
8. Report uncertainty intervals and subgroup sample sizes; small samples cannot justify broad claims.

## Adoption gates

GL-BASE-003/GL-AI-003 must freeze numeric task thresholds before the held-out evaluation. Proposal defaults for review: at least 200 held-out labeled decisions per candidate task, no observed regression on safety-critical negatives, and demonstrable benefit in quality or cost at comparable quality over rules. A small test set is exploratory, never production proof.

Acceptance requires held-out quality, useful abstention, verified license/privacy terms, documented runtime cost, bounded input handling, deterministic safe fallback, versioned configuration and independent review. Fail any mandatory gate: retain baseline, record candidate rejection/deferment. Do not tune on held-out failures and report them as untouched results.

Laya experiments run outside the primary API process so model loading cannot exhaust web-worker memory. Pin artifacts and validate offline/runtime network behavior. Jev is an external data processor when called remotely; apply the same consent/provider gates as generative AI. Do not assume either has a supported LiteLLM adapter without verifying it. Use a small typed adapter only if adoption is justified.

## Generation safeguards

Every proposed factual change needs a source support link or explicit user-supplied additional evidence. Test employers, titles, dates, technologies, responsibilities, metrics, outcomes and scope separately. Unsupported additions are rejected or returned as unaccepted evidence requests. User confirmation is not an automatic way to certify fabricated provider output.

Protect original dates/contact/custom sections through the existing preservation logic. Compare source revision at acceptance and preserve atomic preview replay. No automatic submission to employers. Never let a model trigger file/network/admin actions.

Version prompts and redaction rules. Validate structured output before applying business logic. Network retry and invalid-output retry share one bounded budget; record terminal errors honestly. No external prompt/response logging by default. Consent withdrawal blocks not-yet-dispatched calls; an already sent request follows the approved provider policy.

## Release evidence and model card

For each adopted model/task publish internally: purpose, prohibited uses, exact version, training-data knowledge/unknowns, evaluation dataset rights, results by task/audience, confidence limitations, input handling, cost/latency, privacy route, owner, monitoring and rollback. Publish user-facing limitations without private fixtures. New prompt/rule/model versions require regression evaluation before enabling.

Do not optimize solely for user acceptance; flattering advice may be wrong. Monitor expert relevance, unsupported-claim attempts, false positives, user dismiss/intentional feedback and ATS regressions after edits. Optional model failure must leave deterministic analysis usable.

Later narrow training requires a separate approved dataset purpose and manifest, contributor withdrawal handling, calibration and model-version recovery. The current plan authorizes no autonomous retraining or use of uploaded resumes as training fuel.
