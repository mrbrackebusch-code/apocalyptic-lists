// Focused native examples share the actual isolated callback source.
// Conserve usage: no compiler dependency and no changes to learner algorithms.
import assert from 'node:assert/strict';
export const normalizeSource=s=>s.replace(/\r\n/g,'\n');
export function stationSources(input) {
 const source=normalizeSource(input),result=[];
 const start=/apocalypse\.onInteract\(apocTypes\.Room\.(R\d{2}),\s*apocTypes\.Station\.(Primary|Secondary),\s*function\s*\(\)\s*\{/g;
 let match;
 while((match=start.exec(source))) {
  let depth=1,i=start.lastIndex,quote='',comment='';
  for(;i<source.length&&depth;i++) {
   const c=source[i],next=source[i+1];
   if(comment==='line'){if(c==='\n')comment='';continue;}
   if(comment==='block'){if(c==='*'&&next==='/'){comment='';i++;}continue;}
   if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote='';continue;}
   if(c==='/'&&next==='/'){comment='line';i++;continue;}
   if(c==='/'&&next==='*'){comment='block';i++;continue;}
   if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
   if(c==='{')depth++;else if(c==='}')depth--;
  }
  assert.equal(depth,0,'Unclosed station callback');
  const tail=source.slice(i).match(/^\s*\);?/);assert.ok(tail,'Expected callback closing parenthesis');
  const code=source.slice(match.index,i+tail[0].length).replace(/^\s*\/\/[^\n]*(?:\n|$)/gm,'').trim();
  assert.ok(!/CUMULATIVE INSTRUCTIONAL|REFERENCE ONLY|accepted.program.cache|settings\/world state/i.test(code),'Internal notes cannot enter instructional code');
  result.push({room:match[1],station:match[2],id:match[1]+'-'+match[2].toLowerCase(),code});
  start.lastIndex=i+tail[0].length;
 }
 assert.ok(result.length,'Expected at least one actual station callback');
 assert.equal(new Set(result.map(r=>r.id)).size,result.length,'Duplicate station source');
 return result;
}
export function currentRoomSource(input) {return stationSources(input).map(r=>r.code).join('\n\n');}
