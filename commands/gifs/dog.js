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
        message.channel.send('Loading dog image.. This may take some time.')
        console.log('Somebody used the dog command.')
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                message.channel.send(myJson)
                message.react('🐶')
            })
    }
}
module.exports = DogGifCommand