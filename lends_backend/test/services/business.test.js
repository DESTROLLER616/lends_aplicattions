const app = require('../../src/app');

describe('\'business\' service', () => {
  it('registered the service', () => {
    const service = app.service('business');
    expect(service).toBeTruthy();
  });
});
