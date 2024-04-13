"use strict";
// Imports!
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var express = require("express");
var multer = require("multer");
var db = require("./database.js");
var path = require("path");
// The stuff I care about starts here
var app = express();
// Make sure to change the allowed domain.
var allowedOrigins = ["http://127.0.0.1:3000/"];
// Allows allowedOrigins, to send http requests.
app.use(function (req, res, next) {
  var origin = req.header("Origin");
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
});
var storage = multer.diskStorage({
  destination: "./src/assets/user-content",
  filename: function (req, file, cb) {
    return __awaiter(this, void 0, void 0, function () {
      var imageName, artistName, imageSource, savedImage, filename, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4]);
            imageName = req.body.image_name.trim();
            artistName = req.body.artist_name.trim();
            imageSource = req.body.image_source.trim();
            if (!imageName || !artistName || !imageSource) {
              throw new Error("Missing required fields in request body.");
            }
            return [
              4 /*yield*/,
              db.ImagesTable.create({
                image_name: imageName,
                artist: artistName,
                image_source: imageSource,
              }),
            ];
          case 1:
            savedImage = _a.sent();
            filename = savedImage.image_id + path.extname(file.originalname);
            return [
              4 /*yield*/,
              savedImage.update({
                file_source: "../../assets/user-content/".concat(filename),
              }),
            ];
          case 2:
            _a.sent();
            cb(null, filename);
            return [3 /*break*/, 4];
          case 3:
            err_1 = _a.sent();
            console.error("Failed saving image:", err_1);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  },
});
// Multer instance. Will be useful later.
var upload = multer({ storage: storage });
// TO parse json data
app.use(express.json());
// Fetches all images from the database.
function getImages() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, db.ImagesTable.findAll()];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
app.get("/api/images", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var imageData, err_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, getImages()];
        case 1:
          imageData = _a.sent();
          res.send(imageData);
          return [3 /*break*/, 3];
        case 2:
          err_2 = _a.sent();
          console.error("Failed sending images to client:", err_2);
          res.status(500).json({ error: "Failed sending images to client." });
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
});
// Uploads image to the database and writes the file.
app.post("/api/upload", upload.single("image"), function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        if (!req) {
          return [
            2 /*return*/,
            res
              .status(400)
              .json({ error: "Missing required fields in request body." }),
          ];
        }
        res.status(200).json({ message: "Image upload successful." });
      } catch (err) {
        console.error("Image upload failed:", err);
        res.status(500).json({ error: "Image upload failed." });
      }
      return [2 /*return*/];
    });
  });
});
app.post("/api/validate", function (req, res) {
  try {
    var requestBody = req.body;
    var inputType = requestBody.type;
    var inputData = requestBody.data;
    switch (inputType) {
      case "titleInput":
        if (inputData.length > 32 || inputData.length === 0) {
          res.status(400).json({
            error: "Title field must be less than 32 characters and not empty.",
          });
        } else {
          res.status(200).json({ message: "Title field is valid." });
        }
        break;
      case "artistInput":
        if (inputData.length > 32 || inputData.length === 0) {
          res.status(400).json({
            error:
              "Artist field must be less than 32 characters and not empty.",
          });
        } else {
          res.status(200).json({ message: "Artist field is valid." });
        }
        break;
      case "sourceInput":
        if (inputData.length > 2048 || inputData.length === 0) {
          res.status(400).json({
            error:
              "Source field must be less than 2048 characters and not empty.",
          });
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
  .then(function () {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.error("Failed to connect to the database:", err);
  });
module.exports = app;
