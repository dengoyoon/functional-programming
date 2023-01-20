export const log = console.log;

export function filter(f, iter) {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
}

export function reduce(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
}

export function map(f, iter) {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

// 코드를 값으로 다루어 표현력을 높이기 위한 함수 go, pipe, curry

/* 
go : 값을 평가 하기 위함 (값을 리턴하는 함수)
pipe : 함수를 합성하기 위함 (함수를 리턴하는 함수, 그냥 함수를 순서대로 실행되게 끔 하는 세트 정도로 이해)
*/

export const go = (...args) => reduce((a, f) => f(a), args);
/*
예시
go(0, a => a + 1, a => a + 10, a => a + 100, log);
*/

// pipe는 첫번째 함수의 인자가 여러개를 받아야 할 경우를 생각해서 다음과 같이 작성해야 함.
export const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);
/*
예시
const f = pipe((a, b) => a + b, a => a + 10, a => a + 100);
log(f(0));
*/
