const { setTopic } = require('./src/slack');
const { getOngoingEvent } = require('./src/calendar');

exports.handler = async function(event, context) {
  try {
    const event = await getOngoingEvent();

    if (event) {
      const topic = await setTopic(event.summary);
      return `Set topic to '${event.summary}'`;
    } else {
      return 'No ongoing event';
    }
  } catch (error) {
    return `Error: ${error}`
  }
}
