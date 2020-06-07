'use strict'

const { cli } = require('cli-ux')
const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { userServices } = require('@mntd/services')

class UsersListCommand extends Command {
  async run () {
    try {
      const results = await userServices.listUsers()
      cli.table(results.rows, {
        username: { minWidth: 12 },
        fullname: { header: 'Full name', minWidth: 20 }
      }, {
        printLine: this.log
      })
    } catch (error) {
      throw new CLIError('Cannot list users')
    }
  }
}

UsersListCommand.description = 'List all users'
UsersListCommand.flags = {}

module.exports = UsersListCommand
