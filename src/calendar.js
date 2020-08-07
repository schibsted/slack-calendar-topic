const { google } = require('googleapis');
const { parseEnvironmentVariableAsJSON } = require('./utils');

const GOOGLE_CREDENTIALS = parseEnvironmentVariableAsJSON('GOOGLE_CREDENTIALS');

const auth = new google.auth.GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/calendar']
});

const calendar = google.calendar({version: 'v3', auth});

exports.getOngoingEvent = async function(calendarId) {
  // Not one of JavaScript: The good parts
  const now = new Date();
  const soon = new Date()
  soon.setMinutes(soon.getMinutes () + 1);

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: calendarId,
      timeMin: now.toISOString(),
      timeMax: soon.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, res) => {
      if (err) reject(err);
      resolve(res.data.items[res.data.items.length - 1]);
    });
  });
}
