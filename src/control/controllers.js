const express = require('express')
const router = express.Router()
const User = require('../mongodb/schema')
const {guest, login, logout, auth} = require('../middlewares/middleware')
const { compare } = require('bcryptjs')

router.get('/home', async (req, res) => {
    const user = await User.findById(req.session.userId)

    return res.json(user)
})


router.post('/SignUp', guest , async (req, res) => {

    const { user, password, confirmPass } = req.body

    try{
        const users = await User.findOne({ user })

        if(users)   
            return res.status(404).json('Invalid user')

        if(password !== confirmPass )
            return res.status(404).json('Password invalid!')

        const createEntry = new User({ user, password })
        const newEntry = await createEntry.save()

        newEntry.password = undefined

        return res.json(newEntry)

    }catch(e){
        console.log(e)
        return res.status(401).json(e)
    }

})

router.post('/login', guest, async (req, res) =>{

    const { user, password } = req.body

    try{
        const users = await User.findOne({user}).select('+password')

        if(!users || await !compare(users.password, password))
            return res.status(402).json(' User or password are invalid!')
            
        await login(req, users._id)
            
        users.password = undefined

        return res.json(users)

    }catch(e){
        console.log(e)
        return res.status(401).json(e)
    }
})


router.post('/logout', async (req, res) => {

   try{
       await logout(req, res)



   }catch(e){
       console.log(e)
   }

})

module.exports = app => app.use('/', router)