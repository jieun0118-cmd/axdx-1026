import { type FormEvent, useMemo, useState } from "react";
import type { UserProfile } from "../lib/types";

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

export default function UserProfileForm({
  onSubmit,
}: UserProfileFormProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [style, setStyle] = useState("");

  const trimmedStyle = style.trim();
  const heightNumber = height.trim() === "" ? NaN : Number(height);
  const weightNumber = weight.trim() === "" ? NaN : Number(weight);

  const heightError =
    !Number.isNaN(heightNumber) && (heightNumber < 1 || heightNumber > 299);
  const weightError =
    !Number.isNaN(weightNumber) && (weightNumber < 1 || weightNumber > 300);

  const isFormValid = useMemo(() => {
    if (height.trim() === "") return false;
    if (weight.trim() === "") return false;
    if (trimmedStyle === "") return false;
    if (heightError) return false;
    if (weightError) return false;
    return true;
  }, [height, weight, trimmedStyle, heightError, weightError]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    const profile: UserProfile = {
      height: Number(height),
      weight: Number(weight),
      style: trimmedStyle,
    };
    onSubmit(profile);
    setHeight("");
    setWeight("");
    setStyle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="height">키</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        {heightError && <p>올바른 키를 입력해주세요</p>}
      </div>
      <div>
        <label htmlFor="weight">몸무게</label>
        <input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {weightError && <p>올바른 몸무게를 입력해주세요</p>}
      </div>
      <div>
        <label htmlFor="style">스타일</label>
        <input
          id="style"
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!isFormValid}>
        저장
      </button>
    </form>
  );
}