# JODARIS Skills

Focused skills for **Codex** and **Claude Code**, covering interface design, application security, software architecture, and AI engineering. Use them across projects and technology stacks while keeping your existing conventions and tools.

## Choose a skill

| Skill | What it helps you do |
| --- | --- |
| **[Design](src/jodaris-design/SKILL.md)** · `jodaris-design` | Improve user flows, visual hierarchy, responsive layouts, and accessibility. |
| **[Security](src/jodaris-security/SKILL.md)** · `jodaris-security` | Design and review authorization, trust boundaries, sensitive-data handling, and defenses against malicious input. |
| **[Software engineering](src/jodaris-software-engineering/SKILL.md)** · `jodaris-software-engineering` | Define module responsibilities, dependency direction, public APIs, and compatibility contracts. |
| **[AI engineering](src/jodaris-ai-engineering/SKILL.md)** · `jodaris-ai-engineering` | Improve prompts, retrieval, response schemas, model evaluations, and inference budgets. |

Each skill has a distinct domain. Choose the skills relevant to your task. If your project already uses a specialist for that domain, keep one provider rather than loading overlapping guidance.

## Install

### Claude Code

Add the marketplace in a Claude Code session:

```text
/plugin marketplace add jodaris/skills
```

Install a skill, for example:

```text
/plugin install jodaris-design@jodaris
```

Replace `jodaris-design` with another skill ID from the table. Choose the installation scope offered by Claude Code to use it personally or in a project. See the [Claude Code installation guide](https://code.claude.com/docs/en/discover-plugins) for supported clients and plugin management.

### Codex

1. Download and extract the source archive from a [published release](https://github.com/jodaris/skills/releases).
2. Copy `codex/jodaris-design/skills/jodaris-design` into your project's `.agents/skills/` directory.
3. Open Codex in that project and reference the skill in your request:

```text
$jodaris-design improve the accessibility and layout of this settings page.
```

The installed folder should contain `.agents/skills/jodaris-design/SKILL.md`. Replace `jodaris-design` with another skill ID to install a different domain. See the [Codex skills guide](https://developers.openai.com/codex/skills/) for skill discovery and additional installation locations.

## Use the skills

Describe the outcome you want and name the relevant skill when you want to select it explicitly. For example:

- Use `jodaris-design` to improve a form's layout and keyboard interaction.
- Use `jodaris-security` to review a server endpoint's authorization checks.
- Use `jodaris-software-engineering` to define module boundaries and an API migration.
- Use `jodaris-ai-engineering` to evaluate retrieval quality and improve grounded responses.

For work spanning several domains, apply each skill to its own part of the task. Your project's requirements, architecture, and established workflows remain the context for the work.

## Updates

Use [GitHub Releases](https://github.com/jodaris/skills/releases) to choose a version for a reproducible setup. Update Claude Code installations through its plugin manager. For manually installed Codex skills, replace the installed skill folder with the corresponding folder from the new release, preserving any local customizations.

## License

[MIT](LICENSE).
