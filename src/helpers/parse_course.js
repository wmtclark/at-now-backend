/* contains functions to parse through the courses and return identifiers to them */

export const getCourseObject = ((summary) => {
  // start by finding the course name with a regex
  const namesMatchArray = summary.match(/(?<=\[).*(?=-.*\])/);
  const courseNameAndNumber = namesMatchArray[0];
  const courses = courseNameAndNumber.split(/-/);
  const namesArray = courses.map((course) => {
    return course.replace('.', ' ');
  });
  // then find the term name with another regex
  const term = summary.match(/(?<=\[.*-)(\d|\w)*(?=\])/)[0];
  // finally find the type with a third regex
  // initially this will just be everything up to a number or the first 20 characters
  // to make it legible in the frontend
  const type = summary.match(/^[a-zA-Z]*/)[0];

  const assignmentSummary = summary.match(/^.*(?=\[)/)[0];
  return ({
    name: namesArray, term, type, assignmentSummary,
  });
});
export const urlConstructor = (url) => {
  const baseUrl = url.match(/\/\/.*\//)[0];
  const courseNumber = url.match(/(?<=course_)\d*/)[0];
  const assignmentNumber = url.match(/(?<=assignment_)\d*/)[0];
  return (`https:${baseUrl}courses/${courseNumber}/assignments/${assignmentNumber}`);
};
