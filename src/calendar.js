const { google } = require('googleapis');

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/calendar']
});

const calendar = google.calendar({version: 'v3', auth});

exports.getOngoingEvent = async function() {
  // Not one of JavaScript: The good parts
  const now = new Date();
  const soon = new Date()
  soon.setMinutes(soon.getMinutes () + 1);

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: now.toISOString(),
      timeMax: soon.toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, res) => {
      if (err) reject(err);
      resolve(res.data.items[0]);
    });
  });
}
