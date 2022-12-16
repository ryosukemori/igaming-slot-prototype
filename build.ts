import { build } from 'esbuild'
import { copyFile } from 'fs'
import fse from 'fs-extra'

copyFile('public/index.html', 'dist/index.html', (e) => console.error(e?.message))
fse.copySync('src/assets', 'dist/assets')

const entryFile = 'src/index.ts'
const watch = process.env.WATCH === 'true' || false

build({
  bundle: true,
  entryPoints: [entryFile],
  logLevel: 'info',
  minify: false,
  sourcemap: false,
  format: 'esm',
  outfile: './dist/index.js',
  target: ['ES6'],
  platform: 'browser',
  treeShaking: true,
  watch: watch && {
    // watchモードで起動したい場合は、再ビルドのcallbackを渡す
    onRebuild(err, result) {
      console.log(`rebuild`)
    },
  },
})
