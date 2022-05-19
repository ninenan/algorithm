// https://leetcode.cn/problems/implement-strstr/submissions/

const strStr = (haystack: string, needle: string): number => {
    let n = haystack.length
    let m = needle.length
    if (m === 0) return 0

    let next = new Array(m).fill(0)
    for (let index = 0, j = 0; index < m; index++) {
        while (j > 0 && needle[index] !== needle[j]) {
            j = next[j - 1]
        }
        if (needle[index] === needle[j]) {
            j ++
        }
        next[index] = j
    }

    for(let i = 0, j = 0; i < n; i ++) {
        while(j > 0 && haystack[i] !== needle[j]) {
            j = next[j - 1]
        }
        if (haystack[i] === needle[j]) {
            j ++ 
        }
        if (j === m) {
            return i - m + 1
        }
    }
    return - 1
}

const strStr2 = (haystack: string, needle: string): number => {
    return haystack.indexOf(needle)
}

export {}