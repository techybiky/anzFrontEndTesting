module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step_definitions/**/*.js', 'support/**/*.js'],
    format: [
      'progress-bar',
      'json:reports/results.json',
      'junit:reports/results.xml',
      'html:reports/cucumber-report.html' 
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};