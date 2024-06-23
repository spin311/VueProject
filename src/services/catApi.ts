import axios from 'axios';
import type { Breed, CatData } from '@/types/types'

// Create an axios instance with the cat api
const catApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_CAT_API_KEY,
  },
});

function mapBreedData(breed: any): Breed {
  return {
    id: breed.id,
    name: breed.name,
    description: breed.description,
    temperament: breed.temperament,
  };
}

// Add a response interceptor to log errors
catApi.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.error(error);
  return Promise.reject(error);
});

export default {

  getData(endpoint: string, params = {}){
    return catApi.get(endpoint, { params });
  },

  // fetch and map cat data with params, default limit 10
  async fetchCatData(num: number = 10, params: any = {limit: num}): Promise<CatData[]> {
    return this.getData('/images/search', params).then(
      (response) => response.data.map((item: any) => ({
        id: item.id,
        breeds: item.breeds.map(mapBreedData),
        url: item.url,
        isFavorite: false
      }))
    );

  },

  async getBreeds() {
    return catApi.get('/breeds').then((response) => response.data.map(mapBreedData));
    },
}