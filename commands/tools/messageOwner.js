const commando = require('discord.js-commando')

class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'msgowner',
            group: 'tools',
            memberName: 'msgowner',
            description: 'the special spice'
        });
    }

    async run(message, args) {
        const guild = this.bot.guilds.first()
        guild.Owner.sendMessage("Hello, the owner of Automatic has made a very useless command that messages the owner of one of the guilds the bot is in. The owner has decided to use this command, or you wouldn't have recieved this message. Please send a DM to s8ot#0749 with a invite to your discord server. Thanks, I guess. ~owner")
}}

module.exports = KickCommand
