const express = require('express');

const app = express();

app.get('/mean', function (req, res, next) {
    // return mean
    const ret = { operation: "mean" };
    if (req.query.nums) {
        let nums = req.query.nums.split(',');
        nums = nums.map(Number);
        try{
            //mean(nums)
        }
        catch(e){
            next(e);
        }
        ret.nums = nums;
    }
    return res.json(ret);
});

app.get('/median', function (req, res, next) {
    //return median
    if (req.query.nums) {
        const ret = { operation: "median" };
        let nums = req.query.nums.split(',');
        nums = nums.map(Number);
        try{
            //median(nums)
        }
        catch(e){
            next(e);
        }
        return res.json(ret);
    }
});

app.get('/mode', function (req, res, next) {
    //return mode
    if (req.query.nums) {
        const ret = { operation: "mode" };
        let nums = req.query.nums.split(',');
        nums = nums.map(Number);
        try{
            //mode(nums)
        }
        catch(e){
            next(e);
        }
        return res.json(ret);
    }
});

//from the slides
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