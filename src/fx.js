export const log = console.log;

export const L = {};

// 받아두었던 함수를 나중에 실행시키는 함수.
// 인자를 하나만 받으면 일단 이후 인자들을 더 받기로 기다리는 상태의 함수가 됨.
// 예를 들어 const mult3 = mult(3) 이렇게 하면 mult3은 나머지 하나의 인자를 받을 수 있는 함수가 되는 것
export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
// const mult = curry((a, b) => a * b);
// log(mult(3, 4));
// log(mult(3)(4));

export const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

export const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

// range와 지연된 range의 차이 : 배열과 이터레이터로 반환되는 것.
// 지연된 range는 이터러블이 순회될 때서야 내부 로직이 실행된다. 배열을 만든다는 개념이 아니고 순회될때마다 값을 배출하는 방식.
// 즉 배열이 미리 만들어져있지 않아도 된다는 차이가 있다.
// reduce(add, range(100000)), reduce(add, L.range(100000)) 둘 중 지연된 range의 사용이 훨씬 빠르다.
export const range = (length) => {
  let i = -1;
  const res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};

L.range = function* range(length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};

export const take = curry((length, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === length) return res;
  }
});

export const join = curry((separator, iter) =>
  reduce((a, b) => `${a}${separator}${b}`, iter)
);

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
