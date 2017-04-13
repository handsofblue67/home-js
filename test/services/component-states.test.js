'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'componentStates\' service', () => {
  it('registered the service', () => {
    const service = app.service('component-states');

    assert.ok(service, 'Registered the service');
  });
});
