const { Router } = require('express')
const checkAuth = require('../../middleWares/checkAuthMiddleware')
const checkOwner = require('../../middleWares/checkOwner')
const { checkPrivacySettings } = require('../../middleWares/checkPrivacySettings')
const router = Router({ mergeParams: true })
const { getProject, getProjects, createProject, updateProject, deleteProject, sendProjects, sendProject } = require('./projectControll')
const tasksRouter = require('./task/task')

//router.use(checkOwner)
router.get('/', checkOwner, checkPrivacySettings, getProjects, sendProjects)
router.get('/:projectId', checkOwner, checkPrivacySettings, getProject, sendProject)
router.use('/:projectId/tasks', tasksRouter)
router.use(checkAuth)
router.post('/', createProject)
router.put('/:projectId', updateProject)
router.delete('/:projectId', deleteProject)

module.exports = router