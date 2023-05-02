// add whatever parameters you deem necessary
function countPairs(arr, target) {
    let s = new Set(arr);
    let count = 0;
    for (let val of arr) {
        s.delete(val);
        if (s.has(target - val)) {
            count++;
        }
    }
    return count;
}
module.exports = countPairs;