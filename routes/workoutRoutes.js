const Router = require('express-promise-router');
const router = new Router();

const workoutController = require('../controllers/workoutController');

router.get("/:id", workoutController.readWorkoutById);
router.get("/user/:id",workoutController.readWorkoutsByUserId);

router.post("/:user_id", workoutController.createWorkout);

module.exports = router;
