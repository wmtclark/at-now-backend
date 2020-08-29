import { Router } from 'express';
import { requireAuth } from './services/passport';
import * as UserController from './controllers/user_controller';
import * as AssignmentController from './controllers/assignment_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.route('/assignments')
  .get(requireAuth, UserController.assignmentListReturn)
  .post(requireAuth, UserController.setup);
router.route('/assignment')
  .get(requireAuth, AssignmentController.timeReturn);
router.route('/assignment/status')
  .post(requireAuth, UserController.assignmentStatusUpdate)
  .get(requireAuth, UserController.assignmentStatusGet);
router.route('/assignment/submit')
  .post(requireAuth, AssignmentController.submitTime);
router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);

router.route('/calendar')
  .post(requireAuth, UserController.setCalendarString)
  .get(requireAuth, UserController.getCalendarString);

export default router;
