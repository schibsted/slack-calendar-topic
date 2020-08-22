const { getOngoingEvent } = require('./calendar');
const { setTopic, getChannelInfo } = require('./slack');
const { normalizeString, parseEnvironmentVariableAsJSON } = require('./utils');

const CHANNEL_CALENDAR_MAP = parseEnvironmentVariableAsJSON('CHANNEL_CALENDAR_MAP');

async function setTopicFromCalendar(calendarId, channelId) {
  const event = await getOngoingEvent(calendarId);
  const channel = await getChannelInfo(channelId);

  if (event) {
    const newTopic = event.description || event.summary;

    if (normalizeString(newTopic) == normalizeString(channel.topic)) {
      return `#${channel.name}: Topic already set`;
    }

    const topic = await setTopic(channelId, newTopic);
    return `#${channel.name}: Set topic to '${newTopic}'`;
  } else {
    return `#${channel.name}: No ongoing event`;
  }
}

exports.update = async function() {
  const promises = CHANNEL_CALENDAR_MAP.map(async ({ calendarId, channelId }) => {
    return setTopicFromCalendar(calendarId, channelId);
  });

  return Promise.all(promises);
}
