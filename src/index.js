const { getOngoingEvent } = require('./calendar');
const { setTopic, getChannelInfo } = require('./slack');
const { normalizeString } = require('./utils');

const CHANNEL_CALENDAR_MAP = JSON.parse(process.env.CHANNEL_CALENDAR_MAP);

exports.update = async function() {
  const map = CHANNEL_CALENDAR_MAP.map(async ({ calendarId, channelId }) => {
    const event = await getOngoingEvent(calendarId);
    const channel = await getChannelInfo(channelId);

    if (event) {
      const newTopic = event.summary;

      if (normalizeString(newTopic) == normalizeString(channel.topic)) {
        return `#${channel.name}: Topic already set`;
      }

      const topic = await setTopic(channelId, newTopic);
      return `#${channel.name}: Set topic to '${newTopic}'`;
    } else {
      return `#${channel.name}: No ongoing event`;
    }
  });

  return Promise.all(map);
}
