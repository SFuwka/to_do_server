const User = require('../../models/User')
const Project = require('../../models/Project')
const Category = require('../../models/Category')

const getProjects = async (req, res) => {
    let count = Number(req.query.count) || 20
    let page = Number(req.query.page) || 1
    if (count > 20) count = 20
    const user = req.params.userId ? req.params.userId : req.session.user
    try {
        const projects = await Project.find({ user }) //privacySettings: { $ne: 'private' }
            .sort({ editDate: -1 })
            .skip((page - 1) * count)
            .limit(count)
        if (projects.length) {
            return res.status(200).json({ projects })
        }
        return res.status(204).json({ test: 0, message: 'no projects' })
    } catch (error) {
        console.log(error)
    }
}

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId)
        return res.status(200).json({ project })
    } catch (error) {
        console.log(err)
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
        return res.status(201).json({ message: 'project created', project: newProject, category: projectCategory })
    } catch (error) {
        return res.status(400).json({ errType: 'common', message: 'Something went wrong when trying to save' })
    }
}

const updateProject = (req, res) => {
    res.send('update project')
}

const deleteProject = async (req, res) => {
    const { projectId } = req.params
    try {
        const { deletedCount } = await Project.deleteOne({ _id: projectId })
        if (deletedCount > 0) {
            return res.status(204).send()
        }
        return res.send('nothing to delete')
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


module.exports = { getProjects, getProject, updateProject, createProject, deleteProject }