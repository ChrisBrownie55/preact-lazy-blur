import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default {
  entry: 'preact-lazy-blur.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'PreactLazyBlur',
  external: ['preact'],
  plugins: [
    buble({
      jsx: 'h',
      transforms: {
        modules: false
      },
      objectAssign: 'Object.assign',
    }),
    uglify()
  ]
}