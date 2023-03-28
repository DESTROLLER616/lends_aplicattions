// Initializes the `payment-intent` service on path `/payment-intent`
const { PaymentIntent } = require('./payment-intent.class');
const hooks = require('./payment-intent.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/payment-intent', new PaymentIntent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('payment-intent');

  service.hooks(hooks);
};
