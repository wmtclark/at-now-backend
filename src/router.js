import { Router } from 'express';
import { requireAuth } from './services/passport';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.post('/user/setup', requireAuth, UserController.setup);
router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);
export default router;
