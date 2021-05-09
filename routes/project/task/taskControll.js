const Task = require('../../../models/Task')


const getTasks = (req, res) => {
    res.send('Array of tasks')
}

const getTask = (req, res) => {
    res.send('task with id')
}

const createTask = async (req, res) => {
    const { taskName, color } = req.body
    const projectId = req.params.projectId

    if (!projectId) return res.status(400).json({ message: 'projectId is required' })
    if (!taskName) return res.status(400).json({ errType: 'field', message: 'task name is required' })

    const newTask = new Task({ project: req.params.projectId, task: taskName, color })
    try {
        await newTask.save()
        return res.status(201).json({ task: newTask, message: 'taskCreated' })
    } catch (error) {
        return res.status(500).json({ errType: 'common', message: 'Something went wrong when trying to save' })
    }
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = (req, res) => {
    res.send('task delete')
}


module.exports = { getTasks, getTask, updateTask, createTask, deleteTask }