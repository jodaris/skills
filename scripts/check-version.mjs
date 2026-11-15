import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
const base=process.env.GITHUB_BASE_REF;
if(base){
 if(!/^[a-zA-Z0-9/_.-]+$/.test(base)||base.includes(".."))throw Error("Invalid base branch");
 const current=JSON.parse(await readFile("skills-release.json","utf8"));let previous;
 const ref=`origin/${base}:skills-release.json`;
 let prior;
 try{prior=execFileSync("git",["show",ref],{encoding:"utf8",stdio:["ignore","pipe","pipe"]});}
 catch(error){if(!String(error.stderr).includes("does not exist in"))throw error;}
 if(prior)previous=JSON.parse(prior);
 if(previous&&previous.digest!==current.digest){
  const compare=(a,b)=>{const x=a.split(".").map(Number),y=b.split(".").map(Number);for(let i=0;i<3;i++)if(x[i]!==y[i])return x[i]-y[i];return 0;};
  if(compare(current.version,previous.version)<=0)throw Error("Changed skills releases require a higher version before merge");
 }
}
console.log("Release version progression verified.");
