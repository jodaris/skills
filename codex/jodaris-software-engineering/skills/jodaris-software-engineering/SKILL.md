---
name: jodaris-software-engineering
description: Design module boundaries, dependency direction and public API contracts. Use for architecture or interface-contract changes; routine coding, UI/UX, security controls and model behavior are outside this skill. A different project-designated provider takes precedence.
license: MIT
metadata:
  domain: software-architecture
---

# JODARIS Software Engineering

## Domain boundary

Own software architecture and deterministic contracts: module responsibilities, dependency direction, public API/type ownership, interface compatibility and domain invariants. Select this skill when deciding or changing those structures. Routine implementation, a local bug fix, test execution or documentation editing alone does not activate it.

The stable plugin ID is `jodaris-software-engineering`; its scope is software architecture, rather than a catch-all development workflow. Follow the project's existing architecture and its designated provider for this domain.

## Architecture workflow

1. Trace the affected module boundaries, callers, public exports and deterministic domain contracts. Identify the existing owner of each responsibility.
2. Choose the lowest appropriate layer and dependency direction. Reuse the established abstraction or define the smallest necessary contract; avoid parallel APIs and copied internals.
3. Specify inputs, outputs, invariants, error semantics and compatibility for the affected public interface. Keep implementation details private and preserve strict type ownership.
4. For a structural or contract change, identify affected consumers and migration needs. Validate the changed boundary with consumer/compatibility checks and architecture tests where warranted.
5. Record the resulting ownership and public-contract decisions in the project's existing architecture documentation.

Human-facing interactions and visuals belong to design. Authentication, authorization, secrets and adversarial threat assumptions belong to security. Prompt/retrieval behavior, model-response schemas, model evaluations and inference budgets belong to AI engineering. Coordinate only the separate domain decisions requested by the task. Ordinary implementation, testing and reporting continue under repository instructions without loading this skill for every edit.
