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
            message.channel.send('You must include a message. Example: -modmail Hello!')
        } else {
           const user = await this.client.fetchUser('452666956353503252')
    const embed = new Discord.RichEmbed()
            .setTitle('Modmail Recieved')
            .setThumbnail(message.author.displayAvatarURL)
            .addField('Message', args)
            .addField('Sent by', message.author.tag)
            .setTimestamp(new Date())
            .setFooter("Message by " + message.author.tag, message.member.displayAvatarURL)
            .setColor('#00FF00')
        user.send(embed); 

       message.channel.send('Modmail sent to owner of Automatic. They will respond by sending a DM to you.')
        }
    }
}

module.exports = ModMailCommand 
