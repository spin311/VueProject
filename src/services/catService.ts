import type { CatData, Category } from '@/types/types'
import catApi from '@/services/catApi'
import { BannerType } from '@/types/types'
import { useBannerStore } from '@/stores/bannerStore'



export async function fetchCatData(num: number = 20): Promise<CatData[]> {
  const { addBannerMessage } = useBannerStore();
  try {
    return await catApi.fetchCatData(num);
  } catch (error: any) {
    addBannerMessage('Error fetching data, try reloading website : ' + error.message.toString(), BannerType.ERROR)
    console.error('Error fetching data: ', error);
  }
  return [];
}

export async function fetchCategories(): Promise<Category[]> {
  const { addBannerMessage } = useBannerStore();
  try {
    return await catApi.getCategories();
  } catch (error: any) {
    addBannerMessage('Error fetching categories: ' + error.message.toString(), BannerType.ERROR)
    console.error('Error fetching categories:', error);
  }
  return [];
}