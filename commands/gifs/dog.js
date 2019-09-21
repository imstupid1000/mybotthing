const commando = require('discord.js-commando')
const fetch = require('node-fetch')


class DogGifCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'photos',
            memberName: 'dog',
            description: "Shows a random dog image"
        });
    }
    async run(message, args) {
        message.channel.send('This command doesnt work at the moment.')
 
    }
}
module.exports = DogGifCommand