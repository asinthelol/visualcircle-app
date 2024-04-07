var titleInput = document.querySelector("#upload-title");
var artistInput = document.querySelector("#upload-artist");
var sourceInput = document.querySelector("#upload-source");
var titleCounter = document.querySelector("#title-counter");
var artistCounter = document.querySelector("#artist-counter");
var titleInputHolder = document.querySelector("#title-holder");
var artistInputHolder = document.querySelector("#artist-holder");
var sourceInputHolder = document.querySelector("#source-holder");
function updateCharacterCount(input, counter) {
    counter.textContent = "".concat(input.value.length, "/32");
    if (input.value.length > 32) {
        counter.textContent = "32/32";
    }
}
// Event listeners to update character count when typing in the input fields, and to
// remove the required class once an input has been made.
var characterLimit = 31; // -1 for both because index is 0.
var urlLimit = 2047;
titleInput.addEventListener("input", function () {
    updateCharacterCount(titleInput, titleCounter);
    if (titleInput.value !== "") {
        titleInputHolder.classList.remove("required");
    }
    if (titleInput.value.length > characterLimit) {
        titleInput.value = titleInput.value.slice(0, characterLimit);
    }
});
artistInput.addEventListener("input", function () {
    updateCharacterCount(artistInput, artistCounter);
    if (artistInput.value !== "") {
        artistInputHolder.classList.remove("required");
    }
    if (artistInput.value.length > characterLimit) {
        artistInput.value = artistInput.value.slice(0, characterLimit);
    }
});
// Also put source eventListener here because it's convenient
sourceInput.addEventListener("input", function () {
    if (sourceInput.value !== "") {
        sourceInputHolder.classList.remove("required");
    }
    if (sourceInput.value.length > urlLimit) {
        sourceInput.value = sourceInput.value.slice(0, urlLimit);
    }
});
