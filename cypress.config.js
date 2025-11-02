const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth',
    defaultCommandTimeout: 60000, 
    pageLoadTimeout: 60000,   
    setupNodeEvents(on, config) {
    },
  },
});