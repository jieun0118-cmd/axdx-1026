import { describe, expect, it } from "vitest";
import { calculateOutfitCompletionRate } from "../lib/kpi";
import type { SavedOutfit } from "../lib/types";

describe("calculateOutfitCompletionRate", () => {
  it("저장된 코디가 없으면 0을 반환한다", () => {
    const outfits: SavedOutfit[] = [];
    expect(calculateOutfitCompletionRate(outfits)).toBe(0);
  });

  it("저장된 코디가 1개 있으면 1을 반환한다", () => {
    const outfits: SavedOutfit[] = [
      {
        id: "saved-1",
        savedAt: "2025-06-06T10:00:00Z",
        outfit: {
          id: "outfit-1",
          reason: "캐주얼 추천",
          createdAt: "2025-06-06T09:00:00Z",
          items: [],
        },
      },
    ];
    expect(calculateOutfitCompletionRate(outfits)).toBe(1);
  });

  it("저장된 코디가 여러 개 있으면 개수를 반환한다", () => {
    const outfits: SavedOutfit[] = [
      { id: "saved-1", savedAt: "2025-06-06T10:00:00Z", outfit: { id: "outfit-1", reason: "캐주얼 추천", createdAt: "2025-06-06T09:00:00Z", items: [] } },
      { id: "saved-2", savedAt: "2025-06-06T11:00:00Z", outfit: { id: "outfit-2", reason: "미니멀 추천", createdAt: "2025-06-06T10:30:00Z", items: [] } },
      { id: "saved-3", savedAt: "2025-06-06T12:00:00Z", outfit: { id: "outfit-3", reason: "스트릿 추천", createdAt: "2025-06-06T11:30:00Z", items: [] } },
    ];
    expect(calculateOutfitCompletionRate(outfits)).toBe(3);
  });

  it("반환 타입은 number이다", () => {
    expect(typeof calculateOutfitCompletionRate([])).toBe("number");
  });
});