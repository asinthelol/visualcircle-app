const uploadImageArea = document.querySelector(
  "#upload-image-area",
) as HTMLHtmlElement;
const uploadIcon = document.querySelector("#upload-icon") as HTMLElement;

const fileInput = document.querySelector("#upload-input") as HTMLInputElement;

// Click on the uploadButton (the icon) and call the file upload input.
const uploadButton = document.querySelector("#upload-icon");

uploadButton?.addEventListener("click", () => {
  const uploadInput = document.getElementById("upload-input"); // Turns out you cant use .click when you use querySelector :(.
  uploadInput?.click();
});

// Shows the image in the upload-area when the user selects an image.
function showSelectedFile() {
  const file = fileInput.files ? fileInput.files[0] : null;

  // Create a FileReader object to read the file
  const reader = new FileReader();

  // Define a function to execute when the file is loaded
  reader.onload = function (event) {
    const imageUrl = event.target?.result; // Get the file's data URL

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl as string;
    imageElement.classList.add("image-file");

    uploadImageArea.replaceChildren(imageElement);
  };

  // Read the file as a data URL
  reader.readAsDataURL(file as Blob);
}

// Event listener to change border color from red to transparent when file is selected.
fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files.length > 0) {
    uploadIcon.classList.remove("required");
  }
});

fileInput.addEventListener("change", () => {
  showSelectedFile();
});
