import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(@usewaypoint)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'ts-jest',
  },
};

export default config;
