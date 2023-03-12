function find_mean(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
    }

    result = result / arr.length;
    return result;
}

function find_median(arr) {

    const sortedArr = arr.sort();
    const middleIndex = arr.length / 2;

    if (arr.length % 2 !== 0) {
        return arr[Math.floor(middleIndex)];
    }

    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
}

function find_mode(arr) {

    let object = {}

    for (let i = 0; i < arr.length; i++) {
        if (object[arr[i]]) {
            object[arr[i]] += 1
        } else {
            object[arr[i]] = 1
        }
    }

    let biggestValue = -1
    let biggestValuesKey = -1

    Object.keys(object).forEach(key => {
        let value = object[key]
        if (value > biggestValue) {
            biggestValue = value
            biggestValuesKey = key
        }
    })

    return Number(biggestValuesKey);
}

module.exports = {
    find_mean,
    find_median,
    find_mode
};
