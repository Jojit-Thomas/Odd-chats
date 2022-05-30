const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        requried: true,
        max: 50,
        unique: true, 
    },
    password: {
        type: String,
        requried: true,
        min: 8,
        max: 80,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('Users', userSchema)