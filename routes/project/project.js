const { Router } = require('express')
const checkAuth = require('../../middleWares/checkAuthMiddleware')
const checkOwner = require('../../middleWares/checkOwnerMiddleware')
const {checkPrivacySettings, checkSingleProjectPrivacySettings} = require('../../middleWares/checkPrivacySettings')
const router = Router({ mergeParams: true })
const { getProject, getProjects, createProject, updateProject, deleteProject, sendProjects, sendProject } = require('./projectControll')
const tasksRouter = require('./task/task')

//router.use(checkOwner)
router.get('/', getProjects, checkOwner, checkPrivacySettings, sendProjects) //checkPrivacySettings, sendProjects
router.get('/:projectId', getProject, checkOwner, checkSingleProjectPrivacySettings, sendProject)
router.use(checkAuth)
router.post('/', createProject)
router.put('/:projectId', updateProject)
router.delete('/:projectId', deleteProject)
router.use('/:projectId/tasks', tasksRouter)



module.exports = router