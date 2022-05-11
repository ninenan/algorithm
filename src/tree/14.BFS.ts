// https://juejin.cn/book/6844733800300150797/section/6844733800358887438
// 广度优先遍历

interface IRoot {
    val: string;
    left?: IRoot;
    right?: IRoot
}

const root: IRoot = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
}

const BFS = (root: IRoot) => {
    // 初始化队列
    const queue = []
    // 根节点入队
    queue.push(root)

    while(queue.length) {
        const top: IRoot = queue[0]

        console.log(top.val)
        // 存在左子树，左子树入队
        if (top.left) {
            queue.push(top.left)
        }
        // 存在右子树，右子树入队
        if (top.right) {
            queue.push(top.right)
        }
        // 访问完毕，队头元素出队
        queue.shift()
    }
}

BFS(root)