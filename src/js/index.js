import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchGallery, page, perPage, searchQuery } from './search-api';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

let totalHits = 0;

async function handleFormSubmit(evt) {
  evt.preventDefault();

  page.value = 1;
  totalHits = 0;
  const query = evt.currentTarget.elements.searchQuery.value.trim();
  searchQuery.value = query;

  if (searchQuery.value === '') {
    showError('⁉️ Please enter your search query.');
    return;
  }

  clearGallery();
  await searchImages();
  showLoadMoreBtn();
}

async function searchImages() {
  try {
    const data = await fetchGallery(searchQuery.value);

    if (data.hits.length === 0) {
      showNoResults();
      return;
    }

    totalHits = data.totalHits;
    renderGallery(data.hits);

    if (totalHits > 0 && page.value === 1) {
      showSuccessMessage();
    }
  } catch (error) {
    showError(error.message);
  }
}

function loadMoreImages() {
  page.value += 1;
  searchImages();

  // Smooth scroll up two cards height
  setTimeout(() => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 500);
}

function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
        tags,
      }) => `
      <a class="card-item" href="${largeImageURL}" data-lightbox="gallery-item" aria-role="button" >
      <div class="card-box">
            <img src="${webformatURL}" class="card-img" alt="${tags}" loading="lazy" />
            </div>
            <div class="info">
            <p class="info-item">
            <b>likes</b> ${likes}</p>
            <p class="info-item">
            <b>views</b> ${views}</p>
            <p class="info-item">
            <b>comments</b> ${comments}</p>
            <p class="info-item"><b>downloads</b> ${downloads}</p>
            </div>
            </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  const totalDisplayed = page.value * perPage;

  if (totalHits <= totalDisplayed) {
    hideLoadMoreBtn();
    showEndMessage();
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  const totalDisplayed = page.value * perPage;
  const isLastPage = totalHits <= totalDisplayed;

  loadMoreBtn.style.display = isLastPage ? 'none' : 'block';
  showSuccessMessage.enabled = !isLastPage;

  if (!isLastPage) {
    lightbox.refresh();
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showError(message) {
  iziToast.error({
    message: message,
  });
}

function showSuccessMessage() {
  iziToast.success({
    message: `🎉 Hooray! We found ${totalHits} images.`,
  });
}

function showNoResults() {
  iziToast.warning({
    message: `🧐 Sorry, there are no images matching your search query. Please try again.`,
  });
}

function showEndMessage() {
  setTimeout(() => {
    iziToast.info({
      message: `We're sorry, but you've reached the end of ${totalHits} search results.`,
      position: 'bottomCenter',
      timeout: 4000,
    });
  }, 4000);
}

iziToast.settings({
  messageColor: 'rgb(22, 24, 61)',
  position: 'topRight',
  timeout: 2500,
  closeOnEscape: true,
  animateInside: true,
  drag: true,
  pauseOnHover: true,
  progressBarEasing: 'linear',
  overlay: false,
  overlayClose: false,
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

console.log(fetchGallery());
