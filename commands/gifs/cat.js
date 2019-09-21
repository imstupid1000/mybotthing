const commando = require('discord.js-commando')
const fetch = require('node-fetch')


class CatGifCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'gifs',
            memberName: 'cat',
            description: "Shows a random cat image.. or maybe a gif if you're lucky"
        });
    }
    async run(message, args) {
        message.channel.send('Loading cat image.. This may take some time.')
        console.log('Somebody using the cat command.')
        fetch('https://aws.random.cat/meow')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                message.channel.send(myJson)
                message.react('🐱')
            })
    }
}
module.exports = CatGifCommand