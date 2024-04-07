const titleInput = document.querySelector("#upload-title") as HTMLInputElement;
const artistInput = document.querySelector(
  "#upload-artist",
) as HTMLInputElement;
const sourceInput = document.querySelector(
  "#upload-source",
) as HTMLInputElement;

const titleCounter = document.querySelector("#title-counter") as HTMLElement;
const artistCounter = document.querySelector("#artist-counter") as HTMLElement;

const titleInputHolder = document.querySelector("#title-holder") as HTMLElement;
const artistInputHolder = document.querySelector(
  "#artist-holder",
) as HTMLElement;
const sourceInputHolder = document.querySelector(
  "#source-holder",
) as HTMLElement;

function updateCharacterCount(input: HTMLInputElement, counter: HTMLElement) {
  counter.textContent = `${input.value.length}/32`;

  if (input.value.length > 32) {
    counter.textContent = "32/32";
  }
}

// Event listeners to update character count when typing in the input fields, and to
// remove the required class once an input has been made.

const characterLimit = 31; // -1 for both because index is 0.
const urlLimit = 2047;

titleInput.addEventListener("input", () => {
  updateCharacterCount(titleInput, titleCounter);
  if (titleInput.value !== "") {
    titleInputHolder.classList.remove("required");
  }

  if (titleInput.value.length > characterLimit) {
    titleInput.value = titleInput.value.slice(0, characterLimit);
  }
});

artistInput.addEventListener("input", () => {
  updateCharacterCount(artistInput, artistCounter);
  if (artistInput.value !== "") {
    artistInputHolder.classList.remove("required");
  }

  if (artistInput.value.length > characterLimit) {
    artistInput.value = artistInput.value.slice(0, characterLimit);
  }
});

// Also put source eventListener here because it's convenient
sourceInput.addEventListener("input", () => {
  if (sourceInput.value !== "") {
    sourceInputHolder.classList.remove("required");
  }

  if (sourceInput.value.length > urlLimit) {
    sourceInput.value = sourceInput.value.slice(0, urlLimit);
  }
});
