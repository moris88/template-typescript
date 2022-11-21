console.log('myCode!!!')
const newArray = chunk(10,3)
console.log(newArray)

function chunk(totalNumber: number, nChunk: number) {
  const result: number[][] = []
  let listNumber: number[] = []
  let count = 0
  for (let i = 1; i <= totalNumber; i++) {
    count = listNumber.length
    if (count === nChunk) {
      result.push(listNumber)
      listNumber = []
    }
    listNumber.push(i)
    if (i === totalNumber) {
      result.push(listNumber)
    }
  }
  return result
} 