function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let n = arr[i]; 
        let j = i-1; 
        while (j >= 0 && arr[j] > n) {
            arr[j+1] = arr[j];
            j--; 
        }
        arr[j+1] = n; 
    }

    return arr; 
}

module.exports = insertionSort;