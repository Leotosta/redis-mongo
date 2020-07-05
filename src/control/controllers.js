const express = require('express')
const router = express.Router()
const User = require('../mongodb/schema')
const dist = require('../middlewares/middleware')

router.get('/', (req, res) => {
    res.json('hello world')
})

router.post('/SignUp', dist, async (req, res) => {

    const { user, password, confirmPass } = req.body

    try{
        const users = await User.findOne({ user })

        if(users)   
            return res.status(404).json('Invalid user')

        if(password !== confirmPass )
            return res.status(404).json('Password invalid!')

        const createEntry = new User({ user, password })
        const newEntry = await createEntry.save()

        req.session.userId = newEntry._id
        
        newEntry.password = undefined

        return res.json(newEntry)

    }catch(e){
        console.log(e)
        return res.status(404).json(e)
    }

})

module.exports = app => app.use('/', router)