#!/usr/bin/env node
'use strict'

require('dotenv').config()

const minimist = require('minimist')
const promptly = require('promptly')
const { createDb } = require('./lib')
const argv = minimist(process.argv.slice(2))

const prompPassword = () => promptly.password('Enter your password:', { replace: '*' })

async function main () {
  const db = await createDb(process.env.DB_TYPE)
  const command = argv._.shift()

  switch (command) {
    case 'users:create':
      try {
        const { user } = argv
        const pass = await prompPassword()
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
        const pass = await prompPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')

        await db.createSecret(user, pass, name, value)
        console.log(`secret: ${name} created`)
      } catch (err) {
        throw new Error('Can not create secret')
      }
      break
    case 'secrets:list':
      try {
        const { user } = argv
        const pass = await prompPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')

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
        const pass = await prompPassword()

        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')

        const secret = await db.getSecret(user, pass, name)
        if (!secret) return console.log(`secret: ${name} not found`)
        console.log(`- ${secret.name} = ${secret.value}`)
      } catch (err) {
        console.log(err)
        throw new Error('Can not get secret')
      }
      break
    case 'secrets:update':
      try {
        const { user, name, value } = argv
        const pass = await prompPassword()

        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')

        await db.updateSecret(user, name, value)
        console.log(`secret: ${name} updated`)
      } catch (err) {
        throw new Error('Can not update secret')
      }
      break
    case 'secrets:delete':
      try {
        const { user, name } = argv
        const pass = await prompPassword()

        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')

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
