const {describe, expect, test, afterEach, beforeEach, beforeAll, afterAll} = require('@jest/globals');
const {runServer, closeServer} = require('../server');
const {faker} = require('@faker-js/faker');
const fetch = require(`node-fetch`);
const httpStatus = require('http-status')

const createRandomUser = (userNameLength, passwordLength) => {
    const userName = `${faker.random.alphaNumeric(userNameLength)}`;
    const password = `${faker.random.alphaNumeric(passwordLength)}`;
    const email = `${faker.internet.email()}`

    return {
        user_name: userName,
        password: password,
        email: email};
};
beforeAll(async () => {
    process.env.PORT = "";
});
afterEach(() => {
     setTimeout(closeServer, 100);
});
test("Create correct user", async () => {
    const port = await runServer();
    const user = createRandomUser(10, 10);
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Connection":"keep-alive"
        },
        body:JSON.stringify(user)
    });
    expect(response.ok).toBe(true);
});
test("Create user without username", async () => {
    const port = await runServer();
    let user = createRandomUser(35, 10);
    delete user.user_name;
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("Field user_name is not present in body of request!");
});
test("Create user with username too long", async () => {
    const port = await runServer();
    const user = createRandomUser(35, 10);
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name is too long!");
});
test("Create user with username too short", async () => {
    const port = await runServer();
    const user = createRandomUser(2, 21);
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name is too short!");
});
test("Create user with username containing '", async () => {
    const port = await runServer();
    let user = createRandomUser(21, 9);
    user.user_name += "'";
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
});
test("Create user with username containing \\", async () => {
    const port = await runServer();
    let user = createRandomUser(17, 28);
    user.user_name += "\\";
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
});
test("Create user with username containing =", async () => {
    const port = await runServer();
    let user = createRandomUser(22, 13);
    user.user_name += "=";
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("User name contains invalid characters!");
});
test("Create user without password", async () => {
    const port = await runServer();
    let user = createRandomUser(23, 30);
    delete user.password;
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("Field password is not present in body of request!");
});
test("Create user with password too long", async () => {
    const port = await runServer();
    const user = createRandomUser(17, 100);
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("Password is too long!");
});
test("Create user with password too short", async () => {
    const port = await runServer();
    const user = createRandomUser(8, 5);
    const response = await fetch(`http://localhost:${port}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });
    expect(await response.text()).toBe("Password is too short!");
});