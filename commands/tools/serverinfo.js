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
  .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
  .setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail("http://i.imgur.com/p2qNFag.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 1024 characters.")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Inline Field", "They can also be inline.", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
 
  message.channel.send({embed});
    }
  

}
    module.exports = KickMemberCommand
