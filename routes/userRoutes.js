const userValidator = require('../validators/userValidators');
const Router = require('express-promise-router');
const router = new Router();

const userController = require('../controllers/userController');


// TODO: Add authentication verification (jwt)
router.get("/all", userController.readUsers); // not sure if needed
router.get("/id/:id", userController.readUserById); // not sure if needed
router.get("/login", userValidator.validateUsername, userValidator.validatePassword, userController.loginUser);

router.post("/", userValidator.validateUsername, userValidator.validatePassword, userValidator.validateEmail, userController.createUser);

router.put("/changeuser/:id", userValidator.validateUsername, userController.updateUsername);
router.put("/changepass/:id", userValidator.validatePassword, userController.updatePassword);
router.put("/changeemail/:id", userValidator.validateEmail, userController.updateEmail);

router.delete("/:id", userController.deleteUser);

module.exports = router;
