import { go, log, L, map, take, takeAll } from "./fx.js";

const delay = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 1000));

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  //   (a) => log(...a)
  log
);
