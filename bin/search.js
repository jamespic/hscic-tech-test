#!/usr/bin/env node
"use strict";

var _hscicTechTest = require("hscic-tech-test");

var _optparse = require("optparse");

var optparse = _interopRequireWildcard(_optparse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const SWITCHES = [['-a', '--and', 'search in AND mode'], ['-o', '--or', 'search in OR mode (default)'], ['-i', '--input FILE', 'input file (default stdin)']];

var options = {};
var filename;

var parser = new optparse.OptionParser(SWITCHES);

parser.on('and', () => options.type = 'AND');
parser.on('or', () => options.type = 'OR');
parser.on('input', (input, value) => filename = value);

var argv = process.argv.slice(2);
argv = parser.parse(argv);

options.terms = argv.join(" ");

(0, _hscicTechTest.searchFile)(filename, options, result => {
  switch (result.length) {
    case 0:
      console.log("Matched no rows");
      break;
    case 1:
      console.log(`Matcher row ${ result[0] }`);
      break;
    default:
      console.log(`Matched rows ${ result.join(", ") }`);
      break;
  }
});