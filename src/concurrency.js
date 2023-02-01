import { C, L, go, reduce, log } from "./fx.js";

const delay = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 1000));

const add = (a, b) => a + b;

console.time("");
go(
  [1, 2, 3, 4, 5],
  L.map((a) => delay(a * a)),
  L.filter((a) => a % 2),
  reduce(add),
  log,
  (_) => console.timeEnd("")
); // 5초

// console.time("");
// go(
//   [1, 2, 3, 4, 5],
//   L.map((a) => delay(a * a)),
//   L.filter((a) => a % 2),
//   C.reduce(add),
//   log,
//   (_) => console.timeEnd("")
// ); // 1초
