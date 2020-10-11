import { readFileSync, writeJSONSync } from 'fs-extra'
import { join } from 'path'

/**
 * Transforms a po file to json.
 * Expected file name is "common.po", the output would be "common.json".
 */
async function convert () {
  const json: Record<string, string> = {}

  const input = join(__dirname, 'common.po')
  console.log('Reading from:', input)

  try {
    const file = readFileSync(input, { encoding: 'utf-8' })
    const lines = file.split('\r\n')

    let key, value: string
    for (const line of lines) {
      if (line.includes('msgid')) {
        const name = line.split('msgid')[1].split('"')[1]
        if (name) key = name
      } else if (line.includes('msgstr')) {
        value = line.split('msgstr')[1].split('"')[1]
        json[key as string] = value
      }
    }
  } catch (error) {
    console.error('Error reading file:', input)
  }

  try {
    const output = join(__dirname, 'common.json')
    console.log('Writing to:', output)
    writeJSONSync(output, json, { encoding: 'utf-8' })
  } catch (error) {
    console.error('Error writing file:', input)
  }
}

convert()
