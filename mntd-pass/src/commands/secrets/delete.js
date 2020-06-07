'use strict'

const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { userServices } = require('@mntd/services')

class SecretsDeleteCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsDeleteCommand)
      const { username, name } = args

      await this.config.runHook('authenticate', username)

      await userServices.deleteSecret(username, name)
      this.log(`secret ${name} deleted`)
    } catch (error) {
      if (error instanceof CLIError) {
        throw error
      } else {
        throw new CLIError('Cannot delete secret')
      }
    }
  }
}

SecretsDeleteCommand.description = 'Delete a secret by username and name'
SecretsDeleteCommand.flags = {}
SecretsDeleteCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsDeleteCommand
