const users = require('./users/users.service.js');
const orders = require('./orders/orders.service.js');

const paymentIntent = require('./payment-intent/payment-intent.service.js');

const business = require('./business/business.service.js');

const upload = require('./upload/upload.service.js');

const products = require('./products/products.service.js');

const categories = require('./categories/categories.service.js');

const section = require('./section/section.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(orders);
  app.configure(paymentIntent);
  app.configure(business);
  app.configure(upload);
  app.configure(products);
  app.configure(categories);
  app.configure(section);
};
