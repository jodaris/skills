import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { buildSkills } from "./build.mjs";
await buildSkills(process.cwd(),true);
const manifest=JSON.parse(await readFile("skills-release.json","utf8"));
const repository=process.env.GITHUB_REPOSITORY,sha=process.env.GITHUB_SHA;
if(repository!=="jodaris/skills"||process.env.GITHUB_REF!=="refs/heads/main"||! /^[a-f0-9]{40}$/.test(sha||""))throw Error("Release requires canonical main workflow");
const run=args=>execFileSync("gh",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"]});
let existing;
try{existing=JSON.parse(run(["api",`repos/${repository}/releases/tags/v${manifest.version}`]));}catch(e){if(!String(e.stderr).includes("404"))throw e;}
if(existing){
 const prior=JSON.parse(Buffer.from(JSON.parse(run(["api",`repos/${repository}/contents/skills-release.json?ref=v${manifest.version}`])).content,"base64").toString());
 if(prior.digest!==manifest.digest)throw Error("Published version is immutable; increment version");
 console.log(`Release v${manifest.version} already published with the same inventory.`);
}else {
 let tag;
 try{tag=JSON.parse(run(["api",`repos/${repository}/git/ref/tags/v${manifest.version}`]));}catch(e){if(!String(e.stderr).includes("404"))throw e;}
 if(tag&&(tag.object?.type!=="commit"||tag.object?.sha!==sha))throw Error("An existing version tag points to another commit; refusing release");
 run(["release","create",`v${manifest.version}`,"skills-release.json", "--repo",repository,"--target",sha,"--title",`JODARIS skills ${manifest.version}`,"--notes",`Codex and Claude Code plugins. Integrity inventory SHA-256: ${manifest.digest}. Download the source archive for both distributions.`]);
}
