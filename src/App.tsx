import { useEffect, useMemo, useState } from "react";
import UserProfileForm from "./components/UserProfileForm";
import OutfitList from "./components/OutfitList";
import { MockOutfitRepository } from "./lib/repository";
import { calculateOutfitCompletionRate } from "./lib/kpi";
import type { Outfit, SavedOutfit, UserProfile } from "./lib/types";

const STORAGE_KEY = "saved-outfits";
const repository = new MockOutfitRepository();

function loadSavedOutfits(): SavedOutfit[] {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (rawValue === null) return [];
    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedOutfit[];
  } catch {
    return [];
  }
}

function createMockOutfit(profile: UserProfile): Outfit {
  return {
    id: crypto.randomUUID(),
    reason: `${profile.style} 스타일과 체형 정보를 기반으로 추천한 코디입니다.`,
    createdAt: new Date().toISOString(),
    items: [
      { category: "상의", name: "오버핏 셔츠", price: 39000, purchaseUrl: "https://example.com/shirt" },
      { category: "하의", name: "와이드 슬랙스", price: 49000, purchaseUrl: "https://example.com/pants" },
      { category: "액세서리", name: "미니멀 시계", price: 59000, purchaseUrl: "https://example.com/watch" },
    ],
  };
}

export default function App() {
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => loadSavedOutfits());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  const handleProfileSubmit = (profile: UserProfile) => {
    const outfit = createMockOutfit(profile);
    const savedOutfit = repository.save(outfit);
    setSavedOutfits((previous) => [...previous, savedOutfit]);
  };

  const completionCount = useMemo(
    () => calculateOutfitCompletionRate(savedOutfits),
    [savedOutfits]
  );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">AI 패션 코디 추천</h1>
      <section className="mb-8">
        <UserProfileForm onSubmit={handleProfileSubmit} />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">완료율</h2>
        <p>저장된 코디 수: {completionCount}</p>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">저장된 코디</h2>
        <OutfitList outfits={savedOutfits} />
      </section>
    </main>
  );
}