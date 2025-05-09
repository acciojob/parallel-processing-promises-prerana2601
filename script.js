const imageUrls = [
  'https://via.placeholder.com/200',
  'https://via.placeholder.com/250',
  'https://invalid.url/image.jpg', // this one is intentionally invalid to test error handling
  'https://via.placeholder.com/300'
];

const loadingDiv = document.getElementById('loading');
const outputDiv = document.getElementById('output');
const errorDiv = document.getElementById('error');

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
    img.src = url;
  });
}

function downloadImages(urls) {
  // Reset display
  errorDiv.textContent = '';
  outputDiv.innerHTML = '';
  loadingDiv.classList.remove('hidden');

  const imagePromises = urls.map(downloadImage);

  Promise.all(imagePromises)
    .then(images => {
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err;
    })
    .finally(() => {
      loadingDiv.classList.add('hidden');
    });
}

// Start downloading on load
downloadImages(imageUrls);
