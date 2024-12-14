const fs = require("fs");

// Lecture du fichier d'entrée
const input = fs.readFileSync("input.txt", "utf-8").trim();

// Transformation de l'entrée en une grille 2D
const grid = input.split("\n").map(line => line.split(""));

// Définition des directions : [dx, dy] pour "haut", "droite", "bas", "gauche"
const directions = [
    [-1, 0], // Haut
    [0, 1],  // Droite
    [1, 0],  // Bas
    [0, -1]  // Gauche
];

// Recherche de la position initiale et direction du garde
let guardX, guardY, directionIndex;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (["^", ">", "v", "<"].includes(grid[i][j])) {
            guardX = i;
            guardY = j;
            directionIndex = ["^", ">", "v", "<"].indexOf(grid[i][j]);
            grid[i][j] = "."; // Remplacer la position initiale par un espace vide
            break;
        }
    }
}

// Fonction pour vérifier si une position est hors de la grille
function isOutOfBounds(x, y, grid) {
    return x < 0 || y < 0 || x >= grid.length || y >= grid[0].length;
}

// Suivi des positions visitées
const visited = new Set();
visited.add(`${guardX},${guardY}`);

// Simulation du mouvement du garde
while (true) {
    const [dx, dy] = directions[directionIndex];
    const nextX = guardX + dx;
    const nextY = guardY + dy;

    if (isOutOfBounds(nextX, nextY, grid)) {
        // Le garde quitte la grille
        break;
    }

    if (grid[nextX][nextY] === "#") {
        // Tourner à droite
        directionIndex = (directionIndex + 1) % 4;
    } else {
        // Avancer
        guardX = nextX;
        guardY = nextY;
        visited.add(`${guardX},${guardY}`);
    }
}

// Résultat
console.log("Part 1 :", visited.size);
