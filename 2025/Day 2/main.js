const fs = require("fs");

/**
 * Check if an ID is invalid (made of two identical halves)
 * @param id - ID to check
 * @returns {boolean} - true if the ID is invalid, false otherwise
 */
function isInvalidID(id) {
  const str = id.toString();
  if (str.length % 2 !== 0) {
    return false;
  }
  const half = str.length / 2;
  const first = str.slice(0, half);
  const second = str.slice(half);
  return first === second;
}

/**
 * Sum all invalid IDs from the input file
 * @returns {number} - Sum of all invalid IDs
 */
function sumInvalidIDsFromFile() {
  const data = fs.readFileSync("input.txt", "utf8").split(",");

  let sumInvalidIds = 0;

  for (let i = 0; i < data.length; i++) {
    const idSplited = data[i].split("-");
    const first = idSplited[0];
    const last = idSplited[1];

    for (let id = parseInt(first, 10); id <= parseInt(last, 10); id++) {
      if (isInvalidID(id)) {
        sumInvalidIds += id;
      }
    }
  }
  return sumInvalidIds;
}

console.log(sumInvalidIDsFromFile());

/**
 * An id is invalid if it contains at least two times the same digit
 * @param {*} id - ID to check
 * @returns {boolean} - true if the ID is invalid, false otherwise
 */
function isinvalidIDMinTwoTimes(id) {
  const str = id.toString();
  const regex = /^(\d+)\1+$/;
  return regex.test(str);
}

function sumInvalidIdsMinTwoTimes() {
  const data = fs.readFileSync("input.txt", "utf8").split(",");

  let sumInvalidIds = 0;

  for (let i = 0; i < data.length; i++) {
    const idSplited = data[i].split("-");
    const first = idSplited[0];
    const last = idSplited[1];

    for (let id = parseInt(first, 10); id <= parseInt(last, 10); id++) {
      if (isinvalidIDMinTwoTimes(id)) {
        sumInvalidIds += id;
      }
    }
  }
  return sumInvalidIds;
}

console.log(sumInvalidIdsMinTwoTimes());
