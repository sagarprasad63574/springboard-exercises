process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const { createData } = require("../testDb");
const db = require("../db");

// before each test, clean out data
beforeEach(createData);

afterAll(async () => {
    await db.end()
})

describe("GET /", function () {

    test("It should respond with array of industries", async function () {
        const response = await request(app).get("/industries");
        expect(response.body).toEqual({
            "industries": [{
                "code": "acct",
                "industry": "Accounting",
                "company_code": "apple"
            },
            {
                "code": "ed",
                "industry": "Educational",
                "company_code": "apple"
            },
            {
                "code": "acct",
                "industry": "Accounting",
                "company_code": "ibm"
            }]
        });
    })

});

describe("POST /", function () {

    test("It should add industry", async function () {
        const response = await request(app)
            .post("/industries")
            .send({ industry: "finance" });

        expect(response.body).toEqual(
            {
                "industry": {
                    code: "finance",
                    industry: "finance",
                }
            }
        );
    });
});