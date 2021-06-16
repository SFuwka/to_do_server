const Task = require('../../../models/Task')


const getTasks = async (req, res) => {
    const projectId = req.params.projectId
    let count = 20
    let skip = Number(req.query.skip) || 0
    try {
        const tasksCount = await Task.countDocuments({ project: projectId })
        const tasks = await Task.find({ project: projectId })
            .sort({ order: -1 })
            .skip(skip)
            .limit(count)
        if (tasks.length > 0) {
            return res.status(200).json({ tasks, tasksCount })
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

const updateOrder = async (req, res) => {
    const { projectId } = req.params
    const order = req.body
    console.log(order)
    try {
        //handle reversed order
        let projectTasks = await Task.find({ project: projectId })
        order.new = Math.abs(order.new - projectTasks.length + 1)
        order.prev = Math.abs(order.prev - projectTasks.length + 1)

        let updated = await Task.findOneAndUpdate(
            { project: projectId, order: order.prev },
            { $set: { order: order.new } },
            { useFindAndModify: false }
        )
        if (order.prev > order.new) {
            await Task.updateMany({ project: projectId, _id: { $ne: updated._id }, order: { $lt: order.prev, $gt: order.new - 1 } },
                { $inc: { order: 1 } })
        } else {
            await Task.updateMany({ project: projectId, _id: { $ne: updated._id }, order: { $lt: order.new + 1, $gt: order.prev } },
                { $inc: { order: -1 } })
        }

    } catch (error) {
        console.log(error)
    }
    res.json('tut')
}

const getTask = (req, res) => {
    res.send('task with id')
}

const createTask = async (req, res) => {
    const { taskName, color } = req.body
    const projectId = req.params.projectId
    if (!projectId) return res.status(400).json({ message: 'projectId is required' })
    if (!taskName) return res.status(400).json({ errType: 'field', message: 'task name is required' })
    let projectTasks = await Task.find({ project: req.params.projectId })

    const newTask = new Task({ project: req.params.projectId, taskName, color, order: projectTasks.length })
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
        const deleted = await Task.findByIdAndDelete(taskId)
        if (deleted) {
            await Task.updateMany({ project: deleted.project, order: { $gt: deleted.order } }, { $inc: { order: -1 } })
            return res.status(204).send()
        }
        return res.send('nothing to delete')
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


module.exports = { getTasks, getTask, updateTask, createTask, deleteTask, updateStatus, updateOrder }