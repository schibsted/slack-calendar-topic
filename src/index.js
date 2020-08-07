const { getOngoingEvent } = require('./calendar');
const { setTopic, getTopic } = require('./slack');
const { normalizeString } = require('./utils');

exports.update = async function() {
  const event = await getOngoingEvent();

  if (event) {
    const newTopic = event.summary;
    const currentTopic = await getTopic();

    if (normalizeString(newTopic) == normalizeString(currentTopic)) {
      return 'Topic already set';
    }

    const topic = await setTopic(newTopic);
    return `Set topic to '${newTopic}'`;
  } else {
    return 'No ongoing event';
  }
}
