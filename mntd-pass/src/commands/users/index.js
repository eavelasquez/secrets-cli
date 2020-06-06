const { Command } = require('@oclif/command')

class UserCommand extends Command {
  async run () {}
}

UserCommand.description = 'Describe the command here'

UserCommand.flags = {}

module.exports = UserCommand
