import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
const packageJSON = require('./package.json')

export default {
  input: './src/main.ts',
  output: [
    {
      file: packageJSON.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: packageJSON.module,
      format: 'esm'
    }
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({useTsconfigDeclarationDir: true}),
    json(),
    postcss()
  ]
}
