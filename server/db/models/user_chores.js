const Sequelize = require('sequelize')
const db = require('../db')

const UserChores = db.define('user_chores', {
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

UserChores.beforeUpdate(chore => {
  chore.points++
})


module.exports = UserChores
