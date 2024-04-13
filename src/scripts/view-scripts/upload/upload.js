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
var _this = this;
var titleInput = document.querySelector("#upload-title");
var artistInput = document.querySelector("#upload-artist");
var fileInput = document.querySelector("#upload-input");
var sourceInput = document.querySelector("#upload-source");
var titleCounter = document.querySelector("#title-counter");
var artistCounter = document.querySelector("#artist-counter");
var titleInputHolder = document.querySelector("#title-holder");
var artistInputHolder = document.querySelector("#artist-holder");
var sourceInputHolder = document.querySelector("#source-holder");
var uploadIcon = document.querySelector("#upload-icon");
var uploadImageArea = document.querySelector("#upload-image-area");
var submitButton = document.querySelector("#submit-button");
// Make requuest to server to check if input meets requirements
// (less or equal to than 32 characters for title and artist, and less than or equal to 2048 characters for title).
function validateInput(input, inputName) {
  return __awaiter(this, void 0, void 0, function () {
    var response, err_1;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          // Validating if there is a file input
          if (
            input.type === "file" &&
            !((_a = input.files) === null || _a === void 0 ? void 0 : _a.length)
          ) {
            return [2 /*return*/, false];
          }
          return [
            4 /*yield*/,
            fetch("http://localhost:3000/api/validate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: inputName,
                data: input.value,
              }),
            }),
          ];
        case 1:
          response = _b.sent();
          console.log(response);
          return [2 /*return*/, response.ok];
        case 2:
          err_1 = _b.sent();
          console.error("Failed to validate input:", err_1);
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// For submitting all the image data (the title, artist name, and image file).
submitButton === null || submitButton === void 0
  ? void 0
  : submitButton.addEventListener("click", function (event) {
      return __awaiter(_this, void 0, void 0, function () {
        var isValidTitle,
          isValidArtist,
          isValidSource,
          file,
          formData,
          res,
          err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              event.preventDefault();
              return [4 /*yield*/, validateInput(titleInput, "titleInput")];
            case 1:
              isValidTitle = _a.sent();
              return [4 /*yield*/, validateInput(artistInput, "artistInput")];
            case 2:
              isValidArtist = _a.sent();
              return [4 /*yield*/, validateInput(sourceInput, "sourceInput")];
            case 3:
              isValidSource = _a.sent();
              // Check if inputs are filled out
              switch (true) {
                case !(fileInput === null || fileInput === void 0
                  ? void 0
                  : fileInput.files) || fileInput.files.length === 0:
                  uploadImageArea === null || uploadImageArea === void 0
                    ? void 0
                    : uploadImageArea.classList.remove("valid");
                  uploadImageArea === null || uploadImageArea === void 0
                    ? void 0
                    : uploadImageArea.classList.add("required");
                  return [2 /*return*/];
                case !isValidTitle:
                  titleInputHolder === null || titleInputHolder === void 0
                    ? void 0
                    : titleInputHolder.classList.remove("valid");
                  titleInputHolder === null || titleInputHolder === void 0
                    ? void 0
                    : titleInputHolder.classList.add("required");
                  return [2 /*return*/];
                case !isValidArtist:
                  artistInputHolder === null || artistInputHolder === void 0
                    ? void 0
                    : artistInputHolder.classList.remove("valid");
                  artistInputHolder === null || artistInputHolder === void 0
                    ? void 0
                    : artistInputHolder.classList.add("required");
                  return [2 /*return*/];
                case !isValidSource:
                  sourceInputHolder === null || sourceInputHolder === void 0
                    ? void 0
                    : sourceInputHolder.classList.remove("valid");
                  sourceInputHolder === null || sourceInputHolder === void 0
                    ? void 0
                    : sourceInputHolder.classList.add("required");
                  return [2 /*return*/];
                default:
                  titleInputHolder === null || titleInputHolder === void 0
                    ? void 0
                    : titleInputHolder.classList.remove("required");
                  artistInputHolder === null || artistInputHolder === void 0
                    ? void 0
                    : artistInputHolder.classList.remove("required");
                  sourceInputHolder === null || sourceInputHolder === void 0
                    ? void 0
                    : sourceInputHolder.classList.remove("required");
                  uploadImageArea === null || uploadImageArea === void 0
                    ? void 0
                    : uploadImageArea.classList.remove("required");
              }
              if (
                !(fileInput === null || fileInput === void 0
                  ? void 0
                  : fileInput.files)
              )
                return [3 /*break*/, 8];
              file = fileInput.files[0];
              formData = new FormData();
              formData.append("image_name", titleInput.value);
              formData.append("artist_name", artistInput.value);
              formData.append("image_source", sourceInput.value);
              formData.append("image", file);
              _a.label = 4;
            case 4:
              _a.trys.push([4, 6, , 7]);
              return [
                4 /*yield*/,
                fetch("http://localhost:3000/api/upload", {
                  method: "POST",
                  body: formData,
                }),
              ];
            case 5:
              res = _a.sent();
              if (res.ok) {
                // Redirects user to the homepage after submission.
                window.location.href = "../search/search.html"; // Change this to the actual URL.
              }
              return [3 /*break*/, 7];
            case 6:
              err_2 = _a.sent();
              console.error("Could not submit data.", err_2);
              return [3 /*break*/, 7];
            case 7:
              return [3 /*break*/, 9];
            case 8:
              uploadImageArea === null || uploadImageArea === void 0
                ? void 0
                : uploadImageArea.classList.add("required");
              return [2 /*return*/];
            case 9:
              return [2 /*return*/];
          }
        });
      });
    });
