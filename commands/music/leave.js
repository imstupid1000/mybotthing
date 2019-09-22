const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class LeaveChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'leavechannel',
            group: 'music',
            memberName: 'leavechannel',
            description: 'Leaves current voice channel.'
        });
    }

    async run(message, args) {
        if(message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect()
                message.channel.send('Sucessfully left voice channel.')
        }
        else {
            message.channel.send('I am not in a voice channel.')
        }
    }
}

module.exports = LeaveChannelCommand
