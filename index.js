'use strict';

// https://stackoverflow.com/questions/29011457/jasmine-jasmine-reporters-on-nodejs-missing-output

const Jasmine = require('jasmine'),
    reporters = require('jasmine-reporters'),
    fs = require('fs');

const runner = (jasmineCofigFile, configure) => {
    const reportsPath = `./reports`;
    if (!fs.existsSync(reportsPath)) {
        fs.mkdirSync(reportsPath);
    }

    const junitReporter = new reporters.JUnitXmlReporter({
        savePath: reportsPath,
        consolidateAll: false
    });

    const jasmineEnv = new Jasmine();
    jasmineEnv.loadConfigFile(jasmineCofigFile);
    jasmineEnv.addReporter(junitReporter);
    
    if (configure && typeof configure === 'function') {
        configure(jasmine);
    }

    jasmineEnv.execute();
};

runner('./config.json', jasmine => {
    // maximum 10 minutes per test
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 60 * 1000;
});