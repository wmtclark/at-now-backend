import { Router } from 'express';
import User from './models/user_model';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send(users);
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

export default router;
