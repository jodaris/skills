# JODARIS skills

Portable development guidance for Codex and Claude Code. The four independent plugins cover design, security, software engineering and AI engineering. They respect each project's architecture, tools and explicit requirements.

## Domain ownership

| Plugin | Exclusive specialist domain | Typical trigger |
| --- | --- | --- |
| `jodaris-design` | Human-facing interface design | Change a user flow, layout, visual state or accessibility behavior |
| `jodaris-security` | Application security | Change or assess trust, authorization, sensitive-data exposure or adversarial defenses |
| `jodaris-software-engineering` | Software architecture and public contracts | Change module responsibilities, dependencies or API compatibility |
| `jodaris-ai-engineering` | Model behavior and inference quality | Change prompts, retrieval, model-response schemas, quality evaluations or inference budgets |

Use one provider per domain, preferring a workflow already designated by the project. Load another domain skill only for a separate deliverable. Restyling a login form uses design; changing its authorization gate uses security. Tuning retrieval uses AI engineering; reviewing malicious retrieved instructions uses security. Routine coding does not automatically load the software-architecture skill. General safe development practices still apply through project instructions.

`catalog.json` records primary domains, exclusive capability ownership and excluded domains. The builder rejects duplicate owners, missing/invalid domains, repeated capability ownership and descriptions that drift from source skills. These checks support semantic review; they do not prove that a model will always route a request correctly.

## Use a release

Download a version from [GitHub Releases](https://github.com/jodaris/skills/releases) or check out its immutable `v<version>` tag. Codex plugin packages are under `codex/<plugin-id>`; Claude Code packages are under `claude/<plugin-id>`. Each package contains its own skill and client manifest. Install plugins through the supported client workflow. For Claude Code, add this GitHub repository as a plugin marketplace (`/plugin marketplace add jodaris/skills`), then install the selected plugin (`/plugin install jodaris-design@jodaris`). For local testing use `claude --plugin-dir ./claude/jodaris-design`.

For Codex, use the client's local plugin installation workflow with `codex/<plugin-id>`. Where plugin installation is unavailable, copy only `skills/<plugin-id>` from that package into the project's `.agents/skills/` directory. For standalone Claude skills use `.claude/skills/`. Choose one installation method per skill to avoid duplicate discovery. Installation does not grant tools or credentials.

## Develop and release

Requires Node.js 22.14 or later and no npm dependencies. Edit `src/`, run `npm run build`, `npm run check` and `npm test`. Commit the source and both generated distributions together. Increment both the catalog and package version before changing a published release. `skills-release.json` records the exact public file inventory and SHA-256 hashes.

CloudIgniter Publisher's Skills section reviews and submits this inventory to `jodaris/skills` through a pull request, using the selected GitHub account. It preserves files outside the prior release inventory and refuses reused versions. After review and merge to `main`, the release workflow validates the distributions and creates the version tag and a GitHub Release with the integrity manifest. Configure branch protection and required review on the public repository separately. Initial publishing requires the public repository to exist with `main` as its default branch and the selected Publisher account to have write access. For an empty repository, the publication review includes a minimal initial README; Publisher initializes that base, then submits the skills through the normal release pull request. It does not overwrite an existing README during initialization. When separate publication roles are configured, repository initialization ends as an owner-only action; switch to the configured author to create the release PR. In the JODARIS setup, `Shadi-Ayoub` submits changes while `jodaris` approves and performs the final merge. The included CODEOWNERS assigns review to `@jodaris`; repository rules must enforce required owner approval, the quality check and owner-only merges.

CloudIgniter's maintainer and application plugins have separate ownership and releases. They are not included in this platform-agnostic public repository.
