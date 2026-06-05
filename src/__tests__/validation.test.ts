// src/__tests__/validation.test.ts

import { describe, expect, it } from "vitest";
import { validateUserProfile } from "../lib/validation";
import type { UserProfile } from "../lib/types";

describe("validateUserProfile", () => {
  it("정상 입력은 valid true", () => {
    const profile: UserProfile = { height: 175, weight: 70, style: "캐주얼" };
    expect(validateUserProfile(profile)).toEqual({ valid: true, errors: [] });
  });

  it("키가 1 미만이면 valid false", () => {
    const result = validateUserProfile({ height: 0, weight: 70, style: "캐주얼" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("키가 299 초과면 valid false", () => {
    const result = validateUserProfile({ height: 300, weight: 70, style: "캐주얼" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("몸무게가 1 미만이면 valid false", () => {
    const result = validateUserProfile({ height: 175, weight: 0, style: "캐주얼" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("몸무게가 300 초과면 valid false", () => {
    const result = validateUserProfile({ height: 175, weight: 301, style: "캐주얼" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("스타일이 빈 값이면 valid false", () => {
    const result = validateUserProfile({ height: 175, weight: 70, style: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("스타일이 공백만 있으면 valid false", () => {
    const result = validateUserProfile({ height: 175, weight: 70, style: "     " });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("스타일이 100자 초과면 valid false", () => {
    const result = validateUserProfile({ height: 175, weight: 70, style: "a".repeat(101) });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("여러 조건이 동시에 실패하면 errors에 모두 포함된다", () => {
    const result = validateUserProfile({ height: 300, weight: 0, style: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });

  it("반환 형식은 { valid, errors } 구조를 가진다", () => {
    const result = validateUserProfile({ height: 175, weight: 70, style: "미니멀" });
    expect(result).toHaveProperty("valid");
    expect(result).toHaveProperty("errors");
    expect(typeof result.valid).toBe("boolean");
    expect(Array.isArray(result.errors)).toBe(true);
  });
});