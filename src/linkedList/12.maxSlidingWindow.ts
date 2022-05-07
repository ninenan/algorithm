// https://leetcode-cn.com/problems/sliding-window-maximum/

const maxSlidingWindow = (nums: number[], k: number): number[] => {
  const res: number[] = []
  let left = 0
  let right = k - 1

  while (right < nums.length) {
    const max = getMax(nums, left, right)
    
    res.push(max)
    left += 1
    right += 1
  }

  return res
}

const getMax = (nums: number[], left: number, right: number): number => {
  let res = nums[left]

  for (let index = left; index <= right; index++) {
    if (res < nums[index]) {
      res = nums[index]
    }
  }

  return res
}

const maxSlidingWindow2 = (nums: number[], k: number): number[] => {
  const len = nums.length
  const res: number[] = []
  const queue: number[] = []

  for (let index = 0; index < len; index++) {
    while (queue.length && nums[queue[queue.length - 1]] < nums[index]) {
      queue.pop()
    }

    queue.push(index)

    while (queue.length && queue[0] <= index - k) {
      queue.shift()
    }

    if (index >= k - 1) {
      res.push(nums[queue[0]])
    }
  }

  return res
}
