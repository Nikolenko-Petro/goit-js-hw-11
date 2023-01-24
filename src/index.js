import { fetchImages } from './js/fetchImg';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let pageNumber = 1;
btnLoadMore.style.display = 'none';

// Кнопка пошуку

function onBtnSearch(e) {
  e.preventDefault();
  cleanGallery();
  const inputValue = input.value;

  if (inputValue !== '') {
    fetchImages(inputValue, pageNumber).then(foundData => {
      if (foundData.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(foundData.data.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.data.total} images.`
        );
        btnLoadMore.style.display = 'flex';
      }
    });
  }
}

// Кнопка Завантажити більше

function onBtnLoadMore() {
  pageNumber++;
  const inputValue = input.value;
  fetchImages(inputValue, pageNumber).then(foundData => {
    if (foundData.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundData.data.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.data.total} images.`
      );
    }
  });
}

// Cтворення розмітки

function renderImageList(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
               <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
                <div class="info">
                   <p class="info-item"> <b>Likes</b>
                    <span class="info-item-api"> ${image.likes} </span></p>
                    <p class="info-item">
                        <b>Views</b> <span class="info-item-api">${image.views}</span>  
                    </p>
                    <p class="info-item">
                        <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
                    </p>
                </div>
            </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}

// Слухачі

btnLoadMore.addEventListener('click', onBtnLoadMore);
btnSearch.addEventListener('click', onBtnSearch);
