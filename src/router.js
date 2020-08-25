import { Router } from 'express';
import { requireAuth } from './services/passport';
import * as UserController from './controllers/user_controller';
import timeReturn from './controllers/assignment_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.route('/assignments')
  .get(requireAuth, UserController.assignmentListReturn)
  .post(requireAuth, UserController.setup);
router.route('/assignment')
  .get(requireAuth, timeReturn);
router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);
export default router;
