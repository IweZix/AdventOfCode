const fs = require("fs");

function countZerosFromFile() {
  const data = fs.readFileSync("input.txt", "utf8").trim().split("\n");

  let start = 50;
  let cpt = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i].trim();
    if (!line) continue;

    const direction = line.charAt(0);
    const value = parseInt(line.slice(1), 10);

    if (direction === "L") {
      start = start - value;

      while (start < 0) {
        start += 100;
      }

      if (start === 0) cpt++;
    } else {
      start = start + value;

      while (start >= 100) {
        start -= 100;
      }

      if (start === 0) cpt++;
    }
  }

  return cpt;
}

console.log(countZerosFromFile());

function countZerosDuringRotation() {
  const data = fs.readFileSync("input.txt", "utf8").trim().split("\n");

  let start = 50;
  let cpt = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i].trim();
    if (!line) continue;

    const direction = line.charAt(0);
    const value = parseInt(line.slice(1), 10);

    if (direction === "L") {
      for (let step = 1; step <= value; step++) {
        start = (start - 1 + 100) % 100;
        if (start === 0) cpt++;
      }
    } else {
      for (let step = 1; step <= value; step++) {
        start = (start + 1) % 100;
        if (start === 0) cpt++;
      }
    }
  }

  return cpt;
}

console.log(countZerosDuringRotation());