---
name: jodaris-security
description: Design or review trust boundaries, identity and authorization controls, sensitive-data protection and adversarial defenses. Use when these security properties change or need assessment; routine coding, presentation and model-quality tuning are outside this skill. A different project-designated provider takes precedence.
license: MIT
metadata:
  domain: application-security
---

# JODARIS Security

## Domain boundary

Own security properties: attacker/trust assumptions, authoritative identity, authorization and tenant isolation, sensitive-data protection, injection defenses and abuse/denial cases. Apply this workflow when those properties change or a security assessment is requested or warranted. A file being edited or an AI SDK being present does not by itself require a security review.

Preserve ordinary secure coding practices even when this specialist workflow is unnecessary. Use the project's designated security workflow as the single provider for this domain when one exists.

## Security workflow

1. Identify the assets, trust boundaries, possible attackers and the concrete security decision being changed.
2. Derive authorization from authoritative identity and resource/tenant scope at server read and mutation boundaries. Client visibility and client-supplied context are not authority.
3. Address security-relevant input hazards: injection, filesystem escape, unsafe subprocess construction and hostile content crossing a trust boundary. Keep credentials and sensitive data within the project's established storage, redaction and exposure controls.
4. Preserve the session/origin/CSRF protections and exact authorization or approval bindings relevant to the action. Do not add access grants or perform external deployment merely to test a code change.
5. Verify the relevant denial, cross-scope, malformed-adversarial-input and abuse cases. Report concrete security findings with evidence; distinguish hypotheses from demonstrated failures.

For model-backed systems, adversarial prompt/retrieval injection and tool authority are security work. Model-response schemas and normal quality/grounding evaluations belong to AI engineering. Module/API design and structural transaction, concurrency or recovery contracts belong to software architecture. Routine correctness fixes stay under project instructions; interface presentation belongs to design. Do not repeat their workflows as a generic security checklist.
