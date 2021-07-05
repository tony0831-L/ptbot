const { Command } = require('discord.js-commando');
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'show',
			group: 'findimg',
			memberName: 'show',
			description: '使用說明:!show 車號',
		});
	}
    async run(userinfo,message){
        let url=message
        url="https://nhentai.net/g/"+url+"/"
        console.log(userinfo.author.username)
        var arr=[]
        try {
            request(url, function (error, response, body) {
                let data=cheerio.load(response.body)
                data=data('div .thumb-container a noscript')
                data.each((index,e)=>{
                    let url=cheerio.load(e)
                    url=url.text()
                    url=url.split('"')[1]
                    userinfo.say(url)
                })
            })
        } catch (error) {
            userinfo.say("沒這本,傻逼")
        }
}
};