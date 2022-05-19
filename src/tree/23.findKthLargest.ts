// https://juejin.cn/book/6844733800300150797/section/6844733800367259661

const findKthLargest = (nums: number[], k: number): number => {
    const sorted = nums.sort((a, b) => b - a)
    
    return sorted[k - 1]
}

const findKthLargest2 = (nums: number[], k: number): number => {
    const heap: number[] = []
    let n = 0
    const len = nums.length
    const createHeap = () => {
        for (let index = 0; index < k; index++) {
            insert(nums[index])
        }
    }
    const updateHeap = () => {
        for (let index = 0; index < len; index++) {
            if (nums[index] > heap[0]) {
                heap[0] = nums[index]
                downHeap(0, k)
            } 
        }
    }
    const downHeap = (low: number, high: number) => {
        let i = low
        let j = i * 2 + 1

        while(j <= high) {
            if (j + 1 <= high && heap[j+ 1] < heap[j]) {
                j = j + 1
            }
            if (heap[i] > heap[j]) {
                const temp = heap[j]
                heap[j] = heap[i]
                heap[i] = temp
                i = j
                j = j * 2 + 1
            } else {
                break
            }
        }
    }
    const upHeap = (low: number, high: number) => {
        let i = high
        let j = Math.floor((i - 1) / 2)

        while(j >= low) {
            if (heap[j] > heap[i]) {
                const temp = heap[i]
                heap[j] = heap[i]
                heap[i] = temp
                i = j
                j = Math.floor((i - 1)/ 2)
            } else {
                break
            }
        }
    }
    const insert = (x: number) => {
        heap[n] = x
        upHeap(0, n)
        n ++
    }

    createHeap()
    updateHeap()
    return heap[0]
}

console.log(findKthLargest([3,2,1,5,6,4], 2))
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))