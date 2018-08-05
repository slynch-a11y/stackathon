const db = require('../db')
const Sequelize = require('sequelize')

const Pet = db.define('pet', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "http://localhost:3000/bunny.png"
  },
  used: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  happyPetImage: {
    type: Sequelize.STRING
  }
})



module.exports = Pet
