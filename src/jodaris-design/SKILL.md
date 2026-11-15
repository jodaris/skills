---
name: jodaris-design
description: Design interface interactions, visual hierarchy, responsive layouts and accessibility. Use for human-facing UX or presentation changes; backend architecture, security controls and model behavior are outside this skill. A different project-designated provider takes precedence.
license: MIT
metadata:
  domain: interface-design
---

# JODARIS Design

## Domain boundary

Own human-facing interface behavior and presentation: task flows, information hierarchy, visual tokens, responsive layout, accessibility and interaction states. A login-screen layout or permission-message design belongs here; changing the authentication or authorization decision belongs to a security workflow.

Use the project's designated interface-design skill when one exists. Use one provider for this domain; do not load a second design skill to repeat the same workflow. Apply this skill as that provider when selected by the project or relevant task.

## Interface workflow

1. Identify the user's task, primary action, information order and relevant loading, empty, error, success and permission states.
2. Reuse the project's visual language, components and semantic tokens. Specify behavior and appearance without redesigning package ownership or API architecture.
3. Keep controls labeled and keyboard reachable, preserve logical focus and focus return, and use semantic elements. Dialogs need a reachable close action and bounded scrolling.
4. Verify narrow/wide layouts, supported color modes, reduced motion, long translations and RTL when supported. Preserve user input after recoverable interface failures.
5. Inspect rendered output and exercise the changed interaction. Report observed visual/accessibility results and any unverified states.

Backend structure and API compatibility belong to software architecture; trust and adversarial defenses belong to security; prompts and retrieval quality belong to AI engineering. Add one of those workflows only for a distinct deliverable in its domain. Use the project's framework and primitives; this skill does not prescribe a UI library, font or palette.
