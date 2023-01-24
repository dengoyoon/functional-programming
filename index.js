import { log, map, reduce, filter, go, pipe, curry } from "./src/fx.js";

const products = [
  { name: "반팔티", price: 15000, quantity: 1 },
  { name: "긴팔티", price: 20000, quantity: 2 },
  { name: "핸드폰케이스", price: 15000, quantity: 3 },
  { name: "후드티", price: 30000, quantity: 4 },
  { name: "바지", price: 25000, quantity: 5 },
];

const add = (a, b) => a + b;

// go를 사용하여 읽기 좋은 코드로 변경
// go를 사용하지 않으면 오른쪽에서 왼쪽으로 코드를 읽어야 이해가 되는 코드가 된다.

// 추상화 레벨을 높인 sum함수 만듬
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((a) => a.quantity);

log(total_quantity(products));

const total_price = sum((a) => a.price * a.quantity);

log(total_price(products));

const base_total_price = (predi) => pipe(filter(predi), total_price);

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
