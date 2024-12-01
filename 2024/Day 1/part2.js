const fs = require('fs');

function toMap(list) {
    return list.reduce((map, item) => {
        map.set(item, (map.get(item) || 0) + 1);
        return map;
    }, new Map());
}

function calculateSimiliarity(leftMap, rightMap) {
    let similarityScore = 0;
    for (const [key, value] of leftMap.entries()) {
        if (rightMap.has(key)) {
            similarityScore += key * rightMap.get(key);
        }
    }
    return similarityScore;
}

const data = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(/\s+/)
    .map(Number))

const left = data.map(([left]) => left).sort((a, b) => a - b);
const right = data.map(([, right]) => right).sort((a, b) => a - b);

const leftMap = toMap(left);
const rightMap = toMap(right);

const similiarity = calculateSimiliarity(leftMap, rightMap);

console.log(similiarity);
