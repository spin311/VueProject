import axios from 'axios';

const catApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_CAT_API_KEY,
  },
});

export default {
  getData(endpoint: string, params = {}){
    return catApi.get(endpoint, { params });
  },
  fetchImagesUrls(numImages: number): Promise<string[]> {
    return this.getData('/images/search', { limit: numImages }).then(
      (response) => response.data.map((catObj: { url: string }) => catObj.url)
    );
  },
  fetchCatData(num: number = 10): Promise<CatData[]> {
    return this.getData('/images/search', { limit: num }).then(
      (response) => response.data.map((item: any) => ({
        id: item.id,
        breeds: item.breeds.map((breed: any) => ({
          id: breed.id,
          name: breed.name,
          description: breed.description,
          wikipedia_url: breed.wikipedia_url,
        })),
        url: item.url,
      }))
    );

  },
  getImages() {
    return catApi.get(`/images/search`);
  },
  getBreeds() {
    return catApi.get('/breeds');
  },
  getFavorites() {
    return catApi.get('/favourites');
  }
}