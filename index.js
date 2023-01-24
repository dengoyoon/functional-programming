import { log, map, reduce, filter, go, pipe, curry } from "./src/fx.js";

const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: false },
];

const add = (a, b) => a + b;

// go를 사용하여 읽기 좋은 코드로 변경
// go를 사용하지 않으면 오른쪽에서 왼쪽으로 코드를 읽어야 이해가 되는 코드가 된다.

// 추상화 레벨을 높인 sum함수 만듬
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((a) => a.quantity);

const total_price = sum((a) => a.price * a.quantity);

const base_total_price = (predi) => pipe(filter(predi), total_price);

document.querySelector("#cart").innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>총 가격</th>
    </tr>
    ${go(
      products,
      sum(
        (item) => `
        <tr>
          <td><input type="checkbox" ${item.is_selected ? "checked" : ""}/></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><input type="number" value="${item.quantity}"/></td>
          <td>${item.price * item.quantity}</td>
        </tr>
        `
      )
    )}
    <tr>
      <td></td>
      <td colspan="2">합계</td>
      <td>${total_quantity(filter((item) => item.is_selected, products))}</td>
      <td>${total_price(filter((item) => item.is_selected, products))}</td>
    </tr>
  </table>
`;
