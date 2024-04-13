// Imports!

import { config } from "dotenv";
config();

import express = require("express");
import { Request } from "express";
import multer = require("multer");

type FileNameCallback = (error: Error | null, filename: string) => void;

const db = require("./database.js");

import path = require("path");

// The stuff I care about starts here
const app = express();

// Make sure to change the allowed domain.
const allowedOrigins = ["http://127.0.0.1:3000/"];

// Allows allowedOrigins, to send http requests.
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.header("Origin");

    if (origin && allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    next();
  },
);

declare module "express" {
  interface Request {
    imageId?: string;
  }
}

const storage = multer.diskStorage({
  destination: "./src/assets/user-content",
  filename: async function (
    req: express.Request,
    file: Express.Multer.File,
    cb: FileNameCallback,
  ) {
    try {
      const imageName = req.body.image_name.trim();
      const artistName = req.body.artist_name.trim();
      const imageSource = req.body.image_source.trim();

      if (!imageName || !artistName || !imageSource) {
        throw new Error("Missing required fields in request body.");
      }

      // Save image information to the database.
      const savedImage = await db.ImagesTable.create({
        image_name: imageName,
        artist: artistName,
        image_source: imageSource,
      });

      const filename = savedImage.image_id + path.extname(file.originalname); // e.g. 1.png.
      await savedImage.update({
        file_source: `../../assets/user-content/${filename}`,
      });

      cb(null, filename);
    } catch (err) {
      console.error("Failed saving image:", err);
    }
  },
});

// Multer instance. Will be useful later.
const upload = multer({ storage: storage });

// TO parse json data
app.use(express.json());

// Fetches all images from the database.
async function getImages() {
  return await db.ImagesTable.findAll();
}

app.get("/api/images", async (req, res) => {
  try {
    const imageData = await getImages();
    res.send(imageData);
  } catch (err) {
    console.error("Failed sending images to client:", err);
    res.status(500).json({ error: "Failed sending images to client." });
  }
});

// Uploads image to the database and writes the file.
app.post("/api/upload", upload.single("image"), async (req: Request, res) => {
  try {
    if (!req) {
      return res
        .status(400)
        .json({ error: "Missing required fields in request body." });
    }

    res.status(200).json({ message: "Image upload successful." });
  } catch (err) {
    console.error("Image upload failed:", err);
    res.status(500).json({ error: "Image upload failed." });
  }
});

// Server-side check for input validation.
interface ValidateRequest {
  type: string;
  data: string;
}

app.post("/api/validate", (req: Request, res) => {
  try {

    const requestBody: ValidateRequest = req.body;
    const inputType = requestBody.type;
    const inputData = requestBody.data;

    switch (inputType) {
      case "titleInput":
        if (inputData.length > 32 || inputData.length === 0) {
          res.status(400).json({ error: "Title field must be less than 32 characters and not empty." });
        } else {
          res.status(200).json({ message: "Title field is valid." });
        }
        break;
      case "artistInput":
        if (inputData.length > 32 || inputData.length === 0) {
          res.status(400).json({ error: "Artist field must be less than 32 characters and not empty." });
        } else {
          res.status(200).json({ message: "Artist field is valid." });
        }
        break;
      case "sourceInput":
        if (inputData.length > 2048 || inputData.length === 0) {
          res.status(400).json({ error: "Source field must be less than 2048 characters and not empty." });
        } else {
          res.status(200).json({ message: "Source field is valid." });
        }
        break;
      case "fileInput":
        if (!req.files || req.files.length === 0) {
          res.status(400).json({ error: "No file input found." });
        } else {
          res.status(200).json({ message: "File input is valid." });
        }
        break;
      default:
        res.status(400).json({ error: "Invalid input type." });
        break;
    }
  } catch (err) {
    console.error("Failed validating input:", err);
    res.status(500).json({ error: "Failed validating input." });
  }
});

// Test database connection.
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: Error) => {
    console.error("Failed to connect to the database:", err);
  });

module.exports = app;
