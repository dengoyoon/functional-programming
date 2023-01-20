function map(f, iter) {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(map((a) => a * 10, arr));
