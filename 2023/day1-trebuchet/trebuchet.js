"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readFile = function (filename) {
    var filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};
var sumCalibrationValues = function (lines) {
    var sum = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var digits = line.match(/\d/g); // Find all digits in the line
        if (digits && digits.length >= 2) {
            var firstDigit = digits[0];
            var lastDigit = digits[digits.length - 1];
            var value = parseInt(firstDigit + lastDigit, 10);
            sum += value;
        }
        else if (digits && digits.length === 1) {
            // If there's only one digit, use it twice
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
