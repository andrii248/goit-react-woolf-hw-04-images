import axios from 'axios';

const MY_KEY = '28802663-ddb0f5d28ea31cc45b363b962';
const API_URL = 'https://pixabay.com/api/';

async function FetchData(name, page, per_page) {
  const response = await axios.get(
    `${API_URL}?q=${name}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );

  return response.data;
}

export default FetchData;
