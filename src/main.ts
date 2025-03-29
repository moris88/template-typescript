// main.ts
// This is the main entry point for the application
async function main() {
  try {
    console.log('Hello World!')
    process.exit(0)
  } catch (error) {
    console.log('ERROR!!!', error)
    process.exit(1)
  }
}
main()
