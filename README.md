# Slack Calendar Topic

A script that sets the topic of a Slack channel to the currently ongoing event
in a Google calendar. Great for keeping track of who's on call, for example.

![Image](./docs/calendar.png)

## Getting started

### Create a service account

Create a Google Service Account, download the credentials in JSON format and
export it to `GOOGLE_CREDENTIALS`.

### Share a calendar with your service account

Go to *Settings and sharing* for the Google Calendar you'd like to use.
Share it with the service account by entering the e-mail address of the
service account in *Share with specific people*.

Export the calendar ID to `GOOGLE_CALENDAR_ID`:

### Create a Slack bot

Create a Slack bot with scopes `channels:manage` and `channels:read`, and export
its access token to `SLACK_ACCESS_TOKEN`.

### Select a channel

Export the ID for the Slack channel you'd like to use to `SLACK_CHANNEL_ID`. It can
be tricky to find, but [here's how](https://www.google.com/search?q=how+to+find+channel+id+slack).
