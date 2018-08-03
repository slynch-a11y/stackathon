'use strict'
const Sequelize = require('sequelize')
const Chore = require('./server/db/models/chore')
const Op = Sequelize.Op

const notificationFunction = function() {
  return {
    run: async function() {
      let date = new Date()
      let chores = await Chore.findAll({
        where: {
          isComplete: false,
          hour: {
            [Op.lt]: date.getHours()
          }
        }
      })
      chores.forEach(chore => {
        chore.sendNotifications()
      })
    }
  }
}

module.exports = notificationFunction()
