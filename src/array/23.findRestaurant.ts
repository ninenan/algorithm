// https://leetcode-cn.com/problems/minimum-index-sum-of-two-lists/

const findRestaurant = (list1: string[], list2: string[]): string[] => {
  let count = list1.length + list2.length - 2;
  return list1.reduce((pre, cur, index) => {
    if (list2.includes(cur)) {
      const index2 = list2.findIndex((item) => item === cur);
      const currentIndex = index + index2;
      if (currentIndex <= count) {
        if (currentIndex < count) pre = [];
        count = currentIndex;
        pre.push(cur);
      }
    }
    return pre;
  }, []);
};

// 解法 2
// const findRestaurant = (list1: string[], list2: string[]): string[] => {
//     const map = new Map<string, number>()
//     for (let index = 0; index < list1.length; index++) {
//         map.set(list1[index], index)
//     }
//     console.log('map :>> ', map);
//     let result = []
//     let minNum = list1.length + list2.length

//     for (let index = 0; index < list2.length; index++) {
//         if (map.has(list2[index])) {
//             const list1Index = map.get(list2[index])
//             if (list1Index + index > minNum) {
//                 break
//             }
//             if (list1Index + index < minNum) {
//                 minNum = list1Index + index
//                 result = [list2[index]]
//             } else if (list1Index + index === minNum) {
//                 result.push(list2[index])
//             }
//         }
//     }

//     return result
// };

const list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"];
const list2 = ["KFC", "Shogun", "Burger King"];
