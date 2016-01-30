/**
 * @fileoverview Enforce $varName for jQuery assignment.
 * @author Erik Desjardins
 * @copyright 2013-2016 JSCS contributors. All rights reserved.
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

var rule = require('../rules/dollar-sign');
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('dollar-sign', rule, {
    valid: [

    ],
    invalid: [
        {
            code: 'let title = $(".title"};',
            errors: [{
                message: 'Fill me in.',
                type: 'Me too'
            }]
        }
    ]
});
