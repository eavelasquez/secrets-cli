'use strict'

const db = require('@mntd/db')
const {comparePassword} = require('@mntd/crypto')

module.exports = {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  async createSecret(username, password) {
    return db.User.create({
      username,
      password,
    })
  },

  listSecrets() {
    return db.User.findAndCountAll()
  },

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  async authenticate(username, pass) {
    const user = await db.User.findOne({where: {username}})
    if (!user) return false

    const hashed = user.password

    if (await comparePassword(pass, hashed)) {
      return user
    }

    return null
  },
}
