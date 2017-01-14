'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('mqttClient service', function() {
  it('registered the mqttClients service', () => {
    assert.ok(app.service('mqttClients'));
  });
});
