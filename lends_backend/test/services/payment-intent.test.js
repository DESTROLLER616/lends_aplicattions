const app = require('../../src/app');

describe('\'payment-intent\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-intent');
    expect(service).toBeTruthy();
  });
});
