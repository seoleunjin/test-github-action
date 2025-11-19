import { render, screen } from "@testing-library/react";
import { LoginButton } from "./index";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";

describe("LoginButton 테스트", () => {
  test("인증되지 않은 경우 로그인 버튼이 렌더링되는지 확인", () => {
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    );
    const loginButton = screen.getByRole("button", {
      name: "로그인",
    });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");
  });

  test("인증 된 경우 로그아웃 버튼이 렌더링 되는 지 확인", () => {
    const AuthContextValue = {
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={AuthContextValue}>
        <LoginButton />
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });

    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });
});
