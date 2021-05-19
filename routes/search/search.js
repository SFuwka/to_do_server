const { Router } = require('express')
const { handleSearch } = require('./searchControll')
const router = Router()

router.get('/', handleSearch)

module.exports = router