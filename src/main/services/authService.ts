import { sqliteDb } from '../database/database';
import { User } from '../database/models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

export function initAuthService() {
  // Setup IPC handlers for auth
  ipcMain.handle('auth:register', async (event, { username, email, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        balance: 0,
        isAdmin: false,
      });
      
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      return { success: true, token, user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('auth:login', async (event, { email, password }) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, error: 'Invalid credentials' };
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      return { success: true, token, user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('auth:validate-token', async (event, token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}
