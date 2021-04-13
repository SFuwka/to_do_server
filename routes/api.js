const { Router } = require('express')
const router = Router()
const projectRouter = require('./project/project')
const loginRouter = require('./auth/login')
const signUpRouter = require('./auth/signUp')


router.use('/projects', projectRouter)
router.use('/login', loginRouter)
router.use('/signup', signUpRouter)

router.get('/', (req, res) => {
    res.send('API docks will be here or not')
})



module.exports = router