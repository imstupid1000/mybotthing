const Commando = require("discord.js-commando");
const Discord = require('discord.js')
const bot = new Commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('gifs', 'Gifs');
bot.registry.registerGroup('tools', 'Tools');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};
global.green = '00FF00'

bot.on('message', function(message){
if(message.content == 'hi')
{
    message.channel.send('Hello, ' + message.author + '!');
}
});




bot.on('ready', function(){
    console.log('Bot is ready.');
    
    bot.on('messageDelete', function(message){
           if(!message.guild.channels.find('name', 'logs'))
           {
               message.guild.createChannel('logs', 'text')
           
            .then(function(channel){
             
                const embed = new Discord.RichEmbed()
                .setTitle('Message Deleted')
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setThumbnail(message.member.displayAvatarURL)
                .addField('Message', message.content)
                .addField('Member', message.member.displayName)
                .setTimestamp()
                .setURL(message.url)
                .setFooter("Message by " + message.member.displayName, message.member.displayAvatarURL)
                .setColor('#00FF00')
                           channel.send(embed)
          })
             
  
     
bot.on('guildMemberAdd', function(member){
    if(!member.guild.channels.find('name', 'welcome'))
    {
        member.guild.createChannel('welcome', 'text')
        .then(function()
        {
            let channel = member.guild.channels.find('name', 'welcome')
            channel.send(member.displayName + ' has joined the server!')
        })
    }
})

});
bot.on('guildMemberAdd', function(member){
    if(!member.guild.roles.find("name", 'Member'))
    {
        member.guild.createRole({
            name: 'Member',
            color: '00FF00'
        }).then(function()
        {
        member.send('Welcome to ' + member.guild.name + '!')
        let memberRole = member.guild.roles.find("name", 'Member');
        member.addRole(memberRole);
        })
    }
    else
    {
        member.send('Welcome to ' + member.guild.name + '!')
        let memberRole = member.guild.roles.find("name", 'Member');
        member.addRole(memberRole);
    }
});
bot.on('guildCreate', function(){   /* this code changes the bot activity to "Listening to (amount of servers bot is in) | @botname help" when the bot is added to a server or removed from a server (this is way too long) */
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {type: 'LISTENING'})
})
bot.on('guildDelete', function(){
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {type: 'LISTENING'})
})
bot.on('ready', function(){
    bot.user.setActivity('' + bot.guilds.size + ' servers @Automatic help', {type: 'LISTENING'})
})





bot.login(process.env.BOT_TOKEN)
