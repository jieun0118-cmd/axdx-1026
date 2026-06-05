import type { SavedOutfit } from "../lib/types";

interface OutfitListProps {
  outfits: SavedOutfit[];
}

export default function OutfitList({
  outfits,
}: OutfitListProps) {
  if (outfits.length === 0) {
    return <p>아직 저장된 코디가 없습니다</p>;
  }

  return (
    <div>
      {outfits.map((savedOutfit) => (
        <section key={savedOutfit.id}>
          <p>{savedOutfit.outfit.reason}</p>
          <ul>
            {savedOutfit.outfit.items.map((item) => (
              <li key={`${savedOutfit.id}-${item.category}-${item.name}`}>
                {item.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}