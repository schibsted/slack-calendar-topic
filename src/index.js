const { getOngoingEvent } = require('./calendar');
const { setTopic } = require('./slack');

exports.update = async function() {
  const event = await getOngoingEvent();

  if (event) {
    const topic = await setTopic(event.summary);
    return `Set topic to '${event.summary}'`;
  } else {
    return 'No ongoing event';
  }
}
