'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('lights service', function() {
  it('registered the lights service', () => {
    assert.ok(app.service('lights'));
  });
});
