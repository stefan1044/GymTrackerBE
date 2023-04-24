const workoutValidator = require('../validators/workoutValidators');
const workoutController = require('../controllers/workoutController');
const {verifyToken} = require('../middlewares/jwtAuth');
const Router = require('express-promise-router');
const router = new Router();



router.get("/:id", verifyToken, workoutController.readWorkoutById);
router.get("/user/:id", verifyToken, workoutController.readWorkoutsByUserId);

router.post("/:user_id", verifyToken, workoutValidator.validateWorkout, workoutController.createWorkout);

module.exports = router;
