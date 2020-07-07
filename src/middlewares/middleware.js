const moment = require('moment')
const { SESSION_OPTIONS } = require('../redis/configRedis/config')
const SESSION_ABSOLUTE_TIMEOUT = +1000 * 60 * 60 * 6

const isLoggedIn = (req) => {

     return req.session.userId 
}

function login(req, userId){
    req.session.userId = userId
    req.session.createdAt = Date.now()
}

async function logout(req, res){
    req.session.destroy(err => {
        if(err) throw Error (err)

        res.clearCookie(SESSION_OPTIONS)
    })
}

const guest = (req, res, next) => {
    if(isLoggedIn(req)){
        console.log(req)
        return res.status(401).json('You are already logged in')
    }
    next()
}

const auth = (req, res, next) => {
    if(!isLoggedIn(req)){
        return res.status(401).json('You must be logged in')
    }
    next()
}

const active = async (req, res, next) => {
    try {
        if(isLoggedIn(req)){
            const { createdAt } = req.session
            const now = Date.now()
            
            if(now > createdAt + SESSION_ABSOLUTE_TIMEOUT){
                await logout(req, res)
    
                return next('Error')
            }
        }

        next()
        
    }catch(e){
        console.log(e)
    }

}

module.exports = { isLoggedIn, login, guest, logout, auth, active }