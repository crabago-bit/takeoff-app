import{K as g}from"./index-Bpy6EIXB.js";import"./vendor-react-BHbCq_KU.js";import"./vendor-collab-Dce4Ih0V.js";import"./vendor-xlsx-D3O65r46.js";import"./vendor-icons-ClI9rqmS.js";import"./vendor-genai-BvKkR2Vw.js";async function O(t,r){var n,o,a,i,s;if(!r||!t)return[];const m=`You are analyzing a crop from a construction/architectural drawing.
Identify what measurement types would be appropriate for the visible content.

Respond with ONLY a JSON array of objects:
[{"tool": "linear|area|count|perimeter", "label": "short description", "confidence": 0.0-1.0, "reason": "why"}]

Only suggest tools that clearly apply. If nothing is measurable, return [].`;try{const p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${g()}:generateContent?key=${r}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{inlineData:{mimeType:"image/png",data:t}},{text:m}]}],generationConfig:{responseMimeType:"application/json"}})});if(!p.ok)return[];const e=await p.json(),u=((s=(i=(a=(o=(n=e==null?void 0:e.candidates)==null?void 0:n[0])==null?void 0:o.content)==null?void 0:a.parts)==null?void 0:i[0])==null?void 0:s.text)??"[]",c=JSON.parse(u);return Array.isArray(c)?c.filter(l=>["linear","area","count","perimeter"].includes(l.tool)&&typeof l.label=="string"):[]}catch{return[]}}export{O as suggestMeasurements};
