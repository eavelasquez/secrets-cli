'use strict'

const { cli } = require('cli-ux')
const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { secretServices } = require('@mntd/services')

class SecretsListCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsListCommand)
      const { username } = args

      await this.config.runHook('authenticate', username)

      const secrets = await secretServices.listSecrets(username)
      cli.table(secrets.rows, { name: { minWidth: 10 } })

      this.log(`Total: ${secrets.count}`)
    } catch (error) {
      if (error instanceof CLIError) {
        throw error
      } else {
        throw new CLIError('Cannot list secrets')
      }
    }
  }
}

SecretsListCommand.description = 'List a secrets by username'
SecretsListCommand.flags = {}

module.exports = SecretsListCommand
