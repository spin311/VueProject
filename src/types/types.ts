export interface CatData {
  id: string,
  breeds?: Breed[],
  url: string, //image url
  isFavorite?: boolean
}

export interface Breed {
  id: string,
  name: string,
  description: string,
  temperament: string,
}

export interface Banner {
  id: string,
  message: string,
  type: BannerType
}

export enum BannerType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}