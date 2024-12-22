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
var inputs = {
    title: document.querySelector("#upload-title"),
    file: document.querySelector("#upload-input"),
    source: document.querySelector("#upload-source"),
};
var counters = {
    title: document.querySelector("#title-counter"),
};
var holders = {
    title: document.querySelector("#title-holder"),
    source: document.querySelector("#source-holder"),
    image: document.querySelector("#upload-image-area"),
};
var submitButton = document.querySelector("#submit-button");
function validateInputs() {
    return __awaiter(this, void 0, void 0, function () {
        var validations, results;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validations = [
                        { input: inputs.title, type: "titleInput", holder: holders.title },
                        { input: inputs.source, type: "sourceInput", holder: holders.source },
                        { input: inputs.file, type: "fileInput", holder: holders.image },
                    ];
                    return [4 /*yield*/, Promise.all(validations.map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var input = _b.input, type = _b.type, holder = _b.holder;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (type === "fileInput") {
                                            return [2 /*return*/, (input === null || input === void 0 ? void 0 : input.files.length) > 0];
                                        }
                                        return [4 /*yield*/, validateInput(input, type, holder)];
                                    case 1: return [2 /*return*/, _c.sent()];
                                }
                            });
                        }); }))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results.every(function (result) { return result; })]; // If all are valid, return true, else false
            }
        });
    });
}
// Validate a specific input using the API
function validateInput(input, inputName, holder) {
    return __awaiter(this, void 0, void 0, function () {
        var response, isValid, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!input)
                        return [2 /*return*/, false]; // Early return if the input is null
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/validate", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ type: inputName, data: input.value }),
                        })];
                case 2:
                    response = _a.sent();
                    isValid = response.ok;
                    holder.classList.toggle("error", !isValid);
                    return [2 /*return*/, isValid];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to validate input:", err_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// For submitting all the image data (the title and image file).
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var isValid, formData, res, err_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                event.preventDefault();
                return [4 /*yield*/, validateInputs()];
            case 1:
                isValid = _d.sent();
                if (!isValid)
                    return [2 /*return*/, alert("Please fix the validation errors before submitting.")];
                formData = new FormData();
                formData.append("image_name", ((_a = inputs.title) === null || _a === void 0 ? void 0 : _a.value) || "");
                formData.append("image_source", ((_b = inputs.source) === null || _b === void 0 ? void 0 : _b.value) || "");
                formData.append("image", ((_c = inputs.file) === null || _c === void 0 ? void 0 : _c.files[0]) || "");
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/api/upload", {
                        // Change this to the API endpoint you'll use.
                        method: "POST",
                        body: formData,
                    })];
            case 3:
                res = _d.sent();
                if (res.ok) {
                    window.location.href = "../search/search.html";
                }
                else {
                    console.error("Failed to upload data.");
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _d.sent();
                console.error("Could not submit data.", err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
