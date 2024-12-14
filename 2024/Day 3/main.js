const fs = require('fs');
const _ = require('lodash');

const data = fs.readFileSync('input.txt', 'utf8');

const inputLines = data.split('\n');

const part1answer = _(inputLines)
    .map(s => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
    .flatMap()
    .map(m => m[1] * m[2])
    .sum()

console.log(part1answer);

const unifiedInput = data;

const part2answer = _(unifiedInput)
    .split('do()')
    .map(track => track.split('don\'t()')[0])
    .map(s => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
    .flatMap()
    .map(m => m[1] * m[2])
    .sum();

console.log(part2answer);