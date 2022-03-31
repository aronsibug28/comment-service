import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'
import json from 'rollup-plugin-json'
import image from '@rollup/plugin-image'
import autoprefixer from 'autoprefixer'

const packageJson = require('./package.json')

const plugins = [
  peerDepsExternal(),
  postcss({
    extract: false,
    extensions: ['.css', '.scss'],
    plugins: [autoprefixer],
    use: ['sass']
  }),
  babel(),
  localResolve(),
  resolve({
    browser: true
  }),
  commonjs({
    include: 'node_modules/**'
  }),
  json(),
  image()
]

const external = ['react', 'react-dom']

export default [{
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourceMap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourceMap: true
    }
  ],
  plugins,
  external
}]
