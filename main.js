const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', () => {
  let win = new BrowserWindow({width: 1000, height: 800, resizable: false, frame: false});
  win.loadURL(`file://${__dirname}/index.html`);
})
