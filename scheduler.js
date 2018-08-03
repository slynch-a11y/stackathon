'use strict'
const CronJob = require('cron').CronJob
const notificationFunction = require('./notificationFunction')
const moment = require('moment')

var testJob = new CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    console.log('TEST JOB IS RUNNING')
    console.log('Test moment', +moment())
    notificationFunction.run()
    /*
     * Runs once every minute.
     */
  },
  //start running right away.  if set to false, you need to call job.start()
  start: true,
  timeZone: 'America/New_York'
})
// testJob.start()
const scheduler = function() {
  return {
    start: function() {
      testJob.start()
    }
  }
}

module.exports = scheduler
