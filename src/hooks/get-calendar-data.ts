// 'use strict';
// const https = require('https');
// const _ = require('lodash');

// // Use this hook to manipulate incoming or outgoing data.
// // For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// module.exports = function() {
//   return function(hook) {
//     if (hook.result && hook.result.google) {
//       const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${hook.result.google.accessToken}`
//       https.get(url, res => {
//         let resChunks = [];
//         res.on('data', chunk => resChunks.push(chunk))
//         .on('end', () => {
//           let body = Buffer.concat(resChunks);

//           const calendars = _.map(JSON.parse(body).items, calendar => {
//             return _.assign({}, calendar, {importedFor: `${hook.result.googleId}`});
//           });

//           const calendarService = hook.app.service('calendars');
//           _.each(calendars, calendar => {
//             calendarService.find({ query: { id: calendar.id } }).then(results => {
//               (results.total > 0) ?
//                 calendarService.update(calendar.id, calendar) :
//                 calendarService.create(calendar);
//             });
//           });
//         })
//         .on('error', err => console.error(err));
//       });
//     }
//     return Promise.resolve(hook);
//   };
// };
