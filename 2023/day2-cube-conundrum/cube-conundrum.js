"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readFile = function (filename) {
    var filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};
// Function to check if a game is possible
var isGamePossible = function (game, maxCubes) {
    var _a;
    var subsets = game.split(';').map(function (s) { return s.trim(); });
    var _loop_1 = function (subset) {
        var counts = { red: 0, green: 0, blue: 0 };
        (_a = subset.match(/\d+\s\w+/g)) === null || _a === void 0 ? void 0 : _a.forEach(function (match) {
            var _a = match.split(' '), count = _a[0], color = _a[1];
            counts[color] += parseInt(count);
        });
        if (counts.red > maxCubes.red || counts.green > maxCubes.green || counts.blue > maxCubes.blue) {
            return { value: false };
        }
    };
    for (var _i = 0, subsets_1 = subsets; _i < subsets_1.length; _i++) {
        var subset = subsets_1[_i];
        var state_1 = _loop_1(subset);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return true;
};
var main = function () {
    var lines = readFile('input.txt');
    var maxCubes = { red: 12, green: 13, blue: 14 };
    var sumOfPossibleGameIds = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = line.split(':'), gameIdStr = _a[0], gameData = _a[1];
        var gameId = parseInt(gameIdStr.split(' ')[1]);
        if (isGamePossible(gameData, maxCubes)) {
            sumOfPossibleGameIds += gameId;
        }
    }
    console.log('Sum of Possible Game IDs:', sumOfPossibleGameIds);
};
main();
