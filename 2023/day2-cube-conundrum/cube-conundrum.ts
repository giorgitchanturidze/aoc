// Importing required modules
import * as fs from 'fs';
import * as path from 'path';

// Function to read a file and return its contents as an array of strings
const readFile = (filename: string): string[] => {
    const filePath = path.join(__dirname, filename);
    return fs.readFileSync(filePath, 'utf-8').split('\n');
};

// Function to check if a game is possible
const isGamePossible = (game: string, maxCubes: { red: number, green: number, blue: number }): boolean => {
    // Splitting the game into subsets and trimming each subset
    const subsets = game.split(';').map(s => s.trim());
    
    // Iterating over each subset
    for (const subset of subsets) {
        // Initializing counts for each color
        const counts = { red: 0, green: 0, blue: 0 };
        
        // Extracting count and color from each match in the subset
        subset.match(/\d+\s\w+/g)?.forEach(match => {
            const [count, color] = match.split(' ');
            counts[color as keyof typeof counts] += parseInt(count);
        });
        
        // Checking if the counts exceed the maximum allowed cubes
        if (counts.red > maxCubes.red || counts.green > maxCubes.green || counts.blue > maxCubes.blue) {
            return false;
        }
    }
    
    // If all subsets pass the check, the game is possible
    return true;
};

// Main function
const main = () => {
    // Reading the input file
    const lines = readFile('input.txt');
    
    // Maximum number of cubes allowed for each color
    const maxCubes = { red: 12, green: 13, blue: 14 };
    
    // Variable to store the sum of possible game IDs
    let sumOfPossibleGameIds = 0;

    // Iterating over each line in the input
    for (const line of lines) {
        // Extracting the game ID and game data from the line
        const [gameIdStr, gameData] = line.split(':');
        const gameId = parseInt(gameIdStr.split(' ')[1]);
        
        // Checking if the game is possible and updating the sum of game IDs
        if (isGamePossible(gameData, maxCubes)) {
            sumOfPossibleGameIds += gameId;
        }
    }

    // Printing the sum of possible game IDs
    console.log('Sum of Possible Game IDs:', sumOfPossibleGameIds);
};

// Calling the main function to start the program
main();
