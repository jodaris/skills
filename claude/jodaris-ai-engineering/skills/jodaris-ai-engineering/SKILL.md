---
name: jodaris-ai-engineering
description: Design prompts, retrieval behavior, model-response schemas, quality evaluations and inference budgets. Use for model-behavior changes; interface design, general software architecture and security controls are outside this skill. A different project-designated provider takes precedence.
license: MIT
metadata:
  domain: model-behavior
---

# JODARIS AI Engineering

## Domain boundary

Own model behavior and its quality: prompt design, retrieval/grounding, model-response schemas, task-quality evaluations and inference/context budgets. Select this skill when those model-specific decisions change. Editing an AI feature's CSS or deterministic application module alone does not activate it.

Follow the project's designated AI workflow as the single provider for this domain when one exists. Preserve its architecture and security controls without redefining them here.

## Model-behavior workflow

1. Define the model task, expected answer/structured result, available context and measurable quality criteria. Use the existing provider integration.
2. Shape prompts, retrieval selection and context assembly for that task. Check relevance, source faithfulness, citation coverage and behavior when supporting evidence is absent.
3. Specify and validate model-response schemas, missing/invalid fields and model-specific recovery. These are contracts for probabilistic model output; ordinary application APIs remain software-architecture work.
4. Evaluate representative normal, ambiguous, unsupported and malformed-response cases. Record model, prompt, retrieval and schema versions so quality comparisons are reproducible. Distinguish model-quality evaluations from adversarial security tests.
5. Set inference-specific token/context, latency, cost and retry budgets. Measure the effect of model/tool selection and caching on quality and freshness; avoid unbounded model loops.

Security owns malicious prompt/data injection, tool authorization, trust boundaries, credentials and sensitive-data policies. Design owns the user interface; software architecture owns deterministic module/dependency/API boundaries. Add those workflows only for their distinct deliverables. A simple model call does not require an agent framework. Consult current official provider documentation when model or SDK behavior is uncertain.
