'use strict'

const { Client } = require('pg')
const { hashPassword, comparePassword, generateRandomKey } = require('./crypto')

const dbUrl = process.env.DB_URL

const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
})

const queries = {
  tableUsers: `
    CREATE TABLE IF NOT EXISTS users (
      username   text PRIMARY KEY,
      password   text NOT NULL,
      random_key text NOT NULL
    );
  `,
  tableSecrets: `
    CREATE TABLE IF NOT EXISTS secrets (
      username  text REFERENCES users (username),
      name      text NOT NULL,
      value     text NOT NULL,
      PRIMARY KEY (username, name)
    );
  `
}

async function createDb () {
  await client.connect()

  await client.query(queries.tableUsers)
  await client.query(queries.tableSecrets)

  return {
    client,
    createUser,
    listUsers,
    createSecret,
    listSecrets,
    getSecret,
    updateSecret,
    deleteSecret,
    authenticate
  }
}

async function authenticate (username, password) {
  const res = await client.query(`
    SELECT username AS user, password AS pass
    FROM users
    WHERE username = $1
  `, [username])

  if (!res || !res.rows || !res.rows[0]) return false

  const hashedPassword = res.rows[0].pass
  return await comparePassword(password, hashedPassword)
}

async function getAuthenticatedUser () {
  const res = await client.query(`
    SELECT username AS user, password AS pass, random_key
    FROM users
    WHERE username = $1
  `, [username])

  if (!res || !res.rows || !res.rows[0]) return false
  const user = res.rows[0]
  const hashedPassword = user.pass

  delete user.pass

  if (await comparePassword(password, hashedPassword)) {
    return user
  }
  return null
}

async function createUser (username, password) {
  await client.query(`
    INSERT INTO users VALUES ($1, $2, $3)
  `, [username, await hashPassword(password)], generateRandomKey())
  await client.end()
}

async function listUsers () {
  const res = await client.query('SELECT username AS user FROM users')
  client.end()
  return {
    count: res.rowCount,
    users: res.rows
  }
}

async function createSecret (user, name, value) {
  await client.query('INSERT INTO secrets VALUES ($1, $2, $3)', [user, name, value])
  await client.end()
}

async function listSecrets (user) {
  const res = await client.query('SELECT name FROM secrets WHERE username = $1', [user])
  await client.end()
  return res.rows
}

async function getSecret (user, name) {
  const res = await client.query(`
    SELECT name, value
    FROM secrets
    WHERE username = $1 AND name = $2
  `, [user, name]
  )
  await client.end()
  if (res.rows.length <= 0) {
    return null
  }
  return res.rows[0]
}

async function updateSecret (user, name, value) {
  await client.query(`
    UPDATE secrets
      SET value = $1
    WHERE username = $2 AND name = $3
  `, [value, user, name]
  )
  await client.end()
}

async function deleteSecret (user, name) {
  await client.query(`
    DELETE
    FROM secrets
    WHERE username = $1 AND name = $2
  `, [user, name]
  )
  await client.end()
}

module.exports = {
  createDb
}
