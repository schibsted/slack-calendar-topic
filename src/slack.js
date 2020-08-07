const { WebClient } = require('@slack/web-api');

SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;

exports.getChannelInfo = async function(channelId) {
  const slack = new WebClient(SLACK_ACCESS_TOKEN);

  const info = await slack.conversations.info({
    channel: channelId
  });

  return {
    name: info.channel.name,
    topic: info.channel.topic.value
  }
}

exports.setTopic = async function(channelId, topic) {
  const slack = new WebClient(SLACK_ACCESS_TOKEN);

  return await slack.conversations.setTopic({
    channel: channelId, topic
  });
}
