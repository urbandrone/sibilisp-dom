const { nodeResolve } = require('@rollup/plugin-node-resolve');
const buble = require('@rollup/plugin-buble');
const terser = require('rollup-plugin-terser');
const filesize = require('rollup-plugin-filesize');

module.exports = {
  input: './lib/index.mjs',
  output: {
    file: './lib/index.min.js',
    type: 'umd',
    name: 'DOM'
  },
  plugins: [
    nodeResolve(),
    buble({
      'objectAssign': 'Object.assign'
    }),
    terser(),
    filesize()
  ]
};