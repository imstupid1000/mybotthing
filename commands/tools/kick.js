const commando = require('discord.js-commando')
const bot = new commando.Client({
    owner: '452666956353503252',
    commandPrefix: '-'
});

class KickMemberCommand extends commando.Command
{
constructor(client)
    {
        super(client,{
            name: 'kick',
            group: 'tools',
            memberName: 'kick',
            description: 'Kicks specified member'
        });
    }
    async run(message, args)
    {
        if(args == '')
        {
            message.channel.send('You must specify a member.')
        }
        else
        {
            if(args = message.mentions.members.first())
            {
                if(message.member.missingPermissions('KICK_MEMBERS')
                   {
                       message.channel.send('Looks like your missing permissions. I guees you cant kick them.'
                   }
 
                
            }
            else
            {
                  if(args = message.mentions.members.first())
            {
                if(!message.member.missingPermissions('KICK_MEMBERS')
                   {
                       let member = message.mentions.members.first()
                    member.kick('Member was kicked by ' + message.member.displayName + ' You should ask.'
                   }
            }
            else
            {
                message.channel.send('You must specify a member.')
            }
        }       
    }
}
    module.exports = KickMemberCommand
