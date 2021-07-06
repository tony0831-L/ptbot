const { Command } = require('discord.js-commando');
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
var NowDate=new Date();
var y=NowDate.getFullYear();mo=NowDate.getMonth();d=NowDate.getDate();h=NowDate.getHours();m=NowDate.getMinutes();s=NowDate.getSeconds();　
let str= y+"年"+mo+"月"+d+"日"+h+'時'+m+'分'+s+'秒';
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'find',
			group: 'findimg',
			memberName: 'find',
			description: '按照指令找要的本子,使用說明:!find 要找的東西 要幾本',
		});
	}
    async run(userinfo,message){
        let input=message.split(" "),url=input[0],maxpage=input[1],nowpage=0;
        console.log(maxpage)
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
                        data={
                            url:url,
                            img:img,
                            user:userinfo.author.username,
                            time:str
                        }
                        data=JSON.stringify(data)
                        arr.push(data)
                    })
                })
            }).on('complete',()=>{
                if (maxpage==undefined) {
                    userinfo.say("總共有"+arr.length+"本,你他媽要看多少本,傻逼")
                } else {
                    for(nowpage;nowpage<maxpage;nowpage++){
                        let url=JSON.parse(arr[nowpage])
                        userinfo.say(url.url)
                        userinfo.say(url.img)
                    }
                }
                let str="["+arr.toString()+"]"+"\n"
                fs.appendFile('test.txt',str, function (err) {
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