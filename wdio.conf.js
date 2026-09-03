exports.config = {
  runner: 'local',
  port: 4723,
  specs: [
    './tests/**/*.spec.js'
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:bundleId': 'ai.plaud.testflight', // Testflight bundle ID
    'appium:udid': 'auto', // Auto-detect connected device
    'appium:xcodeOrgId': '', // Will need to be set
    'appium:xcodeSigningId': 'iPhone Developer',
    deviceName: 'iPhone',
    platformVersion: '17.0', // Adjust to target iOS version
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:4723',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  services: [
    ['appium', {
      command: 'appium',
      args: {},
    }]
  ],
  reporters: ['spec'],
  onPrepare: function() {
    console.log('Starting Appium session...');
  },
};
