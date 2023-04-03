function climbStairs(n: number): number {
  const isOdd = Boolean(n % 2);
  const num = isOdd ? (n - 1) / 2 : n / 2;

  let res = 0;
  for (let k = 0; k <= num; k++) {
    let dividend = 1;
    let divisor = 1;

    for (let j = 0; j < (isOdd ? 2 * k + 1 : 2 * k); j++) {
      dividend *= num - k + j + 1;
      divisor *= j + 1;
    }

    res += dividend / divisor;
  }
  return res;
}
