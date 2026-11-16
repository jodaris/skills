# Source selection and optional integrations

Reviewed 2026-11-16. These are design references and tool choices, not a dependency list to install wholesale. The bundled guidance is independently written; no upstream skill text, searchable database, component collection or third-party code is redistributed here. Upstream names, licenses and installation requirements remain theirs. Recheck source/version/license before copying code or assets.

## Selected foundations

| Source | What informs this skill | Boundary |
| --- | --- | --- |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Product context, semantic design decisions, stack-aware implementation and state review | Optional external dataset; no local installation path or mandatory search |
| [Impeccable](https://github.com/pbakaus/impeccable) | Focused critique, refinement, hierarchy and removal of unnecessary visual noise | Use the relevant refinement, without importing a parallel command suite |
| [Emil Kowalski's skills](https://github.com/emilkowalski/skills) | Interaction detail, form usability and motion tied to user intent | Adapt timing and implementation to the product |
| [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Semantics, focus, responsive content handling and rendered review | Local guidance remains usable offline; exact upstream audits may consult its current rules |
| [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) ([listed mirror](https://agenticskills.io/skills/frontend-design)) | Product-specific visual rationale and intentional typography/composition | Existing brand and explicit brief take precedence over stylistic preferences |

These inform one interface-design workflow. Do not automatically install or activate all five providers alongside JODARIS or a project-designated provider.

## Select only when the task needs it

| Resource | Selection rule |
| --- | --- |
| [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | React/Next.js rendering and perceptible performance; preserve supported package exports and project caching |
| [Vercel composition patterns](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | Reusable React component composition; public API changes belong to the architecture workflow |
| [Official shadcn skill](https://ui.shadcn.com/docs/skills) | Projects already using or explicitly adopting shadcn; inspect configuration and primitive APIs |
| [shadcn MCP](https://ui.shadcn.com/docs/mcp) | Optional connected registry discovery; fall back to local source and official docs |
| [Motion](https://github.com/motiondivision/motion) | React layout/gesture/enter-exit behavior when CSS or the installed engine is insufficient |
| [Playwright](https://github.com/microsoft/playwright) | Repeatable rendered interaction tests, screenshots and optional axe scans |
| [playwright-cli](https://github.com/microsoft/playwright-cli) | Optional agent-led browser exploration; not required in addition to a working browser tool |
| [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Inspiration for a durable design specification; derive the project's decisions instead of copying another brand |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | A requested diagram deliverable needing deliberate visual composition; use an available artifact tool |

## Specialist resources outside the default baseline

| Resource | Why it is conditional or deferred |
| --- | --- |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | Overlapping design direction; use as an explicitly selected alternative or reference rather than another automatic provider |
| [archify](https://github.com/tt-a1i/archify) | Interactive explanatory diagrams are a separate artifact task; architecture conclusions need the architecture owner |
| [ppt-master](https://github.com/hugohe3/ppt-master) | PowerPoint generation needs a deck workflow, rendering and artifact validation |
| [img2threejs](https://github.com/img2threejs/img2threejs/tree/main/skills) | Reference-image reconstruction into procedural 3D is specialist asset work with a separate runtime budget |
| [GSAP](https://github.com/greensock/GSAP) | Add for justified complex choreography; avoid a second animation engine for ordinary component feedback |
| [Lenis](https://github.com/darkroomengineering/lenis) | Add only for a requested smooth-scroll experience after testing native navigation and reduced motion |
| [React Bits](https://github.com/DavidHDev/react-bits) | Evaluate individual components, performance and terms; its MIT + Commons Clause terms are not plain MIT |
| [21st.dev Codex plugin](https://github.com/21st-dev/codex-plugin) | Optional external component/video service with account/tool availability; not a portable prerequisite |

Keep tool configuration local to the consuming project and install only packages that its chosen workflow uses. Runtime animation/component libraries belong in runtime dependencies or intentional peers; generators, browser runners and accessibility scanners belong in development dependencies. This skill does not configure accounts, install MCP servers or execute upstream installers on activation.
