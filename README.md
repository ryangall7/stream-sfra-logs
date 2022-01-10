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
