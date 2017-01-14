'use strict';

// src/services/device/hooks/updateOrCreate.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};
const errors = require('feathers-errors');

module.exports = function(options) {
  options = Object.assign({}, defaults, options);
  return function(hook) {
    hook.updateOrCreate = true;
    
    // const deviceService = hook.app.service('devices');
    // return deviceService.get(hook.data.deviceID, hook.params).then(device => {
    //   console.log(device)
    //   deviceService.update(hook.data.deviceID, hook);
    // })
    // .catch(err => {
    // console.error(err);
    // console.log(hook);
    // console.log('service:',hook.service,'update:',hook.service.update)
    return hook;
    // });
  };
};