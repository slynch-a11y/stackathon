const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:familyId', async (req, res, next) => {
  try {
    console.log('getting all children')
    const children = await User.findAll({
      where:{
        familyId: req.user.familyId,
        parent: false
      }
    }
      )
    res.json(children)
  } catch (err) {
    next(err)
  }
})


router.put('/:childId', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      //update child email, phone number, name, password
      const child = await User.findById(req.params.childId)
      if (!child) {
        const err = new Error('Child not found!')
        err.status = 404
        return next(err)
      }
      const updatedChild = await child.update(req.body)
      res.status(202).json(updatedChild)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})

router.delete('/:childId', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      const child = await User.findById(req.params.childId)
      if (!child) {
        const err = new Error('Child not found!')
        err.status = 404
        return next(err)
      }
      await child.destroy()
      res.sendStatus(204)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})


