var titleInput = document.querySelector("#upload-title");
var artistInput = document.querySelector("#upload-artist");
var sourceInput = document.querySelector("#upload-source");
var fileInput = document.querySelector("#upload-input");
var fileInputHolder = document.querySelector("#upload-image-area"); // Same as uploadImageArea in upload.ts
var titleCounter = document.querySelector("#title-counter");
var artistCounter = document.querySelector("#artist-counter");
var titleInputHolder = document.querySelector("#title-holder");
var artistInputHolder = document.querySelector("#artist-holder");
var sourceInputHolder = document.querySelector("#source-holder");
var uploadImageArea = document.querySelector("#upload-image-area");
var uploadIcon = document.querySelector("#upload-icon");
var clearButton = document.querySelector("#clear-button"); // THe x button in the top right corner of the image preview.
var uploadText = document.querySelector("#upload-text"); // The text that says what file types are allowed.
// Function to update the character count for the title and artist input fields.
function updateCharacterCount(input, counter) {
  counter.textContent = "".concat(input.value.length, "/32");
}
// Event listeners to update character count when typing in the input fields, and to
// remove the required class once an input has been made.
titleInput.addEventListener("input", function () {
  updateCharacterCount(titleInput, titleCounter);
  if (
    (titleInput === null || titleInput === void 0
      ? void 0
      : titleInput.value.length) > 0
  ) {
    titleInputHolder === null || titleInputHolder === void 0
      ? void 0
      : titleInputHolder.classList.remove("required");
  }
});
artistInput.addEventListener("input", function () {
  updateCharacterCount(artistInput, artistCounter);
  if (
    (artistInput === null || artistInput === void 0
      ? void 0
      : artistInput.value.length) > 0
  ) {
    artistInputHolder.classList.remove("required");
    artistInputHolder.classList.add("valid");
  }
});
sourceInput.addEventListener("input", function () {
  if (
    (sourceInput === null || sourceInput === void 0
      ? void 0
      : sourceInput.value.length) > 0
  ) {
    sourceInputHolder === null || sourceInputHolder === void 0
      ? void 0
      : sourceInputHolder.classList.remove("required");
    sourceInputHolder === null || sourceInputHolder === void 0
      ? void 0
      : sourceInputHolder.classList.add("valid");
  }
});
fileInput.addEventListener("change", function () {
  if (
    (fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) &&
    fileInput.files.length > 0
  ) {
    fileInputHolder === null || fileInputHolder === void 0
      ? void 0
      : fileInputHolder.classList.remove("required");
    fileInputHolder === null || fileInputHolder === void 0
      ? void 0
      : fileInputHolder.classList.add("valid");
    clearButton.hidden = false;
  }
});
// When the user selects a file, the clear button will appear and give the user the option to clear the file input.
clearButton.addEventListener("click", function () {
  if (fileInput) {
    // I hate how TypeScript is forcing me to do this instead of doing fileInput?.value = "". We all know it's not null.
    fileInput.value = "";
    uploadImageArea === null || uploadImageArea === void 0
      ? void 0
      : uploadImageArea.replaceChildren(uploadIcon);
    uploadImageArea === null || uploadImageArea === void 0
      ? void 0
      : uploadImageArea.appendChild(fileInput);
    uploadImageArea === null || uploadImageArea === void 0
      ? void 0
      : uploadImageArea.appendChild(uploadText);
  }
  clearButton.hidden = true;
});
