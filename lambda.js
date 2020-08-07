const { update } = require('./src/index');

exports.handler = async (event, context) => {
  console.log(await update());
}
