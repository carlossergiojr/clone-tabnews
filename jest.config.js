const nextJest = require("next/jest");

const createJestConfig = nextJest();

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/jest.env.js"],
});

module.exports = jestConfig;
