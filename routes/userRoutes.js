const Router = require('express-promise-router');
const router = new Router();

const userController = require('../controllers/userController');


router.get("/", userController.readUsers);
router.get("/:id", userController.readUserById);

router.post("/", userController.createUser);

router.put("/changeuser/:id", userController.updateUsername);
router.put("/changepass/:id", userController.updatePassword);

module.exports = router;
