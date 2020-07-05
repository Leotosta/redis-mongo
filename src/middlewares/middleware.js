
const isLoggedIn = (req) => {
    return !!req.session.userId
}

module.exports = (req, res, next) => {
    if(isLoggedIn(req)){
        return next(new Error('You are already logged in'))
    }

    next()
}