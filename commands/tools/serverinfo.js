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
        message.channel.send({embed: {
    color: 3447003,
    author: {
      name: this.client.user.username,
      icon_url: this.client.user.avatarURL
    },
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to showcase what they look like and what they can do.",
    fields: [{
        name: "Member count",
        value: "Members in server: " + message.guild.memberCount
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }
    ],
    timestamp: new Date(),
    
  }
});
    }
  

}
    module.exports = KickMemberCommand
