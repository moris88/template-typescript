import { Prospect } from './types/global'
import { generateRandomNumbers } from './utils/lib'

const MAX_NUMBER = 100
const randomNumbers = generateRandomNumbers(MAX_NUMBER)

let count = 0
 
const newObject = randomNumbers.map<Prospect>((number) => {
  count++
  return {
    ZOHOSN: null,
    ZBPNUM: number + '',
    ZBCOD: 'IT',
    ZBNAM: 'TEST PROSPECT MAURIZIO ' + count,
    ZCUR: 'EUR',
    ZECNUM: '123456789',
    ZBADD: '123',
    ZBADDL1: 'via Garibaldi 1001',
    ZCITY: 'Milano',
    ZCRY: 'IT',
    ZREP1: '000',
    ZREP2: '104',
    ZTSCD1: 'BR',
    ZTSCD2: '10',
    ZTSCD3: 'A',
    ZPOSCOD: '70000',
    ZTEL: '3313348821',
  }
})

console.log(JSON.stringify({ prospects: newObject }))
