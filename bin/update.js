#!/usr/bin/env node

const { update } = require('../src/index');

(async () => {
  const statuses = await update();

  statuses.map(status => {
    console.log(status);
  });
})();
