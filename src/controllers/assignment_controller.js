import Assignment from '../models/assignment_model';

export const timeReturn = (req, res, next) => {
  return Assignment.findOne({ _id: req.body.id }).then((assignment) => {
    if (assignment.times.length === 0) {
      res.send({ hours: 3 });
    } else {
      const value = assignment.times.reduce((a, b) => { return (a + b); }) / assignment.times.length;
      res.send({ hours: value });
    }
  }).catch((error) => { return res.status(400).send('assignment not found'); });
};

export const submitTime = (req, res, next) => {
  return Assignment.findOne({ _id: req.body.id }).then((assignment) => {
    assignment.times.push(req.body.time);
    assignment.save().then(() => {
      res.status(200).send();
    }).catch(() => { res.status(400).send('error saving assignment'); });
  }).catch((error) => { return res.status(400).send('assignment not found'); });
};
