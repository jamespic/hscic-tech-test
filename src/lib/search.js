/* @flow */

import * as readline from "readline"
import * as fs from "fs"

export function matcher(options) {
  return function matches(line) {
    var terms = options.terms.split(/\s+/)
    var words = line.split(/\s+/)
    var termInWords = (term) => words.indexOf(term) !== -1
    if (options.type == "AND") {
      return terms.every(termInWords)
    } else {
      return terms.find(termInWords) !== undefined
    }
  }
}

export function searchFile(filename, options, callback) {
  var myMatcher = matcher(options)
  var matchedLines = []
  var currentLine = -1
  var reader = readline.createInterface({
    input: filename ? fs.createReadStream(filename) : process.stdin
  })
  reader.on("line", line => {
    currentLine++
    if (myMatcher(line)) matchedLines.push(currentLine)
  })
  reader.on("close", () => callback(matchedLines))
}
