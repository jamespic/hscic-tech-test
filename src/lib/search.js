/* @flow */

var readline = require("readline")

function matcher(options) {
  return function matches(line) {
    var words = line.split(/\s+/)
    var termInWords = (term: string) => words.indexOf(term) !== -1
    if (options.type == "AND") {
      return options.terms.every(termInWords)
    } else {
      return options.terms.find(termInWords) !== undefined
    }
  }
}

function searchFile(filename, options, callback) {
  var myMatcher = matcher(options)
  // TODO: Implement me
}

exports.matcher = matcher
