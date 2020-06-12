#!/usr/bin/env node

const fs = require('fs');
const jsYAML = require('js-yaml');
const {
    rules,
    parser,
    generator
} = require('featurejs-plugin-json');

try {
    const sString = fs.readFileSync('./test/ui5.yaml', 'utf8');
    const docJSYAML = jsYAML.safeLoad(sString);
    console.log(`jsYAML:`);
    console.dir(docJSYAML);
    console.log('In JSON:');
    console.log(JSON.stringify(docJSYAML));
    debugger;
    console.dir(parser.parser.parse(JSON.stringify(docJSYAML)))
} catch (e) {
    console.log(e);
}