export interface ProductChange {
  dir: "up" | "down" | "none" | string;
  pct: number;
}

export interface Market {
  name?: string;
  price?: number;
  [key: string]: unknown;
}

export interface Product {
  id: string | number;
  category?: string;
  categoryIcon?: string;
  categoryNameBn?: string;
  nameBn: string;
  slug?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: ProductChange;
  markets?: Market[];
}