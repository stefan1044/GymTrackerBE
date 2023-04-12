const userValidator = require('../validators/userValidators');
const Router = require('express-promise-router');
const router = new Router();

const userController = require('../controllers/userController');


router.get("/", userController.readUsers);
router.get("/:id", userController.readUserById);

router.post("/", userValidator.validateUser, userController.createUser);

router.put("/changeuser/:id", userController.updateUsername);
router.put("/changepass/:id", userController.updatePassword);

router.delete("/:id", userController.deleteUser);

module.exports = router;
