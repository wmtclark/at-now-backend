import { Router } from 'express';
import ical from 'node-ical';
import User from './models/user_model';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user api!' });
});

router.post('/user/assignments', (req, res) => {
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
router.route('/users')
  .get((req, res) => {
    User.find().then((users) => {
      res.send(users);
    }).catch((error) => {
      res.status(500).json({ error });
    });
  })
  .post((req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.calendar_link = req.body.calendar_link;
    user.save().then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

export default router;
