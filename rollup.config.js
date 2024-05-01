import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [{
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    name: 'bundle',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    transformTaggedTemplate({
      tagsToProcess: ['html','css'],
      parserOptions: {
        sourceType: "module",
        plugins: [
            "typescript",
            [
                "decorators",
                { decoratorsBeforeExport: true }
            ]
        ]
      },
      transformer(data) {
          data = data.replace(/\s([{}()>~+=^$:!;])\s/gm, '$1');
          data = data.replace(/([",[]])\s+/gm, '$1');
          data = data.replace(/\s{2,}/gm, ' ');
          return data;
      }
    }),
    typescript(),
    resolve(),
    cleaner({
      targets: [
      'dist'
      ]
    }),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
      ]
    }),
    serve({
      open: true,
      contentBase: 'dist'
    }),
    terser(),
  ]
}, {
  input: 'src/react.tsx',
  output: {
    file: 'dist/react-bundle.js',
    name: 'SimpleReactWebComponent',
    format: 'iife',
    sourcemap: true,
  },
  external: ['react', 'react-dom'],
  plugins: [
    transformTaggedTemplate({
      tagsToProcess: ['html','css'],
      parserOptions: {
        sourceType: "module",
        plugins: [
            "typescript",
            [
                "decorators",
                { decoratorsBeforeExport: true }
            ]
        ]
      },
      transformer(data) {
          data = data.replace(/\s([{}()>~+=^$:!;])\s/gm, '$1');
          data = data.replace(/([",[]])\s+/gm, '$1');
          data = data.replace(/\s{2,}/gm, ' ');
          return data;
      }
    }),
    resolve(), // Resolves node modules
    commonjs(), // Handles CommonJS modules
    typescript(), // Handle TypeScript
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'], // Transforms JSX
    }),  ]
}];