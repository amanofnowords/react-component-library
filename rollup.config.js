import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import json from '@rollup/plugin-json'
import css from 'rollup-plugin-import-css'
const packageJSON = require('./package.json')

export default {
  input: 'src/main.js',
  output: [
    {
      file: packageJSON.main,
      format: 'cjs'
    },
    {
      file: packageJSON.module,
      format: 'esm'
    }
  ],
  plugins: [
    babel({
      extensions: ['.jsx', '.js'],
      exclude: 'node_modules/**'
    }),
    external(),
    resolve(),
    commonjs(),
    json()
    // css()
  ]
}
