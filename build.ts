import { build, BuildOptions } from 'esbuild'
import { copyFile } from 'fs'
import { dependencies } from './package.json'

copyFile('public/index.html', 'dist/index.html', () => {})

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
