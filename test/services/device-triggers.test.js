'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'deviceTriggers\' service', () => {
  it('registered the service', () => {
    const service = app.service('device-triggers');

    assert.ok(service, 'Registered the service');
  });
});
