/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {

    // globalSetup: './globalSetup.js',
    // globalTeardown: './globalTeardown.js',
    "reporters": [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "./reports/index.html",
            "includeFailureMsg": true
        }]
    ],
};
