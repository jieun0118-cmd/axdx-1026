import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import OutfitList from "../components/OutfitList";
import type { SavedOutfit } from "../lib/types";

describe("OutfitList", () => {
  it("TC-22: 저장된 코디가 없으면 빈 상태 메시지를 표시한다", () => {
    render(<OutfitList outfits={[]} />);
    expect(screen.getByText("아직 저장된 코디가 없습니다")).toBeInTheDocument();
  });

  it("TC-07: 저장된 코디가 있으면 코디 목록이 표시된다", () => {
    const savedOutfits: SavedOutfit[] = [
      {
        id: "saved-1",
        savedAt: "2025-06-06T10:00:00Z",
        outfit: {
          id: "outfit-1",
          createdAt: "2025-06-06T09:00:00Z",
          reason: "캐주얼 스타일을 선호하여 추천했습니다.",
          items: [
            { category: "상의", name: "오버핏 셔츠", price: 39000, purchaseUrl: "https://example.com/shirt" },
            { category: "하의", name: "와이드 슬랙스", price: 49000, purchaseUrl: "https://example.com/slacks" },
          ],
        },
      },
    ];
    render(<OutfitList outfits={savedOutfits} />);
    expect(screen.getByText("오버핏 셔츠")).toBeInTheDocument();
    expect(screen.getByText("와이드 슬랙스")).toBeInTheDocument();
  });

  it("TC-05: 추천 이유가 표시된다", () => {
    const savedOutfits: SavedOutfit[] = [
      {
        id: "saved-1",
        savedAt: "2025-06-06T10:00:00Z",
        outfit: {
          id: "outfit-1",
          createdAt: "2025-06-06T09:00:00Z",
          reason: "캐주얼 스타일을 선호하여 추천했습니다.",
          items: [
            { category: "상의", name: "오버핏 셔츠", price: 39000, purchaseUrl: "https://example.com/shirt" },
          ],
        },
      },
    ];
    render(<OutfitList outfits={savedOutfits} />);
    expect(screen.getByText("캐주얼 스타일을 선호하여 추천했습니다.")).toBeInTheDocument();
  });

  it("TC-07: 여러 개의 저장된 코디가 있으면 모두 표시된다", () => {
    const savedOutfits: SavedOutfit[] = [
      {
        id: "saved-1",
        savedAt: "2025-06-06T10:00:00Z",
        outfit: {
          id: "outfit-1",
          createdAt: "2025-06-06T09:00:00Z",
          reason: "캐주얼 추천",
          items: [
            { category: "상의", name: "오버핏 셔츠", price: 39000, purchaseUrl: "https://example.com/shirt" },
          ],
        },
      },
      {
        id: "saved-2",
        savedAt: "2025-06-06T11:00:00Z",
        outfit: {
          id: "outfit-2",
          createdAt: "2025-06-06T10:30:00Z",
          reason: "미니멀 추천",
          items: [
            { category: "하의", name: "블랙 슬랙스", price: 59000, purchaseUrl: "https://example.com/pants" },
          ],
        },
      },
    ];
    render(<OutfitList outfits={savedOutfits} />);
    expect(screen.getByText("오버핏 셔츠")).toBeInTheDocument();
    expect(screen.getByText("블랙 슬랙스")).toBeInTheDocument();
  });
});
