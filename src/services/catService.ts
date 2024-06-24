import type { Breed, CatData } from '@/types/types'
import catApi from '@/services/catApi'
import { BannerType } from '@/types/types'
import { useBannerStore } from '@/stores/bannerStore'
import axios from 'axios'


// call and handle the catApi fetchCatData function
export async function fetchCatData(num: number = 20, params: any = {limit: num}): Promise<CatData[]> {
  const { addBannerMessage } = useBannerStore();
  try {
    return await catApi.fetchCatData(num, params);
  } catch (error: any) {
    addBannerMessage('Error fetching data, try reloading website : ' + error.message.toString(), BannerType.ERROR)
  }
  return [];
}

// call and handle the catApi getBreeds function
export async function fetchBreeds(): Promise<Breed[]> {
  try {
    return await catApi.getBreeds();
  } catch (error: any) {
    const { addBannerMessage } = useBannerStore();
    addBannerMessage('Error fetching cat breeds: ' + error.message.toString(), BannerType.ERROR)
  }
  return [];
}

// use proxy because the cat API does not allow direct download
export function downloadImage(catUrl: string): void {
  const { addBannerMessage } = useBannerStore();

  // when testing locally, uncomment the following line and delete current serverUrl to use the local server
  //const serverUrl: string = '`http://localhost:3000';

  const serverUrl = 'https://vueproject-1n1m.onrender.com';
  const proxyUrl: string = `${serverUrl}/download?url=${encodeURIComponent(catUrl)}`;

  axios({
    url: proxyUrl,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', catUrl.split('/').pop() || 'cat.jpg');
    document.body.appendChild(link);
    link.click();
    addBannerMessage('image downloaded successfully!', BannerType.SUCCESS);
  }).catch((error) => {
    addBannerMessage('error downloading the image: ' + error.message.toString(), BannerType.ERROR);
    console.error('Error downloading the image: ', error);
  });
}