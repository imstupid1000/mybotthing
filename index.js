const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('gifs', 'Gifs');
bot.registry.registerGroup('tools', 'Tools');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};
global.green = '00FF00'

bot.on('message', function (message) {
    var g = bot.guilds.find(message.guild); g.channels.find(ch => ch.Name === 'bot-testing').send('Message in server was sent')
    if (message.content == 'hi') {
        message.channel.send('Hello, ' + message.author + '!');
    }
});



bot.on('ready', function () {
    console.log('Bot is ready. Logged in as ' + bot.user.username)
    console.log('Time when bot was logged in: ' + new Date())
});




bot.on('messageDelete', function (message) {
    var g = bot.guilds.find(message.guild); g.channels.find(ch => ch.Name === 'bot-testing').send('Message in server was deleted')
    if (!message.guild.channels.find(c => c.name === 'bot-testing')) {
        message.guild.createChannel('bot-testing', 'text')

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
    if (message.guild.channels.find(c => c.name === 'logs'))

    {
        const channel = message.guild.channels.find(ch => ch.Name === 'bot-testing')
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




bot.on('guildMemberAdd', function (member) {
    var g = bot.guilds.find(message.guild); g.channels.find(ch => ch.Name === 'bot-testing').send('Member has joined a server')
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


const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    let fontSize = 70;

    do {
        ctx.font = `${fontSize -= 10}px helvetica`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};


bot.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find(ch => ch.name === 'bot-testing');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const welcomes = require('./welcomes.json')
    const values = Object.values(welcomes)
    const welcomemessage = values[parseInt(Math.random() * values.length)]

    const background = await Canvas.loadImage('./images/wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(welcomemessage, canvas.width / 2.5, canvas.height / 3.5);


    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const {
        body: buffer
    } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`${welcomemessage}, ${member}!`, attachment);
});


bot.on('guildCreate', function () {
    var g = bot.guilds.find(message.guild); g.channels.find(ch => ch.Name === 'bot-testing').send('Bot was added to server')
    /* this code changes the bot activity to "Listening to (amount of servers bot is in) | @botname help" when the bot is added to a server or removed from a server (this is way too long) */
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {
        type: 'LISTENING'
    })
})
bot.on('guildDelete', function () {
    var g = bot.guilds.find(message.guild); g.channels.find(ch => ch.Name === 'bot-testing').send('Bot removed from server')
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