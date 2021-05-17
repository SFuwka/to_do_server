const { Router } = require('express')
const { isAuth } = require('../auth/controllers/authMe')
const router = Router()
const projectRouter = require('../project/project')

const { getUsers, getUser, getMyProfile } = require('./userControll')

router.get('/home', isAuth, getMyProfile)
router.get('/', getUsers)
router.get('/:userId', getUser)
router.use('/:userId/projects', projectRouter)

module.exports = router