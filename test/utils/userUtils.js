const {faker} = require("@faker-js/faker");

const createRandomUsername = userNameLength => `${faker.random.alphaNumeric(userNameLength)}`;
const createRandomPassword = passwordLength => `${faker.random.alphaNumeric(passwordLength)}`;
const createRandomEmail = () => `${faker.internet.email()}`;
const createRandomUser = (userNameLength, passwordLength) => {
    const userName = createRandomUsername(userNameLength);
    const password = createRandomPassword(passwordLength);
    const email = createRandomEmail();

    return {
        user_name: userName, password: password, email: email
    };
};

module.exports = {
    createRandomUser, createRandomUsername, createRandomPassword, createRandomEmail
};