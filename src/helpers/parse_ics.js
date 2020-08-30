import ical from 'node-ical';
import * as parseCourse from './parse_course';
import User from '../models/user_model';
import Assignment from '../models/assignment_model';

async function parseIcs(gid, calendarLink) {
  const user = await User.findOne({ gid }); // finds the user by gid

  user.assignments = [];
  user.calendar_link = calendarLink; // link passed by frontend
  let data;
  try {
    data = await ical.async.fromURL(user.calendar_link); // turns the url into an object of data
  } catch (error) {
    console.log(error);
    return (null);
  }
  const promises = [];
  Object.keys(data).forEach((key) => { // gets assignments
    const assignment = new Assignment();
    Object.keys(data[key]).forEach((key2) => { // gets specific assignment in array
      assignment[key2] = data[key][key2]; // fills the assignment from the data
    });
    try {
      assignment.summaryObject = parseCourse.getCourseObject(assignment.summary);
      assignment.courseUrl = parseCourse.urlConstructor(assignment.url);

      const promise = Assignment.findOne({ uid: assignment.uid }) // store the promise
        .then((foundassignment) => {
          if (foundassignment) {
            const assignmentListObject = { assignment: foundassignment, status: 'unscheduled' };
            user.assignments.push(assignmentListObject); // add found assignment
          } else {
            promises.push(assignment.save()); // add the promise to list we need to await
            const assignmentListObject = { assignment, status: 'unscheduled' };
            user.assignments.push(assignmentListObject); // add the newly created assignment
          }
        });
      promises.push(promise);
    } catch (error) {
      console.log(`Non assignment event ${assignment.url}`);
    }
  });
  await Promise.all(promises); // wait for all promises to return
  user.assignments.sort((a, b) => { return a.end - b.end; });
  await user.save(); // save the updated user with assignments list
  return user;
}

export default parseIcs;
