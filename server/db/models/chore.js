const Sequelize = require('sequelize')
const db = require('../db')
if (process.env.NODE_ENV !== 'production') require('../../../secrets')
var twilio = require('twilio')
var client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const Chore = db.define('chore', {
  description: {
    type: Sequelize.TEXT
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  hour: {
    type: Sequelize.INTEGER  //hour from 8am-8pm
  }
})

Chore.prototype.sendNotifications = function() {
  console.log('DO YOUR CHORES')
  client.messages
    .create({
      body: `Don't forget to ${this.description}!`,
      to: process.env.MY_PHONE_NUMBER, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .done()
}

Chore.prototype.resetIsComplete = function(){
  console.log("RESETTING ISCOMPLETE")
    this.isComplete = false
  }


module.exports = Chore
