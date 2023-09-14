
export class ImageSearch {
  constructor() {
    this.q = '';
    this.page = 1;
    this.size = 40;

  }


  searchImages(userInputValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39426539-25d6a4c73590ef834cf050f72';
    const PARAMS = new URLSearchParams({
      key: API_KEY,
      q: this.q,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: this.page,
      page_size: this.size,
    });
    const url = `${BASE_URL}?${PARAMS}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })

  }



}