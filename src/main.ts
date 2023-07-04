import hana from '@sap/hana-client'
import dotenv from 'dotenv'

dotenv.config()
const { HANA_HOST, HANA_PORT, HANA_USER, HANA_PASSWORD } = process.env
console.log('HANA_HOST:', HANA_HOST)
console.log('HANA_PORT:', HANA_PORT)
console.log('HANA_USER:', HANA_USER)
console.log('HANA_PASSWORD:', HANA_PASSWORD)

try {
  const connOptions = {
    host: HANA_HOST,
    port: HANA_PORT,
    uid: HANA_USER,
    pwd: HANA_PASSWORD,
    encrypt: 'true',
    sslValidateCertificate: 'false',
  }

  const connection = hana.createConnection()
  connection.connect(connOptions)

  const query = `SHOW DATABASES;`
  connection.exec(query, (err, result) => {
    if (err) throw err
    console.log('Result SQL:', result)
  })
  connection.disconnect(function (err) {
    if (err) throw err
    console.log('Disconnected')
  })
  process.exit(0)
} catch (error) {
  console.log('ERROR!!!', error)
  process.exit(1)
}
