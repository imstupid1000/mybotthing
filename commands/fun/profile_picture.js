const commando = require('discord.js-commando')
class ProfilePictureCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'pfp',
      group: 'fun',
      memberName: 'pfp',
      description: 'Shows a mentioned users profile picture (Your profile picture is displayed if no user was mentioned)'

    });
  }
  async run(message, args) {
    if (message.mentions.members.first()) {
      const person = message.mentions.users.first()
      message.channel.send({
        "embed": {
          "title": "Profile Picture",
          "url": person.displayAvatarURL,
          "color": 1249168
        }
      });
    } else {
      message.channel.send({
        "embed": {
          "title": "Profile Picture",
          "url": message.author.displayAvatarURL,
          "color": 1249168
        }
      });
    }
  }
}
module.exports = ProfilePictureCommand
