"use strict";
const utils = require("@electron-toolkit/utils");
const electron = require("electron");
const fs = require("fs/promises");
const path = require("path");
const icon = path.join(__dirname, "../../resources/icon.png");
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: true
    }
  });
  const template = [];
  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
  mainWindow.on("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
      addNavigationButtons(mainWindow);
      checkInternetConnection();
    }
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    if (mainWindow) {
      mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    }
  } else {
    if (mainWindow) {
      mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
    }
  }
  mainWindow.webContents.session.on("will-download", (_, item) => {
    const fileName = item.getFilename();
    const fullPath = path.join(electron.app.getPath("downloads"), fileName);
    item.setSavePath(fullPath);
    item.on("done", async (_2, state) => {
      if (state === "completed") {
        try {
          await fs.access(fullPath);
          abrirPDF(fullPath);
        } catch (error) {
          console.error("O arquivo PDF não foi encontrado:", error);
        }
      } else {
        console.error(`Download falhou: ${state}`);
      }
    });
  });
}
async function abrirPDF(caminhoDoPDF) {
  const pdfWindow = new electron.BrowserWindow({ width: 800, height: 600 });
  pdfWindow.loadURL(`file://${caminhoDoPDF}`);
}
function addNavigationButtons(mainWindow2) {
  const isLoginPage = mainWindow2.webContents.getURL().startsWith("file://" + path.join(__dirname, "login.html"));
  const isHomePage = mainWindow2.webContents.getURL().startsWith("file://" + path.join(__dirname, "index.html"));
  electron.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
  if (isLoginPage || isHomePage) {
    mainWindow2.webContents.insertCSS(`

      .navigation-buttons {
        display: ;
      }

    `);
  } else {
    mainWindow2.webContents.insertCSS(`
    body::before {
      content: '';
      display: block;
      height: 60px;
      overflow-x: hidden;
    }

    body::-webkit-scrollbar {
      display: none;
    }
      .navigation-buttons {

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        padding: 10px;
        z-index: 9999;
        border: none;
      }
      .navigation-buttons button {
        margin-right: 10px;
        margin-left: 10px;
      }
    `);
    mainWindow2.webContents.executeJavaScript(`
      if (!document.getElementById('navigation-container')) {
        const navigationContainer = document.createElement('div');

        navigationContainer.id = 'navigation-container';
        navigationContainer.className = 'navigation-buttons';

        const backButton = document.createElement('button');
        backButton.innerText = 'Voltar';
        backButton.style.cssText = 'background-color: #eee; border: 0.5px solid #ccc; border-radius: 7px; color: black; gap: 10px; margin-right: 5px; padding:8px; font-size: 12px;';

        backButton.addEventListener('click', () => {
          if (history.length > 1) {
            window.history.back();
          }
        });

        navigationContainer.appendChild(backButton);

        const sairButton = document.createElement('button');
        sairButton.innerText = 'sair';
        sairButton.style.cssText = 'background-color: #eee; border: 0.5px solid #ccc; border-radius: 7px; color: black; gap: 10px; margin-right: 2em; padding:8px; font-size: 12px;';
        sairButton.addEventListener('click', () => {

         const historico = history.length;
         console.log(historico);

          function goBackToStart() {

            history.go(-(historico)+1);
        }
        goBackToStart()
        });
        navigationContainer.appendChild(sairButton);

        document.body.appendChild(navigationContainer);

        if (
            window.location.href.includes('https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao.asp') ||
            window.location.href.includes('https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Comprovante.asp') ||
            window.location.href.includes('https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_qsa.asp')
        ) {
            navigationContainer.style.cssText = 'margin-top: 70px; z-index: 9999;';
        }
      }
    `);
  }
}
function checkInternetConnection() {
  const offlineMessageScript = `
    const offlineMessage = document.createElement('div');
    offlineMessage.innerHTML = '<div style="display: flex; align-items: center;"><span>Sem Internet</span></div>';
    offlineMessage.style.color = 'white';
    offlineMessage.style.background = 'rgba(0, 0, 0, 0.8)';
    offlineMessage.style.padding = '20px';
    offlineMessage.style.borderRadius = '10px';
    offlineMessage.style.position = 'fixed';
    offlineMessage.style.top = '50%';
    offlineMessage.style.left = '50%';
    offlineMessage.style.transform = 'translate(-50%, -50%)';
    offlineMessage.style.fontSize = '24px';
    offlineMessage.style.fontWeight = 'bold';
    offlineMessage.style.textAlign = 'center';
    offlineMessage.style.zIndex = '9999';
    offlineMessage.id = 'offline-message';
    document.body.appendChild(offlineMessage);
  `;
  const onlineScript = `
    const offlineMessage = document.getElementById('offline-message');
    if (offlineMessage) {
      offlineMessage.remove();
      location.reload();
    }

    // Recria os botões de navegação
    addNavigationButtons();
  `;
  mainWindow?.webContents.executeJavaScript(`
    window.addEventListener('online', () => {
      ${onlineScript}
    });

    window.addEventListener('offline', () => {
      ${offlineMessageScript}
    });

    if (!navigator.onLine) {
      ${offlineMessageScript}
    }
  `);
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (!mainWindow) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
