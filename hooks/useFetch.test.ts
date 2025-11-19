import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { json } from "stream/consumers";

describe("useFetch 테스트", () => {
  test("데이터 성공적으로 받아져 오는지 확인", async () => {
    const mockData = { name: "test Data" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(mockData);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  test("에러 처리가 정상적으로 작성되는지 테스트", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("네트워크 응답이 정상적이지 않습니다");
  });
});
