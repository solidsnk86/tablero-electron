const { app, Menu, dialog, BrowserWindow } = require("electron");

const setMainMenu = (mainWindow) => {

  function createAboutWindow() {
   const aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    center: true,
    darkTheme: true,
    frame: false,
    resizable: false,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: false,
    },
    title: 'Acerca de',
   })
   aboutWindow.loadFile('./templates/about.html')
  }

  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Subir Imagen Logo',
          click: () => {
            dialog.showOpenDialog(mainWindow, {
              filters: [
                {
                  name: 'Image',
                  extensions: ['jpg', 'png', 'svg']
                }
              ],
              title: 'Selecciona una imagen para el logo del club.',
              defaultPath: '~/tmp',
              properties: ['openFile', 'cancel']
            })
          }
        },
        { type: 'separator' },
        {
          label: "Salir",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Vista",
      submenu: [
        {
          label: "Recargar",
          role: "reload",
        },
        {
          label: "Forzar Reinicio",
          role: "forceReload",
        },
        {
          label: "Opciones de Desarrollador",
          role: "toggleDevTools",
        },
        { type: "separator" },
        {
          label: "Reiniciar Zoom",
          role: "resetZoom",
        },
        {
          label: "+ Zoom",
          role: "zoomIn",
        },
        {
          label: "- Zoom",
          role: "zoomOut",
        },
        { type: "separator" },
        {
          label: "Pantalla completa",
          role: "togglefullscreen",
        },
      ],
    },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Licencia del Producto",
          click: () => {
            dialog.showMessageBox(mainWindow, {BrowserWindow}, {
              title: 'Introduce tu licencia',
              message: 'Intrude una licencia válida:',
              buttons: ['OK'],
            });
          }
        },
        {
          label: "Configurar Wifi",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://neotecs.netlify.app/");
          },
        },
        {
          label: 'Acerca',
          click: () => { 
            createAboutWindow()        
          }
        }
      ],
    },
    {
      label: "Temas",
      submenu: [
        {
          label:"Light",
          click: () => {
            mainWindow.webContents.send("update-theme", "light")
          },
        },
        { type: "separator" },
        {
          label: "Dark",
          click: () => {
            mainWindow.webContents.send("update-theme", "dark")
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  setMainMenu,
};
