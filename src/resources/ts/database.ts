import { Sequelize, DataTypes, Dialect } from "sequelize"; // Used instead of mySQL because of ER_NOT_SUPPORTED_AUTH_MODE error.
import * as dotenv from "dotenv";
dotenv.config();

// Load environment variables.
const env = {
  DB: process.env.DB || "your_db", // Set a default if missing.
  DB_HOST: process.env.DB_HOST || "your_host",
  DB_USER: process.env.DB_USER || "you_user",
  DB_PASSWORD: process.env.DB_PASSWORD || "your_password",
  DB_DIALECT: process.env.DB_DIALECT || "your_dialect",
};

// Change these to your database settings.
const sequelize = new Sequelize(env.DB, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT as Dialect,
  logging: false,
});

// If not already there, creates an images table for your database.
const ImagesTable = sequelize.define(
  "images",
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_name: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    image_source: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    file_source: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = { sequelize, ImagesTable };
