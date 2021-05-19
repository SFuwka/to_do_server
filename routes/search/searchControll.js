const User = require('../../models/User')
const Task = require('../../models/Task')
const Project = require('../../models/Project')
const Category = require('../../models/Category')

const handleSearch = async (req, res) => {
    const { pattern, where } = req.query
    const regex = new RegExp(pattern, 'gi')
    console.log(regex)
    let response = {}
    switch (where) {
        case 'projects':
            response.projects = await Project.find({ projectName: { $regex: regex } }, { _id: 1, projectName: 1 })
            if (response.projects.length > 5) {
                return res.json(response)
            }
            console.log(response.projects.length)
            response.tasks = await Task.find({ taskName: { $regex: regex } }, { project: 1, _id: 0, taskName: 1 })
            console.log(response)
        case 'task':
            console.log('task')

    }
    return res.json('okey')

}

module.exports = { handleSearch }