import { Router } from 'express';
import { requireAuth } from './services/passport';
import parseIcs from './helpers/parse_ics';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.post('/user/setup', requireAuth, (req, res) => {
  parseIcs(req.user.gid, req.body.calendar_link)
    .then((saved) => {
      res.send(saved);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
});

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);
export default router;
