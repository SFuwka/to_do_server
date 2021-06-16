const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    avatar: {
        type: String
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projectsLimit: {
        type: Number,
        default: 5
    },
    projectsCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    resetPasswordCode: {
        type: String,
        unique: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})


userSchema.methods.hashPassword = function (password) {
    return bcrypt.hash(password, SALT_ROUNDS)
}
userSchema.methods.comparePasswords = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    console.log(isMatch, 'COMPARE')
    return isMatch
}

module.exports = mongoose.model('user', userSchema)