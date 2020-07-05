const mongoose = require('./db')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        trim: true
    },

    password: {
        type: String,
        require: true,
        trim: true
    }

}, {
    timestamps: true
})

userSchema.pre('save', function(next){

    const hash = bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User', userSchema) 

module.exports = User