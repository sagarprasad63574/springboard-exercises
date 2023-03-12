const { find_mean, find_median, find_mode } = require("./operations");

describe("#find_mean", function () {
    it("finds the mean of an empty array", function () {
        expect(find_mean([])).toEqual(NaN)
    })
    it("finds the mean of an array of numbers", function () {
        expect(find_mean([1, -1, 4, 2])).toEqual(1.5)
    })
})

describe("#find_median", function () {
    it("finds the median of an even set", function () {
        expect(find_median([1, -1, 4, 2])).toEqual(1.5)
    })
    it("finds the median of an odd set", function () {
        expect(find_median([1, -1, 4])).toEqual(1)
    })
})

describe("#find_mode", function () {
    it("finds the mode", function () {
        expect(find_mode([1, 1, 1, 2, 2, 3])).toEqual(1)
    })
})