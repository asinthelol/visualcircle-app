const { shell } = require('electron');

const downloadButton = document.querySelector('#download-button') as HTMLButtonElement;
const downloadHyperlink = document.querySelector('#download-link') as HTMLAnchorElement;

downloadButton.addEventListener('click', () => {
  downloadHyperlink.click();
});

