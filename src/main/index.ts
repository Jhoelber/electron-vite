import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, Menu, app, ipcMain, shell } from 'electron'
import fs from 'fs/promises'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'

let mainWindow

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: true
    }
  })

  const template = []
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()
      addNavigationButtons(mainWindow)
      checkInternetConnection()
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    if (mainWindow) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    }
  } else {
    if (mainWindow) {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  mainWindow.webContents.session.on('will-download', (_, item) => {
    const fileName = item.getFilename()
    const fullPath = path.join(app.getPath('downloads'), fileName)
    item.setSavePath(fullPath)


    item.on('done', async (_, state) => {
      if (state === 'completed') {
        try {
          await fs.access(fullPath)
          abrirPDF(fullPath)
        } catch (error) {
          console.error('O arquivo PDF não foi encontrado:', error)
        }
      } else {
        console.error(`Download falhou: ${state}`)
      }
    })
  })
}

async function abrirPDF(caminhoDoPDF: string) {
  const pdfWindow = new BrowserWindow({ width: 800, height: 600 })
  pdfWindow.loadURL(`file://${caminhoDoPDF}`)
}

function addNavigationButtons(mainWindow) {
 

const url = mainWindow.webContents.getURL()
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

  if (url == 'http://localhost:5173/') {

    mainWindow.webContents.insertCSS(`
      .navigation-buttons {
        display: none;
      }



    `)
  } else {
    mainWindow.webContents.insertCSS(`
    body::before {
      content:'';
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

    `)

    mainWindow.webContents.executeJavaScript(`

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



          function goBackToStart() {
            history.go(-(history.length)+1);
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
    `)
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
  `
  const onlineScript = `
    const offlineMessage = document.getElementById('offline-message');
    if (offlineMessage) {
      offlineMessage.remove();
      location.reload();
    }

    // Recria os botões de navegação
    addNavigationButtons();
  `
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
  `)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  createWindow()


  app.on('activate', function () {
    if (!mainWindow) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
