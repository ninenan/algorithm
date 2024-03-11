///////////////////////////////////////////////////////////////////// FP
// 重行为，轻数据结构
// 重行为，轻数据结构
// 重行为，轻数据结构

// 数据不是主角，围绕数据展开的行为才是主角。“行为”即是函数

// FP 的核心在于组合

// 如果是看重代码重用的话
// 组合就是比继承好，能用组合就不要用继承。

// JS 语言非常特别，它的对象和函数之间没有特别清晰的边界，函数和对象都可以视作是一等公民（甚至函数本身就是一种可执行的对象）。
// 在项目中混合使用多种范式开发，对于我们来说是极度正常的一件事情——即使选择了 FP 作为程序的主要范式，仍然免不了要使用对象这种数据结构；
// 即使选择了 OOP 作为程序的主要范式，也避不开函数这种抽象方式。
// 因此我始终认为，OOP 和 FP 之间并不是互斥/对立的关系，而是正交/协作的关系。

// mock 用户
const user = {
  name: "nnn",
  likedLessons: [] as string[],
  registeredLessons: [] as string[],
  isVIP: false,
};

// mock 测试课程
const myLessons = [
  {
    teacher: "John",
    title: "English",
  },
  {
    teacher: "zhangsan",
    title: "Chinese",
  },
];

type User = typeof user;

// 喜欢课程
const likeLessons = (user: User, lessons: string[]) => {
  const updatedLikedLessons = user.likedLessons.concat(lessons);

  return Object.assign({}, user, { likedLessons: updatedLikedLessons });
};

// 注册课程
const registerLessons = (user: User) => {
  return {
    ...user,
    registeredLessons: user.likedLessons,
  };
};

// 清空喜欢列表
const emptyUserLiked = (user: User) => {
  return {
    ...user,
    likedLessons: [],
  };
};

// 是否是 VIP
const isVIP = (user: User) => {
  let isVIP = false;
  if (user.registeredLessons.length > 10) {
    isVIP = true;
  }

  return {
    ...user,
    isVIP,
  };
};

const pipe = (...funcs: Function[]) =>
  funcs.reduce(
    (f, g) =>
      (...args: any[]) =>
        g(f(...args))
  );

console.log(
  pipe(likeLessons, registerLessons, emptyUserLiked, isVIP)(user, myLessons)
);
// { name: 'nnn',
// likedLessons: [],
// registeredLessons:
//  [ { teacher: 'John', title: 'English' },
//    { teacher: 'zhangsan', title: 'Chinese' } ],
// isVIP: false }

///////////////////////////////////////////////////////////////////// OOP

// 重数据结构，轻行为
// 重数据结构，轻行为
// 重数据结构，轻行为

// 通过寻找事物之间的共性，来抽象对一类事物的描述
// 把相互联系的属性和方法打包，抽象为一个“类”数据结构。
// 当我们思考问题的时候，我们关注的不是行为本身，而是谁做了这个行为，谁和谁之间有着怎样的联系。

// OOP 的核心在于继承

class Player {
  name: string;
  sport: string;

  constructor(name: string, sport: string) {
    this.name = name;
    this.sport = sport;
  }

  doSport() {
    return `play${this.sport}`;
  }
}

// 篮球运动员
class BasketballPlayer extends Player {
  constructor(name: string) {
    super(name, "basketball");
  }

  slamDunk() {
    return `${this.name} just dunked a basketball`;
  }

  jump() {
    return `${this.name} is jumping`;
  }
}

// 足球运动员
class FootballPlayer extends Player {
  constructor(name: string) {
    super(name, "football");
  }

  shot() {
    return `${this.name} just shot the goal`;
  }

  runFast() {
    return `${this.name} is running fast!`;
  }
}

class CrazyPlayer extends Player {
  color: string;
  money: number;

  constructor(name: string, sport: string, color: string, money: number) {
    super(name, sport);
    this.color = color;
    this.money = money;
  }

