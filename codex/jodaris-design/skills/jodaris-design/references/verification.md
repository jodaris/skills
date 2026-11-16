# Verify the rendered interface

Use the project's existing browser/test workflow. If none is available, use an available browser tool for inspection and state what could not be tested. Do not require a specific host, installed browser skill or MCP server.

## Exercise the changed task

1. Start from the actual entry point. Complete the primary path with keyboard and pointer; check focus visibility, order, dismissal and return where relevant.
2. Inspect a narrow and wide viewport, supported appearances, long content and relevant loading/empty/error/success states. Check supported RTL and reduced motion when affected.
3. Capture the states that reveal the change. Inspect screenshots at usable size for clipping, overflow, spacing, contrast and layer defects. Screenshots alone do not establish keyboard behavior.
4. For important repeatable interactions, add a browser regression using meaningful outcomes. Use stable role/label locators and observable readiness; avoid arbitrary sleep and assertions tied only to CSS structure.

Use deterministic fixtures when comparing images. Wait for fonts and known async content, stabilize time-sensitive data, and mask only content whose variation is unrelated. Review visual diffs before accepting a new baseline. Keep tests and screenshots out of a shipped runtime bundle.

## Playwright and axe

For a JavaScript project needing repeatable browser verification, `@playwright/test` supplies the runner and Playwright CLI; `@axe-core/playwright` adds automated accessibility scans. Declare them in the development dependencies of each package/application that directly runs or imports them. Do not rely on another workspace's transitive installation. Browser binaries are a separate environment prerequisite.

From that package's directory, using its package manager:

```bash
pnpm exec playwright --version
pnpm exec playwright install chromium
pnpm exec playwright test --config playwright.config.ts
```

Run the last command only when an appropriate config and tests exist; installation does not create them. Reuse an existing local app server/base URL or configure a deliberate test server. A shared UI package needs a real fixture host or consuming app; installing a runner alone does not make components browser-renderable.

Example assertion inside a test, after navigating to and opening the intended surface:

```ts
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toEqual([]);
```

Import `test`/`expect` from `@playwright/test` in the test file. Scan relevant open/error states as well as the initial screen. Automated results cover only detectable issues; manually check keyboard, reading order, useful names, focus movement and the task itself. Record limitations rather than claiming full accessibility compliance from an empty violation list.

`playwright-cli` (`@playwright/cli`) is an optional exploratory interface for agents, separate from the repeatable test runner. Use an already available browser workflow before adding a second automation surface. Never describe a package-version check as a completed visual review.

Report: surface/route, tested task and states, viewports/appearance/locale/motion, observed result, evidence location and unverified checks. See [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) for current integration APIs.
