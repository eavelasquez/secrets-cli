'use strict'

const { cli } = require('cli-ux')
const { CLIError } = require('@oclif/errors')
const { isAuthenticated, authenticate } = require('@mntd/auth')

module.exports = async function ({ username }) {
  if (!await isAuthenticated(username)) {
    const password = await cli.prompt('Enter your password', { type: 'hide' })

    const user = await authenticate(username, password)
    if (!user) throw new CLIError('Invalid username or password')
  }
}
