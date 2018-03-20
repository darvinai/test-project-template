'use strict';

const TestingFramework = require('darvin-testing-framework');

const tf = new TestingFramework();

const scenarios = require('./scenarios.json');
tf.describe(scenarios);
