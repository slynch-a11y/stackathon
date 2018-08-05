const router = require('express').Router()
const {User, UserChores, Chore} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'familyId']
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
  console.log("UPDATEDCHORE", updatedChore.choreId)
  const choreToUpdate = await Chore.findById(updatedChore.choreId)
  //choreToUpdate.isComplete = true
  await choreToUpdate.update({isComplete: true})
  res.status(202).json(updatedChore)
}catch (err) {
  next(err)
}

})

router.put('/:userId', async( req, res, next ) => {
  try{
    //only for logged in admins!
  let userId = req.params.userId

  //update familyId of user when they first log in and "add child"
  const user = await User.findById(userId)
  const updatedUser = await user.update(req.body)
  res.status(202).json(updatedUser)
}catch (err) {
  next(err)
}

})

//route to post a child account
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, parent: false, password: req.body.password, familyId: req.body.familyId

    })
    res.json(user)
    // req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
