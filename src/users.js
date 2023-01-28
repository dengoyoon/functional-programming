import {
  log,
  map,
  reduce,
  take,
  takeAll,
  go,
  pipe,
  join,
  L,
  flatten,
} from "./fx.js";

const users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

const peoples = go(
  users,
  L.map((u) => u.family),
  L.flatten, // map -> flatten 순이니까 flatMap으로 축약 가능
  L.filter((u) => u.age < 20),
  map((u) => u.name)
);

log(peoples);

/*
객체지향 프로그래밍 : 주어진 데이터 -> 함수(메서드) 순의 개발 순서
함수형 프로그래밍 : 만들어 놓은 함수 -> 데이터 순의 개발 순서
즉 이러한 프로그래밍이 LISP (List Processing)에 해당한다고 할 수 있다.
*/
