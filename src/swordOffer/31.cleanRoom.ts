// https://juejin.cn/book/6844733800300150797/section/6844733800371453960

interface IRobot {
  move: () => boolean;
  turnLeft: () => void;
  turnRight: () => void;
  clean: () => void;
}

const cleanRoom = (robot: IRobot) => {
  // 初始化 set 存储请扫过的坐标
  const boxSet = new Set<string>();
  // 初始化机器人的朝向
  let dir = 0;
  // 定义 dfs
  const dfs = (robot: IRobot, boxSet: Set<string>, index: number, j: number, dir: number) => {
    // 记录当前格子的坐标
    let box = `${index}+${j}`;
    // 如果已经打扫过了，直接跳过
    if (boxSet.has(box)) return;
    // 打扫当前格子
    robot.clean();
    // 存储格子
    boxSet.add(box);

    for (let k = 0; k < 4; k++) {
      // 前进的目标不是障碍物
      if (robot.move()) {
        let x = index;
        let y = j;

        switch (dir) {
          case 0:
            x = index - 1;
            break;
          case 90:
            y = j + 1;
            break;
          case 180:
            x = index + 1;
            break;
          case 270:
            y = j - 1;
            break;
          default:
            break;
        }
        dfs(robot, boxSet, x, y, dir);
        // 一个方向的 dfs 结束，遇到了障碍物，回朔到上一个格子
        robot.turnLeft();
        robot.turnLeft();
        robot.move();
        robot.turnRight();
        robot.turnRight();
      }
      // 转向
      robot.turnRight();
      dir += 90;
      dir %= 360;
    }
  }

  dfs(robot, boxSet, 0, 0, 0);
}


export {}
