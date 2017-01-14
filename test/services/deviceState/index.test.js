'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('deviceState service', function() {
  it('registered the deviceStates service', () => {
    assert.ok(app.service('deviceStates'));
  });
});
