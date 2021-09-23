const { expect } = require("chai");

const { Generator } = require('../lib/generator');
const { Parser } = require("../lib/parser");
const { rules } = require('../index');

//setup smithery dependencies
const { GeneratorFactory, ParserFactory, RuleSet, Imposer } = require("smithery");

const oImposer = new Imposer(
    new ParserFactory(),
    new GeneratorFactory(),
    new RuleSet()
);

const ownGen = new Generator();
const ownPar = new Parser();

oImposer.getParserFactory().addParser(ownPar, 'yaml');
oImposer.getGeneratorFactory().addGenerator(ownGen, 'yaml');
oImposer.getRuleSet().addMultipleRules(Object.values(rules));

function imposing(sBaseJSON, sFeatureJSON) {
    //for testing we can consider this as defaults
    const oAstBase = ownPar.parse(sBaseJSON, { featureName: 'base' });
    const oAstFeature = ownPar.parse(sFeatureJSON, { featureName: 'feature' });
    const resultAst = oImposer.impose({ 'base': oAstBase, 'feature': oAstFeature }, ['base', 'feature']);
    const gen = oImposer.getGeneratorFactory().getGenerator('yaml');
    return gen.generate(resultAst);
}

function formatResult(sResultString) {
    return ownGen.generate(ownPar.parse(sResultString));
}

module.export = function () {
    describe('Check the list concatenation of arrays', () => {
        describe('Property merge', () => {
            it(`Test array property merge 
                   "temp : 
                        - 1 
                        - 2 
                +   temp : 
                        - 3 
                =>  temp :
                        - 1
                        - 2
                        - 3`, () => {
                const sBaseJSON = 'temp: - 1 -2';
                const sFeatureJSON = 'temp: -3';
                const sResultJSON = formatResult('temp: -1 -2 -3');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            /* it('Test array property merge ["1"] + [{"number": 2}] => ["1", {"number": 2}]', () => {
                const sBaseJSON = '["1"]';
                const sFeatureJSON = '[{"number": 2}]';
                const sResultJSON = formatResult('["1", {"number": 2}]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge ["1"] + [["2"]] => ["1", ["2"]]', () => {
                const sBaseJSON = '["1"]';
                const sFeatureJSON = '[["2"]]';
                const sResultJSON = formatResult('["1", ["2"]]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge [["1"], ["2"]] + [["3"]] => [["1"], ["2"], ["3"]]', () => {
                const sBaseJSON = '[["1"], ["2"]]';
                const sFeatureJSON = '[["3"]]';
                const sResultJSON = formatResult('[["1"], ["2"], ["3"]]');
                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge [{"prop":"1"}, {"prop":"2"}] + [{"prop":"3"}] => [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]', () => {
                const sBaseJSON = '[{"prop":"1"}, {"prop":"2"}]';
                const sFeatureJSON = '[{"prop":"3"}]';
                const sResultJSON = formatResult('[{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            }); */
        });
    });
}