const User = require('./user')
const Chore = require('./chore')
const Pet = require('./pet')
const UserChores = require('./user_chores')


User.belongsToMany(Chore, {through: 'user_chores'})
Chore.belongsToMany(User, {through: 'user_chores'})

UserChores.belongsTo(User)
User.hasMany(UserChores)

UserChores.belongsTo(Chore)
Chore.hasMany(UserChores)

User.hasOne(Pet)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Chore, Pet, UserChores
}
