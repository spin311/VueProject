import {defineStore} from 'pinia';
import { computed, type ComputedRef, type Ref, ref, type UnwrapRef } from 'vue';
import type { CatData, Category, Banner } from '@/types/types';
import { BannerType } from '@/types/types';
import catApi from '@/services/catApi';

export const useHomeStore = defineStore('home', () => {
  const isLoading: Ref<boolean> = ref(false);
  const catData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const categories: Ref<UnwrapRef<Category[]>> = ref([]);
  const hasCatData: ComputedRef<boolean> = computed((): boolean => catData.value.length > 0);
  const hasCategories: ComputedRef<boolean> = computed((): boolean => categories.value.length > 0);
  const banners: Ref<UnwrapRef<Set<Banner>>> = ref(new Set<Banner>());

  function toggleFavorite(catId: string): void {
    const catIndex: number = catData.value.findIndex((cat: CatData): boolean => cat.id === catId);
    catData.value[catIndex].isFavorite = !catData.value[catIndex].isFavorite;
  }

  //TODO move to Composable
  function addBannerMessage(message: string, bannerType: BannerType): void {
    const errorBanner: Banner = {
      id: getGuid(),
      message: message,
      type: bannerType
    }
    addBanner(errorBanner)
  }

  function addBanner(banner: Banner): void {
    banners.value.add(banner);
  }
  function removeBanner(banner: Banner): void {
    banners.value.delete(banner);
  }

  async function fetchCatData(num: number = 20): Promise<void> {
    isLoading.value = true;
    try {
      const data: CatData[] = await catApi.fetchCatData(num);
      catData.value = data;
    } catch (error: any) {
      addBannerMessage('Error fetching data : ' + error.message.toString(), BannerType.error)
      console.error('Error fetching data: ', error);
    } finally {
      isLoading.value = false;
    }
  }

  //TODO move to Composable
  function getGuid(): string {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  async function getCategories(): Promise<void> {
    try {
      const data: Category[] = await catApi.getCategories();
      categories.value = data;
    } catch (error: any) {
      addBannerMessage('Error fetching categories: ' + error.message.toString(), BannerType.error)
      console.error('Error fetching categories:', error);
    }
  }

  return {
    isLoading,
    catData,
    categories,
    hasCatData,
    hasCategories,
    banners,
    removeBanner,
    toggleFavorite,
    fetchCatData,
    getCategories
  }
});