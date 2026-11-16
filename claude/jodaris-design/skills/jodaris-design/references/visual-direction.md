# Visual direction and design systems

Use this reference for new pages, visual refreshes, token choices and design critique.

## Establish a direction

Read the current interface and any `DESIGN.md`, brand guide or token source first. Identify the audience, primary task, content density and environment: a frequent-use operations table and a public campaign have different needs. Preserve an existing product's identity unless a redesign is requested.

For a new direction, state a short rationale connecting the product to its type, palette, composition and imagery. Use actual headings, labels and representative data early. Test the longest useful content before refining decoration. Distinctiveness can come from proportion, editorial structure or relevant imagery; it does not require animation or unusual navigation.

If an installed UI/UX Pro Max dataset is useful, resolve its search script from that installation and query the detected stack and product context. Treat results as candidates. This package does not bundle that dataset or promise database results. Do not install another domain provider merely to complete a normal design task.

## Make the system implementable

| Decision | Useful specification |
| --- | --- |
| Hierarchy | Primary task and action, reading order, secondary actions and disclosure |
| Type | Existing families, size/weight/line-height roles, readable measure, fallback and loading behavior |
| Color | Semantic foreground/background pairs for surfaces, actions, status, borders and focus in supported modes |
| Geometry | Spacing rhythm, content width, control size, radius and meaningful layer relationships |
| Imagery | Purpose, source/license, crop, aspect ratio, fallback and text alternative |
| Responsive behavior | What wraps, reorders, becomes scrollable or changes navigation; preserve the same task |

Use tokens already supported by the project. Measure rendered text contrast against its actual surface; target WCAG AA text contrast (4.5:1 for ordinary text, 3:1 for qualifying large text) and 3:1 for relevant control boundaries and state indicators. Color alone must not carry status. Respect the project's stronger requirements.

Use tabular numerals where comparisons benefit, consistent icon geometry and clear action names. Reserve space for images and async content. Let text enlarge and wrap; fix overflow at its source, and keep intentional table/code scrolling within its container. Use logical properties for direction-aware spacing.

## Critique in order of effect

Fix an unclear task or information hierarchy before ornament. Then examine spacing/grouping, typography, contrast, alignment, component consistency and state completeness. A repeated card grid, gradient, oversized hero or decorative badge should have a content purpose; do not impose a blanket ban on a visual technique that suits the brief.

For a review, describe the observed problem, its effect on the user's task, the location and a concrete correction. Preserve working conventions. Avoid replacing a small fix with a new theme or silently copying another product's identity.
