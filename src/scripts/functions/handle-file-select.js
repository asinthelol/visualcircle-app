var uploadImageArea = document.querySelector('#upload-image-area');
var uploadIcon = document.querySelector('#upload-icon');
var fileInput = document.querySelector('#upload-input');
// Click on the uploadButton (the icon) and call the file upload input.
var uploadButton = document.querySelector('#upload-icon');
uploadButton === null || uploadButton === void 0 ? void 0 : uploadButton.addEventListener('click', function () {
    var uploadInput = document.getElementById('upload-input'); // Turns out you cant use .click when you use querySelector :(.
    uploadInput === null || uploadInput === void 0 ? void 0 : uploadInput.click();
});
// Shows the image in the upload-area when the user selects an image.
function showSelectedFile() {
    var file = fileInput.files ? fileInput.files[0] : null;
    // Create a FileReader object to read the file
    var reader = new FileReader();
    // Define a function to execute when the file is loaded
    reader.onload = function (event) {
        var _a;
        var imageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Get the file's data URL
        var imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('image-file');
        uploadImageArea.replaceChildren(imageElement);
    };
    // Read the file as a data URL
    reader.readAsDataURL(file);
}
// Event listener to change border color from red to transparent when file is selected.
fileInput.addEventListener('change', function () {
    if (fileInput.files && fileInput.files.length > 0) {
        uploadIcon.classList.remove('required');
    }
});
fileInput.addEventListener('change', function () {
    showSelectedFile();
});
