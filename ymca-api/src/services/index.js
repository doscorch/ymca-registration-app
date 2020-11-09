const users = require('./users/users.service.js');
const programs = require('./programs/programs.service.js');
const enrollments = require('./enrollments/enrollments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(programs);
  app.configure(enrollments);
};
