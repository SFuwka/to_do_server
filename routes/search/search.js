const { Router } = require('express')
const { handleSearch } = require('./searchControll')
const router = Router({ mergeParams: true })

router.get('/', handleSearch)

module.exports = router