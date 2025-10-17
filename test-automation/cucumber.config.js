module.exports = {
  default: {
    require: [
      'steps-definition/**/*.js',
      'util/hook.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    strict: true,
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      browser: process.env.BROWSER || 'chromium',
      headless: process.env.HEADLESS !== 'false',
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
      debug: process.env.DEBUG === 'true'
    }
  }
};
