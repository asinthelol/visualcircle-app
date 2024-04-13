const titleInput = document.querySelector("#upload-title") as HTMLInputElement;
const artistInput = document.querySelector(
  "#upload-artist",
) as HTMLInputElement;
const fileInput = document.querySelector("#upload-input") as HTMLInputElement;
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

const uploadIcon = document.querySelector("#upload-icon") as HTMLElement;
const uploadImageArea = document.querySelector(
  "#upload-image-area",
) as HTMLHtmlElement;

const submitButton = document.querySelector("#submit-button");



// Make requuest to server to check if input meets requirements
// (less or equal to than 32 characters for title and artist, and less than or equal to 2048 characters for title).
async function validateInput(input: HTMLInputElement, inputName: string) {
  try {
    // Validating if there is a file input
    if (input.type === "file" && !input.files?.length) {
      return false;
    }

    const response = await fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "type": inputName,
        "data": input.value,
      }),
    });

    console.log(response);
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
  const isValidTitle = await validateInput(titleInput, "titleInput");
  const isValidArtist = await validateInput(artistInput, "artistInput");
  const isValidSource = await validateInput(sourceInput, "sourceInput");

  // Check if inputs are filled out
  switch (true) {
    case !fileInput?.files || fileInput.files.length === 0:
      uploadImageArea?.classList.remove("valid");
      uploadImageArea?.classList.add("required");
      return;
    case !isValidTitle:
      titleInputHolder?.classList.remove("valid");
      titleInputHolder?.classList.add("required");
      return;
    case !isValidArtist:
      artistInputHolder?.classList.remove("valid");
      artistInputHolder?.classList.add("required");
      return;
    case !isValidSource:
      sourceInputHolder?.classList.remove("valid");
      sourceInputHolder?.classList.add("required");
      return;
    default:
      titleInputHolder?.classList.remove("required");
      artistInputHolder?.classList.remove("required");
      sourceInputHolder?.classList.remove("required");
      uploadImageArea?.classList.remove("required");
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
      const res = await fetch("http://localhost:3000/api/upload", { // In your code, change this to the actual URL.
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // Redirects user to the homepage after submission.
        window.location.href = "../search/search.html"; // Change this to the actual URL.
      }
    } catch (err) {
      console.error("Could not submit data.", err);
    }
  } else {
    uploadImageArea?.classList.add("required");
    return;
  }
});
