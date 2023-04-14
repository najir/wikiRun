const { app, BrowserWindow, ipcMain, remote, Menu, MenuItem, ipcRenderer } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
const menuTemplate = [
  {
     label: 'Edit',
     submenu: [
        {
           role: 'undo'
        },
        {
           role: 'redo'
        },
        {
           type: 'separator'
        },
        {
           role: 'cut'
        },
        {
           role: 'copy'
        },
        {
           role: 'paste'
        }
     ]
  },
  {
     label: 'View',
     submenu: [
        {
           role: 'reload'
        },
        {
           role: 'toggledevtools'
        },
        {
           type: 'separator'
        },
        {
           role: 'resetzoom'
        },
        {
           role: 'zoomin'
        },
        {
           role: 'zoomout'
        },
        {
           type: 'separator'
        },
        {
           role: 'togglefullscreen'
        }
     ]
  },
  {
     role: 'window',
     submenu: [
        {
           role: 'minimize'
        },
        {
           role: 'close'
        }
     ]
  },
  {
     role: 'help',
     submenu: [
        {
           label: 'Learn More'
        }
     ]
  },
  {
    label: 'Set IP',
    click(){
    menuIpSet();
    }
  }
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

let win
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.setTitle('wikiRun');
    win.loadFile('empty.html')
  }

  const createChildWindow = () => {
    const childWindow = new BrowserWindow({
      width: 800,
      height: 300,
      parent: win,
      show: false,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    childWindow.removeMenu();
    childWindow.setTitle('ipSet');
    childWindow.loadFile('ipPage.html');

    childWindow.once("ready-to-show", () => {
      childWindow.show();
    });
  }

  ipcMain.on("openChildWindow", (event, arg) => {
    createChildWindow();
  });

  function menuIpSet(){
    createChildWindow();
  }

  ipcMain.on("ipLoad", (event, arg) => {
    win.loadURL(store.get('ipaddress'))
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  })

  app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    if(store.get('ipaddress') == null){
      createChildWindow();
      console.log(store.get('ipaddress'))
    }
  })
  

  