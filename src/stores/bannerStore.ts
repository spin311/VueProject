import {defineStore} from 'pinia';
import { type Ref, type UnwrapRef, watch } from 'vue'
import type { Banner } from '@/types/types'
import { ref } from 'vue'
import { BannerType } from '@/types/types'
import { getGuid } from '../utils/utils';

export const useBannerStore = defineStore('banner', () => {
  const banners: Ref<UnwrapRef<Set<Banner>>> = ref(new Set<Banner>());


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

  return { banners, addBannerMessage, removeBanner }

});