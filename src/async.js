import { go, log } from "./fx.js";

// go = (...args) => reduce((a, f) => f(a), args);
go(
  Promise.resolve(1), // 첫번째 값은 go1에서 then처리를 해줌
  (a) => a + 10,
  (a) => Promise.reject(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
  (a) => Promise.resolve(a + 100000),
  log
).catch((e) => log(e));

const delay = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 1000));

go(
  delay(1),
  (a) => a + 10,
  (a) => delay(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
  (a) => delay(a + 100000),
  log
).catch((e) => log(e));

/*
Promise에서 오해하면 안되는 것!
const promise = new Promise(뭐시기)
promise -> Promise객체이다.
promise.then() -> then을 실행한 상태도 역시 Promise객체이다. (이러한 성질 때문에 then으로 합성을 할 수 있다.)
promise.then(r => log(r)) -> 다루고 싶은 값은 then안에서 사용 가능하다.

Promise가 얼마나 중첩이 되건 간에 then안에서는 무조건 값으로써 사용할 수 있다.
*/
