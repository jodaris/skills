import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp,cp,mkdir,writeFile,chmod,readFile,rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
const source=fileURLToPath(new URL("../",import.meta.url));
for(const scenario of ["new","conflicting-tag"]){
 test(`GitHub release ${scenario} preserves immutable version tags`,async t=>{
  const root=await mkdtemp(path.join(tmpdir(),"skills-release-"));t.after(()=>rm(root,{recursive:true,force:true}));
  await cp(source,root,{recursive:true,filter:file=>!file.split(path.sep).includes(".git")});await mkdir(path.join(root,"bin"));
  await writeFile(path.join(root,"bin/gh"),`#!${process.execPath}\n`+String.raw`import fs from 'node:fs';const args=process.argv.slice(2);if(args[0]==='api'){if(args[1].includes('/git/ref/tags/')&&process.env.RELEASE_SCENARIO==='conflicting-tag'){console.log(JSON.stringify({object:{type:'commit',sha:'b'.repeat(40)}}));process.exit(0);}console.error('HTTP 404');process.exit(1);}fs.writeFileSync('release-call.json',JSON.stringify(args));`);
  await chmod(path.join(root,"bin/gh"),0o755);
  const result=spawnSync(process.execPath,["scripts/release.mjs"],{cwd:root,encoding:"utf8",env:{...process.env,PATH:`${path.join(root,"bin")}${path.delimiter}${process.env.PATH}`,GITHUB_REPOSITORY:"jodaris/skills",GITHUB_REF:"refs/heads/main",GITHUB_SHA:"a".repeat(40),RELEASE_SCENARIO:scenario}});
  if(scenario==="new"){assert.equal(result.status,0,result.stderr);const args=JSON.parse(await readFile(path.join(root,"release-call.json")));assert.equal(args[0],"release");const catalog=JSON.parse(await readFile(path.join(root,"catalog.json"),"utf8"));assert.ok(args.includes(`v${catalog.version}`));assert.ok(args.includes("a".repeat(40)));}
  else{assert.notEqual(result.status,0);assert.match(result.stderr,/another commit/);await assert.rejects(readFile(path.join(root,"release-call.json")));}
 });
}
