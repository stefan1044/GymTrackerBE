const userValidator = require('../validators/userValidators');
const userController = require('../controllers/userController');
const {verifyToken} = require('../middlewares/jwtAuth');
const Router = require('express-promise-router');
const router = new Router();



router.get("/all", userController.readUsers); // not sure if needed
router.get("/id/:id", userController.readUserById); // not sure if needed

router.post("/login", userValidator.validateUsername, userValidator.validatePassword, userController.loginUser);
router.post("/register", userValidator.validateUsername, userValidator.validatePassword, userValidator.validateEmail, userController.createUser);

router.put("/changeuser", verifyToken, userValidator.validateUsername, userController.updateUsername);
router.put("/changepass", verifyToken, userValidator.validatePassword, userController.updatePassword);
router.put("/changeemail", verifyToken, userValidator.validateEmail, userController.updateEmail);

router.delete("/", verifyToken, userController.deleteUser);

module.exports = router;
