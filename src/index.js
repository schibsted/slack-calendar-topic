const { setTopic } = require('./slack');
const { getOngoingEvent } = require('./calendar');

(async () => {
  try {
    const event = await getOngoingEvent();

    if (event) {
      const topic = await setTopic(event.summary);
      console.log(`Set topic to '${event.summary}'`);
    } else {
      console.log('No ongoing event');
    }
  } catch (error) {
    console.error('Error', error);
  }
})();
