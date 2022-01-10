Steam SFRA Logs
================

This package uses webdav to read recent sandbox log files and output them into your terminal to approximate live sever logging. Using the credentials of your dw.json.

Usage
-----
- Install package in sfra or cartridge root `npm install stream-sfra-logs`
- Add Script to your `package.json` file:
  ```json
  {
    ...
    "scripts" : {
      ...
      "logs": "stream-sfra-logs"
    }
  }
  ```
- Run script `npm run logs` to see near real time logging in terminal.

Features
--------
- **Log Prefixes**: defaults to [`warn`, `error`] but you can set any log prefixes with the `--log-prefixes` variable in the script like so:
  ```json
  {
    ...
    "scripts" : {
      ...
      "logs": "stream-sfra-logs --log-prefixes warn error custom"
    }
  }
  ```
