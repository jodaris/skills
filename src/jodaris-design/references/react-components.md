# React and component integration

Read only for React/Next.js or shadcn-based interfaces. Other stacks should use their existing framework primitives.

## Preserve component behavior

Search for the project's button, field, dialog, menu, table, icon and status components before adding equivalents. Consume supported exports; a bundle optimization does not justify a private deep import. Preserve accessible names, focus, refs, events and polymorphic semantics when styling or composing primitives. Avoid nested interactive controls such as a button inside a link.

Use explicit variants or composition when many boolean props obscure valid states. Keep related state at its appropriate owner; introduce context only when several coordinated parts need it. Redesigning a public component contract needs the project's architecture workflow. Check the installed React version before using version-specific ref or context features.

## React and Next.js rendering

Keep client boundaries near the interaction that requires them. Stable first-render content prevents hydration and layout shifts: do not render random values, a browser-only locale choice or a changing clock differently on server and client. Reserve image/placeholder dimensions and use the framework's supported asset handling.

Prioritize visible latency and large costs: avoid unnecessary serial requests for independent UI data, defer heavy optional panels, keep typing responsive and profile expensive lists. Preserve the project's data-fetching and cache model. Memoization, virtualization and dynamic loading should solve an observed or credible cost, not become requirements for every component. Do not move authorization, provider selection or request orchestration into a client component while polishing a screen.

## shadcn/ui integration

Use this section only when the project uses shadcn or asks to adopt it. Inspect `components.json`, aliases, CSS/token files, installed primitives and the owning package. Determine Radix versus Base UI, Tailwind version and component API from that project; similar names do not guarantee compatible implementations.

The official shadcn skill and MCP server are optional API/registry aids. If a registry tool is connected, inspect an item's source, dependencies and destination before adding it. Otherwise consult official component/CLI documentation. Existing local components take precedence over a registry example. Preview generator changes and reconcile theme/config edits; do not run initialization over an established system to obtain a single component.

Install CLI/build/test tools as development dependencies of their actual owner. A library imported by shipped UI is a runtime dependency or intentional peer, even if a registry command installed it. Keep generated reusable primitives in the shared UI package and application composition in the application. Review copied component licenses and asset provenance, including items obtained through React Bits or 21st.dev.

Official references: [shadcn skills](https://ui.shadcn.com/docs/skills), [shadcn MCP](https://ui.shadcn.com/docs/mcp), [Vercel React guidance](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), [composition patterns](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns). Consult current documentation for the installed versions when exact APIs matter.
