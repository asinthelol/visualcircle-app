const inputs = {
  title: document.querySelector("#upload-title") as HTMLInputElement,
  artist: document.querySelector("#upload-artist") as HTMLInputElement,
  source: document.querySelector("#upload-source") as HTMLInputElement,
  file: document.querySelector("#upload-input") as HTMLInputElement,
};

const counters = {
  title: document.querySelector("#title-counter") as HTMLElement,
  artist: document.querySelector("#artist-counter") as HTMLElement,
};

const holders = {
  title: document.querySelector("#title-holder") as HTMLElement,
  artist: document.querySelector("#artist-holder") as HTMLElement,
  source: document.querySelector("#source-holder") as HTMLElement,
  image: document.querySelector("#upload-image-area") as HTMLElement,
};

const others = {
  uploadIcon: document.querySelector("#upload-icon") as HTMLElement,
  clearButton: document.querySelector("#clear-button") as HTMLElement,
  uploadText: document.querySelector("#upload-text") as HTMLElement,
};

// Function to update the character count for the title and artist input fields.
function updateCount(input: HTMLInputElement, counter: HTMLElement) {
  counter.textContent = `${input.value.length}/32`;
}

// Event listeners to update character count when typing in the input fields, change files
// and to remove the required class once an input has been made.
function inputListener(
  input: HTMLInputElement,
  counter: HTMLElement,
  holder: HTMLElement,
) {
  input.addEventListener("input", () => {
    updateCount(input, counter);
    if (input.value.length > 0) {
      holder.classList.remove("required");
      holder.classList.add("valid");
    }
  });
}

inputListener(inputs.title, counters.title, holders.title);
inputListener(inputs.artist, counters.artist, holders.artist);

inputs.source?.addEventListener("input", () => {
  if (inputs.source?.value.length) {
    holders.source?.classList.remove("required");
    holders.source?.classList.add("valid");
  }
});

inputs.file?.addEventListener("change", () => {
  if (inputs.file?.files?.length) {
    holders.image?.classList.remove("required");
    holders.image?.classList.add("valid");
    others.clearButton.hidden = false;
  }
});

// When the user selects a file, the clear button will appear and give the user the option to clear the file input.
others.clearButton?.addEventListener("click", () => {
  if (inputs.file) {
    // I hate how TypeScript is forcing me to do this instead of doing fileInput?.value = "". We all know it's not null.
    inputs.file.value = "";
    holders.image?.replaceChildren(
      others.uploadIcon,
      inputs.file,
      others.uploadText,
    );
  }
  others.clearButton.hidden = true;
});
