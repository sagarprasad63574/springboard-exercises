// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
    let obj = {};

    for (let i in arr1) {
        if (arr1[i] && arr2[i]) {
            obj[arr1[i]] = arr2[i];
        } else if (arr1[i] && !arr2[i]) {
            obj[arr1[i]] = null;
        } else {
            return; 
        }
    }
    return obj;
}
module.exports = twoArrayObject;