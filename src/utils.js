// Slack converts some unicode things (like emojis) to coloncode
// things (like :heart:), which makes it hard to compare strings
// without normalizing them first
exports.normalizeString = function(string) {
  return string
    // Remove coloncode Emojis (e.g. :heart:)
    .replace(/:[A-Za-z0-9]+:/g, '')
    // Remove anything that isn't a letter, number, or punctuation
    .replace(/[^A-Za-z0-9.,:;'" ]/g, '');
}

exports.parseEnvironmentVariableAsJSON = function(variable) {
  try {
    return JSON.parse(process.env[variable]);
  } catch (error) {
    throw Error(`Could not parse $${variable} as JSON`);
  }
}
