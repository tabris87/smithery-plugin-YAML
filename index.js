const {
  rules
} = require('smithery-plugin-json');

module.exports = {
  rules: rules,
  parser: {
    fileEnding: "yaml",
    parser: require('./lib/parser')
  },
  generator: {
    fileEnding: "yaml",
    generator: require('./lib/generator')
  }
}