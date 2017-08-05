import { each, map, uniqBy } from 'lodash'
import * as rp from 'request-promise'
import * as moment from 'moment'
import * as hook from 'feathers'

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// client must set the beginning and end time for currently viewed time period (month, week day)
export default function () { // eslint-disable-line no-unused-vars
  return async function getEvents(hook) {
    try {

      const { userId = undefined, user: queryUser = undefined } = hook.params.query

      if (queryUser) {
        return {
          ...hook,
          userResponse: { user: queryUser }
        }
      }

      const userResponse = await hook.app.service('users').get(hook.params.query.userId)

      const { googleId, google: { accessToken } } = userResponse

      // get each calendar
      const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${accessToken}`

      // get each of the users calendars
      const calendarsRes = await rp.get(url)

      const calendars = map(JSON.parse(calendarsRes).items, calendar => {
        return {
          ...calendar,
          importedFor: googleId
        }
      })

      // for each of the users calendars, get all events for the month requested by the client
      each(calendars, async (calendar: any) => {
        const {
          timeMax = moment().endOf('month').toDate(),
          timeMin = moment().startOf('month').toDate()
        } = hook.params.query

        const eventsOptions: rp.Options = {
          uri: `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`,
          qs: {
            timeMax,
            timeMin,
            access_token: accessToken
          }
        }

        const eventsRes = await rp.get(eventsOptions)
        const events = JSON.parse(eventsRes).items

        if (events && events.length) {
          const calendarWithEvents = { ...calendar, events }
          try {
            const { events: existingEvents } = await hook.service.get(calendar.id, { query: { ...hook.params.query, userResponse } })
            hook.service.update(calendar.id, {
              ...calendarWithEvents,
              events: uniqBy([...existingEvents, events], 'id')
            })
          } catch (err) {
            hook.service.create(calendarWithEvents)
          }
        }
      })
      hook.params.query = {}
      return hook
    } catch (err) {
      console.error('error in calendar logic')
    }
  }
}
