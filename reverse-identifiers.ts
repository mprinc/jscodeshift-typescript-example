/**
 *  Copyright (c) 2016-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Example jscodeshift transformer. Simply reverses the names of all
 * identifiers. Stolen from:
 * https://github.com/facebook/jscodeshift/blob/7be2557f369794e915afe7f91ab81b1215e66857/sample/reverse-identifiers.js
 */

// transforms/implicit-icons-to-explicit-imports.ts
import { Transform, Collection, ExportNamedDeclaration } from "jscodeshift";

const transform:Transform = (fileInfo, api, options) => {
	// Alias the jscodeshift API for ease of use.
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	const exportNamedDeclarations:Collection = root.find<ExportNamedDeclaration>(j.ExportNamedDeclaration).forEach((path) => {
		console.log("[j.ExportNamedDeclaration] path: ", path);
	});
	const replacedExportNamedDeclarations = 
	exportNamedDeclarations.replaceWith(
		p => Object.assign({}, p.node, {
			exportKind: "type"
		})
	);
	return replacedExportNamedDeclarations.toSource();
	/*
	return j(fileInfo.source)
		.find(j.Identifier)
		.replaceWith(
			p => Object.assign({}, p.node, {
				name: p.node.name.split('').reverse().join('')
			})
		)
		.toSource();
	*/
}

// the `default` is necessary
export default transform;
export const parser = 'ts';
