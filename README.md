# Slack Calendar Topic

[![Build Status](https://travis-ci.com/schibsted/slack-calendar-topic.svg?branch=master)](https://travis-ci.com/schibsted/slack-calendar-topic)

A script that sets the topic of a Slack channel to the currently ongoing event
in a Google calendar. Great for keeping track of who's on call, for example.

![Image](./docs/calendar.png)

## Getting started

#### Create a service account

Create a Google Service Account, download the credentials in JSON format and
export it to `GOOGLE_CREDENTIALS`.

#### Create a Slack bot

Create a Slack bot with scopes `channels:manage` and `channels:read`, and export
its access token to `SLACK_ACCESS_TOKEN`.

#### Share a calendar with your service account

Go to *Settings and sharing* for the Google Calendar you'd like to use.
Share it with the service account by entering the e-mail address of the
service account in *Share with specific people*.

#### Connect the calendars and channels

Create a mapping between calendars and channels like so, and export it to
`CHANNEL_CALENDAR_MAP`:

```
[
  {
    "calendarId": "c_413612vkasdr1126ckja82sa0v@group.calendar.google.com",
    "channelId": "C018DQTCFNX"
  },
  ...
]
```

#### Run it

That's it! Run it with `npm run update` (or `node ./bin/update`) and watch your channels
be updated to the currently ongoing event in the corresponding calendar.

## Deploying

#### Anywhere you want

You can deploy this script anywhere that runs Node and has some mechanism for running it on
a schedule (like cron).

#### AWS Lambda

It's a particularly good fit for Lambda with a scheduled CloudWatch trigger, and a simple
deployment script is included in `deploy.sh`. Run it like so:

```bash
$ AWS_LAMBDA_NAME=slack-calendar-topic ./deploy.sh
```
