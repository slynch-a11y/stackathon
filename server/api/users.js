const router = require('express').Router()
const {User, UserChores} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.put('/:userId/chores/:choreId', async( req, res, next ) => {
  try{
  let userId = req.params.userId
  let choreId = req.params.choreId
  //find chore associated to user.  update the userchores table to INCREASE POINTS WHEN THIS ROUTE IS HIT (when user hits "done" button)
  const chore = await UserChores.findAll({
    where: {
      userId: userId,
      choreId: choreId
    }
  })
  const updatedChore = await chore[0].update(req.body)
  res.status(202).json(updatedChore)


}catch (err) {
  next(err)
}

})
