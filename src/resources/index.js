"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var expressApp = require('./server.js');
var db = require('./database.js');
// Make sure to change the port the expressApp is listening to.
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        minWidth: 1024,
        minHeight: 768,
        center: true,
    });
    win.maximize();
    expressApp.listen(3000, function () {
        console.log("Express server listening on port 3000!");
        win.loadFile('src/views/home/index.html');
    });
};
// If all goes well, synchronize Images table from database and creates a new window.
electron_1.app.whenReady().then(function () {
    db.ImagesTable.sync().catch(function (err) {
        console.error('Error syncing ImagesTable:', err);
    });
    ;
    createWindow();
    // No windows open, open a new one.
    electron_1.app.on('activate', function () { if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    } });
});
// (Works on Windows & Linux) quit application when all windows closed.
electron_1.app.on('window-all-closed', function () { if (process.platform !== 'darwin') {
    electron_1.app.quit();
} });
