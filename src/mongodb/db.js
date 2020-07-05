const mongoose = require('mongoose')

mongoose.connect('mongodb://http://localhost/mongoApi', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.promise = global.promise

module.exports = mongoose