// rollup.config.js
import "rollup"; /* eslint no-unused-vars: 0*/
import resolve from "rollup-plugin-node-resolve";
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";

export default {
  output: {
    format: "iife"
  },
  sourcemap: "public/",
  intro: `
	/* eslint-disable */
	`,
  plugins: [
    resolve({
      module: true, // Default: true
      jsnext: true, // Default: false
      main: true, // Default: true
      browser: true,
      extensions: [".js"] // Default: ['.js']
    }),
    // terser() // Code minification,
    json({
        include: 'node_modules/**',
  
        // for tree-shaking, properties will be declared as
        // variables, using either `var` or `const`
        preferConst: true, // Default: false
        indent: '  '
    })
  ]
};
