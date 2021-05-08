const Task = require('../../../models/Task')


const getTasks = (req, res) => {
    res.send('Array of tasks')
}

const getTask = (req, res) => {
    res.send('task with id')
}

const createTask = (req, res) => {
    res.send('create task')
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = (req, res) => {
    res.send('task delete')
}


module.exports = { getTasks, getTask, updateTask, createTask, deleteTask }