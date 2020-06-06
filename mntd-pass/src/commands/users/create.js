const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const db = require('@mntd/db')

class UsersCreateCommand extends Command {
  async run() {
    const {args} = this.parse(UsersCreateCommand)
    this.log(args)
    this.log(db())
    const password = await cli.prompt('Enter your password', {type: 'hide'})
    this.log(password)
  }
}

UsersCreateCommand.description = 'Creates an user'
UsersCreateCommand.flags = {}
UsersCreateCommand.args = [
  {name: 'username', required: true},
]

module.exports = UsersCreateCommand
