import type { UserProfile } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const MIN_HEIGHT = 1;
const MAX_HEIGHT = 299;
const MIN_WEIGHT = 1;
const MAX_WEIGHT = 300;
const MAX_STYLE_LENGTH = 100;

export function validateUserProfile(
  profile: UserProfile
): ValidationResult {
  const errors: string[] = [];

  if (profile.height < MIN_HEIGHT || profile.height > MAX_HEIGHT) {
    errors.push("키는 1 이상 299 이하로 입력해야 합니다.");
  }

  if (profile.weight < MIN_WEIGHT || profile.weight > MAX_WEIGHT) {
    errors.push("몸무게는 1 이상 300 이하로 입력해야 합니다.");
  }

  const trimmedStyle = profile.style.trim();

  if (trimmedStyle.length === 0) {
    errors.push("스타일은 필수 입력 항목입니다.");
  }

  if (trimmedStyle.length > MAX_STYLE_LENGTH) {
    errors.push("스타일은 100자를 초과할 수 없습니다.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}