import type { CatData, Category } from '@/types/types'
import catApi from '@/services/catApi'
import { BannerType } from '@/types/types'
import { createBannerMessage } from '@/utils/utils'



export async function fetchCatData(num: number = 20): Promise<CatData[]> {
  try {
    return await catApi.fetchCatData(num);
  } catch (error: any) {
    createBannerMessage('Error fetching data, try reloading website : ' + error.message.toString(), BannerType.error)
    console.error('Error fetching data: ', error);
  }
  return [];
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    return await catApi.getCategories();
  } catch (error: any) {
    createBannerMessage('Error fetching categories: ' + error.message.toString(), BannerType.error)
    console.error('Error fetching categories:', error);
  }
  return [];
}