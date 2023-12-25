// Importing required modules
import * as fs from 'fs';
import * as path from 'path';

// Function to read a file and return its contents as an array of strings
const readFile = (filename: string): string[] => {
    const filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};

// Function to find the minimum set of cubes for each game
const findMinimumSet = (game: string): { red: number, green: number, blue: number } => {
    let minSet = { red: 0, green: 0, blue: 0 };
    
    // Splitting the game into subsets and processing each subset
    game.split(';').map(s => s.trim()).forEach(subset => {
        // Extracting the count and color from each subset
        subset.match(/\d+\s\w+/g)?.forEach(match => {
            const [count, color] = match.split(' ');
            // Updating the minimum set based on the count and color
            minSet[color as keyof typeof minSet] = Math.max(minSet[color as keyof typeof minSet], parseInt(count));
        });
    });

    return minSet;
};

// Main function
const main = () => {
    // Reading the input file
    const lines = readFile('input.txt');
    let totalPower = 0;

    // Processing each line of the input file
    for (const line of lines) {
        // Extracting the game data from each line
        const gameData = line.split(':')[1];
        // Finding the minimum set for the game
        const minSet = findMinimumSet(gameData);
        // Calculating the power based on the minimum set
        const power = minSet.red * minSet.green * minSet.blue;
        // Adding the power to the total power
        totalPower += power;
    }

    // Printing the total power of minimum sets
    console.log('Total Power of Minimum Sets:', totalPower);
};

// Calling the main function
main();
