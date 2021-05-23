const User = require('../../models/User')
const Task = require('../../models/Task')
const Project = require('../../models/Project')
const Category = require('../../models/Category')


const SEARCH_LIMIT = 5

const handleSearch = async (req, res) => {
    const { userId } = req.params
    const { pattern, where } = req.query
    const regex = new RegExp(pattern, 'gi')
    let response = {}
    switch (where) {
        case 'users':
        //TO_DO
        case 'projects':
            let projects = {}
            if (userId && (userId !== req.session.user)) {
                projects = await Project.find({ 'user': userId })
            } else {
                projects = await Project.find({ 'user': req.session.user })
            }

            let resCount = 0
            const projectIds = projects.map(project => project._id)
            const projectsWithIdAndName = projects.map(project => ({ _id: project._id, name: project.projectName }))
            response.projects = projects.filter(project => {
                if (resCount >= SEARCH_LIMIT) return
                if (project.projectName.match(regex)) {
                    resCount++
                    return project
                }
            })
            if (response.projects.length < SEARCH_LIMIT) {
                const tasks = await Task.find({ project: { $in: projectIds }, taskName: { $regex: regex } }).limit(SEARCH_LIMIT - resCount)
                const tasksWithProjectName = tasks.map(task => {
                    const project = projectsWithIdAndName.find(project => {
                        return project._id.toString() === task.project.toString()
                    })
                    return { ...task._doc, projectName: project.name }
                })
                response.tasks = tasksWithProjectName
            }
            return res.json(response)
        case 'task':
            console.log('task')

    }
    return res.json('okey')

}

module.exports = { handleSearch }