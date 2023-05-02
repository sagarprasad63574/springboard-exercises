function createFrequencyCounter(msg) {
    let frequencies = new Map();

    for (let val of msg) {
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }

    return frequencies;
}
function constructNote(message, letters) {
    if (!letters) return false;
    if (message === "") return true;

    let messageFreqs = createFrequencyCounter(message);
    let lettersFreqs = createFrequencyCounter(letters);
    
    for (let key of messageFreqs.keys()) {
        if (lettersFreqs.has(key) === false) {
            return false;
        }

        if (lettersFreqs.get(key) < messageFreqs.get(key)) {
            return false;
        }
    }

    return true;
}

module.exports = constructNote;