const db = require('../models')

async function createUser (username, pass) {
  const securePass = hashPassword(pass)
  return new Promise((resolve, reject) => {
    const user = db.User.build({ username: username, password: securePass })
    user.save().then(resolve).catch(reject)
  })
}

async function listUsers () {
  return new Promise((resolve, reject) => {
    const users = []
    client.each('SELECT user FROM users', (err, row) => {
      if (err) return reject(err)

      users.push(row)
    }, (err, count) => {
      if (err) return reject(err)

      resolve({ count, users })
    })
  })
}

async function createSecret (username, name, value) {
  return new Promise((resolve, reject) => {
    const secret = db.Secret.build({ username: username, name: name, value: value })
    secret.save().then(resolve).catch(reject)
  })
}

async function listSecrets (user) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare('SELECT name FROM secrets WHERE user = ?')
    stmt.all(user, (err, rows) => {
      if (err) return reject(err)

      resolve(rows)
    })
  })
}

async function getSecret (user, name) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(`
      SELECT name, value
      FROM secrets
      WHERE user = ? AND name = ?
    `)
    stmt.get(user, name, (err, row) => {
      if (err) return reject(err)

      stmt.finalize(() => resolve(row))
    })
  })
}

async function updateSecret (user, name, value) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(`
      UPDATE secrets
        SET value = ?
      WHERE user = ? AND name = ?
    `)
    stmt.run(value, user, name, err => {
      if (err) return reject(err)

      resolve()
    })
  })
}

async function deleteSecret (user, name) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(`
      DELETE
      FROM secrets
      WHERE user = ? AND name = ?
    `)
    stmt.run(user, name, err => {
      if (err) return reject(err)

      resolve()
    })
  })
}
