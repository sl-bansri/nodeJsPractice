// create directory

const fs = require('fs')
if(!fs.existsSync('./newexample'))  {
    fs.mkdir('./newexample',(err) => {
        if (err) throw err;
        console.log('Directory created');
    })
}


//  remove directory

if(fs.existsSync('./newexample')) {
    fs.rmdir("./newexample", (err) => {
      if (err) throw err;
      console.log("Directory created");
    });
}
