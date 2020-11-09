const app = require('../../src/app');

describe('\'enrollments\' service', () => {
  it('registered the service', () => {
    const service = app.service('enrollments');
    expect(service).toBeTruthy();
  });
});
