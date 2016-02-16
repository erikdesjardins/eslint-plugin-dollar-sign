/**
 * @fileoverview Enforce $varName for jQuery assignment.
 * @author Erik Desjardins
 * @copyright 2013-2016 JSCS contributors. All rights reserved.
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

module.exports = function(context) {
	var sourceCode = context.getSourceCode();

	var ignoreProperties = context.options[0] === 'ignoreProperties';

	function checkIfVarNameShouldStartWithDollar(varName, left, right) {
		if (/^_?\$/.test(varName)) {
			return;
		}

		if (!right || right.type !== 'CallExpression') {
			return;
		}

		if (right.callee.type !== 'Identifier' || right.callee.name !== '$') {
			return;
		}

		var identifier = sourceCode.getLastToken(left);

		context.report({
			node: identifier,
			message: 'jQuery identifiers must start with a $',
			fix: function(fixer) {
				return fixer.insertTextBefore(identifier, '$');
			}
		});
	}

	function checkVariableDeclarator(node) {
		var left = node.id;
		if (left.type === 'ObjectPattern' || left.type === 'ArrayPattern') {
			return;
		}

		var varName = left.name;
		var right = node.init;
		checkIfVarNameShouldStartWithDollar(varName, left, right);
	}

	function checkAssignmentExpression(node) {
		var left = node.left;
		if (left.computed) {
			return;
		}

		if (left.type === 'ObjectPattern' || left.type === 'ArrayPattern') {
			return;
		}

		if (left.property && ignoreProperties) {
			return;
		}

		var varName = left.name || left.property.name;
		var right = node.right;
		checkIfVarNameShouldStartWithDollar(varName, left, right);
	}

	function checkObjectExpression(node) {
		if (ignoreProperties) {
			return;
		}

		var props = node.properties;

		if (!props) {
			return;
		}

		props.forEach(function(prop) {
			var left = prop.key;

			if (!left.name) {
				return;
			}

			var varName = left.name;
			var right = prop.value;
			checkIfVarNameShouldStartWithDollar(varName, left, right);
		});
	}

	return {
		VariableDeclarator: checkVariableDeclarator,
		AssignmentExpression: checkAssignmentExpression,
		ObjectExpression: checkObjectExpression
	};
};

module.exports.schema = [
	{
		enum: ['ignoreProperties']
	}
];
