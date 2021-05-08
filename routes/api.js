const { Router } = require('express')
const router = Router()
const projectRouter = require('./project/project')
const loginRouter = require('./auth/login')
const signUpRouter = require('./auth/signUp')
const confirmRouter = require('./auth/confirm')
const authMeRouter = require('./auth/authMe')
const userRouter = require('./user/users')

router.use('/projects', projectRouter)
router.use('/login', loginRouter)
router.use('/signup', signUpRouter)
router.use('/confirm', confirmRouter)
router.use('/authMe', authMeRouter)
router.use('/user', userRouter)

router.get('/', (req, res) => {
    res.send('API docks will be here or not')
})



module.exports = router