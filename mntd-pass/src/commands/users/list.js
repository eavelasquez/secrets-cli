const {Command, flags} = require('@oclif/command')

class UsersListCommand extends Command {
  async run() {}
}

UsersListCommand.description = `List a users
...
Extra documentation goes here
`

UsersListCommand.flags = {}

module.exports = UsersListCommand
