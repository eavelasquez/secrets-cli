'use strict'

const { cli } = require('cli-ux')
const { Sequelize } = require('@mntd/db')
const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { userServices } = require('@mntd/services')

class UsersCreateCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(UsersCreateCommand)
      const { username } = args

      const fullName = await cli.prompt('Enter your full name')
      const password = await cli.prompt('Enter your password', { type: 'hide' })

      const newUser = await userServices.createUser(username, password, fullName)
      this.log(`user: ${newUser.username} created with id: ${newUser.id}`)
    } catch (error) {
      this.log(error)
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new CLIError('User already exists')
      } else {
        throw new CLIError('Can not create user')
      }
    }
  }
}

UsersCreateCommand.description = 'Creates an user'
UsersCreateCommand.flags = {}
UsersCreateCommand.args = [
  { name: 'username', required: true }
]

module.exports = UsersCreateCommand
