const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
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


module.exports = mongoose.model('project', taskSchema)