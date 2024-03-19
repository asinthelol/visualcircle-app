async function saveImage(image) {
    try {
            const newImage = await ImagesTable.create({
            image_name: image.image_name,
            artist: image.artist,
            image_source: image.image_source,
            file_source: image.file_source
        });
    } catch(err) {
        console.error(`Error trying to save image: ${err}`);
    }
}

modlule.exports = saveImage;