  fly() {
    if (this.money > 0) {
      this.money--;
      return `${this.name} fly`;
    }

    return "no money";
  }
}

const Bob = new BasketballPlayer("Bob");
console.log(Bob.slamDunk()); // 'Bob just dunked a basketball'

const John = new FootballPlayer("John");
console.log(John.shot()); // 'John just shot the goal'

const nnn = new CrazyPlayer("nnn", "basketball", "red", 1);
console.log(nnn.fly()); // 'nnn fly'
console.log(nnn.money); // 0
console.log(nnn.fly()); // no money

// 为 OOP 引入“组合”思想
// 以楼上的游戏案例为蓝本。我们目前已经创造了三个 Class，它们分别是：
//
// BasketballPlayer：篮球选手，会灌篮（ slamdunk() ) ，会跳跃（ jump() )
// FootballPlayer：足球选手，会射门( shot() ），会狂奔（ runFast() ）
// CrazyPlayer：疯狂号选手，会飞（ fly() ）
// 游戏版本的迭代总是很快的。没过几天，李雷的老板坐不住了，他嫌疯狂号选手赚钱不够快。
// 怎么办呢？升级！升级一个大满贯选手，它既能灌篮、又能射门、还会飞。有这么多神技能，就不怕没人愿意充钱啦！
// 但是请注意，这个大满贯选手（SuperPlayer）只需要具备那些最酷炫的能力：比如它只需要篮球选手的“灌篮”能力，不需要“跳跃”能力；
// 它只需要足球选手的“射门”能力，不需要“狂奔”能力。这也合理，毕竟，人家都会飞了，也就不需要跑和跳了。
// 此时，如果我们借助继承来解决这个问题，就得让SuperPlayer同时继承 3 个 Class，用伪代码示意如下：

// SuperPlayer
//   extends BasketballPlayer
//     extends FootballPlayer
//       extends CrazyPlayer

// 这样一来，SuperPlayer 就被迫拥有了它并不需要也并不想要的的“射门”和“狂奔”能力。
// 但这还不是最糟糕的，最糟糕的是，这个 SuperPlayer 它其实既不是篮球选手、也不是足球选手、也不是疯狂号选手——SuperPlayer 和篮球/足球/疯狂号选手的交集，其实仅限于一个灌篮/射门/奔跑动作而已。
// 今后篮球/足球/疯狂号选手新增的任何属性和方法，都很可能是和我 SuperPlayer 没有关系的，
// SuperPlayer 选手想要的明明只有几个特定的函数，我们却不得不曲线救国、把它变成一个既是篮球选手、又是足球选手、同时还是疯狂号选手的缝合怪。
// 这一缝不要紧，以后任何一种选手的 Class 发生变更，都会直接影响到 SuperPlayer 这个最能赚钱、也最特别的选手。
// 风险这么大，谁还敢再动那些父类呢？
// 这个例子虽然不复杂，但是已经足够把继承带来的问题具象化。此时我们不妨像下面这样，为程序引入组合：

interface IPlayer {
  name: string;
  sport: string;
  money: number;
}

const getSlamDunk = (player: IPlayer) => ({
  slamDunk: () => `${player.name} just dunked a basketball`,
});

const getShot = (player: IPlayer) => ({
  shot: () => `${player.name} just shot the goal`,
});

const getFly = (player: IPlayer) => ({
  fly: () => {
    if (player.money > 0) {
      player.money--;
      return `${player.name} fly`;
    }

    return "no money";
  },
});

const SuperPlayer = (name: string, money: number) => {
  const player = {
    name,
    sport: "super",
    money,
  };

  return Object.assign(
    {},
    getSlamDunk(player),
    getShot(player),
    getFly(player)
  );
};

const superPlayer = SuperPlayer("nnn", 1);

console.log(superPlayer.slamDunk()); // 'nnn just dunked a basketball'
console.log(superPlayer.shot()); // 'nnn just shot the goal'
console.log(superPlayer.fly()); // 'nnn fly'
console.log(superPlayer.fly()); // no money

export {};
