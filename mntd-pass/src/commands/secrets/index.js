const { Command } = require('@oclif/command')

class SecretsCommand extends Command {
  async run () {}
}

SecretsCommand.description = `Describe the command here
...
Extra documentation goes here
`
SecretsCommand.flags = {}

module.exports = SecretsCommand
