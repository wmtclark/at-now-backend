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
    return User.findOne({ gid: payload.sub }).then((user) => {
      if (!user) return res.status(401).send({ error: 'User not found' });
      else return res.send({ jwt: tokenForUser(payload.sub) });
    });
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
              res.json({ jwt: tokenForUser(payload.sub) });
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
      if (saved === null) {
        res.status(400).send({ error: 'invalid ics' });
      } else {
        res.status(200).send();
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const assignmentListReturn = async (req, res, next) => {
  const user = await User.findOne({ gid: req.user.gid });
  const returnArray = [];
  await Promise.all(
    user.assignments.map((assignment) => {
      return Assignment.findOne({ _id: assignment.assignment })
        .then(({ _doc }) => {
          returnArray.push({
            status: assignment.status,
            ..._doc,
          });
        })
        .catch((error) => { res.status(403).send(error); });
    }),
  );
  res.send(returnArray);
};
export const getCalendarString = (req, res) => {
  if (req.user && req.user.gcal_string) res.send({ calendarString: req.user.gcal_string });
  else res.status(404).send({ error: 'Missing google calendar string' });
};

export const hasICS = (req, res) => {
  if (req.user.calendar_link) res.send({ ICS: req.user.calendar_link });
  else res.status(404).send({ error: 'Missing ICS' });
};

export const setCalendarString = (req, res) => {
  if (req.user) {
    req.user.gcal_string = req.body.calendarString;
    req.user.save();
    res.send({ message: 'Set Sucessfully' });
  } else res.status(404).send({ error: 'user not found' });
};

function tokenForUser(sub) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub, iat: timestamp }, process.env.AUTH_SECRET);
}

export const assignmentStatusUpdate = async (req, res, next) => {
  const user = await User.findOne({ gid: req.user.gid });
  // console.log(user.assignments);
  const assignment = await user.assignments.find((assn) => {
    return req.body.id === assn.assignment.toString();
  });
  if (assignment === undefined) {
    res.status(403).send({ error: 'invalid object ID' });
  } else {
    assignment.status = req.body.status;
    await user.save();
    res.status(200).send();
  }
};

export const assignmentStatusGet = async (req, res, next) => {
  const user = await User.findOne({ gid: req.user.gid });
  // console.log(user.assignments);
  const assignment = await user.assignments.find((assn) => {
    return req.body.id === assn.assignment.toString();
  });
  if (assignment === undefined) {
    res.status(403).send({ error: 'invalid object ID' });
  } else { res.send({ status: assignment.status }); }
};
