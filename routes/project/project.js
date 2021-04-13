const { Router } = require('express')
const router = Router()
const { getProject, getProjects, createProject, updateProject, deleteProject } = require('./projectControll')


router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)



module.exports = router