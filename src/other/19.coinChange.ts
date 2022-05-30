// https://juejin.cn/book/6844733800300150797/section/6844733800367276039

const coinChange = (coins: number[], amount: number): number => {
  const f = []
  f[0] = 0

  for (let index = 1; index <= amount; index++) {
    f[index] = Infinity
    for (let j = 0; j < coins.length; j++) {
      if (index - coins[j] >= 0) {
        f[index] = Math.min(f[index], f[index - coins[j]] + 1)
      }
    }
  }

  if (f[amount] === Infinity) {
    return -1
  }

  return f[amount]
}