async function y(t,n){var r,a,o,i,s;if(!n||!t)return[];const u=`You are analyzing a crop from a construction/architectural drawing.
Identify what measurement types would be appropriate for the visible content.

Respond with ONLY a JSON array of objects:
[{"tool": "linear|area|count|perimeter", "label": "short description", "confidence": 0.0-1.0, "reason": "why"}]

Only suggest tools that clearly apply. If nothing is measurable, return [].`;try{const c=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${n}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{inlineData:{mimeType:"image/png",data:t}},{text:u}]}],generationConfig:{responseMimeType:"application/json"}})});if(!c.ok)return[];const e=await c.json(),g=((s=(i=(o=(a=(r=e==null?void 0:e.candidates)==null?void 0:r[0])==null?void 0:a.content)==null?void 0:o.parts)==null?void 0:i[0])==null?void 0:s.text)??"[]",p=JSON.parse(g);return Array.isArray(p)?p.filter(l=>["linear","area","count","perimeter"].includes(l.tool)&&typeof l.label=="string"):[]}catch{return[]}}export{y as suggestMeasurements};
