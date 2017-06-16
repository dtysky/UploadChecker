/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/6/15
 */
module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      {pattern: 'src/**/*.ts'},
      {pattern: 'spec/**/*.ts'},
      {pattern: 'test-files/*.png', watched: false, included: false, served: true, nocache: false},
      {pattern: 'test-files/*.mp4', watched: false, included: false, served: true, nocache: false}
    ],

    port: 9876,

    logLevel: config.LOG_INFO,

    colors: true,

    autoWatch: true,

    browsers: ['Chrome'],

    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
      'spec/**/*.ts': ['karma-typescript']
    },

    reporters: ['progress', 'karma-typescript'],

    karmaTypescriptConfig: {
      reports: {
        'html': 'reports'
      }
    },

    singleRun: true
  })
};
