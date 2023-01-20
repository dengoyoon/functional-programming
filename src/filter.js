function filter(f, iter) {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
}

const arr = [10, 20, 30, 40, 50, 60, 70];

console.log(filter((a) => a < 45, arr));
