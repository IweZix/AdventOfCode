const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(/\s+/)
    .map(Number))

const left = data.map(([left]) => left).sort((a, b) => a - b);
const right = data.map(([, right]) => right).sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
}

console.log(totalDistance);

let rightMap = {};
right.forEach(num => {
    rightMap[num] = (rightMap[num] || 0) + 1;
});

let similarity = 0;
left.forEach(num => {
    similarityScore += num * (rightMap[num] || 0);
});

console.log(similarity);
