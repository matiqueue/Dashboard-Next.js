const { app, BrowserWindow, screen } = require('electron');
const { join } = require('path');
const { spawn } = require('child_process');

// Funkcja do uruchamiania serwera Next.js
function runNextDev() {
  return new Promise((resolve, reject) => {
    const nextProcess = spawn('npm', ['run', 'dev'], {
      cwd: join(__dirname, '..'),
      stdio: 'inherit',
    });
    nextProcess.on('error', (err) => {
      reject(err);
    });
    nextProcess.on('close', (code) => {
      resolve(code);
    });
  });
}

// Utwórz okno dla aplikacji Elektron
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
  });

  mainWindow.loadURL('http://localhost:3000'); // Adres URL serwera Next.js
}

// Uruchom serwer Next.js i utwórz okno aplikacji Elektron
app.whenReady().then(() => {
  runNextDev().then(() => {
    createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
