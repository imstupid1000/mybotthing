const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('gifs', 'Gifs');
bot.registry.registerGroup('tools', 'Tools');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};
global.green = '00FF00'

bot.on('message', function (message) {
    if (message.content == 'hi') {
        message.channel.send('Hello, ' + message.author + '!');
    }
});




bot.on('ready', function () {
    console.log('Bot is ready.');

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
                        .setTimestamp()
                        .setURL(message.url)
                        .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
                        .setColor('#00FF00')
                    channel.send(embed)
                })
        }

    })
    bot.on('messageDelete', function (message) {
        if (message.guild.channels.find(c => c.name === 'logs'))

        {
            const channel = message.guild.channels.find(c => c.name === 'logs')
            const embed = new Discord.RichEmbed()
                .setTitle('Message Deleted')
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setThumbnail(message.author.displayAvatarURL)
                .addField('Message', message.content)
                .addField('Member', message.member.displayName)
                .setTimestamp()
                .setURL(message.url)
                .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
                .setColor('#00FF00')
            channel.send(embed)

        }

    })



    bot.on('guildMemberAdd', function (member) {
        if (!member.guild.channels.find('name', 'welcome')) {
            member.guild.createChannel('welcome', 'text')
                .then(function () {
                    let channel = message.guild.channels.find(c => c.name === 'welcome').
                    channel.send(member.displayName + ' has joined the server!')
                })
        }
    })

});
bot.on('guildMemberAdd', function (member) {
    if (!member.guild.roles.find("name", 'Member')) {
        member.guild.createRole({
            name: 'Member',
            color: '00FF00'
        }).then(function () {
            member.send('Welcome to ' + member.guild.name + '!')
            let memberRole = member.guild.roles.find("name", 'Member');
            member.addRole(memberRole);
        })
    } else {
        member.send('Welcome to ' + member.guild.name + '!')
        let memberRole = member.guild.roles.find("name", 'Member');
        member.addRole(memberRole);
    }
});


client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Get the icon in the form of a buffer
	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	// Wait for Canvas to load the image
	const avatar = await Canvas.loadImage(buffer);
	// Draw a shape onto the main canvas
	ctx.drawImage(avatar, 25, 0, 200, canvas.height);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});


bot.on('guildCreate', function () {
    /* this code changes the bot activity to "Listening to (amount of servers bot is in) | @botname help" when the bot is added to a server or removed from a server (this is way too long) */
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {
        type: 'LISTENING'
    })
})
bot.on('guildDelete', function () {
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {
        type: 'LISTENING'
    })
})
bot.on('ready', function () {
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {
        type: 'LISTENING'
    })
})




bot.login(process.env.BOT_TOKEN)