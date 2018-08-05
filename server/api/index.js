const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/chores', require('./chores'))
router.use('/children', require('./children'))
router.use('/pets', require('./pets'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
