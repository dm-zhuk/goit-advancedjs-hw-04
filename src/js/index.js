import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// e.g. Message with a callback
Notiflix.Notify.success('Click Me', function cb() {
  // callback
});

// Зробити плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
