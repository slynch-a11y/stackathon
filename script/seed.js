'use strict'

const db = require('../server/db')
const {User, Chore, UserChores} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')


    const henry = await User.create({name: 'Henry', email: 'henrymlynch@icloud.com', phoneNumber: 'henrymlynch@icloud.com', password: '123'})
    const sarah = await User.create({name: 'Sarah', email: 'sarah@alum.rpi.edu', phoneNumber: '+2039062676', password: '123'})


  const brushTeeth = await Chore.create({description: 'brush your teeth', hour: 8, isComplete: true})
  const washDishes = await Chore.create({description: 'wash the dishes', hour: 8, isComplete: true})

const sarah_brushTeeth = await UserChores.create({userId: 2, choreId: 1})
const sarah_washDishes = await UserChores.create({userId: 2, choreId: 2})
const henry_washDishes = await UserChores.create({userId: 1, choreId: 2})

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
