/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')
const glob = require('glob')

/**
 * Get argument from command-line arguments
 * @param {String} name
 * @returns {String | undefined}
 */
const getArg = (name) => process.argv.find((arg) => arg.startsWith(name))?.split('=')[1]

/**
 * Exit with error message
 * @param {String} message
 */
const exit = (message) => {
  console.error(message)
  process.exit(1)
}

// Get csvDir from command-line arguments
const csvDir = getArg('--csvDir=')
if (!csvDir) {
  exit('No csvDir is specified')
}

// Get jsonDir from command-line arguments
const jsonDir = getArg('--jsonDir=') || csvDir

const DATA = []

// Get csv files
const csvFiles = glob.sync('*.csv', { cwd: csvDir, absolute: true })
console.log('Found', csvFiles.length, 'csv files')

// Check if csv files exist
if (csvFiles.length === 0) {
  exit('No csv files found in the folder')
}

// Get objName
const objName = getArg('--objName=')
if (!objName) {
  exit('No objName is specified')
}

// Get columns
const columnsArg = getArg('--columns=')
const columns = columnsArg?.split(',') || []

/**
 * Handle csv file
 * @param {string} csvFile
 */
function handleFile(csvFile) {
  const fileName = path.basename(csvFile, path.extname(csvFile))
  console.log('Parsed:', fileName + '.csv')

  const csvContent = fs.readFileSync(csvFile)

  const csvValue = parse(csvContent, {
    trim: true,
    columns: true,
    objname: objName,
    skip_empty_lines: true,
    onRecord: ([id, record]) => {
      if (!id) return

      const key = id.trim()
      delete record[objName || '']

      if (columns.length > 0) {
        const newRecord = {}
        console.log(columns)
        for (const column of columns) {
          newRecord[column] = record[column]
        }

        return [key, newRecord]
      }

      return [key, record]
    },
  })

  if (csvValue)
    DATA.push({
      name: fileName,
      items: csvValue,
    })
}

for (const csvFile of csvFiles) {
  handleFile(csvFile)
}

// Export json
DATA.forEach((data) => {
  const newContent = JSON.stringify(data, null, 1)
  fs.writeFileSync(`${jsonDir}/${data.name}.json`, newContent)
  console.info('Data has been saved to ' + jsonDir)
})
