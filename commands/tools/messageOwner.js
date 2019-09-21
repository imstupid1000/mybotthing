const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-',
    fetchAllMembers: true
});

class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'msgowner',
            group: 'tools',
            memberName: 'msgowner',
            description: 'the special spice'
        });
    }

    async run(message, args) {
        const guild = bot.guilds.first()
        guild.Owner.createDM()
        guild.Owner.send("Hello, the owner of Automatic has made a very useless command that messages the owner of one of the guilds the bot is in. The owner has decided to use this command, or you wouldn't have recieved this message. Please send a DM to s8ot#0749 with a invite to your discord server. Thanks, I guess. ~owner")
        .then(console.log('Message sucessfully sent.'))
        .catch(console.error)
}}

module.exports = KickCommand
