process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "candy", price: "3.55" };

beforeEach(function () {
    items.push(item);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [item] })
    })
})

describe("GET /items/:name", () => {
    test("Get a item by name", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ name: item.name, price: item.price })
    })

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get("/items/coco");
        expect(res.statusCode).toBe(404)
    })
})

describe("POST /items", () => {
    test("Creating a item", async () => {
        const res = await request(app).post("/items").send({
            name: "icecream",
            price: "5.67"
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ added: { name: "icecream", price: "5.67" } })
    })

    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("/PATCH /items/:name", () => {
    test("Updating a items's name and price", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({ 
            name: "popsicle",
            price: "4.56" 
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "popsicle", price: "4.56" } });
    })
    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).patch("/items/johnny").send({ name: "popsicle", price: "4.56" });
        expect(res.statusCode).toBe(404);
    })
})

describe("/DELETE /items/:name", () => {
    test("Deleting a item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid item", async () => {
        const res = await request(app).delete("/items/hamface");
        expect(res.statusCode).toBe(404);
    })
})