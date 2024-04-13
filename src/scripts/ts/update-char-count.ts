const titleInput = document.querySelector("#upload-title") as HTMLInputElement;
const artistInput = document.querySelector(
  "#upload-artist",
) as HTMLInputElement;
const sourceInput = document.querySelector(
  "#upload-source",
) as HTMLInputElement;

const fileInput = document.querySelector("#upload-input") as HTMLInputElement;
const fileInputHolder = document.querySelector("#upload-image-area") as HTMLElement; // Same as uploadImageArea in upload.ts

const titleCounter = document.querySelector("#title-counter") as HTMLElement;
const artistCounter = document.querySelector("#artist-counter") as HTMLElement;

const titleInputHolder = document.querySelector("#title-holder") as HTMLElement;
const artistInputHolder = document.querySelector(
  "#artist-holder",
) as HTMLElement;
const sourceInputHolder = document.querySelector(
  "#source-holder",
) as HTMLElement;

const uploadImageArea = document.querySelector("#upload-image-area") as HTMLElement;
const uploadIcon = document.querySelector("#upload-icon") as HTMLElement;
const clearButton = document.querySelector("#clear-button") as HTMLElement; // THe x button in the top right corner of the image preview.

const uploadText = document.querySelector("#upload-text") as HTMLElement; // The text that says what file types are allowed.



// Function to update the character count for the title and artist input fields.
function updateCharacterCount(input: HTMLInputElement, counter: HTMLElement) {
  counter.textContent = `${input.value.length}/32`;
}


// Event listeners to update character count when typing in the input fields, and to
// remove the required class once an input has been made.
titleInput.addEventListener("input", () => {
  updateCharacterCount(titleInput, titleCounter);
  if (titleInput?.value.length > 0) {
    titleInputHolder?.classList.remove("required");
  }
});

artistInput.addEventListener("input", () => {
  updateCharacterCount(artistInput, artistCounter);
  if (artistInput?.value.length > 0) {
    artistInputHolder.classList.remove("required");
    artistInputHolder.classList.add("valid");
  }
});

sourceInput.addEventListener("input", () => {
  if (sourceInput?.value.length > 0) {
    sourceInputHolder?.classList.remove("required");
    sourceInputHolder?.classList.add("valid");
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput?.files && fileInput.files.length > 0) {
    fileInputHolder?.classList.remove("required");
    fileInputHolder?.classList.add("valid");

    clearButton.hidden = false;
  }
});

// When the user selects a file, the clear button will appear and give the user the option to clear the file input.
clearButton.addEventListener("click", () => {
  if (fileInput) { // I hate how TypeScript is forcing me to do this instead of doing fileInput?.value = "". We all know it's not null.
    fileInput.value = "";

    uploadImageArea?.replaceChildren(uploadIcon);
    uploadImageArea?.appendChild(fileInput);
    uploadImageArea?.appendChild(uploadText);
  }
  clearButton.hidden = true;
});