import axios from 'axios';

export const fetchImages = (inputValue, pageNumber) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=33057198-d6ad5b417f16fab9baf60478d&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumber}`
    )
    .catch(error => {
      console.error(error);
    });
};
