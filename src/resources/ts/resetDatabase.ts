const { sequelize } = require('./database');
import fs from 'fs-extra';
import path from 'path';

async function resetDatabase() {
  try {
    await sequelize.drop();
    console.log('All tables dropped.');

    await sequelize.sync();
    console.log('All tables synced.');

    const userContentDir = path.join(__dirname, '../../assets/user-content');

    await fs.emptyDir(userContentDir);
    console.log('All files in user-content directory removed.');

  } catch (error) {
    console.error('Error resetting the database:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();