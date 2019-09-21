const Commando = require('discord.js-commando')

class ModMailCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'modmail',
            group: 'tools',
            memberName: 'modmail',
            description: 'Send a message to the owner of Automatic'
        });
    }

    async run(message, args) {
        if (args == '') {
            message.channel.send('You must include a message.')
        } else {
           const user = this.client.fetchUser('452666956353503252')
            await user.send('Message: ' + args)
        }
    }
}

module.exports = ModMailCommand 