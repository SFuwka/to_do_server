const { Router } = require('express')
const router = Router({ mergeParams: true })
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('./taskControll')


router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)



module.exports = router