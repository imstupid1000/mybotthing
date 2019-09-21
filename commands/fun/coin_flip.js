const commando = require('discord.js-commando')

class CoinFlipCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'coinflip',
            group: 'fun',
            memberName: 'coinflip',
            description: 'Flips a coin, landing on either Heads or Tails'

        });
    }
    async run(message, args) {
        var chance = Math.floor(Math.random() * 2);
        if (chance == 0) {
            message.channel.send('Flipping coin..');
            message.channel.send('You got Heads!');
            message.channel.send('<:coinheads:624776445339762689>')
        } else {
            message.channel.send('Flipping coin..');
            message.channel.send('You got Tails!');
            message.channel.send('<:cointails:624778624515702784>')
        }
    }
}
module.exports = CoinFlipCommand