// Rebuild the editable native project and same-project Recipes. Conserve usage.
import fs from 'node:fs';import path from 'node:path';import{execFileSync}from'node:child_process';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
execFileSync(process.execPath,[path.join(root,'tools/build.mjs'),'--common-root',path.join(root,'shared')],{cwd:root,stdio:'inherit',windowsHide:true});
const version=JSON.parse(fs.readFileSync(path.join(root,'pxt.json'),'utf8')).version;
for(const name of ['README.md','main.ts','pxt.json','MEDIA_BINDINGS.json'])fs.copyFileSync(path.join(root,'generated/tutorial',name),path.join(root,name));
fs.cpSync(path.join(root,'generated/tutorial/recipes'),path.join(root,'recipes'),{recursive:true});
const p=JSON.parse(fs.readFileSync(path.join(root,'pxt.json'),'utf8'));p.version=version;fs.writeFileSync(path.join(root,'pxt.json'),JSON.stringify(p,null,2)+'\n');
