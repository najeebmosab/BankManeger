const request = require("supertest");
const app = require("../Server");
const UserModel = require("../Models/UserModel");


test("add new user by tesing", async () => {
    const user = {
        email: "mousab1234@gmail.com",
        password: "123123",
        typeUser: "user",
        passportId: "12341244",
    };
    await request(app)
        .post("/Users")
        .send(user)
        .expect(201)
        .then((response) => {
            expect(response.body.user.email).toBe(user.email);
        });
}, 300000); // set timeout to 30 seconds