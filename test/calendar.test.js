const assert = require('assert');
const nock = require('nock');

const { getOngoingEvent } = require('../src/calendar');

describe('getOngoingEvent', () => {

  nock.disableNetConnect()

  nock('https://www.googleapis.com')
    .post('/oauth2/v4/token')
    .reply(200, {});

  nock('https://www.googleapis.com')
    .get(uri => uri.includes('calendar/v3/calendars'))
    .reply(200, {
      items: [
        {
          kind: 'calendar#event',
          etag: '<etag>',
          id: '<id>',
          status: 'confirmed',
          htmlLink: '<htmlLink>',
          created: '2020-08-07T08:00:00.000Z',
          updated: '2020-08-07T17:00:00.391Z',
          summary: 'Original event',
          creator: { email: '<creator.email>' },
          organizer: {
            email: '<organizer.email>',
            displayName: '<organizer.displayName>',
            self: true
          },
          start: { dateTime: '2020-08-07T08:00:00+02:00' },
          end: { dateTime: '2020-08-07T17:00:00+02:00' },
          iCalUID: '<iCalUID>',
          sequence: 0,
          guestsCanModify: true,
          reminders: { useDefault: true }
        },
        {
          kind: 'calendar#event',
          etag: '<etag>',
          id: '<id>',
          status: 'confirmed',
          htmlLink: '<htmlLink>',
          created: '2020-08-07T12:42:02.000Z',
          updated: '2020-08-07T12:42:02.391Z',
          summary: 'Double-booked event', 
          creator: { email: '<creator.email>' },
          organizer: {
            email: '<organizer.email>',
            displayName: '<organizer.displayName>',
            self: true
          },
          start: { dateTime: '2020-08-07T12:00:00+02:00' },
          end: { dateTime: '2020-08-07T13:10:00+02:00' },
          iCalUID: '<iCalUID>',
          sequence: 0,
          guestsCanModify: true,
          reminders: { useDefault: true }
        }
      ]
    });

  it('returns the ongoing event', async () => {
    const ongoingEvent = await getOngoingEvent();

    assert.equal(ongoingEvent.summary, 'Double-booked event');
  });
});

