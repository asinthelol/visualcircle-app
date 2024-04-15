const elements = {
  imageArea: document.querySelector("#upload-image-area") as HTMLElement,
  uploadButton: document.querySelector("#upload-icon") as HTMLElement,
  fileInput: document.querySelector("#upload-input") as HTMLInputElement,
  clearButton: document.querySelector("#clear-button") as HTMLElement,
};

// Click on the uploadButton (the icon) and call the file upload input.
elements.uploadButton.addEventListener("click", () => {
  elements.fileInput.click();
});

// Shows the image in the upload-area when the user selects an image.
elements.fileInput.addEventListener("change", () => {
  const file = elements.fileInput.files?.[0];
  if (!file) return;

  // Create a FileReader object to read the file
  const reader = new FileReader();
  reader.onload = (event) => {
    const imageUrl = event.target?.result as string;

    if (imageUrl) {
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add("image-file");

      elements.imageArea.replaceChildren(imageElement, elements.clearButton);
    }
  };

  reader.readAsDataURL(file as Blob);
});
