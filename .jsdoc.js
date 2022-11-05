module.exports = {
  plugins: [
    "node_modules/jsdoc-vuejs"
  ],
    source: {
      include: [
        'js'
      ],
      includePattern: '\\.js$',
    },
    opts: {
      encoding: 'utf8',
    },
  };