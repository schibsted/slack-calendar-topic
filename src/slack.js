const { WebClient } = require('@slack/web-api');

SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;
SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

exports.setTopic = async function(topic) {
  const slack = new WebClient(SLACK_ACCESS_TOKEN);

  return await slack.conversations.setTopic({
    channel: SLACK_CHANNEL_ID, topic
  });
}
