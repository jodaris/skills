import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, mkdir, copyFile, writeFile, rm } from "node:fs/promises";
import { tmpdir, devNull } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script=fileURLToPath(new URL("../scripts/check-version.mjs",import.meta.url));
async function fixture(t,previous){
 const root=await mkdtemp(path.join(tmpdir(),"skills-version-"));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const env={...process.env,GIT_CONFIG_NOSYSTEM:"1",GIT_CONFIG_GLOBAL:devNull,GITHUB_BASE_REF:"main"};
 const git=(...args)=>execFileSync("git",args,{cwd:root,env,encoding:"utf8",stdio:["ignore","pipe","pipe"]});
 git("init","--initial-branch=main","--template=");
 await writeFile(path.join(root,"README.md"),"Initial repository setup\n");
 if(previous!==undefined)await writeFile(path.join(root,"skills-release.json"),typeof previous==="string"?previous:JSON.stringify(previous));
 git("add",".");git("-c","user.name=Skills test","-c","user.email=test@example.invalid","-c","commit.gpgsign=false","commit","-m","Initialize base");
 git("update-ref","refs/remotes/origin/main","HEAD");
 await mkdir(path.join(root,"scripts"));await copyFile(script,path.join(root,"scripts/check-version.mjs"));
 await writeFile(path.join(root,"skills-release.json"),JSON.stringify({version:"0.2.0",digest:"current"}));
 return {root,git,run:extra=>spawnSync(process.execPath,["scripts/check-version.mjs"],{cwd:root,env:{...env,...extra},encoding:"utf8"})};
}

test("first release accepts an existing base with no prior manifest even when the manifest exists on disk",async t=>{
 const f=await fixture(t),result=f.run();assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/progression verified/);
});
test("changed inventory requires a higher version",async t=>{
 const f=await fixture(t,{version:"0.2.0",digest:"previous"}),result=f.run();assert.notEqual(result.status,0);assert.match(result.stderr,/require a higher version/);
});
test("a higher version accepts a changed inventory",async t=>{
 const f=await fixture(t,{version:"0.1.0",digest:"previous"}),result=f.run();assert.equal(result.status,0,result.stderr);
});
test("identical inventory retains its version",async t=>{
 const f=await fixture(t,{version:"0.2.0",digest:"current"}),result=f.run();assert.equal(result.status,0,result.stderr);
});
test("a missing base ref is an error, not a first release",async t=>{
 const f=await fixture(t);f.git("update-ref","-d","refs/remotes/origin/main");const result=f.run();assert.notEqual(result.status,0);assert.doesNotMatch(result.stdout,/progression verified/);
});
test("an unreadable prior manifest remains an error",async t=>{
 const f=await fixture(t,"invalid JSON"),result=f.run();assert.notEqual(result.status,0);assert.match(result.stderr,/SyntaxError/);
});
test("unsafe base refs are rejected before lookup",async t=>{
 const f=await fixture(t),result=f.run({GITHUB_BASE_REF:"../main"});assert.notEqual(result.status,0);assert.match(result.stderr,/Invalid base branch/);
});
