import { config } from "dotenv";
import express = require("express");
import { Request, Response, NextFunction } from "express";
import multer = require("multer");
import cors = require("cors");
import path = require("path");
config();

const db = require("./database.js");

const app = express();

// CORS configuration.
// Make sure to change the allowed domain.
const allowedOrigins = ["http://127.0.0.1:3000/"];
const corsOptions: cors.CorsOptions = { origin: allowedOrigins };
app.use(cors(corsOptions));

type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: "./src/assets/user-content",
  filename: async function (
    req: Request,
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

const upload = multer({ storage });

app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Fetches all images from the database.
async function getImages() {
  return await db.ImagesTable.findAll();
}

app.get("/api/images", async (req, res, next) => {
  try {
    const data = await getImages();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

// Uploads image to the database and writes the file.
app.post("/api/upload", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.body || !req.file) {
      res
        .status(400)
        .json({ error: "Missing required fields in request body." });
    }

    res.status(200).json({ message: "Image upload successful." });
  } catch (err) {
    next(err);
  }
});

// Server-side check for input validation.
interface ValidateRequest {
  type: string;
  data: string;
}

app.post("/api/validate", (req, res, next) => {
  try {
    const requestBody: ValidateRequest = req.body;
    const { type: inputType, data: inputData } = requestBody;

    const validate = (maxLength: number) =>
      inputData.length > maxLength || inputData.length === 0
        ? res
          .status(400)
          .json({
            error: `Field must be less than ${maxLength} characters and not empty.`,
          })
        : res.status(200).json({ message: "Field is valid." });

    switch (inputType) {
      case "titleInput":
      case "artistInput":
        validate(32);
        break;
      case "sourceInput":
        validate(2048);
        break;
      case "fileInput":
        !req.files || req.files.length === 0
          ? res.status(400).json({ error: "No file input found." })
          : res.status(200).json({ message: "File input is valid." });
        break;
      default:
        res.status(400).json({ error: "Invalid input type." });
        break;
    }
  } catch (err) {
    next(err);
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
