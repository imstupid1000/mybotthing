const commando = require('discord.js-commando')
const YTDL = require('ytdl-core-discord');
const queue = [];

function Play(connection, message) {
    var server = servers[message.guild.id]
    server.dispatcher = connection.playStream(YTDL(queue[0], {
        filter: "audioonly"
    }));
    queue.shift();
    server.dispatcher.on("end", function () {
        if (queue[0]) {
            Play(connection, message);
        } else {
            connection.disconnect();
        }
    });
}
class JoinChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays music in voice channel of the commander'

        });
    }
    async run(message, args) {
        if (message.member.voiceChannel) {
            if (!message.guild.voiceConnection) {
                if (!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    }
                }
                const channel = message.member.voiceChannel;
                channel.join()
                    .then(connection => {
                        var server = servers[message.guild.id];
                        message.react('👍')
                        queue.push(args);
                        Play(connection, message);
                    })

            }
        } else {
            message.channel.send('You must be in a voice channel for me to join it.')
        }
    }
}
module.exports = JoinChannelCommand