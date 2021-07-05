const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
let url='https://nhentai.net/search/?q=%E6%9D%B1%E6%96%B9'

// request(url, function (error, response, body) {
//     let data=cheerio.load(response.body)
//     data=data('div .cover')
//     data.each((index,e)=>{
//         let url=cheerio.load(e)
//         let img=url('noscript')
//         url=e.attribs.href
//         url="https://nhentai.net"+url
//         img.each((index,ele)=>{
//             img=cheerio.load(ele)
//             img=img.text()
//             img=img.split('"')[1]
//             console.log(url)
//             data={
//                 url:url,
//                 img:img
//             }
//             data=JSON.stringify(data)
//         })
//     })
// })
//url='東方'
url='TouHou'
var strTemp = encodeURIComponent(url);
console.log(strTemp)