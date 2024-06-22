import type { Breed, CatData, Category } from '@/types/types'
import catApi from '@/services/catApi'
import { BannerType } from '@/types/types'
import { useBannerStore } from '@/stores/bannerStore'



export async function fetchCatData(num: number = 20, params: any = {limit: num}): Promise<CatData[]> {
  const { addBannerMessage } = useBannerStore();
  try {
    return await catApi.fetchCatData(num, params);
  } catch (error: any) {
    addBannerMessage('Error fetching data, try reloading website : ' + error.message.toString(), BannerType.ERROR)
  }
  return [];
}

export async function fetchBreeds(): Promise<Breed[]> {
  try {
    return await catApi.getBreeds();
  } catch (error: any) {
    const { addBannerMessage } = useBannerStore();
    addBannerMessage('Error fetching cat breeds: ' + error.message.toString(), BannerType.ERROR)
  }
  return [];
}