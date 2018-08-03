const router = require('express').Router()
const {Chore, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('getting all chores')
    const chores = await Chore.findAll({
      include: [
        {
          model: User
        }
      ]}
      )
    res.json(chores)
  } catch (err) {
    next(err)
  }
})

router.get('/:choreId', async (req, res, next) => {
  try {
    console.log('finding a single chore')
    const id = req.params.categoryId
    const chore = await Chore.findById(id)
    if (!chore) {
      const err = new Error('Chore not found!')
      err.status = 404
      return next(err)
    }
    res.json(chore)
  } catch (err) {
    next(err)
  }
})
