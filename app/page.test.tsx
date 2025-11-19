import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("MSW 모킹 테스트", () => {
  test("fetch API 모킹 테스트", async () => {
    render(<Home />);

    const postListItems = await screen.findAllByRole("listitem");
    // MSW에 모킹된 데이터는 2개
    expect(postListItems).toHaveLength(2);

    // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
    expect(screen.getByText("1: 첫 번째 게시글")).toBeInTheDocument();
    expect(screen.getByText("2: 두 번째 게시글")).toBeInTheDocument();
  });
});
