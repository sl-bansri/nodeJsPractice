const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const LogEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:MM:SS")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem, "logitem");
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = LogEvents;
