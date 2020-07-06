const { SESSION_OPTIONS } = require('../redis/configRedis/config')

const isLoggedIn = (req) => {
    return !!req.session.userId
}

async function login(req, userId){
    return req.session.userId = userId
}

async function logout(req, res){
    req.session.destroy(err => {
        if(err) throw Error (err)

        res.clearCookie(SESSION_OPTIONS)
    })
}

const guest = (req, res, next) => {
    if(isLoggedIn(req)){
        return res.status(401).json('You are already logged in  ')
    }
    next()
}

const auth = (req, res, next) => {
    if(!isLoggedIn(req)){
        return res.status(401).json(' You must be logged in ')
    }
}

module.exports = { isLoggedIn, login, guest, logout, auth }