const {expect, test, afterEach, beforeAll} = require('@jest/globals');
const {runServer} = require('../server');
const fetch = require(`node-fetch`);
const {createRandomUser} = require('./utils/userUtils');


beforeAll(async () => {
    process.env.PORT = "";
});


test("Create user and login with correct user", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(10, 10);
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
    expect(loginResponse.ok).toBe(true);
    expect((await loginResponse.json()).token).toBeDefined();
    await closeServer();
});
test("Login without username", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(10, 10);
    delete user.email;
    delete user.user_name;

    const loginResponse = await fetch(`http://localhost:${port}/users/login`,{
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await loginResponse.text()).toBe("Field user_name is not present in body of request!");
    await closeServer();
});
test("Login with username too long", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(75, 10);

    const loginResponse = await fetch(`http://localhost:${port}/users/login`,{
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await loginResponse.text()).toBe("User name is too long!");
    await closeServer();
});
test("Login without password", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(10, 10);
    delete user.email;
    delete user.password;

    const loginResponse = await fetch(`http://localhost:${port}/users/login`,{
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await loginResponse.text()).toBe("Field password is not present in body of request!");
    await closeServer();
});