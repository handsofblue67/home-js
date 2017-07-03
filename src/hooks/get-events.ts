import { each, map } from 'lodash'
import * as rp from 'request-promise'
import * as moment from 'moment'

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// client must set the beginning and end time for currently viewed time period (month, week day)
export default function (options = {}) { // eslint-disable-line no-unused-vars
  return async function getEvents(hook) {
    try {

      // console.log('HOOK PARAMS:', JSON.stringify(hook.params.query))

      const { userId = undefined, user: queryUser = undefined } = hook.params.query

      if (queryUser) {
        return {
          ...hook,
          userResponse: { user: queryUser }
        }
      }

      const userResponse = await hook.app.service('users').get(hook.params.query.userId)

      const { googleId, google: { accessToken } } = userResponse
      // console.log(`Access Token: ${accessToken}`)

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
      console.log(JSON.stringify(calendars, null, 2))

      // for each of the users calendars, get all events for the month requested by the client
      each(calendars, async (calendar: any) => {
        const {
          timeMax = moment().endOf('month').toDate(),
          timeMin = moment().startOf('month').toDate()
        } = hook.params.query
        const eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?timeMax=${timeMax}&timeMin=${timeMin}&access_token=${accessToken}`
        console.log(eventsUrl)

        // const qs = {
        //   timeMax,
        //   timeMin,
        //   access_token: accessToken
        // }

        // const eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?access_token=${accessToken}`

        const eventsRes = await rp.get(eventsUrl)
        const events = JSON.parse(eventsRes).items

        if (events && events.length) {
          const calendarWithEvents = { ...calendar, events }
          hook.service.get(calendar.id, { query: { ...hook.params.query, userResponse } })
            .then(() => hook.service.update(calendar.id, calendarWithEvents))
            .catch(() => hook.service.create(calendarWithEvents))
        }

      })
      hook.params.query = {}
      return hook
    } catch (err) {
      console.error(err)
    }

  }
}
