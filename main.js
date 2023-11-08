const { app, BrowserWindow, dialog } = require("electron");
const { setMainMenu } = require("./menu.js");

const createWindow = () => {
  const path = require("path");

  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    minHeight: 400,
    minWidth: 400,
    thickFrame: true,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  setMainMenu(mainWindow);
};

const trialStartDate = new Date();
const trialDuration = 3;

function isTrialExpired() {
  const currentDate = new Date();
  const elapsedTime = (currentDate - trialStartDate) / (1000 * 60 * 60 * 24);

  return elapsedTime > trialDuration;
}


app.whenReady().then(() => {
  const hrefDev = "https://solidsnk86.netlify.app";
  const devContact = "aquí";

  devContact.onclick = () => {
    window.open(hrefDev);
  };

  if (isTrialExpired()) {
    dialog.showErrorBox(
      "Versión de Prueba Expirada",
      `Lo siento, la versión de prueba ha expirado. Para seguir utilizando la aplicación, debes comprar una licencia. Contácta al desarrollador ${devContact} para más información.`
    );
    app.quit();
  } else {
    createWindow();
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

