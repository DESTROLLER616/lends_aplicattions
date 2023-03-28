const app = require('../../src/app');

describe('\'create-payment-intent\' service', () => {
  it('registered the service', () => {
    const service = app.service('create-payment-intent');
    expect(service).toBeTruthy();
  });
});
