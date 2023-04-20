function countZeroes(arr) {
    let zeros = findZeros(arr)
    if (zeros === -1) return 0;

    return arr.length - zeros; 
}

function findZeros(arr, leftIndex = 0, rightIndex = arr.length - 1) {
    if (rightIndex >= leftIndex) {
        let middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2)
        if ((middleIndex === 0 || arr[middleIndex - 1] === 1) && arr[middleIndex] === 0) {
            return middleIndex;
        } else if (arr[middleIndex] === 1) {
            return findZeros(arr, middleIndex + 1, rightIndex)
        }
        return findZeros(arr, leftIndex, middleIndex - 1)
    }
    return -1;
}

module.exports = countZeroes