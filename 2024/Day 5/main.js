const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");
const [rawRules, rawUpdates] = input.trim().split("\n\n");

const rules = rawRules.split("\n").map((rule) => {
  const [x, y] = rule.split("|").map(Number);
  return { before: x, after: y };
});

const updates = rawUpdates
  .split("\n")
  .map((update) => update.split(",").map(Number));

// Part 1
function isUpdateValid(update, rules) {
  const pageOrder = new Map();
  update.forEach((page, index) => pageOrder.set(page, index));

  for (const { before, after } of rules) {
    if (
      pageOrder.has(before) &&
      pageOrder.has(after) &&
      pageOrder.get(before) > pageOrder.get(after)
    ) {
      return false;
    }
  }

  return true;
}

let part1 = 0;

for (const update of updates) {
  if (isUpdateValid(update, rules)) {
    const middleIndex = Math.floor(update.length / 2);
    part1 += update[middleIndex];
  }
}

console.log("part 1 : " + part1);

// Part 2
function correctOrder(update, rules) {
  const graph = new Map();
  const inDegree = new Map();

  for (const page of update) {
    graph.set(page, []);
    inDegree.set(page, 0);
  }

  for (const { before, after } of rules) {
    if (graph.has(before) && graph.has(after)) {
      graph.get(before).push(after);
      inDegree.set(after, inDegree.get(after) + 1);
    }
  }

  const queue = [];
  for (const [page, degree] of inDegree) {
    if (degree === 0) queue.push(page);
  }

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return sorted;
}

let part2 = 0;

for (const update of updates) {
  if (!isUpdateValid(update, rules)) {
    const corrected = correctOrder(update, rules);
    const middleIndex = Math.floor(corrected.length / 2);
    part2 += corrected[middleIndex];
  }
}

console.log("part 2 : " + part2);
