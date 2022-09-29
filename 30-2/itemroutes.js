const express = require("express");
const items = require("./fakeDb");
const ExpressError = require("./expressError");

const router = new express.Router();

router.get('/', function (req, res, next) {
    try {
        return res.json(items);
    }
    catch (e) {
        next(e);
    }
});

router.post('/', function (req, res, next) {
    try {
        //extract name and price from the accepted json so we don't grab anything else
        const name = req.body.name;
        const price = req.body.price;
        if (name && price) {
            const newItem = { name, price };
            items.push(newItem);
            return res.status(201).json({ "added": newItem });
        }
        else {
            throw new ExpressError("Name and Price Required fields", 400);
        }
    }
    catch (e) {
        next(e);
    }
});

router.get('/:name', function (req, res, next) {
    try {
        const item = items.find(function (value) {
            return value.name === req.params.name;
        });
        if (item) {
            return res.json(item);
        }
        else {
            throw new ExpressError("Item Not Found", 404)
        }
    }
    catch (e) {
        next(e);
    }
});

router.patch('/:name', function (req, res, next) {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const idx = items.findIndex(function (value) {
            return value.name === req.params.name;
        });
        if (idx !== -1) {
            const item = items[idx];
            if (name && item.name !== name) {
                item.name = name;
            }
            if (price && item.price !== price) {
                item.price = price;
            }
            return res.json({ "updated": item });
        }
        else {
            throw new ExpressError("Item Not Found", 404)
        }
    }
    catch (e) {
        next(e);
    }
});

router.delete('/:name', function (req, res, next) {
    try {
        const idx = items.findIndex(function (value) {
            return value.name === req.params.name;
        });
        if (idx !== -1) {
            items.splice(idx, 1);
            return res.json("Deleted");
        }
        else {
            throw new ExpressError("Item Not Found", 404)
        }
    }
    catch (e) {
        next(e);
    }
});

module.exports = router;