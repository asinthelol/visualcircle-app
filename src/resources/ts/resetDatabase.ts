const { sequelize, ImagesTable } = require('./database');

async function resetDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database has been reset.");
  } catch (error) {
    console.error("Error resetting the database:", error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();