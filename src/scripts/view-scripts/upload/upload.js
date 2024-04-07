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
var _this = this;
var titleInput = document.querySelector('#upload-title');
var artistInput = document.querySelector('#upload-artist');
var fileInput = document.querySelector('#upload-input');
var sourceInput = document.querySelector('#upload-source');
var titleInputHolder = document.querySelector('#title-holder');
var artistInputHolder = document.querySelector('#artist-holder');
var sourceInputHolder = document.querySelector('#source-holder');
var uploadIcon = document.querySelector('#upload-icon');
var uploadImageArea = document.querySelector('#upload-image-area');
// For submitting all the image data (the title, artist name, and image file).
var submitButton = document.querySelector('#submit-button');
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var file, formData, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                // Check if inputs are filled out.
                switch (true) {
                    case (titleInput === null || titleInput === void 0 ? void 0 : titleInput.value) === '':
                        titleInputHolder === null || titleInputHolder === void 0 ? void 0 : titleInputHolder.classList.add('required');
                        return [2 /*return*/];
                    case (artistInput === null || artistInput === void 0 ? void 0 : artistInput.value) === '':
                        artistInputHolder === null || artistInputHolder === void 0 ? void 0 : artistInputHolder.classList.add('required');
                        return [2 /*return*/];
                    case (sourceInput === null || sourceInput === void 0 ? void 0 : sourceInput.value) === '':
                        sourceInputHolder === null || sourceInputHolder === void 0 ? void 0 : sourceInputHolder.classList.add('required');
                        return [2 /*return*/];
                    case (fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) && fileInput.files.length === 0: // Did this so I can check the length without possible null.
                        uploadIcon === null || uploadIcon === void 0 ? void 0 : uploadIcon.classList.add('required');
                        return [2 /*return*/];
                }
                if (!(fileInput === null || fileInput === void 0 ? void 0 : fileInput.files)) return [3 /*break*/, 4];
                file = fileInput.files[0];
                formData = new FormData();
                formData.append('image_name', titleInput.value);
                formData.append('artist_name', artistInput.value);
                formData.append('image_source', sourceInput.value);
                formData.append('image', file);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:3000/api/upload', {
                        method: 'POST',
                        body: formData
                    })];
            case 2:
                res = _a.sent();
                if (res.ok) {
                    // Clear the input fields after submission.
                    titleInput.value = '';
                    artistInput.value = '';
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error('Could not submit data.', err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
