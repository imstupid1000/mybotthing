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
           const user = await this.client.fetchUser('452666956353503252')
    const embed = new Discord.RichEmbed()
            .setTitle('Message Recieved')
            .setAuthor(message.user.username, message.user.avatarURL)
            .setThumbnail(message.author.displayAvatarURL)
            .addField('Message', args)
            .addField('Sent by', message.user.username)
            .setTimestamp(new Date())
            .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
            .setColor('#00FF00')
        user.send(embed)
        }
    }
}

module.exports = ModMailCommand 