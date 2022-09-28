//from the slides
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        // console.error(this.stack);
    }
}

function mean(values) {
    if (values.length !== 0) {
        let sum = 0;
        for (let val of values) {
            sum += Number(val);
            if (Number.isNaN(sum)) {
                throw new ExpressError(`${val} is not a number`, 400);
            }
        }
        return sum / values.length;
    }
    else {
        throw new ExpressError("nums are required", 400);
    }
}

function median(values) {
    if (values.length !== 0) {
        for (let val of values) {
            if (Number.isNaN(Number(val))) {
                throw new ExpressError(`${val} is not a number`, 400);
            }
        }
        values.sort((x, y) => {
            return x - y;
        });
        console.log(values);
        const midpoint = Math.floor(values.length / 2);
        if (values.length % 2 === 0) {
            return (values[midpoint - 1] + values[midpoint]) / 2;
        }
        else {
            return values[midpoint];
        }
    }
    else {
        throw new ExpressError("nums are required", 400);
    }
}


function mode(values) {
    if (values.length !== 0) {
        for (let val of values) {
            if (Number.isNaN(Number(val))) {
                throw new ExpressError(`${val} is not a number`, 400);
            }
        }
        if (values.length === 1) {
            return values[0];
        }
        let maxcount = 0;
        let mode;
        const counted = [];
        for (let i = 0; i < values.length; i++) {
            if (!counted.includes(values[i])) {
                counted.push(values[i]);
                let currcount = 1;
                for (let j = i + 1; j < values.length; j++) {
                    if (values[j] === values[i]) {
                        currcount++;
                    }
                    if (currcount > maxcount) {
                        mode = values[i];
                        maxcount = currcount;
                    }
                }
            }
        }
        return mode;
    }
    else {
        throw new ExpressError("nums are required", 400);
    }
}

module.exports = {
    mean,
    median,
    mode,
    ExpressError
}