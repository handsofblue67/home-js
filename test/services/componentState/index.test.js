'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('componentState service', function() {
  it('registered the componentStates service', () => {
    assert.ok(app.service('componentStates'));
  });
});
