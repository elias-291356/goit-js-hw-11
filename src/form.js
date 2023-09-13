

const refs = {
  formEl: document.querySelector(".search-form"),
  userInputEl: document.querySelector('input[name="searchQuery"]'),

}

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  const userInputValue = refs.userInputEl.value;
  searchImages(userInputValue);
});

function searchImages(userInputValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '39426539-25d6a4c73590ef834cf050f72';
  const PARAMS = new URLSearchParams({
    key: API_KEY,
    q: userInputValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  });
  const url = `${BASE_URL}?${PARAMS}`;

  console.log(url);

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json();
    }).then(data => {
      if (data.hits.length === 0) {
        alert("Sorry, there are no images matching your search query. Please try again.");
      }
      console.log(data);
    }).catch(err => {
      console.log("Error:", err)
    })


}









//

// key
// q
// image_type
// orientation
// safesearch



// =====================


// webformatURL
// largeImageURL
// tags
// likes
// views
// comments
// downloads 