const { Command } = require('@oclif/command')

class UserCommand extends Command {
  async run () {
    this._help()
  }
}

UserCommand.description = 'Manage users'
UserCommand.flags = {}

module.exports = UserCommand
