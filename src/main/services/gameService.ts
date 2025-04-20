import { sqliteDb } from '../database/database';
import { User } from '../database/models/userModel';
import { Game } from '../database/models/gameModel';
import { Library } from '../database/models/libraryModel';
import { Achievement } from '../database/models/achievementModel';
import WebTorrent from 'webtorrent';
import path from 'path';
import fs from 'fs';

const client = new WebTorrent();

export function initGameService() {
  // Setup IPC handlers for games
  ipcMain.handle('games:get-all', async () => {
    try {
      const games = await Game.findAll();
      return { success: true, games };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('games:get-by-id', async (event, id) => {
    try {
      const game = await Game.findByPk(id);
      return { success: true, game };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('games:download', async (event, { gameId, userId, torrentId }) => {
    try {
      const game = await Game.findByPk(gameId);
      if (!game) {
        return { success: false, error: 'Game not found' };
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const downloadPath = path.join(app.getPath('userData'), 'games', gameId);
      if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
      }

      client.add(torrentId, { path: downloadPath }, (torrent) => {
        torrent.on('download', (bytes) => {
          const progress = torrent.progress * 100;
          mainWindow?.webContents.send('game:download-progress', { gameId, progress });
        });

        torrent.on('done', async () => {
          await Library.create({ userId, gameId, installedPath: downloadPath });
          mainWindow?.webContents.send('game:download-complete', { gameId });
        });
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('games:get-library', async (event, userId) => {
    try {
      const library = await Library.findAll({ where: { userId }, include: [Game] });
      return { success: true, library };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}
