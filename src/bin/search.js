#!/usr/bin/env node
import {searchFile} from "hscic-tech-test"
import * as optparse from "optparse"

const SWITCHES = [
    ['-a', '--and', 'search in AND mode'],
    ['-o', '--or', 'search in OR mode (default)'],
    ['-i', '--input FILE', 'input file (default stdin)']
]

var options = {}
var filename

var parser = new optparse.OptionParser(SWITCHES)

parser.on('and', () => options.type = 'AND')
parser.on('or', () => options.type = 'OR')
parser.on('input', (input, value) => filename = value)
  

var argv = process.argv.slice(2)
argv = parser.parse(argv)

options.terms = argv.join(" ")

searchFile(filename, options, result => {
  switch(result.length) {
    case 0:
      console.log("Matched no rows")
      break
    case 1:
      console.log(`Matcher row ${result[0]}`)
      break
    default:
      console.log(`Matched rows ${result.join(", ")}`)
      break
  }
})
