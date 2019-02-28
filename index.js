const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.bot({
    owner: '452666956353503252',
    commandPrefix: '-'
});
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const fs = require('fs')


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

bot.on('messageReactionAdd', function(){
    module.exports = class {
        constructor(bot) {
          this.bot = bot;
        }
      
        async run(reaction, user) {
          const message = reaction.message;
          if (reaction.emoji.name !== '⭐') return;
          if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);
          if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
          const { starboardChannel } = this.bot.settings.get(message.guild.id);
          const starChannel = message.guild.channels.find(channel => channel.name === starboardChannel)
          if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`); 
          const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
          const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
          if (stars) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
            const foundStar = stars.embeds[0];
            const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
            const embed = new RichEmbed()
              .setColor(foundStar.color)
              .setDescription(foundStar.description)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
              .setImage(image);
            const starMsg = await starChannel.fetchMessage(stars.id);
            await starMsg.edit({ embed });
          }
          if (!stars) {
            const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
            if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
            const embed = new RichEmbed()
              .setColor(15844367)
              .setDescription(message.cleanContent)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp(new Date())
              .setFooter(`⭐ 1 | ${message.id}`)
              .setImage(image);
            await starChannel.send({ embed });
          }
        }
      
        extension(reaction, attachment) {
          const imageLink = attachment.split('.');
          const typeOfImage = imageLink[imageLink.length - 1];
          const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
          if (!image) return '';
          return attachment;
        }
      };
})

bot.on('messageReactionRemove', function(){
    module.exports = class {
        constructor(bot) {
          this.bot = bot;
        }
      
        async run(reaction, user) {
          const message = reaction.message;
          if (message.author.id === user.id) return;
          if (reaction.emoji.name !== '⭐') return;
          const { starboardChannel } = this.bot.settings.get(message.guild.id);
          const starChannel = message.guild.channels.find(channel => channel.name == starboardChannel)
          if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`); 
          const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
          const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
          if (stars) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
            const foundStar = stars.embeds[0];
            const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
            const embed = new RichEmbed()
              .setColor(foundStar.color)
              .setDescription(foundStar.description)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
              .setImage(image);
            const starMsg = await starChannel.fetchMessage(stars.id);
            await starMsg.edit({ embed });
            if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
          }
        }
      
        extension(reaction, attachment) {
          const imageLink = attachment.split('.');
          const typeOfImage = imageLink[imageLink.length - 1];
          const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
          if (!image) return '';
          return attachment;
        };
      };
})


bot.on('ready', function () {
    console.log('Bot is ready.')
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
    const channel = member.guild.channels.find(ch => ch.name === 'logs');
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