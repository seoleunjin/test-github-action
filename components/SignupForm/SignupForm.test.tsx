// src/components/SignupForm.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { SignupForm } from ".";
import userEvent from "@testing-library/user-event";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

test("이메일, 비밀번호, 확인 비밀번호 입력 후 제출 이벤트 테스트", async () => {
  const user = userEvent.setup();
  render(<SignupForm />);

  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 이메일 입력 필드 확인
  const emailInput = screen.getByLabelText("이메일");
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  await user.type(emailInput, "test@example.com");

  // 비밀번호 입력 필드 확인
  const passwordInput = screen.getByLabelText("비밀번호");
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  await user.type(passwordInput, "password123");

  // 확인 비밀번호 입력 필드 확인
  const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");
  //   fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  await user.type(confirmPasswordInput, "password123");

  // 제출 이벤트 발생
  const signupForm = screen.getByRole("button", { name: "회원가입" });
  //   fireEvent.submit(signupForm);
  await user.click(signupForm);

  // 콘솔 로그 확인
  expect(alertSpy).toHaveBeenCalledWith("test@example.com님 반갑습니다.");

  // jest.spyOn()으로 생성된 스파이(spy)를 원래 구현(original implementation)으로 완전히 복원하는 역할
  alertSpy.mockRestore();
});
