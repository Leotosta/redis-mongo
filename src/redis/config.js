
const SESSION_OPTIONS = {
    secret: process.env.REDIS_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        sameSite: true
    },

    rolling: true, // if the cookie get expired and the session still actiove, rolling'll update the cookie
    resave: false,
    saveUninitialized: false 
}


module.exports =  SESSION_OPTIONS