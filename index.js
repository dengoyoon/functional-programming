import { log, map, reduce, filter, go, pipe } from "./src/fx.js";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

// go를 사용하여 읽기 좋은 코드로 변경
// go를 사용하지 않으면 오른쪽에서 왼쪽으로 코드를 읽어야 이해가 되는 코드가 된다.

const base_total_price = (predi) =>
  pipe(
    filter(predi),
    map((a) => a.price),
    reduce(add)
  );

go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);
