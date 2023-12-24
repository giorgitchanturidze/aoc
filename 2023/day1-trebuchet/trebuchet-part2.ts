import * as fs from 'fs';
import * as path from 'path';

const readFile = (filename: string): string[] => {
    const filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};

const digitWords = {
    'one': 'one1one', 'two': 'two2two', 'three': 'three3three',
    'four': 'four4four', 'five': 'five5five', 'six': 'six6six',
    'seven': 'seven7seven', 'eight': 'eight8eight', 'nine': 'nine9nine'
};

const replaceWordsWithNumbers = (line: string): string => {
    let replacedLine = line;
    for (const [word, replacement] of Object.entries(digitWords)) {
        replacedLine = replacedLine.replace(new RegExp(word, 'g'), replacement);
    }
    return replacedLine;
};

const findDigits = (line: string): string[] => {
    const replacedLine = replaceWordsWithNumbers(line);
    const digits = replacedLine.match(/\d/g);
    return digits || [];
};

const sumCalibrationValues = (lines: string[]): number => {
    let sum = 0;

    for (const line of lines) {
        const digits = findDigits(line);
        if (digits.length >= 2) {
            const value = parseInt(digits[0] + digits[digits.length - 1], 10);
            sum += value;
        } else if (digits.length === 1) {
            const value = parseInt(digits[0] + digits[0], 10);
            sum += value;
        }
    }

    return sum;
};

const main = () => {
    const lines = readFile('input.txt');
    const result = sumCalibrationValues(lines);
    console.log('Sum of Calibration Values:', result);
};

main();
