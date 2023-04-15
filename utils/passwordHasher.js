const bcrypt = require('bcrypt');


const encrypt = (password) => {
    const saltRounds = 8;

    return bcrypt.hash(password, saltRounds).then(hash => {
        return hash;
    }).catch(e => {
        console.log(e, e.stack);
    });

}
const compare = (password, hash) => {
    return bcrypt.compare(password, hash).then(result => {
        return result;
    }).catch(e => {
        console.log("Error" +e.message);
    });
}


module.exports = {
    encrypt, compare
}