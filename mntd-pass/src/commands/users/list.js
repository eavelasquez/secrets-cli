const { Command } = require('@oclif/command')

class UsersListCommand extends Command {
  async run () {}
}

UsersListCommand.description = 'List a users'

UsersListCommand.flags = {}

module.exports = UsersListCommand
