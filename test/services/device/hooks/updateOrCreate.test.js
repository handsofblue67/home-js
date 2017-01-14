'use strict';

const assert = require('assert');
const updateOrCreate = require('../../../../src/services/device/hooks/updateOrCreate.js');

describe('device updateOrCreate hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    updateOrCreate()(mockHook);

    assert.ok(mockHook.updateOrCreate);
  });
});
