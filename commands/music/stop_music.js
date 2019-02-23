const commando = require('discord.js-commando')

class LeaveChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stops music in voice channel of the commander'

        });
    }
    async run(message, args) {
        if (message.member.voiceChannel) {
            if (message.guild.voiceConnection) {
                const channel = message.member.voiceChannel;
                channel.leave()
                console.log('Disconnected!')
                message.react('👍')
            }
        } else {
            message.channel.send('You must be in my voice channel for me to leave it.')
        }
    }
}
module.exports = LeaveChannelCommand