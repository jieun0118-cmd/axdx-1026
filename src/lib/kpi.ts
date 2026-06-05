import type { SavedOutfit } from "./types";

export function calculateOutfitCompletionRate(
  outfits: SavedOutfit[]
): number {
  return outfits.length;
}