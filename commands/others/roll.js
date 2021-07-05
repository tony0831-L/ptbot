const { Command } = require('discord.js-commando');
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: '抽包',
			group: 'others',
			memberName: 'roll',
			description: '從1~100包中抽一包',
		});
	}
    async run(userinfo,message){
        let roll=Math.floor(Math.random() * 100)
        roll="恭喜抽中第"+roll+"包"
        userinfo.say(roll)
}
};


  