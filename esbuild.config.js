const { log } = console
require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './dist/index.js',
    platform: 'node',
    minify: true,
  })
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    log(error)
    process.exit(1)
  })
