const redis = require('ioredis')
const session = require('express-session')
const connectRedis = require('connect-redis')

const  {SESSION_OPTIONS, SESSION_NAME }  = require('./configRedis/config')

const redisStore = connectRedis(session)

// const redisClient = redis.createClient()

module.exports = app => {
    
    const client = new redis({
    //redis_OPTIONS
       SESSION_NAME
    })
    
    app.use(session({
        // redis_CACHE
        ...SESSION_OPTIONS,
        store: new redisStore({ client }),
        
    }))

}

