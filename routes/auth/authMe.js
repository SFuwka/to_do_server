const { Router } = require('express')
const { authMe } = require('./controllers/authMe')
const router = Router()


router.get('/', authMe)

module.exports = router