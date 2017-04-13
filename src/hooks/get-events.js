'use strict';
const https = require('https');
const _ = require('lodash');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// client must set the beginning and end time for currently viewed time period (month, week day)
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function getEvents(hook) {

    console.log('HOOK PARAMS:', JSON.stringify(hook.params.query));

    (hook.params.query.user ?
      Promise.resolve({userResponse: {user: hook.params.query.user}}) :
      hook.app.service('users').get(hook.params.query.userId))
      .then(userResponse => {
        const user = userResponse.data;
        const accessToken = user.google.accessToken;

        // get each calendar
        // hook.service.find({ query: { importedFor: user.googleId } }).then(calendars => {
        // get each calendars data for the currenly viewed month

        const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${accessToken}`;

        //get each of the users calendars
        https.get(url, res => {
          let resChunks = [];

          // wait for the stream to end
          res.on('data', chunk => resChunks.push(chunk))
            .on('end', () => {
              const body = Buffer.concat(resChunks);

              // add the users googleId to the calendar doc for cross referencing
              // console.log('calendar list:', body.toString());
              const calendars = _.map(JSON.parse(body).items, calendar => {
                return _.assign({}, calendar, { importedFor: user.googleId });
              });

              // for each of the users calendars, get all events for the month requested by the client
              _.each(calendars, calendar => {
                const eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?timeMax=${hook.params.query.timeMax}&timeMin=${hook.params.query.timeMin}&access_token=${accessToken}`;

                https.get(eventsUrl, res => {
                  let resChunks = [];
                  // again wait for the stream to finish
                  res.on('data', chunk => resChunks.push(chunk))
                    .on('end', () => {
                      const body = Buffer.concat(resChunks);
                      // console.log(`event list for ${calendar.summary}:`, body.toString());

                      try {
                        const events = JSON.parse(body).items;

                        if (events && events.length) {
                          const calendarWithEvents = _.assign({}, calendar, { events: events });
                          // hook.service.update(calendarWithEvents.id, calendarWithEvents);

                          hook.service.get(calendar.id, { query: _.assign({}, hook.params.query, { user: user }) })
                            .then(() => hook.service.update(calendar.id, calendarWithEvents))
                            .catch(() => hook.service.create(calendarWithEvents));
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    })
                    .on('error', err => { }/*console.error(err)*/);
                });

              });
            })
            .on('error', err => console.error(err));
        });
      });
    hook.params.query = {};
    return Promise.resolve(hook);
  };
};
