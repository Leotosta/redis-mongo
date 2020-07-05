const redis = require('ioredis')
const session = require('express-session')
const connectRedis = require('connect-redis')
const  SESSION_OPTIONS  = require('./config')
const redisStore = connectRedis(session)

// const redisClient = redis.createClient()

module.exports = app => {
    
    const client = new redis({
    //redis_OPTIONS
        port: parseInt(process.env.REDIS_PORT, 10),
        host: process.env.HOST,
        password: process.env.REDIS_PASSWORD
    })
    
    app.use(session({
        // redis_CACHE
        ...SESSION_OPTIONS,
        store: new redisStore({ client }),
        
    }))

}

