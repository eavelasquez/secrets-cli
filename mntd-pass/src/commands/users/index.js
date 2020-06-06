const {Command, flags} = require('@oclif/command')

class UserCommand extends Command {
  async run() {}
}

UserCommand.description = `Describe the command here
...
Extra documentation goes here
`

UserCommand.flags = {}

module.exports = UserCommand
