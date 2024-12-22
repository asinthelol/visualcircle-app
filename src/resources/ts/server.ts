require("dotenv").config();
import express = require("express");
import { Request, Response, NextFunction } from "express";
import multer = require("multer");
import cors = require("cors");
import fs = require("fs");
import path = require("path");
const { Op } = require("sequelize");
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
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback,
  ) {
    try {
      const imageName = req.body.image_name ? req.body.image_name.trim() : "";
      const imageSource = req.body.image_source ? req.body.image_source.trim() : "";

      if (!imageName || !imageSource) {
        return cb(new Error("Missing required fields in request body."), "");
      }

      db.ImagesTable.create({ image_name: imageName, image_source: imageSource })
        .then(savedImage => {
          const filename = savedImage.image_id + path.extname(file.originalname);

          // Update file source in the database
          return savedImage.update({ file_source: `../../assets/user-content/${filename}` })
            .then(() => {
              // Call the callback with filename
              cb(null, filename);
            });
        })
        .catch(err => {
          console.error("Failed saving image:", err);
          cb(err, "");
        });



    } catch (err) {
      console.error("Failed saving image:", err);
      cb(err as Error, "");  // Pass empty filename in case of error
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
      return res
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

    const validate = (maxLength: number) => {
      if (inputData.length > maxLength || inputData.length === 0) {
        return res.status(400).json({
          error: `Field must be less than ${maxLength} characters and not empty.`,
        });
      }
      res.status(200).json({ message: "Field is valid." });
    };

    switch (inputType) {
      case "titleInput":
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

// Search for images based on the query.
app.get("/api/search/:query", async (req, res, next) => {
  try {
    const query = req.params.query;
    const data = await db.ImagesTable.findAll({
      where: {
        [Op.or]: [
          { image_name: { [Op.like]: `%${query}%` } },
        ],
      },
      limit: 20,
    });

    res.send(data);
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
