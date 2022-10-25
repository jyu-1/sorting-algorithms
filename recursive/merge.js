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

console.log(mergeSort([5, 0, 10, -3, -1, 4, 12, -5, 2, 1]));
