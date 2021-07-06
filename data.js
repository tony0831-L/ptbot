const fs = require("fs");
var data = fs.readFileSync('test1.txt', 'utf8');
data=data.split('\n')
for(let i=0;i<data.length-1;i++){
    let target=JSON.parse(data[i])
    for(let j=0;j<target.length;j++){
        console.log(target[j].url)
        console.log(target[j].img)
        console.log(target[j].user)
        console.log(target[j].time)
    }
}


