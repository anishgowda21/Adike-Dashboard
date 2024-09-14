export interface Product {
  name: string;
  minRate: number;
  maxRate: number;
  modelRate: number;
}

export interface DailyData {
  date: string;
  location: string;
  products: Product[];
}

export type ArecaData = DailyData[];
