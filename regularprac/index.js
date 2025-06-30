// // for Reading file

// const fs = require("fs");
// const path = require("path");

// // fs.readFile('./files/starter.txt' , (err , data) => {
// //     if (err) throw err;
// //     console.log(data.toString());
// // })

// // or

// // fs.readFile('./files/starter.txt' , 'utf8',(err , data) => {
// //     if (err) throw err;
// //     console.log(data);
// // })

// // exit on uncaught errors

// // process.on('uncaughtException', err => {
// //     console.error(`There was an uncaught error: ${err}`);
// //     process.exit(1)
// // })

// // or

// // fs.readFile(
// //   path.join(__dirname, "files", "starter.txt"),
// //   "utf8",
// //   (err, data) => {
// //     if (err) throw err;
// //     console.log(data, "readdata");
// //   }
// // );

// // // write in  file
// // fs.writeFile(
// //   path.join(__dirname, "files", "reply.txt"),
// //   "Nice to meet you !!",
// //   (err) => {
// //     if (err) throw err;
// //     console.log("data");

// //     fs.appendFile(
// //       path.join(__dirname, "files", "reply.txt"),
// //       "coming soon ....",
// //       (err) => {
// //         if (err) throw err;
// //         console.log("append complete");
// //       }
// //     );
// //   }
// // );

// // add content to existing file
// // fs.appendFile(
// //   path.join(__dirname, "files", "reply.txt"),
// //   "Thank You!!",
// //   (err) => {
// //     if (err) throw err;
// //     console.log("data");
// //   }
// // );

// // console.log("hello...");

// // process.on("uncaughtException", (err) => {
// //   console.error(`There was an uncaught error: ${err}`);
// //   process.exit(1);
// // });

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data, "readFile complete");
//   }
// );

// // write in  file
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you !!",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "coming soon ....",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log('rename complete');
//           }
//         );
//       }
//     );
//   }
// );

// in Node how can we manage flow

const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async() => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
        path.join(__dirname,'files', "promise.txt"),
        "okk thank you fore coming"
    )
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promise.txt"),
      "okk thank you fore coming"
    );
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// fs.readFile("./files/starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });


