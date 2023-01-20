/*
generator 함수를 이용해서 홀수만 뱉는 generator odds를 만들자
*/

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(num, iter) {
  for (const v of iter) {
    yield v;
    if (v === num) return;
  }
}

function* odds(num) {
  for (const v of limit(num, infinity(1))) {
    if (v % 2 === 1) yield v;
  }
}

// for (const a of odds(40)) console.log(a);
console.log(...odds(21));
