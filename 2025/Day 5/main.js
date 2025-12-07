const fs = require("fs");

function readInput() {
  const data = fs.readFileSync("input.txt", "utf8").trim();

  const [rangesPart, idsPart] = data.split("\n\n");

  const ranges = rangesPart.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  const ids = idsPart.split("\n").map(Number);

  return { ranges, ids };
}

// PART 1
function part1() {
  const { ranges, ids } = readInput();

  let freshCount = 0;

  for (const id of ids) {
    const isFresh = ranges.some((r) => id >= r.start && id <= r.end);
    if (isFresh) freshCount++;
  }

  return freshCount;
}

// PART 2
function part2() {
  const data = fs.readFileSync("input.txt", "utf8").trim();
  const [rangesPart] = data.split("\n\n");

  let ranges = rangesPart.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  ranges.sort((a, b) => a.start - b.start);

  const merged = [];
  for (const r of ranges) {
    if (!merged.length || r.start > merged[merged.length - 1].end + 1) {
      merged.push({ ...r });
    } else {
      merged[merged.length - 1].end = Math.max(
        merged[merged.length - 1].end,
        r.end
      );
    }
  }

  let totalFreshIDs = merged.reduce((sum, r) => {
    return sum + (r.end - r.start + 1);
  }, 0);

  return totalFreshIDs;
}

// Test
console.log("Part 1:", part1());
console.log("Part 2:", part2());
