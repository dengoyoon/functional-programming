import { go, log, L, map, take, takeAll, reduce } from "./fx.js";

const delay = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 1000));

// go(
//   [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
//   L.map((a) => Promise.resolve(a + 10)),
//   take(2),
//   log
// );

// Kleisli Composition - L.map, L.filter, take, nop을 이용한.
// nop을 통해서 Promise.reject을 반환하고 catch안에서의 분기를 통해 f(g(x)) = g(x)를 구현하였다.
// 프로미스냐? -> 어쨌든 프로미스.then을 다음 값으로 사용할 수 있게 해준 것이 포인트.
// take에선 프로미스.catch를 해준 것.
// go(
//   [1, 2, 3, 4, 5, 6],
//   L.map((a) => Promise.resolve(a * a)),
//   L.filter((a) => a % 2), // 4, 16, 36일때는 filter에서 Promise.reject(nop)을 뱉기 때문에 이후의 map을 거치지 않는다.
//   L.map((a) => a * a),
//   L.map((a) => a * a),
//   take(2), // 4(2의 제곱)에서는 nop을 받아서 recur()를 실행시켜 다음 이터러블 값을 요구하였다.
//   log
// );
// 프로미스가 한번 등장하면 이후에는 계속 프로미스를 반환 즉 then을 이용한 프로미스 체이닝 상황으로 변한다
// 따라서 L.map부터 take(2)까지 쭉 Promise.resolve(4).then().then().then().catch() 이런식으로 엮여 있기 떄문에
// Promise.reject(nop)을 take의 catch에서 잡은 것이고 분기처리를 nop이면 이터러블의 다음값을 요구하도록 코드를 짜놓았다.
// **** 좀 헷갈리면 async.js의 코드를 보자 ****

const add = (a, b) => a + b;

go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add)
).then((r) => log(r));
