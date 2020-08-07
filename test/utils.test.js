const assert = require('assert');

const { normalizeString } = require('../src/utils');

describe('normalizeString', () => {

  it('removes unicode emojis', () => {
    const stringWithEmojis = "Here is a ❤️";
    const stringWithoutEmojis = "Here is a ";

    assert.equal(normalizeString(stringWithEmojis), stringWithoutEmojis);
  });

  it('removes coloncode emojis', () => {
    const stringWithEmojis = "Here is a :heart:";
    const stringWithoutEmojis = "Here is a ";

    assert.equal(normalizeString(stringWithEmojis), stringWithoutEmojis);
  });

});
