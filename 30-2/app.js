const express = require('express');
const itemsRouter = require('./itemroutes')

const app = express();

app.use(express.json());
app.use('/items', itemsRouter)

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

module.exports = app;
