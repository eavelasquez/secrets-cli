'use strict'

const { cli } = require('cli-ux')
const { writeSync } = require('clipboardy')
const { CLIError } = require('@oclif/errors')
const { Command, flags } = require('@oclif/command')
const { secretServices } = require('@mntd/services')

class SecretsGetCommand extends Command {
  async run () {
    try {
      const { args, flags } = this.parse(SecretsGetCommand)
      const { username, name } = args

      await this.config.runHook('authenticate', username)

      const secret = await secretServices.getSecret(username, name)
      if (!secret) throw new CLIError(`secret ${name} not found`)

      if (flags.copy) {
        cli.action.start('Copying to clipboard')
        writeSync(secret.value)
        cli.action.stop('Copied to clipboard')
      } else {
        cli.table([secret], {
          name: { minWidth: 10 },
          value: { minWidth: 12 }
        })
      }
    } catch (error) {
      if (error instanceof CLIError) {
        throw error
      } else {
        throw new CLIError('Cannot get secret')
      }
    }
  }
}

SecretsGetCommand.description = 'Get a secret'
SecretsGetCommand.flags = {
  copy: flags.boolean({ char: 'c' })
}
SecretsGetCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsGetCommand
