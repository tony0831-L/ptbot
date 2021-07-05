const { Command } = require('discord.js-commando');
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'find',
			group: 'findimg',
			memberName: 'find',
			description: 'findimgby search',
		});
	}
    async run(userinfo,message){
        let url=message
        url= encodeURIComponent(url);
        url="https://nhentai.net/search/?q="+url
        console.log(url)
        console.log(userinfo.author.username)
        var arr=[]
        try {
            request(url, function (error, response, body) {
                let data=cheerio.load(response.body)
                data=data('div .cover')
                data.each((index,e)=>{
                    let url=cheerio.load(e)
                    let img=url('noscript')
                    url=e.attribs.href
                    url="https://nhentai.net"+url
                    img.each((index,ele)=>{
                        img=cheerio.load(ele)
                        img=img.text()
                        img=img.split('"')[1]
                        userinfo.say(url)
                        userinfo.say(img)
                        data={
                            url:url,
                            img:img
                        }
                        data=JSON.stringify(data)
                        arr.push(data)
                    })
                })
            }).on('complete',()=>{
                fs.appendFile('test.txt',arr.toString()+"\n", function (err) {
                    if (err)
                        console.log(err);
                    else
                        console.log('Append operation complete.');
                });
            })
        } catch (error) {
            userinfo.say("根本沒東西,傻逼")
        }

    }
};