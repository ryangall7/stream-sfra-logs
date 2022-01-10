const getConfig = require("../helpers/getConfig.js");
const { getClient, getLogFiles, getLogsFromFile } = require("../helpers/webdav.js");
const moment = require("moment");
const chalk = require("chalk");

exports.command = '*'

exports.describe = 'Deploy shopify theme (default is development)'

exports.builder = {
  "log-prefixes": {
    default: ['error', 'warn'],
    alias: "p"
  }
}

exports.handler = async function (argv) {

  const config = getConfig();
  console.log(argv["log-prefixes"]);

  client = getClient(config);
  const logFiles = await getLogFiles(client, argv["log-prefixes"]);


  const lastTime = moment().subtract(5, 'minutes').utc();

  await recusivlyCheckLogs(client, logFiles, lastTime);

}

const recusivlyCheckLogs = async (client, logFiles, lastTime) => {

  await sleep(2000);
  const nextTime = moment().utc();
  let logs = [];
  for(var i=0; i < logFiles.length; i++){
     const newLogs = await getLogsFromFile(client, logFiles[i], lastTime)
     logs = logs.concat(newLogs);
  }

  logs.sort((a, b) => b.time - a.time);

  for(var i=0; i<logs.length; i++){
    const logObject = logs[i];
    switch(logObject.level){
      case "ERROR":
        console.log(chalk.red(logObject.time + logObject.log));
        break;
      case "WARN":
        console.log(chalk.yellow(logObject.time + logObject.log));
        break;
      case "DEBUG":
        console.log(chalk.green(logObject.time + logObject.log));
        break;
      default:
        console.log(logObject.time + logObject.log);
        break;
    }
  }

  recusivlyCheckLogs(client, logFiles, nextTime);

}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
