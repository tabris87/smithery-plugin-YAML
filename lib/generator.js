const {
  generator
} = require('smithery-plugin-json');
const yaml = require('js-yaml');

function generate(oAST) {
  return yaml.safeDump(JSON.parse(generator.generator.generate(oAST)));
}
module.exports = {
  generate: generate
};