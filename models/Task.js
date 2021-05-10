const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    dateToFinish: {
        type: Date
    },
    color: {
        type: String
    },
    finished: {
        type: Boolean,
        default: false
    },
    editDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('task', taskSchema)