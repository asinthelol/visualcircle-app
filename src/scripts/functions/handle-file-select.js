var elements = {
  imageArea: document.querySelector("#upload-image-area"),
  uploadButton: document.querySelector("#upload-icon"),
  fileInput: document.querySelector("#upload-input"),
  clearButton: document.querySelector("#clear-button"),
};
// Click on the uploadButton (the icon) and call the file upload input.
elements.uploadButton.addEventListener("click", function () {
  elements.fileInput.click();
});
// Shows the image in the upload-area when the user selects an image.
elements.fileInput.addEventListener("change", function () {
  var _a;
  var file =
    (_a = elements.fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
  if (!file) return;
  // Create a FileReader object to read the file
  var reader = new FileReader();
  reader.onload = function (event) {
    var _a;
    var imageUrl =
      (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
    if (imageUrl) {
      var imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add("image-file");
      elements.imageArea.replaceChildren(imageElement, elements.clearButton);
    }
  };
  reader.readAsDataURL(file);
});
