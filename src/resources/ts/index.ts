import { app, BrowserWindow } from "electron";
const expressApp = require("./server.js");
const db = require("./database.js");

// Make sure to change the port the expressApp is listening to.
const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    center: true,
  });

  win.maximize();

  expressApp.listen(3000, () => {
    console.log("Express server listening on port 3000!");
    win.loadFile("src/views/home/index.html");
  });
};

// If all goes well, synchronize Images table from database and creates a new window.
app.whenReady().then(() => {
  db.ImagesTable.sync().catch((err: Error) => {
    console.error("Error syncing ImagesTable:", err);
  });

  createWindow();

  // No windows open, open a new one.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// (Works on Windows & Linux) quit application when all windows closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
