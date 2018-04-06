/**
 *  Copyright (c) 2016-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

const babylon = require('babylon');
const recast = require('recast');

/**
 * Example jscodeshift transformer. Simply reverses the names of all
 * identifiers. Stolen from:
 * https://github.com/facebook/jscodeshift/blob/7be2557f369794e915afe7f91ab81b1215e66857/sample/reverse-identifiers.js
 */
function transform(file, api) {
  const parse = source => babylon.parse(source, {
    sourceType: 'module',
    plugins: file.path.endsWith('.tsx') ? ['jsx', 'typescript'] : ['typescript'],
  });
  
  const j = api.jscodeshift;
  
  return j(recast.parse(file.source, { parser: { parse } }))
    .find(j.Identifier)
    .replaceWith(
      p => ({
        ...p.node,
        name: p.node.name.split('').reverse().join('')
      })
    )
    .toSource();
}

module.exports = transform;