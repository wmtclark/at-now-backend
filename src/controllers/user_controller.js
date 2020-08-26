import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
import verifyToken from '../services/verify_token';
import parseIcs from '../helpers/parse_ics';
import Assignment from '../models/assignment_model';

dotenv.config({ silent: true });

// and then the secret is usable this way:

export const signin = (req, res, next) => {
  return verifyToken(req.body.accessToken).then((payload) => {
    res.send({ jwt: tokenForUser(payload.sub) });
  }).catch((e) => { res.status(400).send(e); });
};

export const signup = (req, res, next) => {
  return verifyToken(req.body.accessToken).then((payload) => {
    if (!payload) {
      return res.status(422).send('You must provide valid ID token');
    } else {
      return User.findOne({ gid: payload.sub }).then((user) => {
        if (user) return res.json({ message: 'User already exists' });
        else {
          const newUser = new User();
          newUser.name = '';
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

// function to setup a new user, takes their calendar, and returns a list of assignments
export const setup = (req, res, next) => {
  return parseIcs(req.user.gid, req.body.calendar_link) // parse the ICS link
    .then((saved) => {
      res.status(200).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

export const assignmentListReturn = async (req, res, next) => {
  const user = await User.findOne({ gid: req.user.gid });
  const returnArray = await Promise.all(user.assignments.map((id) => { return Assignment.findOne({ _id: id }).catch((error) => { console.log(error); }); }));
  res.send(returnArray);
};

function tokenForUser(sub) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub, iat: timestamp }, process.env.AUTH_SECRET);
}
