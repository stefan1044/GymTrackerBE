const {expect, test, afterEach, beforeAll, describe, it, beforeEach} = require('@jest/globals');
const {runServer} = require('../server');
const fetch = require(`node-fetch`);
const {createRandomUser, createRandomUsername} = require('./utils/userUtils');

beforeEach(async () => {
    process.env.PORT = "";
});

describe("Create a user, login, and perform different username changes on it",  () => {
    process.env.PORT = "";
    let port = undefined;
    let closeServer = undefined;
    let token = undefined;
    let newUsername = undefined;
    it("Should create a new user, login and return the token", async () =>{
        const temp = runServer();
        port = temp.port;
        closeServer = temp.closeServer;

        const user = createRandomUser(7, 29);
        const registerResponse = await fetch(`http://localhost:${port}/users/register`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(user)
        });
        expect(registerResponse.ok).toBe(true);

        delete user.email;
        const loginResponse = await fetch(`http://localhost:${port}/users/login`,{
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(user)
        });
        token = (await loginResponse.json()).token;
        expect(token).toBeDefined();
    });


    test("Change username", async () => {
        newUsername = createRandomUsername(9);
        const changeUsernameResponse = await fetch(`http://localhost:${port}/users/changeuser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                user_name: newUsername
            })
        });

        expect(changeUsernameResponse.ok).toBe(true);
    });
    test("Change username to already existing one", async () => {
        const changeUsernameResponse = await fetch(`http://localhost:${port}/users/changeuser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                user_name: newUsername
            })
        });

        expect((await changeUsernameResponse.json()).message).toBe("Username is already taken!");
    });



    it("Should close the server!", async () => {
        closeServer()
    });
});