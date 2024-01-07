// import type { Config } from 'jest';
const nextJest = require('next/jest');
// import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/jest.setup.js'],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);
module.exports = createJestConfig(config);
