/*
generator 함수를 이용해서 홀수만 뱉는 generator odds를 만들자
*/

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(num, iter) {
  for (const v of iter) {
    if (v <= num) yield v;
  }
}

function* odds(num) {
  for (const v of limit(num, infinity(1))) {
    if (v % 2 === 1) yield v;
  }
}

const oddsIter = odds(7);
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());
