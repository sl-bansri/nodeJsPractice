const fs = require("fs");
const path = require("path");

// read file
fs.readFileSync;
fs.readFile(path.join(__dirname, "prac", "rev1.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data, "read rev1File");

  //write file

  fs.writeFile(
    path.join(__dirname, "prac", "addprac.txt"),
    "welcome to the dreamland",
    (err) => {
      if (err) throw err;
      console.log("writefile");

      //read new file

      fs.readFile(
        path.join(__dirname, "prac", "addprac.txt"),
        "utf8",
        (err, data) => {
          if (err) throw err;
          console.log(data, "addfiledata read");

          //add data in existing file

          fs.appendFile(
            path.join(__dirname, "prac", "addprac.txt"),
            "\n\n you have done it",
            (err, data) => {
              if (err) throw err;
              console.log("append in addprac");

              //rename file
              fs.rename(
                path.join(__dirname, "prac", "addprac.txt"),
                path.join(__dirname, "prac", "nameupdate.txt"),
                (err) => {
                  if (err) throw err;
                  console.log("rename in addprac");
                }
              );
            }
          );
        }
      );
    }
  );
});

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

// with promises to perform operation in asynchronous process

// const fsPromise = require("fs").promises;
// const path = require("path");

// const fileOps = async () => {
//   try {
//     const data = await fsPromise.readFile(
//       path.join(__dirname, "prac", "rev1.txt"),
//       "utf8"
//     );
//     console.log(data, "read with async-await");
//     await fsPromise.writeFile(
//       path.join(__dirname, "prac", "asyncFile.txt"),
//       "here is the example of async-await"
//     );
//     const newdata = await fsPromise.readFile(
//       path.join(__dirname, "prac", "asyncFile.txt"),
//       "utf8"
//     );
//     console.log(newdata, "\n asyncFie.txt read");
//     await fsPromise.appendFile(
//       path.join(__dirname, "prac", "asyncFile.txt"),
//       "\n\nnow we have append some more lines in it "
//     );
//     const updatedata = await fsPromise.readFile(
//       path.join(__dirname, "prac", "asyncFile.txt"),
//       "utf8"
//     );
//     console.log(updatedata, "\n updated  asyncFie.txt read");
//     await fsPromise.rename(
//       path.join(__dirname, "prac", "asyncFile.txt"),
//       path.join(__dirname, "prac", "updateasyncFile.txt")
//     );
//     const renamedata = await fsPromise.readFile(
//       path.join(__dirname, "prac", "updateasyncFile.txt"),
//       "utf8"
//     );
//     console.log(renamedata, "\n update updateasyncFile.txt read");
//   } catch (err) {
//     console.error(err);
//   }
// };

// fileOps();
