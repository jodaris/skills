---
name: jodaris-design
description: Design and review human-facing interfaces, visual systems, responsive layouts, accessibility and interaction motion. Use for UI/UX implementation or critique; backend architecture, security controls and model behavior are outside this skill. A different project-designated provider takes precedence.
license: MIT
metadata:
  domain: interface-design
---

# JODARIS Design

## Domain boundary

Own human-facing interface behavior and presentation: task flows, information hierarchy, visual tokens, responsive layout, accessibility and interaction states. A login-screen layout or permission-message design belongs here; changing the authentication or authorization decision belongs to a security workflow.

Use the project's designated interface-design skill when one exists. Use one provider for this domain; do not load a second design skill to repeat the same workflow. Apply this skill as that provider when selected by the project or relevant task.

## Design workflow

1. Establish the primary user task, audience, real content and success condition. Inspect the affected screen, existing design documentation, tokens, components and installed stack. A targeted fix should stay targeted.
2. For a new visual direction, choose a coherent hierarchy, typography, density, color and imagery treatment grounded in the product. For an established product, extend its language. Read [visual direction](references/visual-direction.md) when making these choices.
3. Specify the primary path and the relevant loading, empty, error, success, disabled and permission states. Preserve drafts through recoverable failures. Use [interaction and accessibility](references/interaction-accessibility.md) for forms, navigation, dialogs, tables or localization.
4. Implement through existing primitives and public component APIs. For React or shadcn projects, read [React and component integration](references/react-components.md). Component API redesign remains a separate software-architecture deliverable.
5. Add motion only when it helps communicate state or continuity. Read [motion](references/motion.md) when movement is in scope; preserve an understandable reduced-motion experience.
6. Inspect the rendered result and complete the changed interaction. Use [verification](references/verification.md) for browser evidence, responsive checks and automated accessibility testing. Report what was exercised and any remaining unverified states.

## Reusable decisions and optional tools

Keep the entrypoint and its relative `references/` folder together when installing or exporting this skill. The workflow works without another skill, searchable dataset, MCP server, account or JavaScript framework. Detect available tooling; use the local guidance if an optional integration is absent. Do not claim to have queried a database or exercised a browser without doing so.

For a substantial new system, record durable decisions in the project's existing design document; use `DESIGN.md` only when there is no established home and a saved specification is useful to the requested work. Capture task, hierarchy, semantic tokens, component states, responsive behavior, motion and acceptance checks. Keep page exceptions explicit and preserve prior decisions.

The [source selection](references/source-selection.md) explains the reviewed upstream resources, conditional integrations and exclusions. Consult it when choosing tools or extending this skill; it is not a requirement to install or load the listed providers. Upstream aesthetic preferences are options, not universal rules. Use the project's framework and primitives; no library, font or palette is mandatory.

Backend structure and API compatibility belong to software architecture; trust and adversarial defenses belong to security; prompts and retrieval quality belong to AI engineering. Add those workflows only for a distinct deliverable. Presentation decks, architecture analysis and procedural 3D assets need their own appropriate tooling when requested.
