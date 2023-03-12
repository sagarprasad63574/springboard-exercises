const express = require('express');
const ExpressError = require('./expressError');
const app = express();

const { find_mean, find_median, find_mode } = require('./operations');

app.get('/', (req, res) => {
    res.send("HOMEPAGE!")
})

app.get('/mean', (req, res, next) => {
    try {
        if (!req.query.nums) {
            throw new ExpressError("nums are required", 400)
        }

        let nums = req.query.nums;
        let arr = nums.split(',');
        let numsArr = arr.map(Number);

        for (let i = 0; i < numsArr.length; i++) {
            if (isNaN(numsArr[i])) {
                throw new ExpressError(`${arr[i]} is not a number`, 400)
            }
        }

        let result = find_mean(numsArr);

        res.json({
            response: {
                operation: "mean",
                value: result
            }
        });

    } catch (e) {
        next(e)
    }
})

app.get('/median', (req, res, next) => {
    try {
        if (!req.query.nums) {
            throw new ExpressError("nums are required", 400)
        }

        let nums = req.query.nums;
        let arr = nums.split(',');
        let numsArr = arr.map(Number);

        for (let i = 0; i < numsArr.length; i++) {
            if (isNaN(numsArr[i])) {
                throw new ExpressError(`${arr[i]} is not a number`, 400)
            }
        }

        let result = find_median(numsArr);

        res.json({
            response: {
                operation: "median",
                value: result
            }
        });

    } catch (e) {
        next(e)
    }
})

app.get('/mode', (req, res, next) => {
    try {
        if (!req.query.nums) {
            throw new ExpressError("nums are required", 400)
        }

        let nums = req.query.nums;
        let arr = nums.split(',');
        let numsArr = arr.map(Number);

        for (let i = 0; i < numsArr.length; i++) {
            if (isNaN(numsArr[i])) {
                throw new ExpressError(`${arr[i]} is not a number`, 400)
            }
        }

        let result = find_mode(numsArr);

        res.json({
            response: {
                operation: "mode",
                value: result
            }
        });

    } catch (e) {
        next(e)
    }
})

app.use(function (err, req, res, next) { 

    let status = err.status || 500;
    let message = err.msg;
  
    return res.status(status).json({
      error: { message, status }
    });
  });
  
app.listen(3000, () => {
    console.log("Server running on port 3000")
});
