// what is nodejs ?
//     Node js is an open-source , cross plateform javascript runtime environment that allows developer to execute javascipt code outside , of webserver

// Nodejs run on server not browser


// diff between nodejs , vanillajs
// 1) Node run on server not browser
// 2) Console is in terminal window
// console.log("Hello World !");

// 3) Global object instead of window object
// console.log(global)

// 4) has common core module that will explore
// 5) commonJS module instead of ES6 module
// 6) Missing some JS APIs like fetch 


// const os = require('os')
// const path = require('path')

//it is without destructuring
// const math = require('./math')   
// console.log(math.add(2,4));


// it is with destructuring
const {add , subtract, multiply ,divide} = require('./math')
console.log('add =>',add(2,9));
console.log('subtract =>', subtract(9,2));
console.log('multiply =>', multiply(9,2));
console.log('divide =>', divide(9,2));

// console.log('os.type() ====> ',os.type());
// console.log('os.version() ====> ',os.version());
// console.log('os.homedir() ====> ',os.homedir());
// console.log('__diname ====> ',__dirname);
// console.log('__filename ====> ',__filename);

// console.log("path.dirname(__filename) ===> " , path.dirname(__filename) )
// console.log("path.extname(__filename) ===> " , path.extname(__filename))
// console.log("path.basename(__filename) ===> " , path.basename(__filename))

// console.log("path.parse(__filename) ===> " , path.parse(__filename))