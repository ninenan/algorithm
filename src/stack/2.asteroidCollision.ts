// https://leetcode.cn/problems/asteroid-collision/

const asteroidCollision = (asteroids: number[]): number[] => {
  const stack = [];

  for (const aster of asteroids) {
    let isAlive = true;

    while (
      isAlive &&
      aster < 0 &&
      stack.length &&
      stack[stack.length - 1] > 0
    ) {
      isAlive = stack[stack.length - 1] < -aster;

      if (stack[stack.length - 1] <= -aster) {
        stack.pop();
      }
    }

    if (isAlive) {
      stack.push(aster);
    }
  }

  return stack;
};

console.log(asteroidCollision([-1, -2, 1, 2]));
console.log(asteroidCollision([1, 2, -1, -2]));
console.log(asteroidCollision([-5, 5, 20, -20, 10, -10]));
console.log(3333);
