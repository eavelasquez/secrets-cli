'use strict'

const db = require('../models')
const { generateKey, encrypt, decrypt } = require('../lib/crypto')

module.exports = {
  createSecret (user, pass, name, value) {
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
    const encrypted = encrypt(value, secretKey, randomKey)

    return db.Secret.create({
      username: user.username,
      name,
      value: encrypted
    })
  },

  listSecrets (username) {
    return db.Secret.findAndCountAll({ where: { username } })
  }

  async getSecret (user, pass, name) {
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
  }
}
