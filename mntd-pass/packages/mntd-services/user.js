'use strict'

const db = require('@mntd/db')

module.exports = {
  async createUser (username, password, fullName = '') {
    return db.User.create({ username, password, fullName })
  },

  listSecrets () {
    return db.User.findAndCountAll()
  }
}
