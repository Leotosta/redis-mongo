
const HALF_HOURS = 1000 * 60 * 30

const SESSION_OPTIONS = {
    secret: process.env.REDIS_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: +HALF_HOURS,
        secure: false,
        sameSite: true
    },

    rolling: true, // if the cookie get expired and the session still actiove, rolling'll update the cookie
    resave: false,
    saveUninitialized: false 
}

const SESSION_NAME = {
    port: parseInt(process.env.REDIS_PORT, 10),
    host: process.env.HOST,
    password: process.env.REDIS_PASSWORD
}


module.exports = {SESSION_OPTIONS, SESSION_NAME}