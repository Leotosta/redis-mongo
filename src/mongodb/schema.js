const mongoose = require('./db')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        createIndex: true,
        trim: true
    },

    password: {
        type: String,
        require: true,
        trim: true,
        select: false
    }

}, {
    timestamps: true
})

userSchema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User', userSchema) 

module.exports = User