(function main() {
  const createApp = function createApp() {
    const electron = require('electron');
    // Module to control application life.
    const {
      app,
    } = electron;
    // Module to create native browser window.
    const {
      BrowserWindow,
    } = electron;

    const displayConfig = require('./displayConfig');

    let win;

    const createWindow = function() {
      win = new BrowserWindow({
        width: displayConfig.x * displayConfig.res,
        height: displayConfig.y * displayConfig.res,
        resizable: false,
        frame: false
      });

      win.loadURL(`file://${__dirname}/index.html`);
      // win.webContents.openDevTools({mode:"detach"});

      win.on('closed', () => {
        win = null;
      });
    };

    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      process.exit(0);
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow();
      }
    });

    return {
      send: function(data) {
        if(win){
          try{
            win.webContents.send('info',data);
          } catch (e){
            console.log(e);
          }
        }
      }
    };
  };
  module.exports = createApp;
})();
