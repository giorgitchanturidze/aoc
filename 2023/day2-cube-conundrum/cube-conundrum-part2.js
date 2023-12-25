"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readFile = function (filename) {
    var filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};
// Function to find the minimum set of cubes for each game
var findMinimumSet = function (game) {
    var minSet = { red: 0, green: 0, blue: 0 };
    game.split(';').map(function (s) { return s.trim(); }).forEach(function (subset) {
        var _a;
        (_a = subset.match(/\d+\s\w+/g)) === null || _a === void 0 ? void 0 : _a.forEach(function (match) {
            var _a = match.split(' '), count = _a[0], color = _a[1];
            minSet[color] = Math.max(minSet[color], parseInt(count));
        });
    });
    return minSet;
};
var main = function () {
    var lines = readFile('input.txt');
    var totalPower = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var gameData = line.split(':')[1];
        var minSet = findMinimumSet(gameData);
        var power = minSet.red * minSet.green * minSet.blue;
        totalPower += power;
    }
    console.log('Total Power of Minimum Sets:', totalPower);
};
main();
