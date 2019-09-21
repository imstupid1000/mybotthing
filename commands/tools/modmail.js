const Commando = require('discord.js-commando')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-',
    fetchAllMembers: true
});

class KickCommand extends Commando.Command {
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
            const guild = bot.guilds.find(g => g.id == '624442761919332352');
            guild.Owner.send('Message from ' + message.user.username + message.user.tag + ': ' + args)
        }
    }
}

module.exports = KickCommand