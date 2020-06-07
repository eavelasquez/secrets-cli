const { cli } = require('cli-ux')
const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { secretServices } = require('@mntd/services')

class SecretsUpdateCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsUpdateCommand)
      const { username, name } = args

      await this.config.runHook('authenticate', { username })

      const value = await cli.prompt('Enter your new secret', { type: 'mask' })
      await secretServices.updateSecret(username, name, value)

      this.log(`secret ${name} updated`)
    } catch (error) {
      throw new CLIError('Cannot update secret')
    }
  }
}

SecretsUpdateCommand.description = 'Update a secret by username and name'
SecretsUpdateCommand.flags = {}
SecretsUpdateCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsUpdateCommand
