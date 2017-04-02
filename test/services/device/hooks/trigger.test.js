'use strict';

const assert = require('assert');
const trigger = require('../../../../src/services/device/hooks/trigger.js');

describe('device trigger hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    trigger()(mockHook);

    assert.ok(mockHook.trigger);
  });
});
