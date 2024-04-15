const inputs = {
  title: document.querySelector("#upload-title") as HTMLInputElement,
  artist: document.querySelector("#upload-artist") as HTMLInputElement,
  file: document.querySelector("#upload-input") as HTMLInputElement,
  source: document.querySelector("#upload-source") as HTMLInputElement,
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

const submitButton = document.querySelector("#submit-button");

// Make requuest to server to check if input meets requirements
// (less or equal to than 32 characters for title and artist, and less than or equal to 2048 characters for title).
async function validateInput(input: HTMLInputElement, inputName: string) {
  // Validating if there is a file input
  if (input.type === "file" && !input.files?.length) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: inputName, data: input.value }),
    });

    return response.ok;
  } catch (err) {
    console.error("Failed to validate input:", err);
    return false;
  }
}

// For submitting all the image data (the title, artist name, and image file).
submitButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  // Validate inputs
  const isValidTitle = await validateInput(inputs.title, "titleInput");
  const isValidArtist = await validateInput(inputs.artist, "artistInput");
  const isValidSource = await validateInput(inputs.source, "sourceInput");

  // Check if inputs are filled out
  if (!inputs.file?.files?.length) {
    holders.image.classList.add("required");
    return;
  }

  if (!isValidTitle || !isValidArtist || !isValidSource) {
    const tempHolders = [holders.title, holders.artist, holders.source];
    tempHolders.forEach((holder) => {
      holder?.classList.remove("valid");
      holder?.classList.add("required");
    });
    return;
  }

  // If all inputs are valid, create a FormData object and append the data to it.
  const file = inputs.file.files[0];

  const formData = new FormData();
  formData.append("image_name", inputs.title?.value);
  formData.append("artist_name", inputs.artist?.value);
  formData.append("image_source", inputs.source?.value);
  formData.append("image", file);

  try {
    const res = await fetch("http://localhost:3000/api/upload", {
      // In your code, change this to the actual URL.
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      window.location.href = "../search/search.html"; // Change this to the actual URL you will use.
    }
  } catch (err) {
    console.error("Could not submit data.", err);
  }
});
