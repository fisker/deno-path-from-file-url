import fs from 'node:fs/promises'
import * as esbuild from 'esbuild'
import packageJson from '../package.json' with {type: 'json'}

const entries = ['index', 'windows', 'posix']

function* getJobs() {
  const exports = {}
  const files = []

  for (const entry of entries) {
    yield esbuild.build({
      entryPoints: [`source/${entry}.js`],
      bundle: true,
      outfile: `${entry}.js`,
      format: 'esm',
    })

    yield fs.cp(
      new URL(`../source/${entry}.d.ts`, import.meta.url),
      new URL(`../${entry}.d.ts`, import.meta.url),
    )

    files.push(`${entry}.js`, `${entry}.d.ts`)

    exports[entry === 'index' ? '.' : `./${entry}`] = {
      types: `./${entry}.d.ts`,
      default: `./${entry}.js`,
    }
  }

  exports['./*'] = './*'

  fs.writeFile(
    new URL('../package.json', import.meta.url),
    JSON.stringify(
      {
        ...packageJson,
        exports,
        files,
      },
      undefined,
      2,
    ) + '\n',
  )
}

await Promise.all(getJobs())
