const Node = (value = null, nextNode = null) => {
    return { value, nextNode };
};

const LinkedList = () => {
    let privateHead = null;
    let privateSize = 0;

    const append = (value, next = privateHead) => {
        if (privateHead === null) {
            const temp = Node(value);
            privateHead = temp;
            privateSize++;
            return;
        }

        if (next.nextNode === null) {
            const temp = Node(value);
            next.nextNode = temp;
            privateSize++;
            return;
        }
        append(value, next.nextNode);
    };

    const prepend = (value) => {
        const newNode = Node(value);
        if (privateHead === null) {
            privateHead = newNode;
        } else {
            newNode.nextNode = privateHead;
            privateHead = newNode;
        }
        privateSize++;
    };

    const size = () => {
        console.log(privateSize);
    };

    const head = () => {
        console.log(privateHead);
    };

    const tail = (next = privateHead) => {
        if (privateHead === null) return console.log("null");
        if (next.nextNode === null) return console.log(next);
        tail(next.nextNode);
    };

    const at = (index, next = privateHead) => {
        if (index >= privateSize || index < 0) {
            console.log("Doesn't Exist");
            return null;
        } else {
            let temp = privateHead;
            for (let i = 0; i < index; i++) {
                temp = temp.nextNode;
            }
            console.log(temp);
            return temp;
        }
    };

    const pop = () => {
        let temp = privateHead;
        if (privateSize === 1) {
            privateHead = null;
        } else {
            for (let i = 1; i < privateSize - 1; i++) {
                temp = temp.nextNode;
            }
        }
        temp.nextNode = null;
        privateSize--;
        console.log(privateHead);
    };

    const contains = (num, next = privateHead) => {
        if (next.value === num) return true;
        if (next.nextNode === null) return false;
        return contains(num, next.nextNode);
    };

    const find = (num, next = privateHead) => {
        if (next.value === num) return 0;
        if (next.nextNode === null) return null;
        const temp = find(num, next.nextNode);
        if (temp === null) return null;
        else {
            return temp + 1;
        }
    };

    const toString = (next = privateHead) => {
        if (next === null) {
            return "null";
        }

        return `( ${next.value} ) -> ${toString(next.nextNode)}`;
    };

    const insertAt = (num, index) => {
        if (index > privateSize - 1 || index < 0) {
            console.log("Index out of bound");
            return;
        }

        if (index === 0) {
            prepend(num);
            return;
        } else if (index === privateSize - 1) {
            append(num);
            return;
        }

        const temp = Node(num, at(index));
        at(index - 1).nextNode = temp;
        privateSize++;
    };

    const removeAt = (index) => {
        if (index > privateSize - 1 || index < 0) {
            console.log("Index out of bound");
            return;
        }

        if (index === 0) {
            privateHead = privateHead.nextNode;
        } else if (index === privateSize - 1) {
            pop();
            return;
        }

        at(index - 1).nextNode = at(index).nextNode;
        privateSize--;
    };

    return {
        size,
        head,
        tail,
        at,
        pop,
        contains,
        find,
        toString,
        append,
        prepend,
        insertAt,
        removeAt,
    };
};

const test = LinkedList();

test.append(1);
test.append(2);
test.append(3);
test.append(4);
test.append(5);

test.insertAt(99, 4);

console.log(test.toString());
test.size();
test.at(5);
