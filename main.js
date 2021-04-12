const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')

const rectangle = {
    width: 1000,
    height: 600
}

function createWindow () {
  const win = new BrowserWindow({
    ...rectangle,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  createBrowserView(win)
}

function createBrowserView(win) {
    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({
        x: 0,
        y: 0,
        ...rectangle,
    })
    view.setAutoResize({
        width: true,
        height: true,
        horizontal: true,
        vertical: true,
    })
    view.webContents.loadURL('https://codepen.io')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})