# JODARIS portable skills

Edit canonical workflows under `src/`. Run `node scripts/build.mjs`, then `node scripts/build.mjs --check` and `node --test tests/*.test.mjs` before publishing. `codex/` and `claude/` are generated public distributions; do not edit them independently. Increment `catalog.json` and `package.json` together for a new release. Published versions are immutable.

Keep every generic skill platform agnostic and independent of CloudIgniter internals, private tools, machine paths and credentials. Preserve the caller's scope, authorization and established repository standards. CloudIgniter-specific content is maintained in its own repository and is never part of this public inventory.

Review descriptions for precise discovery and keep essential instructions short. New helpers need concrete reuse or reliability value. Update installation guidance and meaningful validation with changes to packaging or release behavior.

## One owner per domain

Each portable skill must declare exactly one primary `domain` in catalog.json and matching SKILL.md metadata, a focused activation description, unique owned capabilities and explicit exclusions. Keep common coding, validation, documentation and permission practices in project instructions rather than repeating them across specialist skills. A new skill must own an uncovered domain; extend its existing owner when the domain is already covered.

Select the smallest set of skills needed for the requested outcomes. Use the project's designated provider for a domain; otherwise select its matching JODARIS skill. Do not load multiple providers for the same domain. For mixed work, apply each skill only to its own distinct deliverable. Do not add a router skill, keyword dispatch or a rule that loads the entire suite automatically. Domain validation catches structural collisions; review descriptions and realistic requests for semantic overlap as well.
