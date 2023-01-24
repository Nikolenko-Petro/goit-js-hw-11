import axios from 'axios';

export const fetchImages = async (inputValue, pageNumber) => {
  try {
    const respons = await axios.get(
      `https://pixabay.com/api/?key=33057198-d6ad5b417f16fab9baf60478d&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumber}`
    );
    return respons;
  } catch (error) {
    console.error(error);
  }
};
