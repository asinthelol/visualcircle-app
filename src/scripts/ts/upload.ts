const inputs = {
  title: document.querySelector("#upload-title") as HTMLInputElement,
  file: document.querySelector("#upload-input") as HTMLInputElement,
  source: document.querySelector("#upload-source") as HTMLInputElement,
};

const counters = {
  title: document.querySelector("#title-counter") as HTMLElement,
};

const holders = {
  title: document.querySelector("#title-holder") as HTMLElement,
  source: document.querySelector("#source-holder") as HTMLElement,
  image: document.querySelector("#upload-image-area") as HTMLElement,
};

const submitButton = document.querySelector("#submit-button");

async function validateInputs() {
  const validations = [
    { input: inputs.title, type: "titleInput", holder: holders.title },
    { input: inputs.source, type: "sourceInput", holder: holders.source },
    { input: inputs.file, type: "fileInput", holder: holders.image },
  ];

  const results = await Promise.all(validations.map(async ({ input, type, holder }) => {
    if (type === "fileInput") {
      return input?.files.length > 0;
    }
    return await validateInput(input, type, holder);
  }));

  return results.every((result) => result); // If all are valid, return true, else false
}

// Validate a specific input using the API
async function validateInput(input: HTMLInputElement | null, inputName: string, holder: HTMLElement) {
  if (!input) return false;
  try {
    const response = await fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: inputName, data: input.value }),
    });
    const isValid = response.ok;
    holder.classList.toggle("error", !isValid);
    return isValid;
  } catch (err) {
    console.error("Failed to validate input:", err);
    return false;
  }
}

// For submitting all the image data (the title and image file).
submitButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  const isValid = await validateInputs();
  if (!isValid) return alert("Please fix the validation errors before submitting.");

  // Append the data to form data after validation
  const formData = new FormData();
  formData.append("image_name", inputs.title?.value || "");
  formData.append("image_source", inputs.source?.value || "");
  formData.append("image", inputs.file?.files[0] || "");

  try {
    const res = await fetch("http://localhost:3000/api/upload", {
      // Change this to the API endpoint you'll use.
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      window.location.href = "../search/search.html";
    } else {
      console.error("Failed to upload data.");
    }
  } catch (err) {
    console.error("Could not submit data.", err);
  }
});
