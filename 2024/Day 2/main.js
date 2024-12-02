const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(/\s+/)
    .map(Number));

let safe = 0;
let unsafe = 0;

// Part 1
function isSafe(levels) {
    const isIncreasing = levels.every((level, i) => i === 0 || level > levels[i - 1]);
    const isDecreasing = levels.every((level, i) => i === 0 || level < levels[i - 1]);

    if (!isIncreasing && !isDecreasing) {
        return false;
    }

    for (let i = 1; i < levels.length; i++) {
        const diff = Math.abs(levels[i] - levels[i - 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    return true;
}

// Part 2
function isSafeWithDampener(levels) {
    if (isSafe(levels)) {
        return true;
    }

    // Check if removing one level makes the report safe
    for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafe(modifiedLevels)) {
            return true;
        }
    }

    return false;
}

data.forEach(report => {
    if (isSafeWithDampener(report)) {
        safe++;
    } else {
        unsafe++;
    }
});

console.log(`Safe : ${safe}`);
console.log(`Unsafe : ${unsafe}`);