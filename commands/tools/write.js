const commando = require('discord.js-commando')
const bot = new commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

class KickMemberCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'save-text',
            group: 'tools',
            memberName: 'save-text',
            description: 'Save text to a json file'
        });
    }
    async run(message, args) {
        
    }
}
module.exports = KickMemberCommand