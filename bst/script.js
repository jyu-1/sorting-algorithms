const mergeSort = (array) => {
    if (array.length < 2) {
        return array;
    }

    const midarray = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, midarray));
    const right = mergeSort(array.slice(midarray));
    return merge(left, right);
};

const merge = (left, right) => {
    const array = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        } else {
            array.push(right.shift());
        }
    }

    return array.concat(left, right);
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = arr;
    }

    insert(value, nextNode = this.root) {
        if (nextNode.data === value) {
            return;
        } else if (nextNode.data > value) {
            if (nextNode.left === null) {
                const node = new Node(value);
                nextNode.left = node;
                return;
            } else {
                this.insert(value, nextNode.left);
            }
        } else if (this.root.data < value) {
            if (nextNode.right === null) {
                const node = new Node(value);
                nextNode.right = node;
                return;
            } else {
                this.insert(value, nextNode.right);
            }
        }
    }

    delete(value, nextNode = this.root) {
        if (nextNode === null) return nextNode;

        if (value < nextNode.data) {
            nextNode.left = this.delete(value, nextNode.left);
            return nextNode;
        } else if (value > nextNode.data) {
            nextNode.right = this.delete(value, nextNode.right);
            return nextNode;
        } else {
            if (nextNode.left === null) return nextNode.right;
            else if (nextNode.right === null) return nextNode.left;

            let temp = nextNode.right;
            let minValue = nextNode.data;
            while (temp !== null) {
                minValue = temp.data;
                temp = temp.left;
            }
            nextNode.data = minValue;
            nextNode.right = this.delete(minValue, nextNode.right);
            return nextNode;
        }
    }

    find(value, nextNode = this.root) {
        if (nextNode === null) return null;

        if (nextNode.data === value) {
            console.log(nextNode);
            return nextNode;
        } else if (nextNode.data > value) {
            this.find(value, nextNode.left);
        } else if (nextNode.data < value) {
            this.find(value, nextNode.right);
        }
    }

    inorder(array = [], nextNode = this.root) {
        if (nextNode === null) return;

        if (nextNode.left !== null) {
            this.inorder(array, nextNode.left);
        }

        array.push(nextNode.data);

        if (nextNode.right !== null) {
            this.inorder(array, nextNode.right);
        }

        return array;
    }

    preorder(array = [], nextNode = this.root) {
        if (nextNode === null) return;

        array.push(nextNode.data);

        if (nextNode.left !== null) {
            this.preorder(array, nextNode.left);
        }

        if (nextNode.right !== null) {
            this.preorder(array, nextNode.right);
        }

        return array;
    }

    postorder(array = [], nextNode = this.root) {
        if (nextNode === null) return;

        if (nextNode.left !== null) {
            this.postorder(array, nextNode.left);
        }

        if (nextNode.right !== null) {
            this.postorder(array, nextNode.right);
        }

        array.push(nextNode.data);

        return array;
    }

    height(node = this.root) {
        if (node === null) return 0;

        let left = this.height(node.left);
        let right = this.height(node.right);

        if (left > right) return left + 1;
        else return right + 1;
    }

    depth(value, node = this.root) {
        if (node === null) return 0;

        if (node.data === value) return 1;

        let left = this.depth(value, node.left);
        let right = this.depth(value, node.right);

        if (left === right) return 0;
        else if (left < right) return right + 1;
        else if (left > right) return left + 1;
    }

    levelOrder() {
        const queue = [];
        const data = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            let node = queue.shift();
            data.push(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        console.log(data);
    }

    isBalanced(node = this.root) {
        let temp = Math.abs(this.height(node.left) - this.height(node.right));
        if (temp < 2) console.log("Is balanced");
        else console.log("Not Balanced");
    }

    rebalance() {
        let temp = this.inorder([], this.root);
        this.root = buildTree(temp, 0, temp.length - 1);
    }
}

const buildTree = (array, start, end) => {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
    return node;
};

// 1. Random array; sorted, duplicate removed, bst created
const arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
}

const newArr = [...new Set(mergeSort(arr))];

root = new Tree(buildTree(newArr, 0, newArr.length - 1));

// 2. confirm balance
root.isBalanced();

// 3. print level, pre, post, and in order
root.levelOrder();
console.log(root.preorder());
console.log(root.postorder());
console.log(root.inorder());

// 4. insert 100 numbers
for (let i = 101; i < 200; i++) {
    root.insert(i);
}

// 5. confirm is unbalanced
root.isBalanced();

// 6. rebalance the tree
root.rebalance();

// 7. confirm balanced after rebalancing
root.isBalanced();

// 8. print level, pre, post, and in order
root.levelOrder();
console.log(root.preorder());
console.log(root.postorder());
console.log(root.inorder());
