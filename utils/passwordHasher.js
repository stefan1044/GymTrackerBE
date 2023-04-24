const bcrypt = require('bcrypt');
const logger = require('../utils/logger');


const encrypt = password => {
    const saltRounds = 8;

    return bcrypt.hash(password, saltRounds).then(hash => {
        return hash;
    }).catch(e => {
        logger.error(`Encountered error at passwordHasher.encrypt. Error message:${e.message}\nstack:${e.stack}`);
    });

};
const compare = (password, hash) => {
    return bcrypt.compare(password, hash).then(result => {
        return result;
    }).catch(e => {
        logger.error(`Encountered error at passwordHasher.compare. Error message:${e.message}\nstack:${e.stack}`);
    });
};


module.exports = {
    encrypt, compare
};
