const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
  
  // File system operations
  fs: {
    readFile: (path, options) => fs.readFileSync(path, options),
    writeFile: (path, data) => fs.writeFileSync(path, data),
    existsSync: (path) => fs.existsSync(path),
    mkdirSync: (path) => fs.mkdirSync(path, { recursive: true }),
    // Add other fs methods as needed
  },
  
  // SMS functionality - exposed via IPC
  sms: {
    send: (number, message) => ipcRenderer.invoke('send-sms', { number, message }),
    // Add other SMS methods as needed
  },
  
  // Path utilities
  path: {
    join: (...args) => path.join(...args)
  }
}); 