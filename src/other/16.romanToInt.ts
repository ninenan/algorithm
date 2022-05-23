// https://leetcode.cn/problems/roman-to-integer/submissions/

const romanToInt = (str: string): number => {
    const map = new Map<string, number>([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
    ])
    const len = str.length
    let res = 0

    for (let index = 0; index < len; ++index) {
        const val = map.get(str[index])! 
        if (index < len - 1 && val < map.get(str[index + 1])!) {
            res -= val
        } else {
            res += val
        }
    }

    return res
}