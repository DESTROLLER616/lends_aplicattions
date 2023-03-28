const app = require('../../src/app');

describe('\'section\' service', () => {
  it('registered the service', () => {
    const service = app.service('section');
    expect(service).toBeTruthy();
  });
});
