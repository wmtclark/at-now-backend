import Assignment from '../models/assignment_model';

const timeReturn = (req, res, next) => {
  return Assignment.findOne({ _id: req.body.id }).then((assignment) => {
    if (assignment.times.length === 0) {
      console.log('correct if statement');
      res.send({ hours: -1 });
    } else {
      const value = assignment.times.reduce((a, b) => { return (a + b); }) / assignment.times.length;
      res.send({ hours: value });
    }
  }).catch((error) => { return res.send('assignment not found'); });
};

export default timeReturn;
