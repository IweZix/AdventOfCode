const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.trim().split('\n');

const rows = lines.length;
const cols = lines[0].length;
const searchGrid = Array.from({ length: rows }, (_, i) =>
  Array.from({ length: cols }, (_, j) => lines[i].charCodeAt(j))
);

let totalPart1 = 0;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (searchGrid[i][j] === 'X'.charCodeAt(0)) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      for (const [dx, dy] of directions) {
        let xmasFlag = true;
        const chars = ['M', 'A', 'S'];
        for (let k = 1; k <= chars.length; k++) {
          const newRow = i + k * dx;
          const newCol = j + k * dy;
          if (
            newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= cols ||
            searchGrid[newRow][newCol] !== chars[k - 1].charCodeAt(0)
          ) {
            xmasFlag = false;
            break;
          }
        }
        if (xmasFlag) {
            totalPart1++;
        }
      }
    }
  }
}

console.log("part 1 : " + totalPart1);

function isMASSequence(sequence) {
  const mas = ['M', 'A', 'S'].map(c => c.charCodeAt(0));
  const sam = ['S', 'A', 'M'].map(c => c.charCodeAt(0));
  return (
    sequence.length === 3 &&
    (sequence.every((char, i) => char === mas[i]) ||
      sequence.every((char, i) => char === sam[i]))
  );
}

let totalPart2 = 0;

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (searchGrid[i][j] !== 'A'.charCodeAt(0)) continue;

    const topLeft = [searchGrid[i - 1][j - 1], searchGrid[i][j], searchGrid[i + 1][j + 1]];
    const topRight = [searchGrid[i - 1][j + 1], searchGrid[i][j], searchGrid[i + 1][j - 1]];

    if (isMASSequence(topLeft) && isMASSequence(topRight)) {
        totalPart2++;
    }
  }
}

console.log("part 2 : " + totalPart2);
