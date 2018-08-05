const router = require('express').Router()
const {Pet} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('getting all pets')
    const pets = await Pet.findAll()
    res.json(pets)
  } catch (err) {
    next(err)
  }
})

//get pet by userId
router.get('/users/:userId', async (req, res, next) => {
  try {

    const pet = await Pet.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(pet)
  } catch (err) {
    next(err)
  }
})
//get pet by petId
router.get('/:petId', async (req, res, next) => {
  try {

    const pet = await Pet.findById(req.params.petId)
    res.json(pet)
  } catch (err) {
    next(err)
  }
})


router.put('/:petId', async (req, res, next) => {
  try {
    // if (req.user && req.user.admin){
      //update the name and userId of pet
      const pet = await Pet.findById(req.params.petId)
      if (!pet) {
        const err = new Error('Chore not found!')
        err.status = 404
        return next(err)
      }
      const updatedPet = await pet.update(req.body)
      res.status(202).json(updatedPet)
    // } else res.status(404).send("Admin use only.")
  } catch (err) { next(err) }
})
