const {
  parser
} = require('smithery-plugin-json');
const yaml = require('js-yaml');

function parse(sCodeString, oOptions) {
  return parser.parser.parse(JSON.stringify(yaml.safeLoad(sCodeString)));
}

module.exports = {
  parse: parse,
  visitorKeys: parser.parser.visitorKeys
};