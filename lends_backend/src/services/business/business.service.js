// Initializes the `business` service on path `/business`
const { Business } = require('./business.class');
const createModel = require('../../models/business.model');
const hooks = require('./business.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['patch']
  };

  // Initialize our service with any options it requires
  app.use('/business', new Business(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('business');

  service.hooks(hooks);
};
