const { handler } = require('./lambda');

(async () => {
  console.log(await handler());
})();
