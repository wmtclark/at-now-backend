import { Router } from 'express';
import ical from 'node-ical';
import User from './models/user_model';
import { requireAuth } from './services/passport';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.post('/user/assignments', requireAuth, (req, res) => {
  User.find({ name: req.body.name })
    .then((users) => {
      users.forEach((user) => {
        ical.async.fromURL(user.calendar_link, {}, (err, data) => {});
      });
      res.send(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);
export default router;
