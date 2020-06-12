const {
    parser
} = require('featurejs-plugin-json');
const yaml = require('js-yaml');

function parse(sCodeString, oOptions) {
    let sDocYaml = yaml.safeLoad(sCodeString);
    return parser.parser.parse(JSON.stringify(docJSYAML));
}

module.exports = {
    parse: parse,
    visitorKeys: parser.parser.visitorKeys
};