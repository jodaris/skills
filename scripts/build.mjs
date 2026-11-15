import { readFile, readdir, lstat, mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const json = value => JSON.stringify(value,null,2)+"\n";
export const hash = bytes => createHash("sha256").update(bytes).digest("hex");
export async function safeRead(root,file) {
 if (!file || file.split("/").some(p=>!p || p==="." || p===".." || p.startsWith("._") || /[\\\x00-\x1f]/.test(p))) throw Error("Unsafe public path");
 let current=path.resolve(root);if ((await lstat(current)).isSymbolicLink())throw Error("Symlink root");
 for(const part of file.split("/")){current=path.join(current,part);if((await lstat(current)).isSymbolicLink())throw Error("Symlink in public files");}
 const stat=await lstat(current);if(!stat.isFile() || stat.size>2*1024*1024)throw Error("Expected bounded regular public file");
 return readFile(current,"utf8");
}
async function walk(root,dir){
 const result=[];for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){
  if(entry.name.startsWith("._") || entry.name===".DS_Store")continue;
  const file=`${dir}/${entry.name}`;if(entry.isSymbolicLink())throw Error("Symlink in public files");
  if(entry.isDirectory())result.push(...await walk(root,file));else result.push(file);
 }return result.sort();
}
function validateDomains(plugins){
 const domains=new Map(),capabilities=new Map();
 for(const plugin of plugins){
  if(!plugin || typeof plugin!=="object" || typeof plugin.domain!=="string" || !/^[a-z][a-z0-9-]*$/.test(plugin.domain))throw Error("Each skill requires one valid primary domain");
  if(domains.has(plugin.domain))throw Error(`Duplicate domain owner: ${plugin.domain}`);
  domains.set(plugin.domain,plugin.id);
  if(!Array.isArray(plugin.owns)||!plugin.owns.length)throw Error(`Domain ${plugin.domain} requires owned capabilities`);
  for(const capability of plugin.owns){
   if(typeof capability!=="string"||!/^[a-z][a-z0-9-]*$/.test(capability))throw Error(`Invalid capability in ${plugin.domain}`);
   if(capabilities.has(capability))throw Error(`Duplicate capability owner: ${capability}`);
   capabilities.set(capability,plugin.id);
  }
 }
 for(const plugin of plugins){
  if(!Array.isArray(plugin.excludes)||new Set(plugin.excludes).size!==plugin.excludes.length||plugin.excludes.some(domain=>domain===plugin.domain||!domains.has(domain)))throw Error(`Invalid excluded domains for ${plugin.id}`);
 }
}
function skillField(frontmatter,key){
 const value=frontmatter.match(new RegExp(`^${key}: *(.+)$`,"m"))?.[1]?.trim();
 if(value?.startsWith('"'))return JSON.parse(value);
 if(value?.startsWith("'")&&value.endsWith("'"))return value.slice(1,-1).replace(/''/g,"'");
 return value;
}
export async function planSkills(root){
 const catalog=JSON.parse(await safeRead(root,"catalog.json")),pkg=JSON.parse(await safeRead(root,"package.json"));
 if(catalog.schemaVersion!==1 || !/^\d+\.\d+\.\d+$/.test(catalog.version) || catalog.version!==pkg.version || catalog.repository!=="jodaris/skills" || !Array.isArray(catalog.plugins) || !catalog.plugins.length || catalog.plugins.length>20)throw Error("Invalid skills catalog or version mismatch");
 validateDomains(catalog.plugins);
 const files=new Map(),ids=new Set();
 for(const plugin of catalog.plugins){
  const {id,name,description}=plugin;if(!/^jodaris-[a-z0-9-]+$/.test(id)||ids.has(id)||typeof name!=="string"||typeof description!=="string")throw Error("Invalid or duplicate plugin");ids.add(id);
  const sources=await walk(root,`src/${id}`);if(!sources.includes(`src/${id}/SKILL.md`))throw Error("Missing SKILL.md");
  const skill=await safeRead(root,`src/${id}/SKILL.md`),frontmatter=/^---\r?\n([\s\S]+?)\r?\n---/.exec(skill)?.[1];
  if(!frontmatter||skillField(frontmatter,"name")!==id)throw Error(`Skill identity drift: ${id}`);
  if(skillField(frontmatter,"description")!==description)throw Error(`Skill description drift: ${id}`);
  if(skillField(frontmatter,"  domain")!==plugin.domain)throw Error(`Skill domain drift: ${id}`);
  for(const client of ["codex","claude"]){
   const base=`${client}/${id}`,manifest={name:id,version:catalog.version,description,author:{name:"JODARIS"},license:"MIT"};
   if(client==="codex"){
    files.set(`${base}/plugin.json`,json({$schema:"https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",name:id,version:catalog.version,description}));
    files.set(`${base}/.codex-plugin/plugin.json`,json({...manifest,skills:"./skills/"}));
   }else files.set(`${base}/.claude-plugin/plugin.json`,json(manifest));
   files.set(`${base}/LICENSE`,await safeRead(root,"LICENSE"));
   for(const file of sources){if(!/\.(md|ya?ml|json)$/.test(file))throw Error("Unsupported skill source file");files.set(`${base}/skills/${id}/${file.slice(`src/${id}/`.length)}`,await safeRead(root,file));}
  }
 }
 files.set(".claude-plugin/marketplace.json",json({name:"jodaris",owner:{name:"JODARIS"},plugins:catalog.plugins.map(p=>({name:p.id,source:`./claude/${p.id}`,description:p.description,version:catalog.version}))}));
 return files;
}
async function writeGenerated(root,file,text){
 const target=path.join(root,file),companions=[];let current=target;
 while(current!==path.resolve(root)){
  const companion=path.join(path.dirname(current),`._${path.basename(current)}`);
  let existed=true;try{await lstat(companion);}catch(e){if(e.code!=="ENOENT")throw e;existed=false;}
  companions.push({companion,existed});current=path.dirname(current);
 }
 await mkdir(path.dirname(target),{recursive:true});
 // Validate every existing component before any write.
 current=path.resolve(root);for(const part of file.split("/")){current=path.join(current,part);try{if((await lstat(current)).isSymbolicLink())throw Error("Symlink in generated output");}catch(e){if(e.code!=="ENOENT")throw e;}}
 await writeFile(target,text);
 for(const {companion,existed} of companions){if(existed)continue;try{const s=await lstat(companion);if(s.isFile()&&!s.isSymbolicLink()&&(await readFile(companion)).subarray(0,4).equals(Buffer.from([0,5,22,7])))await unlink(companion);}catch(e){if(e.code!=="ENOENT")throw e;}}
}
export async function buildSkills(root,check=false){
 const files=await planSkills(root);
 for(const dir of ["codex","claude",".claude-plugin"]){try{for(const file of await walk(root,dir))if(!files.has(file))throw Error(`Unexpected generated file: ${file}`);}catch(e){if(e.code!=="ENOENT")throw e;}}
 for(const [file,text] of files){if(check){let actual;try{actual=await safeRead(root,file);}catch{throw Error(`Generated drift: ${file}`);}if(actual!==text)throw Error(`Generated drift: ${file}`);}else await writeGenerated(root,file,text);}
 const inventory=[];
 const roots=["AGENTS.md","README.md","LICENSE",".gitignore","package.json","catalog.json"];
 for(const dir of ["src","scripts","tests","codex","claude",".claude-plugin",".github"]){roots.push(...await walk(root,dir));}
 for(const file of roots.sort()){const text=await safeRead(root,file);if(/(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[A-Z0-9]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text))throw Error(`Credential-like public content: ${file}`);inventory.push({path:file,sha256:hash(text),bytes:Buffer.byteLength(text)});}
 const catalog=JSON.parse(await safeRead(root,"catalog.json"));
 const manifest=json({schemaVersion:1,kind:"jodaris-skills",version:catalog.version,repository:catalog.repository,digest:hash(JSON.stringify(inventory)),plugins:catalog.plugins.map(p=>p.id),files:inventory});
 if(check){if(await safeRead(root,"skills-release.json")!==manifest)throw Error("Release manifest drift; run build");}else await writeGenerated(root,"skills-release.json",manifest);
 return files;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);if(args.some(a=>a!=="--check"))throw Error("Use build.mjs [--check]");
 const root=fileURLToPath(new URL("../",import.meta.url));await buildSkills(root,args.includes("--check"));console.log(args.includes("--check")?"Portable skills and release inventory verified.":"Portable skills built for Codex and Claude.");
}
