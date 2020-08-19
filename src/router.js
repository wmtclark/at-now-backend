import { Router } from 'express';
import User from './models/user_model';
import { requireAuth, requireSignin } from './services/passport';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.get('/users', requireAuth, (req, res) => {
  User.find().then((users) => {
    res.send(users);
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);
export default router;
