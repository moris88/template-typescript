export function generateRandomNumbers(count: number): number[] {
  const randomNumbers: number[] = []

  for (let i = 0; i < count; i++) {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    randomNumbers.push(randomNumber)
  }

  return randomNumbers
}
