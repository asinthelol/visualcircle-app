"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize"); // Used instead of mySQL because of ER_NOT_SUPPORTED_AUTH_MODE error.
var dotenv = require("dotenv");
dotenv.config();
// Load environment variables.
var env = {
    DB: process.env.DB || 'your_db', // Set a default if missing.
    DB_HOST: process.env.DB_HOST || 'your_host',
    DB_USER: process.env.DB_USER || 'you_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'your_password',
    DB_DIALECT: process.env.DB_DIALECT || 'your_dialect',
};
// Change these to your database settings.
var sequelize = new sequelize_1.Sequelize(env.DB, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false
});
// If not already there, creates an images table for your database.
var ImagesTable = sequelize.define('images', {
    image_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_name: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
    },
    artist: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
    },
    image_source: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    file_source: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
    },
}, {
    timestamps: false,
});
module.exports = { sequelize: sequelize, ImagesTable: ImagesTable };
