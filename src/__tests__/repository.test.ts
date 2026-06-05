import { describe, expect, it } from "vitest";
import { MockOutfitRepository } from "../lib/repository";
import type { Outfit } from "../lib/types";

describe("MockOutfitRepository", () => {
  const createOutfit = (): Outfit => ({
    id: "outfit-1",
    reason: "캐주얼 스타일 추천",
    createdAt: "2025-06-06T10:00:00Z",
    items: [
      {
        category: "상의",
        name: "오버핏 셔츠",
        price: 39000,
        purchaseUrl: "https://example.com/shirt",
      },
    ],
  });

  it("TC-06: 코디를 추가하면 목록에서 조회된다", () => {
    const repository = new MockOutfitRepository();
    const savedOutfit = repository.save(createOutfit());
    const outfits = repository.getAll();
    expect(outfits).toHaveLength(1);
    expect(outfits[0]).toEqual(savedOutfit);
  });

  it("savedAt이 설정된다", () => {
    const repository = new MockOutfitRepository();
    const savedOutfit = repository.save(createOutfit());
    expect(savedOutfit.savedAt).toBeTruthy();
    expect(typeof savedOutfit.savedAt).toBe("string");
  });

  it("입력은 Outfit이고 반환은 SavedOutfit이다", () => {
    const repository = new MockOutfitRepository();
    const savedOutfit = repository.save(createOutfit());
    expect(savedOutfit.id).toBeTruthy();
    expect(savedOutfit.outfit.id).toBe("outfit-1");
    expect(savedOutfit.savedAt).toBeTruthy();
  });

  it("TC-07: 저장된 코디 목록을 조회할 수 있다", () => {
    const repository = new MockOutfitRepository();
    repository.save(createOutfit());
    repository.save({ ...createOutfit(), id: "outfit-2" });
    const outfits = repository.getAll();
    expect(outfits).toHaveLength(2);
    expect(outfits.map((savedOutfit) => savedOutfit.outfit.id)).toEqual([
      "outfit-1",
      "outfit-2",
    ]);
  });

  it("TC-29: 없는 ID로 저장 요청하면 에러를 반환한다", () => {
    const repository = new MockOutfitRepository();
    expect(() => repository.saveById("invalid-id")).toThrowError();
  });

  it("TC-29: 에러 메시지를 반환한다", () => {
    const repository = new MockOutfitRepository();
    expect(() => repository.saveById("invalid-id")).toThrow("Outfit not found");
  });
});