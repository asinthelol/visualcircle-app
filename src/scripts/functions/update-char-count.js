var _a, _b, _c;
var inputs = {
  title: document.querySelector("#upload-title"),
  artist: document.querySelector("#upload-artist"),
  source: document.querySelector("#upload-source"),
  file: document.querySelector("#upload-input"),
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
var others = {
  uploadIcon: document.querySelector("#upload-icon"),
  clearButton: document.querySelector("#clear-button"),
  uploadText: document.querySelector("#upload-text"),
};
// Function to update the character count for the title and artist input fields.
function updateCount(input, counter) {
  counter.textContent = "".concat(input.value.length, "/32");
}
// Event listeners to update character count when typing in the input fields, change files
// and to remove the required class once an input has been made.
function inputListener(input, counter, holder) {
  input.addEventListener("input", function () {
    updateCount(input, counter);
    if (input.value.length > 0) {
      holder.classList.remove("required");
      holder.classList.add("valid");
    }
  });
}
inputListener(inputs.title, counters.title, holders.title);
inputListener(inputs.artist, counters.artist, holders.artist);
(_a = inputs.source) === null || _a === void 0
  ? void 0
  : _a.addEventListener("input", function () {
      var _a, _b, _c;
      if (
        (_a = inputs.source) === null || _a === void 0
          ? void 0
          : _a.value.length
      ) {
        (_b = holders.source) === null || _b === void 0
          ? void 0
          : _b.classList.remove("required");
        (_c = holders.source) === null || _c === void 0
          ? void 0
          : _c.classList.add("valid");
      }
    });
(_b = inputs.file) === null || _b === void 0
  ? void 0
  : _b.addEventListener("change", function () {
      var _a, _b, _c, _d;
      if (
        (_b =
          (_a = inputs.file) === null || _a === void 0 ? void 0 : _a.files) ===
          null || _b === void 0
          ? void 0
          : _b.length
      ) {
        (_c = holders.image) === null || _c === void 0
          ? void 0
          : _c.classList.remove("required");
        (_d = holders.image) === null || _d === void 0
          ? void 0
          : _d.classList.add("valid");
        others.clearButton.hidden = false;
      }
    });
// When the user selects a file, the clear button will appear and give the user the option to clear the file input.
(_c = others.clearButton) === null || _c === void 0
  ? void 0
  : _c.addEventListener("click", function () {
      var _a;
      if (inputs.file) {
        // I hate how TypeScript is forcing me to do this instead of doing fileInput?.value = "". We all know it's not null.
        inputs.file.value = "";
        (_a = holders.image) === null || _a === void 0
          ? void 0
          : _a.replaceChildren(
              others.uploadIcon,
              inputs.file,
              others.uploadText,
            );
      }
      others.clearButton.hidden = true;
    });
