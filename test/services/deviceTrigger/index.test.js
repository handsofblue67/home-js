'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('deviceTrigger service', function() {
  it('registered the deviceTriggers service', () => {
    assert.ok(app.service('deviceTriggers'));
  });
});
