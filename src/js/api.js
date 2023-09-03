import axios from 'axios';
// import { valueInput, currentPage } from './src/index';

async function searchItem(currentPage, valueInput) {
  const BASE_URL = `https://pixabay.com/api/?`;

  const searchPreset = new URLSearchParams({
    key: '39112549-9be01c761947c728d2f4fc4eb',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  });

  const resp = await axios.get(`${BASE_URL}${searchPreset}`);
  console.log(`${BASE_URL}${searchPreset}`);

  return resp.data;
}

export { searchItem };
