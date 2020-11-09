require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

function inAmongUsChannel(msg) {
	return msg.channel.name.includes('among-us');
}

var lobby_code = "default";

const regex = /([A-z]){6}/g;

bot.on('message', msg => {
    if(inAmongUsChannel(msg)){  
	    if((msg.author.bot)){
		    msg.react('👌');
		    return;
	    }
	    if ((msg.content.match(regex) != null) && (msg.content.length == 6)){
			lobby_code = msg.content;
		    console.log(`VALID AMONGUS CODE: ${msg.content}`);
		    async function clear() {
				const fetched = await msg.channel.fetchMessages({limit: 99});
				msg.channel.bulkDelete(fetched);
				msg.channel.send(msg.content.toUpperCase());
		    }
		    clear();
	    } else {
		    var msplit = msg.content.split(' ');
		    if(msplit.length == 6){
				function meme(acronym) {
			    //async function meme(acronym) {
				    /*const msgs = await msg.channel.fetchMessages();
				    //var firstMsg = msgs.entries().next().value[1];
				    var lobby_code = Array.from(msgs.entries()).pop()[1];*/
				    var i = 0;
				    var flag = true;
				    for(i=0;i<6;i++){
						//if(lobby_code.content[i] != acronym[i][0].toUpperCase()){
						if(lobby_code[i] != acronym[i][0].toUpperCase()){
							flag = false;
						}
				  	}
				    if(flag){
						console.log(`VALID AMONGUS MEME: ${acronym.join(' ')}`);
						msg.react('🤣');
				    } else {
						console.log(`INVALID AMONGUS MEME: ${acronym.join(' ')}`);
						msg.delete();
				    }
			    }
			    meme(msplit);
			} else { 
				console.log(`INVALID AMONGUS CODE: ${msg.content}`);
				msg.delete();
			}
		}
	}
})


