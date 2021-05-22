const User = require('../../models/User')
const Task = require('../../models/Task')
const Project = require('../../models/Project')
const Category = require('../../models/Category')



const getProjects = async (req, res, next) => {
    let count = Number(req.query.count) || 20
    let page = Number(req.query.page) || 1
    console.log(req.notAllowedPrivacyLayer, 'allowed privacy')
    if (count > 20) count = 20
    try {
        const projects = await Project.find({ user: req.user, privacySettings: { $nin: req.notAllowedPrivacyLayer } }) //
            .sort({ editDate: -1 }) //toDO take sort params from query?
            .skip((page - 1) * count)
            .limit(count)
        if (projects.length) {
            req.projects = projects
            return next()
        }
        return res.status(204).json({ message: 'no projects or projects have some privacy' })
    } catch (error) {
        console.log(error)
    }
}

const getProject = async (req, res, next) => {
    console.log(req.notAllowedPrivacyLayer, 'not allowed privacy')
    console.log(req.params.projectId, 'aaaaa')
    try {
        const project = await Project.findById(req.params.projectId)
        if (req.notAllowedPrivacyLayer
            && req.notAllowedPrivacyLayer.includes(project.privacySettings[0])
            || project.privacySettings[0] === 'private') {
            return res.status(403).json({ message: `project is ${project.privacySettings[0]}` })
        }
        req.project = project
        return next()
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

const categoryHandler = async (category) => {
    let newCategory = await Category.findOne({ categoryName: category })
    if (newCategory) {
        return newCategory //TO_DO update category rating 
    } else {
        newCategory = new Category({ categoryName: category, rating: 1 })
        try {
            newCategory.save(err => {
                if (err) throw err
            })
        } catch (error) {
            console.log(err)
            throw error
        }
        return newCategory
    }
}

const createProject = async (req, res) => {
    const { projectName, privacySettings, color, category } = req.body
    if (!projectName) {
        return res.status(400).json({ errType: 'field', message: 'project name is required' })
    }
    const newProject = new Project({ user: req.session.user, projectName, privacySettings, color })
    try {
        let projectCategory
        if (category) {
            projectCategory = await categoryHandler(category)
            newProject.category = projectCategory
        }
        await newProject.save()
        await User.updateOne({ _id: req.session.user }, { $inc: { projectsCount: 1 } })
        return res.status(201).json({ message: 'project created', project: newProject, category: projectCategory })
    } catch (error) {
        return res.status(500).json({ errType: 'common', message: 'Something went wrong when trying to save' })
    }
}

const updateProject = async (req, res) => {
    const projectId = req.body._id
    const project = req.body
    if (!req.body.category) {
        project.category = await categoryHandler('default')
    } else {
        project.category = await categoryHandler(req.body.category)
    }
    try {
        await Project.updateOne({ _id: projectId }, project)
        return res.status(200).json({ project })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const deleteProject = async (req, res) => {
    const { projectId } = req.params
    try {
        const { deletedCount } = await Project.deleteOne({ _id: projectId })
        if (deletedCount > 0) {
            await Task.deleteMany({ project: projectId })
            await User.updateOne({ _id: req.session.user }, { $inc: { projectsCount: -1 } })
            return res.status(204).send()
        }
        return res.send('nothing to delete')
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

const sendProjects = (req, res) => {
    return res.status(200).json({ projects: req.projects })
}

const sendProject = (req, res) => {
    return res.status(200).json({ project: req.project })
}

module.exports = { getProjects, getProject, updateProject, createProject, deleteProject, sendProjects, sendProject }