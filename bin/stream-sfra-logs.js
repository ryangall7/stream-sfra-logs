#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
  .usage("Usage: $0 <command> [options]")
  .command(require("../modules/stream-logs.js"))
  .help()
  .argv

console.log("hello")
