'use strict'

const db = require('@mntd/db')
const { generateKey, encrypt, decrypt } = require('@mntd/crypto')

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
  },

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  async getSecret (user, pass, name) {
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
    const secret = await db.Secret.findOne({
      where: {
        username: user.username,
        name
      }
    })

    if (!secret) return false

    const decrypted = decrypt(secret.value, secretKey, randomKey)

    return {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...secret.toJSON(),
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...{
        value: decrypted
      }
    }
  },

  updateSecret (user, pass, name, value) {
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
    const encrypted = encrypt(value, secretKey, randomKey)

    return db.Secret.update({ value: encrypted }, { where: { username: user.username, name } })
  },

  deleteSecret (username, name) {
    return db.Secret.destroy({ where: { username: username, name } })
  }
}
