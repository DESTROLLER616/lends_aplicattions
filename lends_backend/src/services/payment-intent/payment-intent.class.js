const Stripe = require('stripe');

const SECRET_KEY = 'sk_test_51M0R05KwAWaCzg2GZghBokL4qt20lE3locphdRN7mAx1JGz1V3rKHYDPi7meruIUerDEwC5BlveApWvffhLrT9FC00usUuvEpz';
// const PUBLISHABLE_KEY = 'pk_test_51M0R05KwAWaCzg2GvgUIIZOCksgA1ZNqBDGvSy8lBZirEXji3vNxdxkYmSsCjhHWwNdHdi67O3i7ayDDdFBQz5Ec00UurgqM39';

const stripe = Stripe(SECRET_KEY, { apiVersion: '2022-08-01' });
/* eslint-disable no-unused-vars */
exports.PaymentIntent = class PaymentIntent {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        ...data,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const clientSecret = paymentIntent.client_secret;
      return clientSecret;

    } catch (error) {
      console.log(error);
      return ({ 'error': error });
    }
  }

};
