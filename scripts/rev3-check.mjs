import { build } from 'esbuild';
import { createRequire } from 'node:module';
const result = await build({entryPoints:['scripts/rev3-cases.jsx'],bundle:true,platform:'node',format:'cjs',write:false,jsx:'automatic',loader:{'.module.css':'empty','.css':'empty'}});
new Function('require', result.outputFiles[0].text)(createRequire(import.meta.url));
