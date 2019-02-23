const commando = require('discord.js-commando');

class DieRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a six sided die by default, add a number after the command to roll a die with that amount of sides'
        });
    }

    async run(message, args) {
        if (args == '') {
            var dieRoll = Math.floor(Math.random() * 6) + 1;
            message.channel.send('You rolled a ' + dieRoll + '!');
        } else {
            if (isNaN(args)) {
                message.channel.send('"' + args + '"' + ' is not a number!')
            } else {
                var dieRoll = Math.floor(Math.random() * args) + 1;
                message.channel.send('You rolled a ' + dieRoll + '!');
            }
        }
    }
}

module.exports = DieRollCommand