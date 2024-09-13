export interface Product {
  name: string;
  minRate: number;
  maxRate: number;
  modelRate: number;
}

export interface dailyData {
  date: string;
  location: string;
  products: Product[];
}

export interface FetchResponse {
  status: number;
  data?: string;
  error?: string;
}

export interface ArecaData extends Array<dailyData> {}
