import ical from 'node-ical';
import User from '../models/user_model';
import Assignment from '../models/assignment_model';

async function parseIcs(gid, calendarLink) {
  const user = await User.findOne({ gid });
  user.assignments = [];
  user.calendar_link = calendarLink;
  const data = await ical.async.fromURL(user.calendar_link);
  const promises = [];
  Object.keys(data).forEach((key) => { // gets assignments
    const assignment = new Assignment();
    Object.keys(data[key]).forEach((key2) => { // gets specific assignment in array
      assignment[key2] = data[key][key2]; // could fail
    });
    const promise = Assignment.findOne({ uid: assignment.uid })
      .then((foundassignment) => {
        if (foundassignment) {
          user.assignments.push(foundassignment);
        } else {
          promises.push(assignment.save()); // saves to document)
          user.assignments.push(assignment);
        }
      });
    promises.push(promise);
  });
  await Promise.all(promises);
  await user.save();
  return user;
}

export default parseIcs;
