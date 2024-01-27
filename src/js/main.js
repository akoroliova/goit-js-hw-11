import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const apiKey = '42062449-cea48752956c1d9094f31db98';
const searchForm = document.querySelector('form.search-form');
const imagesList = document.querySelector('.gallery');

function handleSubmit(event) {
  event.preventDefault();

  const userQuery = encodeURIComponent(
    event.target.elements['search-field'].value
  );

  fetchImages()
    .then(
      //У відповіді у властивості hits - масив зображень. Треба дістати з масиву зображень тільки потрібні параметри (href, src, alt, title, largeImgLink)
      images => {
        const images = response.hits;
      }
    )
    .then(
      //Потім треба створити HTML-розмітку і додати її в DOM у якийсь уже наявний елемент:
      images => renderImages(images)
    )
    .then(searchForm.reset())
    .catch(error => {
      console.log(error);
      //якщо бекенд повернув порожній масив, показуй iziToast з текстом 'Sorry, there are no images matching your search query. Please, try again!'
      // if (enteredText === '') {
      //   iziToast.error({
      //     position: 'topRight',
      //     title: '',
      //     message:
      //       'Sorry, there are no images matching your search query. Please, try again!',
      //   });
      // } else {};
    });

  function fetchImages() {
    return fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${userQuery}&image_type="photo"&orientation="horizontal"&safesearch=true`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return console.log(response.json());
    });
  }

  function renderImages(images) {
    // const liElements = images
    //   .map(image => {
    //     return `<li>
    //     <a href="${image.previewURL}"><img src="${image.previewURL}" alt="${image.desc}" title="${image.name}" /></a>
    //     </li>`;
    //   })
    //   .join('');
    // imagesList.insertAdjacentHTML('beforeend', liElements);
  }
}

searchForm.addEventListener('submit', handleSubmit);

//Перед пошуком за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати запитів.

//При сабміті форми перед відправкою запиту на бекенд з’являється індикатор завантаження з css-loader та очищаються попередні результати пошуку на сторінці. Після отримання відповіді від бекенда зникає індикатор завантаження та на сторінці

//додаємо роботу ліби SimpleLightbox:
// const lightboxInstance = new SimpleLightbox('div.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });
// При кліку на маленьке зображення в галереї відкривається його збільшена версія у модальному вікні з використанням бібліотеки SimpleLightbox
//Після додавання нових елементів до списку зображень на екземплярі SimpleLightbox викликається метод refresh()
