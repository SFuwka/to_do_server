const { Router } = require('express')
const checkAuth = require('../../middleWares/checkAuthMiddleware')
const checkOwner = require('../../middleWares/checkOwnerMiddleware')
const router = Router({ mergeParams: true })
const { getProject, getProjects, createProject, updateProject, deleteProject } = require('./projectControll')
const tasksRouter = require('./task/task')

router.use(checkOwner)
router.get('/', getProjects)
router.get('/:projectId', getProject)
router.use(checkAuth)
router.post('/', createProject)
router.put('/:projectId', updateProject)
router.delete('/:projectId', deleteProject)
router.use('/:projectId/tasks', tasksRouter)



module.exports = router