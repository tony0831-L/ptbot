const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Discord = require('discord.js');
const path=require('path')
const { token } = require('./token.json');
const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({
	commandPrefix: '!',
	owner: '470847942073253888',
});
client.login(token);

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['findimg', '與找圖相關'],
		['others', '其他'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));



client.on('ready', () => {
    console.log(`已${client.user.tag}登入!`);
});




