import type { Outfit, SavedOutfit } from "./types";

export class MockOutfitRepository {
  private readonly savedOutfits: SavedOutfit[] = [];

  save(outfit: Outfit): SavedOutfit {
    const savedOutfit: SavedOutfit = {
      id: crypto.randomUUID(),
      outfit,
      savedAt: new Date().toISOString(),
    };
    this.savedOutfits.push(savedOutfit);
    return savedOutfit;
  }

  getAll(): SavedOutfit[] {
    return [...this.savedOutfits];
  }

  saveById(id: string): void {
    const exists = this.savedOutfits.some(
      (savedOutfit) =>
        savedOutfit.id === id || savedOutfit.outfit.id === id
    );
    if (!exists) {
      throw new Error("Outfit not found");
    }
  }
}