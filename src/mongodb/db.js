const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/myMongo', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.promise = global.promise

module.exports = mongoose