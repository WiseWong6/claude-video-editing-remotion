import {build} from 'esbuild';
import {mkdir,writeFile,copyFile} from 'node:fs/promises';
const result=await build({entryPoints:['src/preview.tsx'],bundle:true,minify:true,format:'iife',target:'es2022',outfile:'preview.js',loader:{'.woff2':'dataurl'},write:false,define:{'process.env.NODE_ENV':'"production"'},legalComments:'none'});
const js=result.outputFiles.find(f=>f.path.endsWith('.js')).text.replaceAll('</script','<\\/script');
const css=result.outputFiles.find(f=>f.path.endsWith('.css')).text;
await mkdir('dist/assets',{recursive:true});
await writeFile('dist/index.html',`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>小克剪视频</title><style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`);
await copyFile('public/soundtrack.m4a','dist/assets/soundtrack.m4a');
console.log('已生成 dist/index.html，可直接用浏览器打开，无需服务器。');
