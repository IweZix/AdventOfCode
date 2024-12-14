const readLine = require('readline');
const f = require('fs');
let file = './input.txt';
let rl = readLine.createInterface({input: f.createReadStream(file), output: process.stdout, terminal: false});

const NO_SIGNAL = '.';

let height, width;
function isAntinodeValid(antinode) {
    if (antinode.x < 0 || antinode.x >= width || antinode.y < 0 || antinode.y >= height) {
        return false;
    }
    return true;
}


// read file
let signalMap = {};
let lines = [];
let y = 0;
rl.on('line', function(text) {
    lines.push(text);
    width = text.length;
    for (let x = 0; x < text.length; ++x) {
        const char = text[x];
        if (text[x] !== NO_SIGNAL) {
            if (signalMap[char] === undefined) {
                signalMap[char] = [{x, y}];
            } else {
                signalMap[char].push({x, y});
            }
        }
    }
    ++y;
});


// Part 1
function findAntinode(A, B) {
    return {
        x: 2 * A.x - B.x,
        y: 2 * A.y - B.y
    }
}
let calculateAntinodes = (signals) => {
    let antinodeMap = {}
    for (let signalArray of Object.values(signals)) {
        for (let i = 0; i < signalArray.length - 1; ++i) {
            const nodeA = signalArray[i];
            for (let j = i + 1; j < signalArray.length; ++j) {
                const nodeB = signalArray[j];
                const antinodeA = findAntinode(nodeA, nodeB);
                const antinodeB = findAntinode(nodeB, nodeA);
                if (isAntinodeValid(antinodeA)) {
                    if (antinodeMap[antinodeA.x] === undefined) {
                        antinodeMap[antinodeA.x] = {[antinodeA.y]: true}
                    } else {
                        antinodeMap[antinodeA.x][antinodeA.y] = true;
                    }
                }
                if (isAntinodeValid(antinodeB)) {
                    if (antinodeMap[antinodeB.x] === undefined) {
                        antinodeMap[antinodeB.x] = {[antinodeB.y]: true}
                    } else {
                        antinodeMap[antinodeB.x][antinodeB.y] = true;
                    }
                }
            }
        }
    }

    let count = 0;
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (antinodeMap[x] !== undefined && antinodeMap[x][y]) {
                count++;
            }
        }
    }

    return count;
}



// Part 2
function findAntinodesRecursive(A, B) {
    let antinode = {
        x: 2 * A.x - B.x,
        y: 2 * A.y - B.y
    }
    if (isAntinodeValid(antinode)) {
        return [antinode, ...findAntinodesRecursive(antinode, A)];
    } else return [];
}

let calculateRecursiveAntinodes = (signals) => {
    let antinodeMap = {}
    for (let signalArray of Object.values(signals)) {
        for (let i = 0; i < signalArray.length - 1; ++i) {
            const nodeA = signalArray[i];
            for (let j = i + 1; j < signalArray.length; ++j) {
                const nodeB = signalArray[j];
                const antinodes = [
                    ...findAntinodesRecursive(nodeA, nodeB),
                    ...findAntinodesRecursive(nodeB, nodeA)
                ]

                for (let antinode of antinodes) {
                    if (antinodeMap[antinode.x] === undefined) {
                        antinodeMap[antinode.x] = {[antinode.y]: true}
                    } else {
                        antinodeMap[antinode.x][antinode.y] = true;
                    }
                }
            }
        }
    }

    let count = 0;
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (antinodeMap[x] !== undefined && antinodeMap[x][y]) {
                ++count;
            } else if (lines[y][x] !== NO_SIGNAL) { ++count; }
        }
    }

    return count;
}


// Print result
rl.on('close', function() {
    height = y;
    console.log('Part 1 result: ' + calculateAntinodes(signalMap));
    console.log('Part 2 result: ' + calculateRecursiveAntinodes(signalMap));
})
