const titleInput = document.querySelector("#upload-title") as HTMLInputElement;
const artistInput = document.querySelector(
  "#upload-artist",
) as HTMLInputElement;
const fileInput = document.querySelector("#upload-input") as HTMLInputElement;
const sourceInput = document.querySelector(
  "#upload-source",
) as HTMLInputElement;

const titleInputHolder = document.querySelector("#title-holder") as HTMLElement;
const artistInputHolder = document.querySelector(
  "#artist-holder",
) as HTMLElement;
const sourceInputHolder = document.querySelector(
  "#source-holder",
) as HTMLElement;

const uploadIcon = document.querySelector("#upload-icon") as HTMLElement;
const uploadImageArea = document.querySelector(
  "#upload-image-area",
) as HTMLHtmlElement;

// For submitting all the image data (the title, artist name, and image file).
const submitButton = document.querySelector("#submit-button");

submitButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  // Check if inputs are filled out.
  switch (true) {
    case titleInput?.value === "":
      titleInputHolder?.classList.add("required");
      return;

    case artistInput?.value === "":
      artistInputHolder?.classList.add("required");
      return;

    case sourceInput?.value === "":
      sourceInputHolder?.classList.add("required");
      return;

    case fileInput?.files && fileInput.files.length === 0: // Did this so I can check the length without possible null.
      uploadIcon?.classList.add("required");
      return;
  }

  // Ignore the errors saying the inputs may be null. If they were null, the submit form wouldn't even go through
  // and would indicate to the user to give them a value.
  if (fileInput?.files) {
    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append("image_name", titleInput.value);
    formData.append("artist_name", artistInput.value);
    formData.append("image_source", sourceInput.value);
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // Clear the input fields after submission.
        titleInput.value = "";
        artistInput.value = "";
      }
    } catch (err) {
      console.error("Could not submit data.", err);
    }
  }
});
