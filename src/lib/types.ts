// src/lib/types.ts

export interface UserProfile {
  height: number;
  weight: number;
  style: string;
}

export interface OutfitItem {
  category: string;
  name: string;
  price: number;
  purchaseUrl: string;
}

export interface Outfit {
  id: string;
  items: OutfitItem[];
  reason: string;
  createdAt: string;
}

export interface SavedOutfit {
  id: string;
  outfit: Outfit;
  savedAt: string;
}