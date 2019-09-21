const commando = require('discord.js-commando')

class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'tools',
            memberName: 'kick',
            description: 'Kicks a mentioned user.'
        });
    }

    async run(message, args) {
        if(args == '') {
            message.channel.send('You must include a message.')
        }
        else{
            const guild = this.guilds.find('624442761919332352'); guild.Owner.send('Message from ' + message.user.username + message.user.tag + ': ' + args)
        }
    }
}

module.exports = KickCommand
