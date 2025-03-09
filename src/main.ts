import fs from 'fs'
// type JsonValue = string | number | boolean | null;

// type JsonObject = {
//   [key: string]: JsonValue | JsonObject | JsonValue[] | JsonObject[];
// };

// function flattenJson(obj: JsonObject, prefix = ""): Record<string, JsonValue> {
//   const result: Record<string, JsonValue> = {};

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const value = obj[key];
//       const newKey = prefix ? `${prefix}.${key}` : key;

//       if (typeof value === "object" && value !== null) {
//         if (Array.isArray(value)) {
//           value.forEach((item, index) => {
//             if (typeof item === "object" && item !== null) {
//               Object.assign(result, flattenJson(item as JsonObject, `${newKey}[${index}]`));
//             } else {
//               result[`${newKey}[${index}]`] = item;
//             }
//           });
//         } else {
//           Object.assign(result, flattenJson(value as JsonObject, newKey));
//         }
//       } else {
//         result[newKey] = value;
//       }
//     }
//   }

//   return result;
// }

// // Esempio di utilizzo con il JSON fornito
// type InputJson = JsonObject; // Definiamo il tipo dell'input
// const file = fs.readFileSync('src/test.json', 'utf-8');
// console.log(file);
// const inputJson: InputJson = JSON.parse(file);
// const mappedObject = flattenJson(inputJson);
// console.log(mappedObject);

// type JsonValue = string | number | boolean | null

// type JsonObject = {
//   [key: string]: JsonValue | JsonObject | JsonValue[] | JsonObject[]
// }

// function listFields(
//   obj: JsonObject,
//   prefix = '',
// ): string[] {
//   const fields: string[] = []

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const newKey = prefix ? `${prefix}.${key}` : key
//       const sanitizedKey = newKey.replace(/^report\./, '')

//       const value = obj[key]
//       if (typeof value === 'object' && value !== null) {
//         if (Array.isArray(value)) {
//           value.forEach((item, index) => {
//             if (typeof item === 'object' && item !== null) {
//               fields.push(
//                 ...listFields(
//                   item as JsonObject,
//                   `${sanitizedKey}.${index}`
//                 )
//               )
//             } else {
//               fields.push(`${sanitizedKey}.${index}`)
//             }
//           })
//         } else {
//           fields.push(
//             ...listFields(value as JsonObject, sanitizedKey)
//           )
//         }
//       } else {
//         fields.push(sanitizedKey)
//       }
//     }
//   }

//   return fields
// }

// // Esempio di utilizzo con il JSON fornito
// type InputJson = JsonObject // Definiamo il tipo dell'input
// const file = fs.readFileSync('src/test.json', 'utf-8')
// const inputJson: InputJson = JSON.parse(file)
// const fieldsByMainKeys = listFields(inputJson)
// // console.log(fieldsByMainKeys)

// const newObject: Record<string, string[]> = {}

// for (const key of fieldsByMainKeys) {
//   console.log(key)
//   const firstKey = key.split('.')
//   if (firstKey.length > 1) {
//     if (newObject[firstKey[0]]) {
//       newObject[firstKey[0]].push(key)
//     } else {
//       newObject[firstKey[0]] = [key]
//     }
//   }
// }

// fs.writeFileSync('src/output.json', JSON.stringify(newObject, null, 2))
function optionFieldsCRM(
  crmFields: {
    accounts: any[]
    leads: any[]
  },
  type: 'string' | 'number' | 'boolean' | 'ALL',
  module: 'accounts' | 'leads'
): any[] {
  return crmFields[module]
    .filter(
      (crmField) =>
        crmField.api_name !==
        'creditsafezohocrmintegration__CS_Widget_data_JSON'
    )
    .filter(
      (crmField) =>
        crmField.api_name !== 'creditsafezohocrmintegration__creditScore'
    )
    .filter(
      (crmField) =>
        crmField.api_name !==
        'creditsafezohocrmintegration__Data_Qualificazione'
    )
    .filter(
      (crmField) =>
        crmField.api_name !== 'creditsafezohocrmintegration__companySummary'
    )
    .filter(
      (crmField) =>
        crmField.api_name !== 'creditsafezohocrmintegration__ID_CreditSafe'
    )
    .filter((crmField) => {
      const {
        read_only,
        field_read_only,
        data_type,
        json_type,
        view_type,
        api_name,
        visible,
        length,
      } = crmField

      if (type === 'string' && length < 10) return false //campo testo con meno di 10 caratteri
      if (api_name === 'Ticker_Symbol') return false //campo Simbolo
      if (read_only) return false //campo di sola lettura
      if (field_read_only) return false //campo di sola lettura
      if (json_type === 'jsonarray') return false //tipo array
      if (json_type === 'jsonobject') return false //tipo object
      if (!visible) return false //campo nascosto
      const keys = Object.keys(view_type)
      for (const key of keys) {
        if (key === 'quick_create') continue
        if (!view_type[key]) return false //campo non di creazione, modifica o nascosto
      }

      console.log('type', type)
      console.log('data_type', data_type)

      switch (type) {
        case 'string':
          return ['text', 'textarea'].indexOf(data_type) > -1
        case 'number':
          return ['integer', 'currency'].indexOf(data_type) > -1
        case 'boolean':
          return ['text', 'boolean'].indexOf(data_type) > -1
        case 'ALL':
          return (
            ['text', 'textarea', 'integer', 'boolean', 'picklist'].indexOf(
              data_type
            ) > -1
          )
        default:
          return false
      }
    })
}

const crmFields = fs.readFileSync('src/test2.json', 'utf-8')
const crmFieldsJson = JSON.parse(crmFields)

const accounts = optionFieldsCRM(crmFieldsJson, 'ALL', 'accounts')
console.log(accounts && accounts.length > 0)