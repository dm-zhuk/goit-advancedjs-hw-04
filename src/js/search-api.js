import axios from 'axios';

const searchQuery = { value: '' };
const page = { value: 1 };
const perPage = 40;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '22046149-41a2515b5a783e6a5f4bfbfcc',
  per_page: perPage,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

async function fetchGallery(searchQuery) {
  try {
    const response = await axios.get('/', {
      params: {
        ...axios.defaults.params,
        q: searchQuery,
        page: page.value,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching images.');
  }
}

export { fetchGallery, page, perPage, searchQuery };
