// Initializes the `programs` service on path `/programs`
const { Programs } = require('./programs.class');
const hooks = require('./programs.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/programs', new Programs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('programs');

  service.hooks(hooks);
};
