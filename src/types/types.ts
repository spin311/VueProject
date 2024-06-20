interface CatData {
  id: string,
  breeds: Breed[],
  url: string,
}

interface Breed {
  id: string,
  name: string,
  description: string,
  wikipedia_url: string,
}