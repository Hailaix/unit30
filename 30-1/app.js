const express = require('express');
const { mean, median, mode } = require('./operations');
const app = express();

app.get('/mean', function (req, res, next) {
    // return mean
    const ret = { operation: "mean" };
    let nums = req.query.nums.split(',');
    nums = nums.map(Number);
    try {
        ret.value = mean(nums);
    }
    catch (e) {
        next(e);
    }
    return res.json(ret);
});

app.get('/median', function (req, res, next) {
    //return median
    const ret = { operation: "median" };
    let nums = req.query.nums.split(',');
    nums = nums.map(Number);
    try {
        ret.value = median(nums);
    }
    catch (e) {
        next(e);
    }
    return res.json(ret);
});

app.get('/mode', function (req, res, next) {
    //return mode
    const ret = { operation: "mode" };
    let nums = req.query.nums.split(',');
    nums = nums.map(Number);
    try {
        ret.value = mode(nums)
    }
    catch (e) {
        next(e);
    }
    return res.json(ret);
});

//error handler from the slides
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, function () {
    console.log('App on port 3000');
});