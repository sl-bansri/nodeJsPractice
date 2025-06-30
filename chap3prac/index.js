const LogEvents = require("./LogEvents");
const EventsEmitter = require("events");

class MyEmitter extends EventsEmitter {}

// initiall object
const myEmitter = new MyEmitter();

// add listener for event log

myEmitter.on("log", (msg) => LogEvents(msg));

setTimeout(() => {
  myEmitter.emit("log", "log event emitted");
}, 2000);
