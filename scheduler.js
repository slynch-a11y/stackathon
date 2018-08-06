'use strict'
const CronJob = require('cron').CronJob
const notificationFunction = require('./notificationFunction')
const moment = require('moment')
const Chore = require('./server/db/models/chore')

//reset chores to incomplete at midnight every night
var resetChores = new CronJob({
  cronTime: '* 0 * * *',
  onTick: async function(){
    let chores = await Chore.findAll({
      where: {
        isComplete: true,
      }
    })
    chores.forEach(chore => {
      chore.resetIsComplete()
  })
},
  start: true,
  timeZone: 'America/New_York'
})

//send text messages if chore is incomplete by time due
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
