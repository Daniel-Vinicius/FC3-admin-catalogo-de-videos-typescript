/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  projects: [
    "<rootDir>/src/@core",
    "<rootDir>/src/nestjs",
    "<rootDir>/src/nestjs/test",
  ],
  coverageDirectory: "<rootDir>/__coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
