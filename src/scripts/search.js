// Fetches a list of images and their data from the specified endpoint.
// Replace 'http://localhost:3000/api/images' with your actual API URL.
async function fetchAndDisplayImages() {
    try {

        // Fetch data from the API endpoint.
        const response = await fetch('http://localhost:3000/api/images');

        // Successful response check.
        if (!response.ok) { console.error(`HTTP error occured. Status: ${response.status}`); }

        // Parse and use data to display images.
        const data = await response.json();
        await displayImages(data);

    } catch (error) { console.error('Error fetching images:', error); }
}

// Takes an array of image data objects and displays them in the search result area.
async function displayImages(data) {

    const result_area = document.querySelector('#search-result-area');

    for(let image of data) {
        const search_result = document.createElement('div');
        search_result.classList.add('search-result');
        search_result.dataset.imageName = image.image_name;

        let result_image = document.createElement('img');
        result_image.classList.add('result-image');
        result_image.src = image.file_source;
        
        let image_artist = document.createElement('p');
        image_artist.textContent = image.artist;

        search_result.appendChild(result_image);
        search_result.appendChild(image_artist);

        result_area.appendChild(search_result);
    }
}



fetchAndDisplayImages();