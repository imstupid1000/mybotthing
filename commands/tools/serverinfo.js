const commando = require('discord.js-commando')
const Discord = require('discord.js')
const client = new commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

class KickMemberCommand extends commando.Command
{
constructor(client)
    {
        super(client,{
            name: 'serverinfo',
            group: 'tools',
            memberName: 'serverinfo',
            description: 'Do I need to explain?'
        });
    }
    async run(message, args)
    {
        const embed = new Discord.RichEmbed()
  .setTitle("Server Info")
  .setAuthor(this.client.user.username, this.client.user.avatarURL)
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
  .setImage("http://i.imgur.com/yVpymuV.png")
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
        .addField('')
  /*
   * Blank field, useful to create some space.
   */
  
 
  message.channel.send({embed});
    }
  

}
    module.exports = KickMemberCommand
