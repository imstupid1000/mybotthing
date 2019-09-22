const Commando = require("discord.js-commando")
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-',
    fetchAllMembers: true
});
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const Sequelize = require('sequelize')


bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('photos', 'Photos');
bot.registry.registerGroup('tools', 'Tools');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

const PREFIX = '-';

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	// SQLite only
	storage: 'database.sqlite',
});
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

bot.once('ready', () => {
	Tags.sync();
});

bot.on('message', async message => {
	if (message.content.startsWith(PREFIX)) {
		const input = message.content.slice(PREFIX.length).split(' ');
		const command = input.shift();
		const commandArgs = input.join(' ');

		if (command === 'addtag') {

			const splitArgs = commandArgs.split(' ');
const tagName = splitArgs.shift();
const tagDescription = splitArgs.join(' ');

try {
	const tag = await Tags.create({
		name: tagName,
		description: tagDescription,
		username: message.author.username,
	});
	return message.channel.send(`Tag ${tag.name} added.`);
}
catch (e) {
	if (e.name === 'SequelizeUniqueConstraintError') {
		return message.channel.send('That tag already exists.');
	}
	return message.channel.send('Something went wrong with adding a tag.');
}
		} else if (command === 'tag') {
			const tagName = commandArgs;

const tag = await Tags.findOne({ where: { name: tagName } });
if (tag) {
	tag.increment('usage_count');
	return message.channel.send(tag.get('description'));
}
return message.channel.send(`Could not find tag: ${tagName}`);

		} else if (command === 'edittag') {

			const splitArgs = commandArgs.split(' ');
const tagName = splitArgs.shift();
const tagDescription = splitArgs.join(' ');

const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
if (affectedRows > 0) {
	return message.channel.send(`Tag ${tagName} was edited.`);
}
return message.channel.send(`Could not find a tag with name ${tagName}.`);

		} else if (command === 'taginfo') {
            const tagName = commandArgs;

const tag = await Tags.findOne({ where: { name: tagName } });
if (tag) {
	return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
}
return message.channel.send(`Could not find tag: ${tagName}`);
            
		} else if (command === 'showtags') {

const tagList = await Tags.findAll({ attributes: ['name'] });
const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
return message.channel.send(`List of tags: ${tagString}`);
            
		} else if (command === 'removetag') {

            const tagName = commandArgs;
// equivalent to: DELETE from tags WHERE name = ?;
const rowCount = await Tags.destroy({ where: { name: tagName } });
if (!rowCount) return message.channel.send('That tag did not exist.');

return message.channel.send('Tag deleted.');
            
		}
	}
});

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




bot.login(process.env.BOT_TOKEN)
