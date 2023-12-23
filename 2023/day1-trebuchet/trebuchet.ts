import * as fs from 'fs';
import * as path from 'path';

const readFile = (filename: string): string[] => {
    const filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};

const sumCalibrationValues = (lines: string[]): number => {
    let sum = 0;

    for (const line of lines) {
        const digits = line.match(/\d/g); // Find all digits in the line

        if (digits && digits.length >= 2) {
            const firstDigit = digits[0];
            const lastDigit = digits[digits.length - 1];
            const value = parseInt(firstDigit + lastDigit, 10);
            sum += value;
        } else if (digits && digits.length === 1) {
            // If there's only one digit, use it twice
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
