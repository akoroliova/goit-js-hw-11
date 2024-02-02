import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const apiKey = '42062449-cea48752956c1d9094f31db98';
const searchForm = document.querySelector('form.search-form');
const loaderElement = document.querySelector('.loader');
const imagesList = document.querySelector('.gallery');
const lightboxInstance = new SimpleLightbox('.gallery .gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  imagesList.innerHTML = '';

  let imagesResultingArray = [];

  const userQuery = encodeURIComponent(
    event.target.elements['search-field'].value
  );

  function fetchImages() {
    return fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${userQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  fetchImages()
    .then(data => {
      if (data.total === 0) {
        hideLoader();
        iziToast.error({
          position: 'topRight',
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
        });
      } else {
        const imagesInitialArray = data.hits;

        imagesResultingArray = imagesInitialArray.map(eachObject => {
          return {
            href: eachObject.largeImageURL,
            src: eachObject.webformatURL,
            alt: eachObject.tags,
            likes: eachObject.likes,
            views: eachObject.views,
            comments: eachObject.comments,
            downloads: eachObject.downloads,
          };
        });
        hideLoader();
        renderImages(imagesResultingArray);
        searchForm.reset();
      }
    })
    .catch(error => {
      console.log(error);
      hideLoader();
    });

  function renderImages(imagesResultingArray) {
    const liElements = imagesResultingArray
      .map(image => {
        return `<li class="gallery-card">
      <a class="gallery-link" href="${image.href}">
        <img class="gallery-image" src="${image.src}" alt="${image.alt}" />
        <div class="image-stats-card">
          <div class="image-stats-block">
            <p>Likes</p>
            ${image.likes}
          </div>
          <div class="image-stats-block">
            <p>Views</p>
            ${image.views}
          </div>
          <div class="image-stats-block">
            <p>Comments</p>
            ${image.comments}
          </div>
          <div class="image-stats-block">
            <p>Downloads</p>
            ${image.downloads}
          </div>
        </div>
      </a>
    </li>`;
      })
      .join('');
    imagesList.insertAdjacentHTML('beforeend', liElements);

    lightboxInstance.refresh();
  }
}
searchForm.addEventListener('submit', handleSubmit);

function showLoader() {
  loaderElement.style.display = 'block';
}
function hideLoader() {
  loaderElement.style.display = 'none';
}
