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
        if (message.member.hasPermission("KICK_MEMBERS")) {
            const mUser = message.mentions.members.first()
            if (mUser.hasPermission("KICK_MEMBERS")) {
                message.channel.send("That user also has permissions to kick, which means I can't do that. Sorry.")
            }

            else {
                mUser.kick('Kicked by ' + message.user.username + '. DM them for more info.')
            }

        }
        else {
            message.channel.send('You do not have permissions to kick a user.')
        }
    }
}

module.exports = KickCommand