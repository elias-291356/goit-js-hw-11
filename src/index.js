// import { PixabayApiFetch } from "./gallery_api";
// import InfiniteScroll from 'infinite-scroll';
// import { Notify } from "notiflix";
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';


// const refs = {
//   formEl: document.querySelector(".search-form"),
//   userInputEl: document.querySelector('input[name="searchQuery"]'),
//   galleryEl: document.querySelector('.gallery'),
//   btnSearchel: document.querySelector('.btn-search'),
//   btnLoadMoreEl: document.querySelector('.js-load-more'),

// }
// refs.btnLoadMoreEl.classList.add("is-hidden");


// const lightbox = new SimpleLightbox('.gallery a');
// const pixabayApiFetch = new PixabayApiFetch();
// let page = 1;


// export function renderImages(data) {


//   const images = data.hits;// массив, который приходит из сервера записывается в images  и во время map  дестркт. нужных параметров, которые запишутся в разметку
//   const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//     return `<div class="gallery">
//     <div class="photo-card">
//       <a class="gallery_link" href="${largeImageURL}" >
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes: ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views: ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments: ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads: ${downloads}</b>
//           </p>
//         </div>
//       </a>
//     </div>
//   </div>`;
//   }).join('');


//   refs.galleryEl.innerHTML = markup;
//   let gallery = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//   })

// }




































// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';


// const refs = {
//   formEl: document.querySelector(".search-form"),
//   userInputEl: document.querySelector('input[name="searchQuery"]'),
//   galleryEl: document.querySelector('.gallery'),
//   btnSearchel: document.querySelector('.btn-search'),
//   btnLoadMoreEl: document.querySelector('.js-load-more'),

// }


// refs.formEl.addEventListener('submit', event => {
//   event.preventDefault();
//   const userInputValue = event.target.elements.searchQuery.value
//   // const userInputValue = refs.userInputEl.value;
//   // refs.btnLoadMoreEl.classList.remove('is-hidden')
//   searchImages(userInputValue);


// });


// function searchImages(userInputValue) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '39426539-25d6a4c73590ef834cf050f72';
//   const PARAMS = new URLSearchParams({
//     key: API_KEY,
//     q: userInputValue,
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: true,
//   });
//   const url = `${BASE_URL}?${PARAMS}`;



//   fetch(url)
//     .then(response => {
//       if (!response.ok) {

//         throw new Error(response.status)
//       }

//       // Notify.success(`Hooray! We found ${totalHits} images.`);
//       return response.json();
//     }).then(data => {

//       if (data.hits.length === 0) {

//         Notify.failure("Sorry, there are no images matching your search query. Please try again.");

//       } else {
//         Notify.success(`Request for "${userInputValue}" is founded.`);

//       }
//       renderImages(data);
//     }).catch(err => {
//       console.log("Error:", err)
//     })


// }


// function renderImages(data) {


//   const images = data.hits;// массив, который приходит из сервера записывается в images  и во время map  дестркт. нужных параметров, которые запишутся в разметку
//   const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//     return `<div class="gallery">
//     <div class="photo-card">
//       <a class="gallery_link" href="${largeImageURL}" >
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes: ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views: ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments: ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads: ${downloads}</b>
//           </p>
//         </div>
//       </a>
//     </div>
//   </div>`;
//   }).join('');


//   refs.galleryEl.innerHTML = markup;
//   let gallery = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//   })

// }


// console.log(refs.btnLoadMoreEl);

import { ImageSearch } from './gallery_api'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = {
  formEl: document.querySelector(".search-form"),
  userInputEl: document.querySelector('input[name="searchQuery"]'),
  galleryEl: document.querySelector('.gallery'),
  btnSearchel: document.querySelector('.btn-search'),
  btnLoadMoreEl: document.querySelector('.js-load-more'),
};
refs.formEl.addEventListener('submit', onSearchFormSubmit);
const imageSearch = new ImageSearch();



function onSearchFormSubmit(event) {
  event.preventDefault();
  const userInputValue = event.target.elements.searchQuery.value;
  imageSearch.q = userInputValue;
  imageSearch.page = 1;
  refs.galleryEl.innerHTML = '';
  imageSearch.searchImages(userInputValue).then(data => {
    if (data.hits.length === 0) {
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      Notiflix.Notify.success(`Request for "${userInputValue}" ${data.totalHits} is found.`);
    }
    renderImages(data);

    refs.btnLoadMoreEl.classList.remove('is-hidden');
  })
    .catch(err => {
      console.log("Error:", err);
    });;

}





let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

function renderImages(data) {
  const images = data.hits;
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="gallery">
        <div class="photo-card">
          <a class="gallery_link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
          </a>
        </div>
      </div>`;
  }).join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  gallery.refresh()
}

refs.btnLoadMoreEl.addEventListener('click', event => {
  event.preventDefault();

  imageSearch.page += 1;
  imageSearch.searchImages().then(data => {
    if (Math.ceil(data.totalHits / 40) < imageSearch.page) {
      refs.btnLoadMoreEl.classList.add('is-hidden');
      Notiflix.Notify.failure(`its all`); return
    }
    renderImages(data);


  })
    .catch(err => {
      console.log("Error:", err);
    });;
})