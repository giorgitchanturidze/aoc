"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readFile = function (filename) {
    var filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};
var digitWords = {
    'one': 'one1one', 'two': 'two2two', 'three': 'three3three',
    'four': 'four4four', 'five': 'five5five', 'six': 'six6six',
    'seven': 'seven7seven', 'eight': 'eight8eight', 'nine': 'nine9nine'
};
var replaceWordsWithNumbers = function (line) {
    var replacedLine = line;
    for (var _i = 0, _a = Object.entries(digitWords); _i < _a.length; _i++) {
        var _b = _a[_i], word = _b[0], replacement = _b[1];
        replacedLine = replacedLine.replace(new RegExp(word, 'g'), replacement);
    }
    return replacedLine;
};
var findDigits = function (line) {
    var replacedLine = replaceWordsWithNumbers(line);
    var digits = replacedLine.match(/\d/g);
    return digits || [];
};
var sumCalibrationValues = function (lines) {
    var sum = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var digits = findDigits(line);
        if (digits.length >= 2) {
            var value = parseInt(digits[0] + digits[digits.length - 1], 10);
            sum += value;
        }
        else if (digits.length === 1) {
            var value = parseInt(digits[0] + digits[0], 10);
            sum += value;
        }
    }
    return sum;
};
var main = function () {
    var lines = readFile('input.txt');
    var result = sumCalibrationValues(lines);
    console.log('Sum of Calibration Values:', result);
};
main();
