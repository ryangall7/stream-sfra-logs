const { createClient } = require("webdav");
const moment = require("moment")

exports.getClient = (config) => {

  const client = createClient(
    "https://" + config.hostname + "/on/demandware.servlet/webdav/Sites/Logs",
    {
        username: config.username,
        password: config.password
    }
  );

  return client;

}


exports.getLogFiles = async (client, prefixes) => {

  const directoryItems = await client.getDirectoryContents("/");

  const date = moment().utc().format("YYYYMMDD");

  const fileNames = prefixes.map((prefix) => {
    return prefix + "-ecom" + directoryItems[0].basename.split("ecom")[1].split("appserver")[0] + "appserver-" + date + ".log";
  });

  return fileNames;
}


exports.getLogsFromFile = async (client, fileName, lastTime) => {

  const stream = client.createReadStream(fileName);
  const result = await streamToString(stream);

  const delimiterPattern = /^(\[(?:\d|-|\s|:|\.)*GMT\])/gm;
  const logArray = result.split( delimiterPattern );

  const newLogs = [];

  for ( var i = 0; i < logArray.length; i++ ) {
    var token = logArray[i];
  	if ( delimiterPattern.test( token ) ) {
      const timeString = token.replace(/\[|\]/g, "");
      const log = logArray[i + 1];
      const logLevelMatch = log.match(/^\s*([\w\-]+)/);
      let level = "INFO";
      if(logLevelMatch.length > 1){
        level = logLevelMatch[1];
      }

      const logTime = moment(timeString);

      if(logTime.diff(lastTime) > 0){;
        newLogs.push({
          time:token,
          log:log,
          level: level
        });
      }
  	}
  }

  return newLogs;

}


function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}
