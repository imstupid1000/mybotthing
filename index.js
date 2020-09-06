const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-',
    fetchAllMembers: true
});
const snekfetch = require('snekfetch');
const Sequelize = require('sequelize')


bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('photos', 'Photos');
bot.registry.registerGroup('tools', 'Tools');
bot.registry.registerGroup('music', 'MusicW')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};



bot.on('ready', function () {
    console.log('Bot is ready. Logged in as ' + bot.user.username)
    console.log('Time when bot was logged in: ' + new Date())
});




bot.on('messageDelete', function (message) {
    if (!message.guild.channels.find(c => c.name === 'logs')) {
        message.guild.createChannel('logs', 'text')

            .then(function (channel) {

                const embed = new Discord.RichEmbed()
                    .setTitle('Message Deleted')
                    .setAuthor(bot.user.username, bot.user.avatarURL)
                    .setThumbnail(message.author.displayAvatarURL)
                    .addField('Message', message.content)
                    .addField('Member', message.member.displayName)
                    .setTimestamp(new Date())
                    .setURL(message.url)
                    .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
                    .setColor('#00FF00')
                channel.send(embed)
            })
    }

})
bot.on('messageDelete', function (message) {
    if (message.guild.channels.find(c => c.name === 'logs')) {
        const channel = message.guild.channels.find(c => c.name === 'logs')
        const embed = new Discord.RichEmbed()
            .setTitle('Message Deleted')
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setThumbnail(message.author.displayAvatarURL)
            .addField('Message', message.content)
            .addField('Member', message.member.displayName)
            .setTimestamp(new Date())
            .setURL(message.url)
            .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
            .setColor('#00FF00')
        channel.send(embed)

    }

})




bot.on('guildCreate', function () {
    /* this code changes the bot activity to "Listening to (amount of servers bot is in) | @botname help" when the bot is added to a server or removed from a server (this is way too long) */
    bot.user.setActivity('' + bot.users.size + ' users use -help', {
        type: 'LISTENING'
    })
})
bot.on('guildDelete', function () {
    bot.user.setActivity('' + bot.users.size + ' users use -help', {
        type: 'LISTENING'
    })
})
bot.on('ready', function () {
    bot.user.setActivity('' + bot.users.size + ' users use -help', {
        type: 'LISTENING'
    })
})




bot.login (process.env.BOT_TOKEN)
