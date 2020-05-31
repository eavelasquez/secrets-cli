'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

const saltRounds = 5

async function hashPassword(pass) {
  return bcrypt.hash(pass, saltRounds)
}

async function comparePassword(pass, hash) {
  return bcrypt.compare(pass, hash)
}

function encrypt () {

}

function decrypt () {

}

function generateRandomKey () {
  return crypto.randomBytes(16).toString('hex')
}

function generateKey (pass) {
  return crypto.createHash('sha256').update(pass).digest('hex')
}

module.exports = {
  hashPassword,
  comparePassword,
  encrypt,
  decrypt,
  generateRandomKey,
  generateKey
}
