const commando = require('discord.js-commando')
const bot = new commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

class KickMemberCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'tools',
            memberName: 'kick',
            description: 'Kicks specified member'
        });
    }
    async run(message, args) {
        if (args == '') {
            message.channel.send('Specify a member.')
        } else {
            if (args == message.mentions.users.first()) {
                if (message.member.missingPermissions('KICK_MEMBERS')) {
                    message.channel.send('Looks like your missing the permissions to that.')
                } else {
                    if (args == message.mentions.users.first()) {
                        if (!message.member.missingPermissions('KICK_MEMBERS')) {
                            let person = message.mentions.users.first()
                            person.kick('Member kicked by ' + message.author.displayName)
                        }
                    }
                }
            }
        }
    }
}
module.exports = KickMemberCommand
