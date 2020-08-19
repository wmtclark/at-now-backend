import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
import verifyToken from '../services/verify_token';

dotenv.config({ silent: true });

// and then the secret is usable this way:

export const signin = (req, res, next) => {
  return verifyToken(req.body.accessToken).then((payload) => {
    console.log(payload);
    res.send({ jwt: tokenForUser(payload.sub) });
  }).catch((e) => { res.send(e); });
};

export const signup = (req, res, next) => {
  return verifyToken(req.body.accessToken).then((payload) => {
    console.log(payload);
    if (!payload) {
      return res.status(422).send('You must provide valid ID token');
    } else {
      return User.findOne({ gid: payload.sub }).then((user) => {
        console.log(user);
        if (user) return res.json({ message: 'User already exists' });
        else {
          const newUser = new User();
          newUser.name = '';
          newUser.classes = [];
          newUser.gid = payload.sub;
          return newUser.save()
            .then((result) => {
              res.json({ message: 'User created!' });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
      });
    }
  }).catch((e) => { res.send(e); });
};

function tokenForUser(sub) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub, iat: timestamp }, process.env.AUTH_SECRET);
}
