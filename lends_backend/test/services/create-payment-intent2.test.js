const app = require('../../src/app');

describe('\'create-payment-intent2\' service', () => {
  it('registered the service', () => {
    const service = app.service('create-payment-intent-2');
    expect(service).toBeTruthy();
  });
});
