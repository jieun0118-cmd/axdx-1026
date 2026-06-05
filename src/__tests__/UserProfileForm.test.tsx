import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserProfileForm from "../components/UserProfileForm";
import type { UserProfile } from "../lib/types";

describe("UserProfileForm", () => {
  it("TC-14: 아무 값도 입력하지 않으면 저장 버튼이 비활성화된다", () => {
    render(<UserProfileForm onSubmit={vi.fn()} />);

    const saveButton = screen.getByRole("button", {
      name: /저장/i,
    });

    expect(saveButton).toBeDisabled();
  });

  it("TC-15: 공백만 입력하면 저장 버튼이 비활성화된다", async () => {
    const user = userEvent.setup();
    render(<UserProfileForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/키/i), " ");
    await user.type(screen.getByLabelText(/몸무게/i), " ");
    await user.type(screen.getByLabelText(/스타일/i), " ");

    expect(screen.getByRole("button", { name: /저장/i })).toBeDisabled();
  });

  it("TC-02: 키, 몸무게, 스타일을 입력하면 저장 버튼이 활성화된다", async () => {
    const user = userEvent.setup();
    render(<UserProfileForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/키/i), "175");
    await user.type(screen.getByLabelText(/몸무게/i), "70");
    await user.type(screen.getByLabelText(/스타일/i), "캐주얼");

    expect(screen.getByRole("button", { name: /저장/i })).toBeEnabled();
  });

  it("TC-17: 키가 300cm이면 오류 메시지를 표시한다", async () => {
    const user = userEvent.setup();
    render(<UserProfileForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/키/i), "300");

    expect(screen.getByText(/올바른 키를 입력해주세요/i)).toBeInTheDocument();
  });

  it("TC-18: 몸무게가 0kg이면 오류 메시지를 표시한다", async () => {
    const user = userEvent.setup();
    render(<UserProfileForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/몸무게/i), "0");

    expect(screen.getByText(/올바른 몸무게를 입력해주세요/i)).toBeInTheDocument();
  });

  it("TC-01: 정상 제출 시 UserProfile 객체를 전달한다", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(profile: UserProfile) => void>();

    render(<UserProfileForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/키/i), "175");
    await user.type(screen.getByLabelText(/몸무게/i), "70");
    await user.type(screen.getByLabelText(/스타일/i), "캐주얼");
    await user.click(screen.getByRole("button", { name: /저장/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      height: 175,
      weight: 70,
      style: "캐주얼",
    });
  });
});