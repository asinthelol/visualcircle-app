"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var multer = require("multer");
var cors = require("cors");
var path = require("path");
var Op = require("sequelize").Op;
var db = require("./database.js");
var app = express();
// CORS configuration.
// Make sure to change the allowed domain.
var allowedOrigins = ["http://127.0.0.1:3000/"];
var corsOptions = { origin: allowedOrigins };
app.use(cors(corsOptions));
var storage = multer.diskStorage({
    destination: "./src/assets/user-content",
    filename: function (req, file, cb) {
        try {
            var imageName = req.body.image_name ? req.body.image_name.trim() : "";
            var imageSource = req.body.image_source ? req.body.image_source.trim() : "";
            if (!imageName || !imageSource) {
                return cb(new Error("Missing required fields in request body."), "");
            }
            db.ImagesTable.create({ image_name: imageName, image_source: imageSource })
                .then(function (savedImage) {
                var filename = savedImage.image_id + path.extname(file.originalname);
                // Update file source in the database
                return savedImage.update({ file_source: "../../assets/user-content/".concat(filename) })
                    .then(function () {
                    // Call the callback with filename
                    cb(null, filename);
                });
            })
                .catch(function (err) {
                console.error("Failed saving image:", err);
                cb(err, "");
            });
        }
        catch (err) {
            console.error("Failed saving image:", err);
            cb(err, ""); // Pass empty filename in case of error
        }
    },
});
var upload = multer({ storage: storage });
app.use(express.json());
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: err.message });
});
// Fetches all images from the database.
function getImages() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.ImagesTable.findAll()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
app.get("/api/images", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getImages()];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Uploads image to the database and writes the file.
app.post("/api/upload", upload.single("image"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (!req.body || !req.file) {
                return [2 /*return*/, res
                        .status(400)
                        .json({ error: "Missing required fields in request body." })];
            }
            res.status(200).json({ message: "Image upload successful." });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
app.post("/api/validate", function (req, res, next) {
    try {
        var requestBody = req.body;
        var inputType = requestBody.type, inputData_1 = requestBody.data;
        var validate = function (maxLength) {
            if (inputData_1.length > maxLength || inputData_1.length === 0) {
                return res.status(400).json({
                    error: "Field must be less than ".concat(maxLength, " characters and not empty."),
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
    }
    catch (err) {
        next(err);
    }
});
// Search for images based on the query.
app.get("/api/search/:query", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, data, err_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                query = req.params.query;
                return [4 /*yield*/, db.ImagesTable.findAll({
                        where: (_a = {},
                            _a[Op.or] = [
                                { image_name: (_b = {}, _b[Op.like] = "%".concat(query, "%"), _b) },
                            ],
                            _a),
                        limit: 20,
                    })];
            case 1:
                data = _c.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _c.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
