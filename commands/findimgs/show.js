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
			description: '按照指令觀看要的本子,使用說明:!show 車號 要幾頁',
		});
	}
    async run(userinfo,message){
        let input=message.split(" "),url=input[0],maxpage=input[1],nowpage=0;
        console.log(maxpage)
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
                    arr.push(url)
                })
            }).on("complete",()=>{
                if(maxpage==undefined){
                    userinfo.say("總共有"+arr.length+"頁,你他媽要看多少頁,傻逼")
                }else{
                    for(nowpage;nowpage<maxpage;nowpage++){
                        userinfo.say(arr[nowpage])
                    }
                }
            })
        } catch (error) {
            userinfo.say("沒這本,傻逼")
        }
}
};