const Task = require('../../../models/Task')


const getTasks = async (req, res) => {
    const projectId = req.params.projectId
    let count = Number(req.query.count) || 20
    let page = Number(req.query.page) || 1
    if (count > 20) count = 20
    try {
        const tasks = await Task.find({ project: projectId })
            .sort({ editDate: -1 })
            .skip((page - 1) * count)
            .limit(count)
        if (tasks.length > 0) {
            return res.status(200).json({ tasks })
        }
        return res.status(204).json({ message: 'no tasks yet' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'getTasks error' })
    }
}

const updateStatus = async (req, res) => {
    const { status } = req.body
    const taskId = req.params.id
    try {
        await Task.updateOne({ _id: taskId }, { $set: { finished: status } })
        return res.status(200).json({ message: 'task complete status changed' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'update task complete status error' })
    }
}

const getTask = (req, res) => {
    res.send('task with id')
}

const createTask = async (req, res) => {
    const { taskName, color } = req.body
    const projectId = req.params.projectId
    if (!projectId) return res.status(400).json({ message: 'projectId is required' })
    if (!taskName) return res.status(400).json({ errType: 'field', message: 'task name is required' })

    const newTask = new Task({ project: req.params.projectId, taskName, color })
    try {
        await newTask.save()
        return res.status(201).json({ task: newTask, message: 'taskCreated' })
    } catch (error) {
        return res.status(500).json({ errType: 'common', message: 'Something went wrong when trying to save' })
    }
}

const updateTask = async (req, res) => {
    const taskId = req.body._id
    try {
        await Task.updateOne({ _id: taskId }, req.body)
        return res.status(200).json({ task: req.body })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'update task error' })
    }
}

const deleteTask = async (req, res) => {
    const taskId = req.params.id
    try {
        const { deletedCount } = await Task.deleteOne({ _id: taskId })
        if (deletedCount > 0) {
            return res.status(204).send()
        }
        return res.send('nothing to delete')
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


module.exports = { getTasks, getTask, updateTask, createTask, deleteTask, updateStatus }