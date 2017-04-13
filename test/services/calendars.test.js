'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'calendars\' service', () => {
  it('registered the service', () => {
    const service = app.service('calendars');

    assert.ok(service, 'Registered the service');
  });
});
