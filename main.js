const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let win;
const index = `file://${__dirname}/index.html`

function createWindow() {
  win = new BrowserWindow({width: 1000, height: 800, resizable: false, frame: false});
  win.loadURL(index);

  win.on('closed', () => {
    win = null;
  })
}
app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
})
