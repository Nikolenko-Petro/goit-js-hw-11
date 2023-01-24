export const fetchImages = (inputValue, pageNumber) => {
  return fetch(
    `https://pixabay.com/api/?key=33057198-d6ad5b417f16fab9baf60478d&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumber}`
  )
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};
