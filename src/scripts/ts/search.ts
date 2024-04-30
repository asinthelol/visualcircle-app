// Fetches a list of images and their data from the specified endpoint.
// Replace 'http://localhost:3000/api/images' with your actual API URL.
async function fetchAndDisplayImages() {
  try {
    const response = await fetch("http://localhost:3000/api/images");
    if (!response.ok) {
      throw new Error(`HTTP error occured. Status: ${response.status}`);
    }

    await displayImages(await response.json());
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Takes an array of image data objects and displays them in the search result area.
async function displayImages(
  data: { image_name: string; file_source: string; artist: string }[],
) {
  const resultArea = document.querySelector(
    "#search-result-area",
  ) as HTMLElement;
  const maxLength = 17;

  data.forEach((image, index) => {
    const {
      image_name: imageName,
      artist: artist,
      file_source: source,
    } = image;
    const searchResult = document.createElement("div");
    searchResult.classList.add("search-result");

    // If the image name or artist name is too long, truncate it and add an ellipsis.
    const truncatedName =
      imageName.length > maxLength
        ? imageName.substring(0, maxLength) + "..."
        : imageName;
    const truncatedArtist =
      image.artist.length > maxLength
        ? artist.substring(0, maxLength) + "..."
        : artist;
    searchResult.dataset.imageName = truncatedName;

    // Create image and artist elements and append them to the search result.
    const resultImage = document.createElement("img");
    resultImage.classList.add("result-image");
    resultImage.src = source;
    resultImage.loading = "lazy";

    // create an anchor tag that links to the image page and surrounds the image.
    const imageLink = document.createElement("a");
    imageLink.classList.add("image-link");
    imageLink.href = `../images/${index + 1}.html`; // +1 because the image_id starts from 1.
    imageLink.appendChild(resultImage);

    const imageArtist = document.createElement("p");
    imageArtist.textContent = truncatedArtist;

    searchResult.append(imageLink, imageArtist);

    if (resultArea) {
      resultArea.appendChild(searchResult);
    }
  });
}
fetchAndDisplayImages();

// Displaying iamges based on the search bar input.
const resultArea = document.querySelector("#search-result-area") as HTMLElement;
const searchInput = document.querySelector("#search-bar") as HTMLInputElement;

searchInput.addEventListener("input", async () => {
  try {
    const input = searchInput.value.trim();

    if (input.length === 0) {
      resultArea.textContent = "";
      fetchAndDisplayImages();
      return;
    }
    const response = await fetch(`http://localhost:3000/api/search/${input}`);
    const results = await response.json();

    // Clear the search result area before displaying new results.
    resultArea.textContent = "";
    displayImages(results);
  } catch (err) {
    console.error("Failed fetching search results:", err);
  }
});