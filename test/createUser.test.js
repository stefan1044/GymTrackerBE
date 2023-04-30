const {expect, test, afterEach, beforeAll} = require('@jest/globals');
const {runServer, closeServer} = require('../server');
const fetch = require(`node-fetch`);
const {createRandomUser} = require('./utils/userUtils');


beforeAll(async () => {
    process.env.PORT = "";
});


test("Create correct user", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(10, 10);
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(response.ok).toBe(true);
    await closeServer();
});
test("Create user without username", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(35, 10);
    delete user.user_name;
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Field user_name is not present in body of request!");
    await closeServer();
});
test("Create user with username too long", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(35, 10);
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name is too long!");
    await closeServer();
});
test("Create user with username too short", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(2, 21);
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name is too short!");
    await closeServer();
});
test("Create user with username containing '", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(21, 9);
    user.user_name += "'";
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
    await closeServer();
});
test("Create user with username containing \\", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(17, 28);
    user.user_name += "\\";
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
    await closeServer();
});
test("Create user with username containing =", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(22, 13);
    user.user_name += "=";
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
    await closeServer();
});
test("Create user without password", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(23, 30);
    delete user.password;
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Field password is not present in body of request!");
    await closeServer();
});
test("Create user with password too long", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(17, 100);
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Password is too long!");
    await closeServer();
});
test("Create user with password too short", async () => {
    const {port, closeServer} = runServer();
    const user = createRandomUser(8, 5);
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Password is too short!");
    await closeServer();
});
test("Create user without email", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(23, 26);
    delete user.email;
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Field email is not present in body of request!");
    await closeServer();
});
test("Create user with email too short", async () => {
    const {port, closeServer} = runServer();
    let user = createRandomUser(23, 30);
    user.email = "ab@yahoo.com";
    const response = await fetch(`http://localhost:${port}/users/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    });
    expect(await response.text()).toBe("Invalid email");
    await closeServer();
});
