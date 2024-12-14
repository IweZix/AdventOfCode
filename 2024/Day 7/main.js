const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function evaluateExpressionPart1(numbers, target, currentIndex = 0, currentValue = numbers[0]) {
    if (currentIndex === numbers.length - 1) {
        return currentValue === target;
    }

    const nextNumber = numbers[currentIndex + 1];
    return (
        evaluateExpressionPart1(numbers, target, currentIndex + 1, currentValue + nextNumber) ||
        evaluateExpressionPart1(numbers, target, currentIndex + 1, currentValue * nextNumber)
    );
}

let part1 = 0;

lines.forEach(line => {
    const [target, numbersPart] = line.split(": ");
    const targetValue = parseInt(target, 10);
    const numbers = numbersPart.split(" ").map(Number);

    if (evaluateExpressionPart1(numbers, targetValue)) {
        part1 += targetValue;
    }
});

console.log("Part 1:", part1);


// Part 2
function evaluateExpressionPart2(numbers, target, currentIndex = 0, currentValue = numbers[0]) {
    if (currentIndex === numbers.length - 1) {
        return currentValue === target;
    }

    const nextNumber = numbers[currentIndex + 1];
    return (
        evaluateExpressionPart2(numbers, target, currentIndex + 1, currentValue + nextNumber) ||
        evaluateExpressionPart2(numbers, target, currentIndex + 1, currentValue * nextNumber) ||
        evaluateExpressionPart2(
            numbers,
            target,
            currentIndex + 1,
            parseInt(`${currentValue}${nextNumber}`, 10) // Concaténation des chiffres
        )
    );
}

let part2 = 0;

lines.forEach(line => {
    const [target, numbersPart] = line.split(": ");
    const targetValue = parseInt(target, 10);
    const numbers = numbersPart.split(" ").map(Number);

    if (evaluateExpressionPart2(numbers, targetValue)) {
        part2 += targetValue;
    }
});

console.log("Part 2:", part2);
