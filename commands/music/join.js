const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class JoinChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'joinchannel',
            group: 'music',
            memberName: 'joinchannel',
            description: 'Joins your voice channel.'
        });
    }

    async run(message, args) {
        if(message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                message.member.voiceChannel.join()
                .then(connection => {
                    message.channel.send('Successfully joined channel.')
                });
            }
            else {
                message.channel.send('You must be in a voice channel for me to join it.s')
            }
        }

    }
}

module.exports = JoinChannelCommand
