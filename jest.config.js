import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./", // Next.js 프로젝트 루트
});

const config: Config = {
  preset: "ts-jest",
  // testEnvironment: "jsdom",
  testEnvironment: "jest-fixed-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|swr)/)"],
  testPathIgnorePatterns: ["<rootDir>/tests/"],
};

export default createJestConfig(config);
