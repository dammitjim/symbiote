import request from "supertest";
import app from "../app";

describe("POST /api/v1/intake/", () => {
    describe("url verification challenge", () => {
        it("should respond with the corresponding challenge", async () => {
            const challenge = "my_challenge";

            const response = await request(app)
                .post("/api/v1/intake/")
                .send({type: "url_verification", token: "123", challenge});

            expect(response.status).toBe(200);
            expect(response.body.challenge).toEqual(challenge);
        });
        it("should 400 if no challenge is sent in request body", async () => {
            const response = await request(app)
                .post("/api/v1/intake/")
                .send({type: "url_verification", token: "123"});

            expect(response.status).toBe(400);
        });
        it("should 400 if no token set in request body", async () => {
            const response = await request(app)
                .post("/api/v1/intake/")
                .send({type: "url_verification", challenge: "123"});

            expect(response.status).toBe(400);
        });
    });

    it("should respond to bogus event types with a 400", async () => {
        const response = await request(app)
            .post("/api/v1/intake/")
            .send({type: "nonsense"});

        expect(response.status).toBe(400);
    })
})
