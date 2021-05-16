const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    color: {
        type: String,
    },
    privacySettings: {  //can be: private(noone can see), public(everyone can see), array of id (collection of users can see), 
        type: [String] //public-registered (only registered users can see)
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    categoryName: {
        type: String,
    },
    avatar: {
        type: String
    },
    editDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', projectSchema)