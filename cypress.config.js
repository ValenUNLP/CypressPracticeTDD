const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    numTestsKeptInMemory: 0,
    video:true,
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      on('task', {
        log (message) {
          console.log(message)
          return null
        }
      })
    },
  },
});
