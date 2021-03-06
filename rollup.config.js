import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'
import json from 'rollup-plugin-json'
import image from '@rollup/plugin-image'
import autoprefixer from 'autoprefixer'

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

const components = ['Comment']

const libPath = 'lib/'
const config = []

components.forEach((component) => {
  config.push({
    input: `src/components/${component}`,
    output: [
      {
        file: `${libPath + component}/index.js`,
        format: 'umd',
        name: component
      },
      {
        file: `${libPath + component}/index.cjs.js`,
        format: 'cjs',
        name: component
      },
      {
        file: `${libPath + component}/index.esm.js`,
        format: 'es'
      }
    ],
    plugins,
    external
  })
})

export default config
