const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

function parseMap(input) {
    return input.split("\n").map(line => line.split("").map(Number));
}

function findTrailheads(map) {
    const trailheads = [];
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 0) {
                trailheads.push([row, col]);
            }
        }
    }
    return trailheads;
}

// Part 1
function findReachable(map, start) {
    const rows = map.length;
    const cols = map[0].length;
    const directions = [
        [0, 1],  // Droite
        [1, 0],  // Bas
        [0, -1], // Gauche
        [-1, 0], // Haut
    ];
    const visited = new Set();
    const queue = [start];
    const reachableNines = new Set();

    visited.add(start.join(","));

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !visited.has(`${newRow},${newCol}`)
            ) {
                const currentHeight = map[row][col];
                const nextHeight = map[newRow][newCol];

                if (nextHeight === currentHeight + 1) {
                    queue.push([newRow, newCol]);
                    visited.add(`${newRow},${newCol}`);

                    if (nextHeight === 9) {
                        reachableNines.add(`${newRow},${newCol}`);
                    }
                }
            }
        }
    }

    return reachableNines.size;
}

function calculateTrailheadScores(map) {
    const trailheads = findTrailheads(map);
    let totalScore = 0;

    for (const trailhead of trailheads) {
        totalScore += findReachable(map, trailhead);
    }

    return totalScore;
}

const map = parseMap(input);
const totalScore = calculateTrailheadScores(map);
console.log("Part 1:", totalScore);

// Part 2
// Trouver le nombre de chemins distincts menant à une hauteur de 9
function findDistinctPaths(map, start) {
    const rows = map.length;
    const cols = map[0].length;
    const directions = [
        [0, 1],  // Droite
        [1, 0],  // Bas
        [0, -1], // Gauche
        [-1, 0], // Haut
    ];

    function dfs(row, col, currentHeight) {
        // Si on dépasse la hauteur 9 ou si la pente n'est pas régulière, abandonner
        if (map[row][col] !== currentHeight) return 0;
        if (currentHeight === 9) return 1; // Chemin valide trouvé

        let pathCount = 0;
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols
            ) {
                pathCount += dfs(newRow, newCol, currentHeight + 1);
            }
        }
        return pathCount;
    }

    return dfs(start[0], start[1], 0);
}

// Calculer la somme des ratings des trailheads
function calculateTrailheadRatings(map) {
    const trailheads = findTrailheads(map);
    let totalRating = 0;

    for (const trailhead of trailheads) {
        totalRating += findDistinctPaths(map, trailhead);
    }

    return totalRating;
}

// Main
const totalRating = calculateTrailheadRatings(map);
console.log("Part 2:", totalRating);