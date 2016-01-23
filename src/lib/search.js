/* @flow */

import * as readline from "readline"
import * as fs from "fs"

export function matcher(options) {
  return function matches(line) {
    var words = line.split(/\s+/)
    var termInWords = (term) => words.indexOf(term) !== -1
    if (options.type == "AND") {
      return options.terms.every(termInWords)
    } else {
      return options.terms.find(termInWords) !== undefined
    }
  }
}

export function searchFile(filename, options, callback) {
  var myMatcher = matcher(options)
  var matchedLines = []
  var currentLine = -1
  var reader = readline.createInterface({
    input: fs.createReadStream(filename)
  })
  reader.on("line", line => {
    currentLine++
    if (myMatcher(line)) matchedLines.push(currentLine)
  })
  reader.on("close", () => callback(matchedLines))
}
