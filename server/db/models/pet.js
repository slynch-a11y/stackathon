const db = require('../db')
const Sequelize = require('sequelize')

const Pet = db.define('pet', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "http://localhost:3000/bunny.png"
  },
  // hooks: {
  //   beforeCreate: pet => {
  //     pet.name = `${pet.name[0].toUpperCase()}${pet.name.slice(1)}`
  //   }
  // }
})



module.exports = Pet
