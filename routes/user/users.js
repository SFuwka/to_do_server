const { Router } = require('express')
const router = Router()
const projectRouter = require('../project/project')

const { getUsers, getUser } = require('./userControll')


router.get('/', getUsers)
router.get('/:userId', getUser)
router.use('/:userId/projects', projectRouter)

module.exports = router