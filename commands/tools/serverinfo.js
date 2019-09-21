const commando = require('discord.js-commando')
const Discord = require('discord.js')
const client = new commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

class ServerInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'tools',
            memberName: 'serverinfo',
            description: 'Do I need to explain?'
        });
    }
    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle("Server Info")
            .setAuthor(this.client.user.username, this.client.user.avatarURL)
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(0x00AE86)
            .setDescription("This server's info")
            .setFooter("This info is data about this server")
            .setThumbnail(message.guild.iconURL)
            /*
             * Takes a Date object, defaults to current date.
             */
            .setTimestamp()

            .addField("Verification level",
                message.guild.verificationLevel)
            /*
             * Inline fields may not display as inline if the thumbnail and/or image is too big.
             */
            .addField("Member count", message.guild.memberCount)
            .addField('Server name', message.guild.name)

        /*
         * Blank field, useful to create some space.
         */


        message.channel.send({
            embed
        });
    }


}
module.exports = ServerInfoCommand