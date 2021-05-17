const { Router } = require('express')
const checkAuth = require('../../../middleWares/checkAuthMiddleware')
const router = Router({ mergeParams: true })
const { getTasks, getTask, createTask, updateTask, deleteTask, updateStatus } = require('./taskControll')


router.get('/', getTasks)
router.get('/:id', getTask)
router.use(checkAuth)
router.post('/', createTask)
router.put('/:id/status', updateStatus)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)



module.exports = router