import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';
import log from 'electron-log';

export function initUpdateService() {
  // Настройка логгирования
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';

  // Проверка обновлений каждые 2 часа
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 2 * 60 * 60 * 1000);

  // IPC-каналы для интерфейса
  ipcMain.handle('check-for-updates', async () => {
    return await autoUpdater.checkForUpdates();
  });

  ipcMain.handle('restart-and-install', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('update:available', info);
  });

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow?.webContents.send('update:downloaded', info);
  });

  // Первая проверка при запуске
  autoUpdater.checkForUpdatesAndNotify();
}