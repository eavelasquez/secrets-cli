'use strict'

const { cli } = require('cli-ux')
const { Sequelize } = require('@mntd/db')
const { CLIError } = require('@oclif/errors')
const { Command } = require('@oclif/command')
const { secretServices } = require('@mntd/services')

class SecretsCreateCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsCreateCommand)
      const { username, name } = args

      await this.config.runHook('authenticate', username)

      const value = await cli.prompt('Enter your secret', { type: 'mask' })
      const secret = await secretServices.createSecret(username, name, value)

      this.log(`secret: ${secret.name} created for user ${username}`)
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new CLIError('Secret name already exists')
      } else if (error instanceof CLIError) {
        throw error
      } else {
        throw new CLIError('Cannot create secret')
      }
    }
  }
}

SecretsCreateCommand.description = 'Creates a secret by name'
SecretsCreateCommand.flags = {}
SecretsCreateCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsCreateCommand
