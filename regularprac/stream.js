// const fs = require('fs');
// const rs = fs.createReadStream('./files/loream.txt', {encoding:'utf8'})
// const ws = fs.createWriteStream('./files/newlorem.txt')

// rs.on('data', (datachunk) => {
//     ws.write(datachunk)
// })

// or 
// using pipe for read&write 


const fs = require("fs");
const rs = fs.createReadStream("./files/loream.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./files/newlorem.txt");

rs.pipe(ws)
