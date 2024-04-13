var uploadImageArea = document.querySelector("#upload-image-area");
var uploadIcon = document.querySelector("#upload-icon");
var fileInput = document.querySelector("#upload-input");
// Click on the uploadButton (the icon) and call the file upload input.
var uploadButton = document.querySelector("#upload-icon");
var clearButton = document.querySelector("#clear-button");
uploadButton === null || uploadButton === void 0
  ? void 0
  : uploadButton.addEventListener("click", function () {
      var uploadInput = document.getElementById("upload-input"); // Turns out you cant use .click when you use querySelector :(.
      uploadInput === null || uploadInput === void 0
        ? void 0
        : uploadInput.click();
    });
// Shows the image in the upload-area when the user selects an image.
function showSelectedFile() {
  var file = (
    fileInput === null || fileInput === void 0 ? void 0 : fileInput.files
  )
    ? fileInput.files[0]
    : null;
  // Create a FileReader object to read the file
  var reader = new FileReader();
  // Define a function to execute when the file is loaded
  reader.onload = function (event) {
    var _a;
    var imageUrl =
      (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Get the file's data URL
    if (imageUrl) {
      var imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add("image-file");
      uploadImageArea === null || uploadImageArea === void 0
        ? void 0
        : uploadImageArea.replaceChildren(imageElement);
      uploadImageArea === null || uploadImageArea === void 0
        ? void 0
        : uploadImageArea.appendChild(clearButton);
    }
  };
  // Read the file as a data URL
  reader.readAsDataURL(file);
}
fileInput.addEventListener("change", function () {
  showSelectedFile();
});
