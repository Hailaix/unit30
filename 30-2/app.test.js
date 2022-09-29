const request = require("supertest");

const app = require('./app');
const items = require('./fakeDb');

const candy = { "name": "snickers", "price": "1.99" };

beforeEach(function () {
    items.push(candy);
});
afterEach(function () {
    items.length = 0;
});

describe("GET /items", function () {
    test("get the list of items", async function () {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ "name": "snickers", "price": "1.99" }]);
    });
});

describe("POST /items", function () {
    test("create a new item", async function() {
        const res = await request(app).post("/items").send({"name":"skittles", "price" : ".99"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ "added": {"name":"skittles", "price" : ".99"} });
    });
});

describe("GET /items/:name", function() {
    test("update an item", async function() {
        const res = await request(app).get("/items/snickers");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "name": "snickers", "price": "1.99" });
    });
    test("GET failure to find", async function(){
        const res = await request(app).get("/items/fake");
        expect(res.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", function() {
    test("update an item", async function() {
        const res = await request(app).patch("/items/snickers").send({"price" : ".99"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"updated" : { "name": "snickers", "price": ".99" }});
    });
    test("PATCH failure to find", async function(){
        const res = await request(app).patch("/items/fake");
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function() {
    test("update an item", async function() {
        const res = await request(app).delete("/items/snickers");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual("Deleted");
    });
    test("DELETE failure to find", async function(){
        const res = await request(app).delete("/items/fake");
        expect(res.statusCode).toBe(404);
    });
});