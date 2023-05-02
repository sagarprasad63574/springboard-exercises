// add whatever parameters you deem necessary
function createFrequencyCounter(array) {
    let frequencies = new Map();

    for (let val of array) {
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }

    return frequencies;
}

function sameFrequency(num1, num2) {
    if (num1.toString().length !== num2.toString().length) return false;

    let myFunc = num => Number(num);

    let num1Freqs = createFrequencyCounter(Array.from(String(num1), myFunc));
    let num2Freqs = createFrequencyCounter(Array.from(String(num2), myFunc));

    for (let key of num1Freqs.keys()) {
        if (num2Freqs.has(key) === false) {
            return false;
        }

        if (num2Freqs.get(key) !== num1Freqs.get(key)) {
            return false;
        }
    }

    return true;
}

module.exports = sameFrequency;