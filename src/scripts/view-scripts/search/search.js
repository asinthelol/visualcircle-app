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
// Fetches a list of images and their data from the specified endpoint.
// Replace 'http://localhost:3000/api/images' with your actual API URL.
function fetchAndDisplayImages() {
  return __awaiter(this, void 0, void 0, function () {
    var response, _a, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          return [4 /*yield*/, fetch("http://localhost:3000/api/images")];
        case 1:
          response = _b.sent();
          if (!response.ok) {
            throw new Error(
              "HTTP error occured. Status: ".concat(response.status),
            );
          }
          _a = displayImages;
          return [4 /*yield*/, response.json()];
        case 2:
          // Parse and use data to display images.
          return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
        case 3:
          // Parse and use data to display images.
          _b.sent();
          return [3 /*break*/, 5];
        case 4:
          error_1 = _b.sent();
          console.error("Error fetching images:", error_1);
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
// Takes an array of image data objects and displays them in the search result area.
function displayImages(data) {
  return __awaiter(this, void 0, void 0, function () {
    var resultArea, maxLength;
    return __generator(this, function (_a) {
      resultArea = document.querySelector("#search-result-area");
      maxLength = 17;
      data.forEach(function (image) {
        var searchResult = document.createElement("div");
        searchResult.classList.add("search-result");
        // If the image name or artist name is too long, truncate it and add an ellipsis.
        var truncatedName =
          image.image_name.length > maxLength
            ? image.image_name.substring(0, maxLength) + "..."
            : image.image_name;
        var truncatedArtist =
          image.artist.length > maxLength
            ? image.artist.substring(0, maxLength) + "..."
            : image.artist;
        searchResult.dataset.imageName = truncatedName;
        var resultImage = document.createElement("img");
        resultImage.classList.add("result-image");
        resultImage.src = image.file_source;
        var imageArtist = document.createElement("p");
        imageArtist.textContent = truncatedArtist;
        searchResult.append(resultImage, imageArtist);
        if (resultArea) {
          resultArea.appendChild(searchResult);
        }
      });
      return [2 /*return*/];
    });
  });
}
fetchAndDisplayImages();
