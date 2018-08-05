const router = require('express').Router()
const {Chore, UserChores, User} = require('../db/models')
module.exports = router

router.get('/:familyId', async (req, res, next) => {
  try {
    if(req.user){
    const chores = await User.findAll({
      where: {
        familyId: req.params.familyId,
            parent: false
      },
      include: [
        {

          model: UserChores,
          include: [
            {
              model: Chore
            }
          ]
        }
      ]}
      )
    res.json(chores)
    }

  } catch (err) {
    next(err)
  }
})

router.get('/users/:userId', async (req, res, next) => {
  try {
//get chores for individual users
    const id = req.params.userId
    const chores = await UserChores.findAll({
      where: {
        userId: id
      },
      include: [
        {
          model: Chore
        }
      ]}
      )
    if (!id) {
      const err = new Error('User not found!')
      err.status = 404
      return next(err)
    }
    res.json(chores)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      //create new chore with description, hour, userId,
      //also need to create userchores instance!
      const newChore = await Chore.create(req.body)
      await UserChores.create({userId: req.body.userId, choreId: newChore.id})
      res.status(201).json(newChore)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})


router.put('/:choreId', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      //update the HOUR at which chore should be completed
      const chore = await Chore.findById(req.params.choreId)
      if (!chore) {
        const err = new Error('Chore not found!')
        err.status = 404
        return next(err)
      }
      const updatedChore = await chore.update(req.body)
      res.status(202).json(updatedChore)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})

router.delete('/:choreId', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      const chore = await Chore.findById(req.params.choreId)
      if (!chore) {
        const err = new Error('Chore not found!')
        err.status = 404
        return next(err)
      }
      await chore.destroy()
      res.sendStatus(204)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})

router.delete('/:choreId/users/:userId', async( req, res, next ) => {
  try{
  let userId = req.params.userId
  let choreId = req.params.choreId
  //find chore associated to user and remove from userchores table
  const chore = await UserChores.findAll({
    where: {
      userId: userId,
      choreId: choreId
    }
  })
  const destroyedChore = await chore[0].destroy()
  res.status(202).json(destroyedChore)


}catch (err) {
  next(err)
}

})
