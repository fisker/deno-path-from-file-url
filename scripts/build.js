import fs from 'node:fs/promises'
import * as esbuild from 'esbuild'
import packageJson from '../package.json' with {type: 'json'}

const entries = ['index', 'windows', 'posix']

async function build() {
  const exports = {}
  const files = []

  for (const entry of entries) {
    await esbuild.build({
      entryPoints: [`source/${entry}.js`],
      bundle: true,
      outfile: `${entry}.js`,
      format: 'esm',
    })

    await fs.cp(
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

  await fs.writeFile(
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

await build()
