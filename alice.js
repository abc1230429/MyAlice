var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var battle = require('./battle.js');
var move = require('./move.js');
var info = require('./info.js');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on("ready", function (evt) {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var username = bot.users[userID].username

        switch(cmd) {
            case 'battle':
                var opp
                if(args.length > 1){
                    if (args[1][0] == '<'){
                        opp = getUserFromMention(args[1])
                        if(!opp){
                            opp = args[1]
                        }
                    }else{
                        opp = args[1]
                    }                    
                }
                console.log(args[1].username)

                battle.fight(username, opp, args[2], args[3], function(msg){
                    bot.sendMessage({
                        to: channelID,
                        message: msg
                    });
                })
                break;
            case 'move':
                move.practice(username, args[1], function(msg){
                    bot.sendMessage({
                        to: channelID,
                        message: msg
                    });                    
                })
                break
            case 'info':
                var opp
                if(args.length > 1){
                    if (args[1][0] == '<'){
                        opp = getUserFromMention(args[1])
                        if(!opp){
                            opp = args[1]
                        }
                    }else{
                        opp = args[1]
                    }                    
                }
                info.record(username, opp, function(msg){
                    bot.sendMessage({
                        to: channelID,
                        message: msg
                    });                      
                })

            break;
         }

     }
});

function getUserFromMention(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return bot.users[id].username;
}