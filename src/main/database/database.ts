import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { initUserModel } from './models/userModel';
import { initGameModel } from './models/gameModel';
import { initLibraryModel } from './models/libraryModel';
import { initAchievementModel } from './models/achievementModel';
import dotenv from 'dotenv';

dotenv.config();

const sqlitePath = path.join(app.getPath('userData'), 'store-of-holly.sqlite');
const sqliteDb = new Sequelize({
  dialect: 'sqlite',
  storage: sqlitePath,
  logging: false,
});

let mongoDb: typeof mongoose | null = null;

export async function initDatabase() {
  try {
    // Initialize SQLite models
    await initUserModel(sqliteDb);
    await initGameModel(sqliteDb);
    await initLibraryModel(sqliteDb);
    await initAchievementModel(sqliteDb);
    
    // Sync SQLite database
    await sqliteDb.sync();

    // Connect to MongoDB
    if (process.env.MONGO_URI) {
      mongoDb = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } else {
      console.warn('MONGO_URI not set, skipping MongoDB connection');
    }
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
}

export { sqliteDb, mongoDb };
