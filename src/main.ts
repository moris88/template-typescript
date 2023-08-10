try {
  console.log(`Hello World!`)
  process.exit(0)
} catch (error) {
  console.log('ERROR!!!', error)
  process.exit(1)
}
