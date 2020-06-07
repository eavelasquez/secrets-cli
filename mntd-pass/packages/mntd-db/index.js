'use strict'

const db = require('./models')
const Redis = require('ioredis')

db.createRedisClient = () => new Redis()

module.exports = db
