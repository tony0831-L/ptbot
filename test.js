const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
var NowDate=new Date();
var y=NowDate.getFullYear();mo=NowDate.getMonth();d=NowDate.getDate();h=NowDate.getHours();m=NowDate.getMinutes();s=NowDate.getSeconds();　
let str= y+"年"+mo+"月"+d+"日"+h+'時'+m+'分'+s+'秒';
let url="https://nhentai.net/",maxpage=10;
var arr=[]
try {
    request(url, function (error, response, body) {
        let data=cheerio.load(response.body),nowpage=0;
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
                    user:"tony0831",
                    time:str
                }
                data=JSON.stringify(data)
                arr.push(data)
                if(nowpage==maxpage){
                    throw new Error("到點了")
                }else{
                    console.log("not")
                    nowpage+=1;
                }
            })
        })
    }).on('complete',()=>{
        let str="["+arr.toString()+"]"+"\n"
        fs.appendFile('test1.txt',str, function (err) {
            if (err)
                console.log(err);
            else
                console.log('Append operation complete.');
        });
    })
} catch (error) {
    throw error
}

