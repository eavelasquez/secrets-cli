const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class HelloCommand extends Command {
  async run () {
    const { flags } = this.parse(HelloCommand)
    let name = flags.name

    cli.action.start('start a process')
    if (!name) {
      name = await cli.prompt('Enter your name', { type: 'hide' })
    }
    cli.action.stop('stop')

    this.log(`hello ${name} from ./src/commands/hello.js`)
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`

HelloCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' })
}

module.exports = HelloCommand
