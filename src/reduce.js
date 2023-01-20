function reduce(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
}

const add = (a, b) => a + b;

console.log(reduce(add, 1, [2, 3, 4, 5]));
console.log(reduce(add, [1, 2, 3, 4, 5]));
