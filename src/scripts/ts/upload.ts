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
  const validations = [
    {
      isValid: await validateInput(inputs.title, "titleInput"),
      holder: holders.title,
    },
    {
      isValid: await validateInput(inputs.artist, "artistInput"),
      holder: holders.artist,
    },
    {
      isValid: await validateInput(inputs.source, "sourceInput"),
      holder: holders.source,
    },
    { isValid: inputs.file?.files.length, holder: holders.image }, // tried putting this in validateInput, but it didn't work LOL
  ];
  const invalidInputs = validations.filter(({ isValid }) => !isValid);

  // If there are any invalid inputs, change the classes for all (invalid) inputs
  if (invalidInputs.length) {
    invalidInputs.forEach(({ holder }) => {
      holder?.classList.remove("valid");
      holder?.classList.add("required");
    });
    return;
  }

  // If all inputs are valid, change the classes for all of them
  validations.forEach(({ holder }) => {
    holder?.classList.remove("required");
    holder?.classList.add("valid");
  });

  // Append the data to the form data
  const appendFormData = (
    formData: FormData,
    fieldName: string,
    inputValue: string | File | undefined,
  ) => {
    if (inputValue) {
      formData.append(fieldName, inputValue);
    }
  };

  const formData = new FormData();
  appendFormData(formData, "image_name", inputs.title?.value);
  appendFormData(formData, "artist_name", inputs.artist?.value);
  appendFormData(formData, "image_source", inputs.source?.value);
  appendFormData(formData, "image", inputs.file?.files[0]);

  // Ignore the errors saying the inputs may be null. If they were null, the submit form wouldn't even go through
  // and would indicate to the user to give them a value.
  try {
    const res = await fetch("http://localhost:3000/api/upload", {
      // Change this to the API endpoint you'll use.
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
