const resultArea = document.querySelector("#search-result-area") as HTMLElement;
const searchInput = document.querySelector("#search-bar") as HTMLInputElement;
let allImages: { image_name: string; file_source: string; }[] = [];

// Fetches a list of images and their data from the specified endpoint.
// Replace 'http://localhost:3000/api/images' with your actual API URL.
async function fetchAndDisplayImages() {
  try {
    const response = await fetch("http://localhost:3000/api/images");
    if (!response.ok) {
      throw new Error(`HTTP error occured. Status: ${response.status}`);
    }

    allImages = await response.json();
    displayImages(allImages);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Takes an array of image data objects and displays them in the search result area.
async function displayImages(
  data: { image_name: string; file_source: string; }[],
) {
  const maxLength = 10;

  const fragment = document.createDocumentFragment();

  data.forEach((image) => {
    const { image_name: name, file_source: source } = image;
    const searchResult = document.createElement("div");
    searchResult.classList.add("search-result");

    // If the image name or artist name is too long, truncate it and add an ellipsis.
    const truncatedName =
      name.length > maxLength
        ? name.substring(0, maxLength) + "..."
        : name;

    // Create an element to display the image name.
    const imageName = document.createElement("p");
    imageName.classList.add("image-name");
    imageName.textContent = truncatedName;

    // Create image and append it to the search result.
    const resultImage = document.createElement("img");
    resultImage.classList.add("result-image");
    resultImage.src = source;
    resultImage.loading = "lazy";

    // Create a download button
    const downloadButton = document.createElement("span");
    downloadButton.classList.add("material-symbols-outlined", "download-button");
    downloadButton.textContent = "download";

    const downloadLink = document.createElement("a");
    downloadLink.href = source;
    downloadLink.download = name;
    downloadLink.appendChild(downloadButton);

    // Create a div for the image name and (future) download button.
    const interactHolder = document.createElement("div");
    interactHolder.classList.add("interact-holder");
    interactHolder.append(imageName, downloadLink);

    searchResult.append(resultImage, interactHolder);

    fragment.appendChild(searchResult);
  });

  resultArea.textContent = '';
  resultArea.appendChild(fragment);
}

fetchAndDisplayImages();

// Displaying iamges based on the search bar input.
searchInput.addEventListener("input", async () => {
  try {
    const input = searchInput.value.trim();

    if (input.length === 0) {
      displayImages(allImages);
      return;
    }
    const response = await fetch(`http://localhost:3000/api/search/${input}`);
    const results = await response.json();

    displayImages(results);
  } catch (err) {
    console.error("Failed fetching search results:", err);
  }
});