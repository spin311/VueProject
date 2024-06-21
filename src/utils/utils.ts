import { BannerType } from '@/types/types'
import { useBannerStore } from '@/stores/bannerStore'

export function getGuid(): string {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export function createBannerMessage(message: string, bannerType: BannerType): void {
  const { addBannerMessage } = useBannerStore();
  addBannerMessage(message, bannerType);
}