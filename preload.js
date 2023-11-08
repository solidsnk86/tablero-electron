const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("tableroAPI", {
  onUpdateTheme: (callback) => ipcRenderer.on("update-theme", callback),
});
