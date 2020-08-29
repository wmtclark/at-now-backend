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
  const termMatchArray = summary.match(/(?<=\[.*-)(\d|\w)*(?=\])/);
  const term = termMatchArray[0];
  // finally find the type with a third regex
  // initially this will just be everything up to a number or the first 20 characters
  // to make it legible in the frontend
  const typeMatchArray = summary.match(/^[a-zA-Z]*/);
  const type = typeMatchArray[0];
  console.log({ name: namesArray, term, type });
  return ({ name: namesArray, term, type });
});
export const urlConstructor = (url) => {
  const baseUrl = url.match(/\/\/.*\//)[0];
  const courseNumber = url.match(/(?<=course_)\d*/)[0];
  const assignmentNumber = url.match(/(?<=assignment_)\d*/)[0];
  return (`https:${baseUrl}courses/${courseNumber}/assignments/${assignmentNumber}`);
};
