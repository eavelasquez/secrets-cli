#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const { createDb } = require('./lib/db')
const argv = minimist(process.argv.slice(2))

async function main () {
  const db = await createDb()
  const command = argv._.shift()

  switch (command) {
    case 'users:create':
      try {
        const { user, pass } = argv
        await db.createUser(user, pass)
        console.info(`user: ${user} created`)
      } catch (err) {
        throw new Error('Can not create user')
      }
      break
    case 'users:list':
      try {
        const results = await db.listUsers()
        if (!results || !results.users || !results.users.length) return console.log('No users found')
        results.users.forEach(u => {
          console.log(`${u.user}`)
        })
        console.log(`\tTotal: ${results.count}`)
      } catch (err) {
        throw new Error('Can not list users')
      }
      break
    case 'secrets:create':
      try {
        const { user, name, value } = argv
        await db.createSecret(user, name, value)
        console.log(`secret: ${name} created`)
      } catch (err) {
        throw new Error('Can not create secret')
      }
      break
    case 'secrets:list':
      try {
        const { user } = argv
        const secrets = await db.listSecrets(user)
        secrets.forEach(s => {
          console.log(`- ${s.name}`)
        })
      } catch (err) {
        throw new Error('Can not list secrets')
      }
      break
    case 'secrets:get':
      try {
        const { user, name } = argv
        const secret = await db.getSecret(user, name)
        if (!secret) return console.log(`secret: ${name} not found`)
        console.log(`- ${secret.name} = ${secret.value}`)
      } catch (err) {
        throw new Error('Can not get secret')
      }
      break
    case 'secrets:update':
      try {
        const { user, name, value } = argv
        await db.updateSecret(user, name, value)
        console.log(`secret: ${name} updated`)
      } catch (err) {
        throw new Error('Can not update secret')
      }
      break
    case 'secrets:delete':
      try {
        const { user, name } = argv
        await db.deleteSecret(user, name)
        console.log(`secret: ${name} deleted`)
      } catch (err) {
        throw new Error('Can not delete secret')
      }
      break
    default:
      console.error(`> command not found: "${command}"`)
      break
  }
}

main().catch(err => console.error(`> ${err}`))
