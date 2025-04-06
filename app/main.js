const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Add this to handle the SMS functionality
ipcMain.handle('send-sms', async (event, { number, message }) => {
  console.log(`Sending SMS to ${number}: ${message}`);
  // Implement your SMS sending logic here
  // Return result or success status
  return { success: true };
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,       // Allow require in renderer
      contextIsolation: false,     // Disable context isolation
      enableRemoteModule: true,    // Enable remote module
      devTools: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'))
    .catch(err => {
      console.error('Failed to load index.html:', err);
    });
    
  mainWindow.webContents.openDevTools();
  
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  ipcMain.on('show-context-menu', (event) => {
    const template = [
      { label: 'Cut', role: 'cut' },
      { label: 'Copy', role: 'copy' },
      { label: 'Paste', role: 'paste' },
      { type: 'separator' },
      { label: 'Select All', role: 'selectAll' }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}).catch(err => {
  console.error('Error during app initialization:', err);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); 