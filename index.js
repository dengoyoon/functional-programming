import { log, map, reduce, filter } from "./src/fx.js";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

// 오른쪽에서 왼쪽으로 읽으면 자연스레 읽힌다.
log(
  reduce(
    add,
    map(
      (a) => a.price,
      filter((p) => p.price < 20000, products)
    )
  )
);
