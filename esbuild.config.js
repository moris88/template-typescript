require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './build/index.js',
    platform: 'node',
    minify: true,
  })
  .then((result) => {
    console.log(result)
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
