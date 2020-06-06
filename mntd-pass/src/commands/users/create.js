'use strict'

const { cli } = require('cli-ux')
const { Sequelize } = require('@mntd/db')
const { Command } = require('@oclif/command')
const { userServices } = require('@mntd/services')

class UsersCreateCommand extends Command {
  async run () {
    const { args } = this.parse(UsersCreateCommand)
    const { username } = args
    const password = await cli.prompt('Enter your password', { type: 'hide' })
    try {
      const newUser = await userServices.createUser(username, password)
      this.log(`user: ${newUser.username} created with id: ${newUser.id}`)
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new TypeError('User already exists')
      } else {
        throw new TypeError('Can not create user')
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
