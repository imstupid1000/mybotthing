const Commando = require('discord.js-commando')
const Discord = require('discord.js')

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
            .setTitle('Modmail Recieved')
            .setAuthor(message.author.username)
            .setThumbnail(message.author.displayAvatarURL)
            .addField('Message', args)
            .addField('Sent by', message.author.username + message.author.tag)
            .setTimestamp(new Date())
            .setFooter("Message by " + message.author.username, message.member.displayAvatarURL)
            .setColor('#00FF00')
        user.send(embed); 

       message.channel.send('Modmail sent.')
        }
    }
}

module.exports = ModMailCommand 
