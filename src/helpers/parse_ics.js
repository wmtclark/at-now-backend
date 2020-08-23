import ical from 'node-ical';
import User from '../models/user_model';
import Assignment from '../models/assignment_model';

async function parseIcs(gid, calendarLink) {
  const user = await User.findOne({ gid }); // finds the user by gid
  user.assignments = [];
  user.calendar_link = calendarLink; // link passed by frontend
  const data = await ical.async.fromURL(user.calendar_link); // turns the url into an object of data
  const promises = [];
  Object.keys(data).forEach((key) => { // gets assignments
    const assignment = new Assignment();
    Object.keys(data[key]).forEach((key2) => { // gets specific assignment in array
      assignment[key2] = data[key][key2]; // fills the assignment from the data
    });
    const promise = Assignment.findOne({ uid: assignment.uid }) // store the promise
      .then((foundassignment) => {
        if (foundassignment) {
          user.assignments.push(foundassignment); // add found assignment
        } else {
          promises.push(assignment.save()); // add the promise to list we need to await
          user.assignments.push(assignment); // add the newly created assignment
        }
      });
    promises.push(promise);
  });
  await Promise.all(promises); // wait for all promises to return
  await user.save(); // save the updated user with assignments list
  return user;
}

export default parseIcs;
