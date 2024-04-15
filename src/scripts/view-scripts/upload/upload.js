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
var inputs = {
  title: document.querySelector("#upload-title"),
  artist: document.querySelector("#upload-artist"),
  file: document.querySelector("#upload-input"),
  source: document.querySelector("#upload-source"),
};
var counters = {
  title: document.querySelector("#title-counter"),
  artist: document.querySelector("#artist-counter"),
};
var holders = {
  title: document.querySelector("#title-holder"),
  artist: document.querySelector("#artist-holder"),
  source: document.querySelector("#source-holder"),
  image: document.querySelector("#upload-image-area"),
};
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
          // Validating if there is a file input
          if (
            input.type === "file" &&
            !((_a = input.files) === null || _a === void 0 ? void 0 : _a.length)
          ) {
            return [2 /*return*/, false];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 3, , 4]);
          return [
            4 /*yield*/,
            fetch("http://localhost:3000/api/validate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: inputName, data: input.value }),
            }),
          ];
        case 2:
          response = _b.sent();
          return [2 /*return*/, response.ok];
        case 3:
          err_1 = _b.sent();
          console.error("Failed to validate input:", err_1);
          return [2 /*return*/, false];
        case 4:
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
          tempHolders,
          file,
          formData,
          res,
          err_2;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
          switch (_f.label) {
            case 0:
              event.preventDefault();
              return [4 /*yield*/, validateInput(inputs.title, "titleInput")];
            case 1:
              isValidTitle = _f.sent();
              return [4 /*yield*/, validateInput(inputs.artist, "artistInput")];
            case 2:
              isValidArtist = _f.sent();
              return [4 /*yield*/, validateInput(inputs.source, "sourceInput")];
            case 3:
              isValidSource = _f.sent();
              // Check if inputs are filled out
              if (
                !((_b =
                  (_a = inputs.file) === null || _a === void 0
                    ? void 0
                    : _a.files) === null || _b === void 0
                  ? void 0
                  : _b.length)
              ) {
                holders.image.classList.add("required");
                return [2 /*return*/];
              }
              if (!isValidTitle || !isValidArtist || !isValidSource) {
                tempHolders = [holders.title, holders.artist, holders.source];
                tempHolders.forEach(function (holder) {
                  holder === null || holder === void 0
                    ? void 0
                    : holder.classList.remove("valid");
                  holder === null || holder === void 0
                    ? void 0
                    : holder.classList.add("required");
                });
                return [2 /*return*/];
              }
              file = inputs.file.files[0];
              formData = new FormData();
              formData.append(
                "image_name",
                (_c = inputs.title) === null || _c === void 0
                  ? void 0
                  : _c.value,
              );
              formData.append(
                "artist_name",
                (_d = inputs.artist) === null || _d === void 0
                  ? void 0
                  : _d.value,
              );
              formData.append(
                "image_source",
                (_e = inputs.source) === null || _e === void 0
                  ? void 0
                  : _e.value,
              );
              formData.append("image", file);
              _f.label = 4;
            case 4:
              _f.trys.push([4, 6, , 7]);
              return [
                4 /*yield*/,
                fetch("http://localhost:3000/api/upload", {
                  // In your code, change this to the actual URL.
                  method: "POST",
                  body: formData,
                }),
              ];
            case 5:
              res = _f.sent();
              if (res.ok) {
                window.location.href = "../search/search.html"; // Change this to the actual URL you will use.
              }
              return [3 /*break*/, 7];
            case 6:
              err_2 = _f.sent();
              console.error("Could not submit data.", err_2);
              return [3 /*break*/, 7];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    });
