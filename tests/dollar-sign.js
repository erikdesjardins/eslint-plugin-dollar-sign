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

var errorMessage = 'jQuery identifiers must start with a $';

var ruleTester = new RuleTester();
ruleTester.run('dollar-sign', rule, {
	valid: [
		// basic jquery operator with dollar
		'var $x = $();',
		// basic jquery operator with leading underscore and dollar
		'var _$x = $();',
		// basic assignment
		'var x = 2;',
		// var declaration without assignment
		'var x;',
		// function assignment
		'var x = function() {};',
		// function call
		'var x = fn("foo")',
		// logical assignment
		'var a = 1 || 2;',
		// assignment against dollar prefixed function
		'var a = $func("foo")',
		// dollar addition
		'var a = $ + 2',
		// binary assignment
		'var a = 1 + 2;',
		// for loops
		'for (var prop in rawVars) {}',
		// keyed object assignments with string key
		'obj["foo"] = "bar"',
		// jquery root functions
		'var x = $.extends();',
		// jquery operator with html with dollar
		'var $x = $("<p>foo</p>");',
		// jquery operator with selector with dollar
		'var $x = $(".foo");',
		// jquery operator using val
		'var x = $(".foo").val();',
		// chained jquery operator with variable
		'var x = $(evt.target).val();',
		// jquery operator using val over multiple lines
		'var x = $(".foo")\n.val();',
		// jquery operator using chained methods
		'var x = $(".foo").val().toString();',
		// jquery operator with dollar and line not beginning with var
		'$x = $(".foo");',
		// jquery operator with dollar and line not ending in semicolon
		'var $x = $(".foo")',
		// jquery operator with dollar and single quotes around selector
		'var $x = $(\'.foo\');',
		// object destructuring
		{ code: 'var {beep, boop} = meep;\nvar $s = $("#id")', ecmaFeatures: { destructuring: true } },
		{ code: 'var {beep, boop} = $("#id")', ecmaFeatures: { destructuring: true } },
		// object destructuring without var
		{ code: '({beep, boop} = $("#id"))', ecmaFeatures: { destructuring: true } },
		// array destructuring
		{ code: 'var [beep, boop] = meep;\nvar $s = $("#id")', ecmaFeatures: { destructuring: true } },
		{ code: 'var [beep, boop] = $("#id")', ecmaFeatures: { destructuring: true } },
		// array destructuring without var
		{ code: '([beep, boop] = $("#id"))', ecmaFeatures: { destructuring: true } },
		// defined with a non-jQuery type
		'var x = 5; x = $(".foo");',
		// late assignment with jQuery
		'var $x; $x = $(".foo");',
		// parameters
		'(function(x) {});',

		//// in object definition

		// basic object creation with string key assignment
		'!{"a": true}',
		// object with string key assignment
		'var a = {"a": true};',
		// basic jquery operator with dollar
		'var x = { $foo: $() }',
		// jquery operator with html
		'var x = { $foo: $("<p>foo</p>") }',
		// jquery operator with html with dollar
		'var $x = { $foo: $("<p>foo</p>") }',
		// jquery operator with selector with dollar
		'var $x = { $foo: $(".foo") }',
		// jquery operator using val
		'var x = { foo: $(".foo").val() }',
		// jquery operator using val over multiple lines
		'var x = { foo: $(".foo")\n.val() }',
		// jquery operator using chained methods
		'var x = { foo: $(".foo").val().toString() }',

		//// in object properties

		// basic jquery operator with dollar
		'this.$x = $();',
		// jquery operator with html with dollar
		'this.$x = $("<p>foo</p>");',
		// jquery operator with selector with dollar
		'this.$x = $(".foo");',
		// jquery operator using val
		'this.x = $(".foo").val();',
		// jquery operator using val over multiple lines
		'this.x = $(".foo")\n.val();',
		// jquery operator using chained methods
		'this.x = $(".foo").val().toString();',
		// jquery operator with dollar and line not ending in semicolon
		'this.$x = $(".foo")',
		// jquery operator with dollar and single quotes around selector
		'this.$x = $(\'.foo\');',
		// direct assignment
		'this.$video = $video;',
		// basic assignment
		'w.x = 2;',
		// function assignment
		'w.x = function() {};',
		// logical assignment
		'w.a = 1 || 2;',
		// object logical assignment
		'w.a = w.a || {};',
		// binary assignment
		'w.a = 1 + 2;',
		// multi level object assignment
		'a.b.$c = $()',

		//// option value `"ignoreProperties"`

		// basic jquery operator with dollar
		{ code: 'var $x = $();', options: ['ignoreProperties'] },
		// basic jquery operator in object definition
		{ code: 'var x = { foo: $() }', options: ['ignoreProperties'] },
		// basic jquery operator in object properties
		{ code: 'this.x = $();', options: ['ignoreProperties'] }
	],
	invalid: [
		// basic jquery operator
		{
			code: 'var x = $();',
			output: 'var $x = $();',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}]
		},
		// assignment on nextline without semicolon
		{
			code: 'var a = $(".foo")\nvar b = $()',
			output: 'var $a = $(".foo")\nvar $b = $()',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 2,
				column: 5
			}]
		},
		// jquery operator with html
		{
			code: 'var x = $("<p>foo</p>");',
			output: 'var $x = $("<p>foo</p>");',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}]
		},
		// jquery operator with selector
		{
			code: 'var x = $(".foo");',
			output: 'var $x = $(".foo");',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}]
		},
		// assignment on right hand side of object destructuring
		{
			code: 'var {foo} = {foo: $(".foo")}',
			output: 'var {foo} = {foo: $(".foo")}',
			ecmaFeatures: { destructuring: true },
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 14
			}]
		},
		// multiple var declarations
		{
			code: 'var bar, foo = $(".foo");',
			output: 'var bar, $foo = $(".foo");',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 10
			}]
		},

		//// in object definition

		// basic jquery operator
		{
			code: 'var x = { foo: $() }',
			output: 'var x = { foo: $() }',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 11
			}]
		},
		// jquery operator with selector
		{
			code: 'var x = { foo: $(".foo") }',
			output: 'var x = { foo: $(".foo") }',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 11
			}]
		},
		// jquery operator with dollar and single quotes around selector
		{
			code: 'var $x = { foo: $(\'.foo\') }',
			output: 'var $x = { foo: $(\'.foo\') }',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 12
			}]
		},
		// keys besides the first
		{
			code: 'var x = { bar: 1, foo: $(".foo") }',
			output: 'var x = { bar: 1, foo: $(".foo") }',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 19
			}]
		},

		//// in object properties

		// basic jquery operator
		{
			code: 'this.x = $();',
			output: 'this.x = $();',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 6
			}]
		},
		// jquery operator with html
		{
			code: 'this.x = $("<p>foo</p>");',
			output: 'this.x = $("<p>foo</p>");',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 6
			}]
		},
		// jquery operator with selector
		{
			code: 'this.x = $(".foo");',
			output: 'this.x = $(".foo");',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 6
			}]
		},
		// multi level object assignment without dollar
		{
			code: 'a.b.c = $()',
			output: 'a.b.c = $()',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}]
		},

		//// option value `"ignoreProperties"`

		// basic jquery operator
		{
			code: 'var x = $();',
			output: 'var $x = $();',
			options: ['ignoreProperties'],
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}]
		},

		//// Autofixing

		// autofix var usages
		{
			code: 'var x = $(".foo"); x.bar(); baz(x);',
			output: 'var $x = $(".foo"); $x.bar(); baz($x);',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 20
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 33
			}]
		},
		// autofix assignments to object properties
		{
			code: 'var x = $(".foo"); ({ abc: x }); this.def = x;',
			output: 'var $x = $(".foo"); ({ abc: $x }); this.def = $x;',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 28
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 45
			}]
		},
		// don't autofix object property keys
		{
			code: 'var x = $(".foo"); ({ x });',
			output: 'var x = $(".foo"); ({ x });',
			ecmaFeatures: { objectLiteralShorthandProperties: true },
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 23
			}]
		},
		// autofix shadowed vars in child scopes
		{
			code: 'var x; (function() { var x = $(); (function() { x; (function() { var x; }); }); });',
			output: 'var x; (function() { var $x = $(); (function() { $x; (function() { var x; }); }); });',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 26
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 49
			}]
		},
		// autofix late-assigned vars
		{
			code: 'var x; x = $();',
			output: 'var $x; $x = $();',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 5
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}]
		}
	]
});
