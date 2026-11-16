import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, cp, readFile, writeFile, symlink, rm, readdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { planSkills, buildSkills } from "../scripts/build.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
async function fixture(t) { const dir = await mkdtemp(path.join(os.tmpdir(), "jodaris-skills-")); t.after(() => rm(dir,{recursive:true,force:true})); await cp(root,dir,{recursive:true,filter:src=>!src.split(path.sep).includes(".git")}); return dir; }
test("four portable plugins have identical skill content across client packages", async () => {
 const files = await planSkills(root);
 const catalog=JSON.parse(await readFile(path.join(root,"catalog.json"),"utf8"));
 for (const id of ["jodaris-design","jodaris-security","jodaris-software-engineering","jodaris-ai-engineering"]) {
  assert.ok(files.has(`codex/${id}/plugin.json`));
  assert.equal(files.get(`codex/${id}/skills/${id}/SKILL.md`),files.get(`claude/${id}/skills/${id}/SKILL.md`));
  assert.equal(JSON.parse(files.get(`claude/${id}/.claude-plugin/plugin.json`)).version,catalog.version);
 }
 assert.equal(JSON.parse(files.get(".claude-plugin/marketplace.json")).plugins.length,4);
});
test("complete skill resources and relative Markdown links survive a standalone installation",async()=>{
 const files=await planSkills(root);
 const catalog=JSON.parse(await readFile(path.join(root,"catalog.json"),"utf8"));
 for(const {id} of catalog.plugins){
  const entries=await readdir(path.join(root,"src",id),{recursive:true,withFileTypes:true});
  for(const entry of entries){
   if(!entry.isFile()||entry.name.startsWith("._")||entry.name===".DS_Store")continue;
   const relative=path.relative(path.join(root,"src",id),path.join(entry.parentPath,entry.name)).split(path.sep).join("/");
   const source=await readFile(path.join(root,"src",id,relative),"utf8");
   for(const client of ["codex","claude"]){
    const installed=`${client}/${id}/skills/${id}/${relative}`;
    assert.equal(files.get(installed),source,installed);
    if(relative.endsWith(".md"))for(const match of source.matchAll(/\]\(([^)]+)\)/g)){
     const target=match[1].split("#")[0];if(!target||/^[a-z]+:/i.test(target))continue;
     const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(installed),target));
     assert.ok(resolved.startsWith(`${client}/${id}/skills/${id}/`),`Link escapes standalone skill: ${target}`);
     assert.ok(files.has(resolved),`Missing installed reference: ${resolved}`);
    }
   }
  }
 }
});
test("check detects modified or unexpected generated output without overwriting it",async t=>{
 const dir=await fixture(t);await buildSkills(dir); const file=path.join(dir,"codex/jodaris-design/skills/jodaris-design/SKILL.md");
 await writeFile(file,"changed");await assert.rejects(buildSkills(dir,true),/drift/i);assert.equal(await readFile(file,"utf8"),"changed");
 await buildSkills(dir);await writeFile(path.join(dir,"codex/unexpected.md"),"unmanaged");await assert.rejects(buildSkills(dir,true),/unexpected/i);
});
test("source symlinks cannot escape the portable source tree",async t=>{
 const dir=await fixture(t),file=path.join(dir,"src/jodaris-design/SKILL.md");await rm(file);await symlink("/etc/hosts",file);
 await assert.rejects(planSkills(dir),/symlink|regular/i);
});


for (const violation of ["missing-domain","duplicate-domain","duplicate-capability","description-drift"]) {
 test(`publication rejects ${violation} before generating packages`,async t=>{
  const dir=await fixture(t),catalog=JSON.parse(await readFile(path.join(dir,"catalog.json"),"utf8"));
  catalog.plugins.forEach((plugin,index)=>{plugin.domain??=`domain-${index}`;plugin.owns??=[`capability-${index}`];plugin.excludes??=[];});
  if(violation==="missing-domain")delete catalog.plugins[0].domain;
  if(violation==="duplicate-domain")catalog.plugins[1].domain=catalog.plugins[0].domain;
  if(violation==="duplicate-capability")catalog.plugins[1].owns=[...catalog.plugins[0].owns];
  if(violation==="description-drift")catalog.plugins[0].description="An unrelated activation trigger";
  await writeFile(path.join(dir,"catalog.json"),JSON.stringify(catalog));
  await assert.rejects(planSkills(dir),/domain|capability|description/i);
 });
}


test("source skill domains cannot drift from the catalog owner",async t=>{
 const dir=await fixture(t),file=path.join(dir,"src/jodaris-design/SKILL.md");
 const skill=await readFile(file,"utf8");
 await writeFile(file,skill.replace("  domain: interface-design","  domain: application-security"));
 await assert.rejects(planSkills(dir),/Skill domain drift/);
});
