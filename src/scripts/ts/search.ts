// Fetches a list of images and their data from the specified endpoint.
// Replace 'http://localhost:3000/api/images' with your actual API URL.
async function fetchAndDisplayImages() {
  try {
    const response = await fetch("http://localhost:3000/api/images");
    if (!response.ok) {
      throw new Error(`HTTP error occured. Status: ${response.status}`);
    }

    // Parse and use data to display images.
    await displayImages(await response.json());
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Takes an array of image data objects and displays them in the search result area.
async function displayImages(
  data: { image_name: string; file_source: string; artist: string }[],
) {
  const resultArea = document.querySelector("#search-result-area");
  const maxLength = 17;

  data.forEach((image) => {
    const searchResult = document.createElement("div");
    searchResult.classList.add("search-result");

    // If the image name or artist name is too long, truncate it and add an ellipsis.
    const truncatedName =
      image.image_name.length > maxLength
        ? image.image_name.substring(0, maxLength) + "..."
        : image.image_name;
    const truncatedArtist =
      image.artist.length > maxLength
        ? image.artist.substring(0, maxLength) + "..."
        : image.artist;
    searchResult.dataset.imageName = truncatedName;

    const resultImage = document.createElement("img");
    resultImage.classList.add("result-image");
    resultImage.src = image.file_source;

    const imageArtist = document.createElement("p");
    imageArtist.textContent = truncatedArtist;

    searchResult.append(resultImage, imageArtist);

    if (resultArea) {
      resultArea.appendChild(searchResult);
    }
  });
}

fetchAndDisplayImages();
